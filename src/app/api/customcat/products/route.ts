import { NextRequest, NextResponse } from "next/server";

const CUSTOMCAT_BASE_URL =
  process.env.CUSTOMCAT_BASE_URL ||
  "https://customcat-beta.mylocker.net/api/v1";

export async function GET(request: NextRequest) {
  const apiKey = process.env.CUSTOMCAT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Server misconfiguration",
        detail: "CUSTOMCAT_API_KEY environment variable is not set.",
      },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category_id");

  try {
    const catalogUrl = categoryId
      ? `${CUSTOMCAT_BASE_URL}/catalog/${encodeURIComponent(categoryId)}?api_key=${apiKey}`
      : `${CUSTOMCAT_BASE_URL}/catalog?api_key=${apiKey}`;

    const ccResponse = await fetch(catalogUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!ccResponse.ok) {
      const errorText = await ccResponse.text();
      console.error(
        "[customcat/products] CustomCat API error:",
        ccResponse.status,
        errorText
      );
      return NextResponse.json(
        {
          error: "CustomCat catalog request failed",
          status: ccResponse.status,
          detail: errorText,
        },
        { status: ccResponse.status }
      );
    }

    const rawData = await ccResponse.json();
    const products = Array.isArray(rawData) ? rawData : rawData?.data ?? [];

    const normalized = products.map((product: Record<string, unknown>) => ({
      catalog_sku: product.catalog_sku ?? product.id,
      name: product.product_name ?? product.name,
      brand: product.brand,
      style: product.style,
      color: product.color,
      size: product.size,
      base_price: product.base_price ?? product.price,
      in_stock: product.in_stock ?? true,
      discontinued: product.discontinued ?? false,
      temporarily_out_of_stock: product.temporarily_out_of_stock ?? false,
      image_url: product.image_url ?? product.image,
      weight: product.weight,
      _raw: product,
    }));

    return NextResponse.json(
      {
        success: true,
        count: normalized.length,
        products: normalized,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[customcat/products] Unexpected error:", message);
    return NextResponse.json(
      {
        error: "Internal server error",
        detail: message,
      },
      { status: 500 }
    );
  }
}
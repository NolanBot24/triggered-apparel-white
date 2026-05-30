import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/customcat/products
 *
 * Fetches the full product catalog from CustomCat's /catalog endpoint.
 * Returns products with SKUs, variants, pricing, and inventory status.
 *
 * Query params (all optional):
 *   ?category_id=<id>   Filter by catalog category ID
 *   ?search=<term>      Filter products by name/keyword (client-side, from full list)
 *
 * CustomCat API ref: https://customcat-beta.mylocker.net/api/v1/ → /catalog
 */

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
    // Build the CustomCat catalog URL — optionally scoped to a category
    const catalogUrl = categoryId
      ? `${CUSTOMCAT_BASE_URL}/catalog/${encodeURIComponent(categoryId)}`
      : `${CUSTOMCAT_BASE_URL}/catalog`;

    const ccResponse = await fetch(catalogUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ api_key: apiKey }),
      // Revalidate the catalog at most once per hour — it rarely changes
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

    // Normalize the response into a predictable shape for the frontend.
    // The CustomCat /catalog endpoint returns an array of product objects.
    const products = Array.isArray(rawData) ? rawData : rawData?.data ?? [];

    const normalized = products.map(
      (product: Record<string, unknown>) => ({
        catalog_sku: product.catalog_sku ?? product.id,
        name: product.product_name ?? product.name,
        brand: product.brand,
        style: product.style,
        color: product.color,
        size: product.size,
        // Pricing — CustomCat returns base price in USD cents in some responses
        base_price: product.base_price ?? product.price,
        // Inventory flags from CustomCat
        in_stock: product.in_stock ?? true,
        discontinued: product.discontinued ?? false,
        temporarily_out_of_stock: product.temporarily_out_of_stock ?? false,
        // Images
        image_url: product.image_url ?? product.image,
        // Weight (for shipping calculations)
        weight: product.weight,
        // Pass through the full product object so the frontend has everything
        _raw: product,
      })
    );

    return NextResponse.json(
      {
        success: true,
        count: normalized.length,
        products: normalized,
      },
      {
        status: 200,
        headers: {
          // Allow client-side caching for 1 hour
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

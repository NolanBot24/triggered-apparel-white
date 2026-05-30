import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/customcat/orders
 *
 * Accepts customer order data and submits it to CustomCat's /order endpoint.
 * Always runs in sandbox mode (sandbox: 1) until explicitly switched to production.
 *
 * Expected request body:
 * {
 *   order_id: string;              // Your internal order ID (required by CustomCat URL)
 *   shipping_first_name: string;
 *   shipping_last_name: string;
 *   shipping_address1: string;
 *   shipping_address2?: string;
 *   shipping_city: string;
 *   shipping_state: string;        // 2-letter state code
 *   shipping_zip: string;
 *   shipping_country: string;      // e.g. "US"
 *   shipping_email: string;
 *   shipping_phone?: string;
 *   shipping_method: string;       // "Economy" | "Priority" | "Express"
 *   items: Array<{
 *     catalog_sku: string;         // External design workflow
 *     design_url: string;          // Must be a publicly downloadable .png or .jpg
 *     design_url_back?: string;    // Optional back print (+$5 fee from CustomCat)
 *     preset_id?: number;          // 2 = Full Front, 3 = Full Back placement
 *     quantity: number;
 *   }>;
 * }
 *
 * CustomCat API ref: https://customcat-beta.mylocker.net/api/v1/ → /order/{id}
 */

const CUSTOMCAT_BASE_URL =
  process.env.CUSTOMCAT_BASE_URL ||
  "https://customcat-beta.mylocker.net/api/v1";

// ─── Sandbox mode: set to "1" until you are ready for production ─────────────
// To go live: change this to "0" or remove the field entirely.
const SANDBOX_MODE = "1";

export async function POST(request: NextRequest) {
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

  // ── Parse & validate the incoming request body ──────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const {
    order_id,
    shipping_first_name,
    shipping_last_name,
    shipping_address1,
    shipping_address2 = "",
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_country = "US",
    shipping_email,
    shipping_phone = "",
    shipping_method = "Economy",
    items,
  } = body as {
    order_id: string;
    shipping_first_name: string;
    shipping_last_name: string;
    shipping_address1: string;
    shipping_address2?: string;
    shipping_city: string;
    shipping_state: string;
    shipping_zip: string;
    shipping_country?: string;
    shipping_email: string;
    shipping_phone?: string;
    shipping_method?: string;
    items: Array<{
      catalog_sku: string;
      design_url: string;
      design_url_back?: string;
      preset_id?: number;
      quantity: number;
    }>;
  };

  // ── Required field validation ────────────────────────────────────────────────
  const required: Record<string, unknown> = {
    order_id,
    shipping_first_name,
    shipping_last_name,
    shipping_address1,
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_email,
    items,
  };

  const missing = Object.entries(required)
    .filter(([, v]) => v === undefined || v === null || v === "")
    .map(([k]) => k);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: "Missing required fields",
        missing,
      },
      { status: 422 }
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Order must contain at least one item." },
      { status: 422 }
    );
  }

  // ── Validate each line item ──────────────────────────────────────────────────
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (!item.catalog_sku) {
      return NextResponse.json(
        { error: `Item at index ${i} is missing catalog_sku.` },
        { status: 422 }
      );
    }
    if (!item.design_url) {
      return NextResponse.json(
        { error: `Item at index ${i} is missing design_url.` },
        { status: 422 }
      );
    }
    if (!item.quantity || item.quantity < 1) {
      return NextResponse.json(
        { error: `Item at index ${i} must have quantity >= 1.` },
        { status: 422 }
      );
    }
  }

  // ── Build the CustomCat payload ──────────────────────────────────────────────
  // CustomCat requires the order ID in the URL: POST /order/{your_order_id}
  const ccPayload = {
    shipping_first_name,
    shipping_last_name,
    shipping_address1,
    shipping_address2,
    shipping_city,
    shipping_state,
    shipping_zip,
    shipping_country,
    shipping_email,
    shipping_phone,
    shipping_method,
    items: items.map((item) => {
      const lineItem: Record<string, unknown> = {
        catalog_sku: item.catalog_sku,
        design_url: item.design_url,
        quantity: item.quantity,
      };
      if (item.design_url_back) lineItem.design_url_back = item.design_url_back;
      if (item.preset_id !== undefined) lineItem.preset_id = item.preset_id;
      return lineItem;
    }),
    sandbox: SANDBOX_MODE, // ← "1" = test mode, "0" = production
    api_key: apiKey,
  };

  // ── Submit to CustomCat ──────────────────────────────────────────────────────
  try {
    const ccResponse = await fetch(
      `${CUSTOMCAT_BASE_URL}/order/${encodeURIComponent(String(order_id))}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(ccPayload),
        cache: "no-store",
      }
    );

    const ccData = await ccResponse.json();

    if (!ccResponse.ok) {
      console.error(
        "[customcat/orders] CustomCat rejected the order:",
        ccResponse.status,
        ccData
      );
      return NextResponse.json(
        {
          error: "CustomCat order submission failed",
          status: ccResponse.status,
          detail: ccData,
        },
        { status: ccResponse.status }
      );
    }

    // CustomCat success response shape:
    // { ORDER_ID, MSG, CUSTOMCAT_ORDER_ID }
    return NextResponse.json(
      {
        success: true,
        sandbox: SANDBOX_MODE === "1",
        order_id: ccData.ORDER_ID ?? order_id,
        customcat_order_id: ccData.CUSTOMCAT_ORDER_ID,
        message: ccData.MSG ?? "Order submitted successfully.",
        _raw: ccData,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[customcat/orders] Unexpected error:", message);
    return NextResponse.json(
      { error: "Internal server error", detail: message },
      { status: 500 }
    );
  }
}

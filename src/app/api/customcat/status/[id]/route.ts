import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/customcat/status/[id]
 *
 * Fetches the status of a specific CustomCat order by its order ID.
 * Proxies to CustomCat's /order/status/{id} endpoint.
 *
 * Example usage:
 *   GET /api/customcat/status/101-102938
 *
 * Returns order status including fulfillment state, totals, and tracking info.
 *
 * CustomCat API ref: https://customcat-beta.mylocker.net/api/v1/ → /order/status/{id}
 */

const CUSTOMCAT_BASE_URL =
  process.env.CUSTOMCAT_BASE_URL ||
  "https://customcat-beta.mylocker.net/api/v1";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const orderId = params.id?.trim();

  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID is required." },
      { status: 400 }
    );
  }

  try {
    const ccResponse = await fetch(
      `${CUSTOMCAT_BASE_URL}/order/status/${encodeURIComponent(orderId)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ api_key: apiKey }),
        // Don't cache order status — it changes as fulfillment progresses
        cache: "no-store",
      }
    );

    const ccData = await ccResponse.json();

    if (!ccResponse.ok) {
      // 404 from CustomCat means the order ID doesn't exist on their side
      if (ccResponse.status === 404) {
        return NextResponse.json(
          {
            error: "Order not found",
            order_id: orderId,
          },
          { status: 404 }
        );
      }

      console.error(
        "[customcat/status] CustomCat API error:",
        ccResponse.status,
        ccData
      );
      return NextResponse.json(
        {
          error: "CustomCat status request failed",
          status: ccResponse.status,
          detail: ccData,
        },
        { status: ccResponse.status }
      );
    }

    // Normalize into a consistent response shape
    return NextResponse.json(
      {
        success: true,
        order_id: orderId,
        customcat_order_id: ccData.customcat_order_id ?? ccData.CUSTOMCAT_ORDER_ID,
        status: ccData.status ?? ccData.STATUS,
        fulfillment_status: ccData.fulfillment_status,
        tracking_number: ccData.tracker_number ?? ccData.tracking_number,
        tracking_url: ccData.tracking_url,
        subtotal: ccData.subtotal,
        shipping_cost: ccData.shipping_cost,
        total: ccData.total,
        items: ccData.items ?? [],
        created_at: ccData.created_at,
        shipped_at: ccData.shipped_at,
        _raw: ccData,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[customcat/status] Unexpected error:", message);
    return NextResponse.json(
      { error: "Internal server error", detail: message },
      { status: 500 }
    );
  }
}

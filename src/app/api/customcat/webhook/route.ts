import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

/**
 * POST /api/customcat/webhook
 *
 * Receives real-time shipping/fulfillment webhook events from CustomCat.
 * Updates the local SQLite orders table when an order ships (fully or partially).
 *
 * Register this URL in your CustomCat account:
 *   https://your-domain.com/api/customcat/webhook
 *
 * CustomCat webhook events handled:
 *   order-shipped          → Full order shipped (tracker_number, tracking_url)
 *   order-partial-shipment → Part of the order shipped (items_remaining)
 *   product-created        → Product created in CC (informational, logged only)
 *   product-deleted        → Product deleted in CC (informational, logged only)
 *   product-updated        → Product updated in CC (informational, logged only)
 *   design-rejected        → Design was rejected (logged, should alert you)
 *
 * The webhook payload includes a Read-Only API key for verification.
 * Set CUSTOMCAT_WEBHOOK_KEY in .env.local to enable signature validation.
 *
 * CustomCat API ref: https://customcat-beta.mylocker.net/api/v1/ → Webhooks
 */

// Prepared statements — compiled once, reused on every webhook call
const upsertOrder = db.prepare(`
  INSERT INTO orders (order_id, customcat_order_id, status, fulfillment_status,
                      tracking_number, tracking_url, items_remaining, raw_webhook, updated_at)
  VALUES (@order_id, @customcat_order_id, @status, @fulfillment_status,
          @tracking_number, @tracking_url, @items_remaining, @raw_webhook, datetime('now'))
  ON CONFLICT(order_id) DO UPDATE SET
    customcat_order_id  = excluded.customcat_order_id,
    status              = excluded.status,
    fulfillment_status  = excluded.fulfillment_status,
    tracking_number     = COALESCE(excluded.tracking_number, tracking_number),
    tracking_url        = COALESCE(excluded.tracking_url, tracking_url),
    items_remaining     = excluded.items_remaining,
    raw_webhook         = excluded.raw_webhook,
    updated_at          = datetime('now')
`);

export async function POST(request: NextRequest) {
  // ── Parse the incoming webhook body ──────────────────────────────────────────
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // ── Optional: verify the webhook API key ─────────────────────────────────────
  // CustomCat sends the Read-Only API key with every webhook for identification.
  // Set CUSTOMCAT_WEBHOOK_KEY in .env.local to validate it.
  const webhookKey = process.env.CUSTOMCAT_WEBHOOK_KEY;
  if (webhookKey) {
    const incomingKey = payload.api_key as string | undefined;
    if (!incomingKey || incomingKey !== webhookKey) {
      console.warn(
        "[customcat/webhook] Rejected: api_key mismatch or missing.",
        { received: incomingKey ? "[redacted]" : "missing" }
      );
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // ── Extract the event type ────────────────────────────────────────────────────
  // CustomCat sends an "event" field on all webhooks, e.g. "order-shipped"
  const event = (payload.event as string | undefined) ?? "unknown";
  const orderId = payload.order_id as string | undefined;
  const customcatOrderId = payload.customcat_order_id as string | undefined;

  console.log(`[customcat/webhook] Received event: ${event}`, {
    order_id: orderId,
    customcat_order_id: customcatOrderId,
  });

  // ── Handle each event type ────────────────────────────────────────────────────
  switch (event) {
    case "order-shipped": {
      // Full order has shipped — record tracking info
      if (!orderId) {
        return NextResponse.json(
          { error: "order-shipped event is missing order_id." },
          { status: 422 }
        );
      }

      upsertOrder.run({
        order_id: orderId,
        customcat_order_id: customcatOrderId ?? null,
        status: "shipped",
        fulfillment_status: "shipped",
        tracking_number: payload.tracker_number ?? null,
        tracking_url: payload.tracking_url ?? null,
        items_remaining: 0,
        raw_webhook: JSON.stringify(payload),
      });

      console.log(`[customcat/webhook] Order ${orderId} marked as shipped.`);
      break;
    }

    case "order-partial-shipment": {
      // Part of the order has shipped — update tracking but keep status as partial
      if (!orderId) {
        return NextResponse.json(
          { error: "order-partial-shipment event is missing order_id." },
          { status: 422 }
        );
      }

      upsertOrder.run({
        order_id: orderId,
        customcat_order_id: customcatOrderId ?? null,
        status: "partial_shipped",
        fulfillment_status: "partial_shipped",
        tracking_number: payload.tracker_number ?? null,
        tracking_url: payload.tracking_url ?? null,
        items_remaining: payload.items_remaining ?? null,
        raw_webhook: JSON.stringify(payload),
      });

      console.log(
        `[customcat/webhook] Order ${orderId} partial shipment. ` +
          `Items remaining: ${payload.items_remaining ?? "unknown"}`
      );
      break;
    }

    case "product-created":
    case "product-deleted":
    case "product-updated": {
      // Informational only — no DB update needed.
      // Extend this block if you want to sync a local products table.
      console.log(`[customcat/webhook] Product event: ${event}`, payload);
      break;
    }

    case "design-rejected": {
      // A design was rejected by CustomCat — log clearly so it's visible in server logs.
      console.error("[customcat/webhook] ⚠️  DESIGN REJECTED by CustomCat:", {
        design_url: payload.design_url,
        reason: payload.reason,
        affected_orders: payload.orders,
      });
      break;
    }

    default: {
      // Log unrecognised events without failing — CustomCat may add new events
      console.log(`[customcat/webhook] Unhandled event type: "${event}"`, payload);
    }
  }

  // Always return 200 to acknowledge receipt.
  // CustomCat will retry webhooks that don't receive a 2xx response.
  return NextResponse.json({ received: true, event }, { status: 200 });
}

// Creates a Razorpay order for the Zero to Free kit. Called by the Buy buttons on
// /zero-to-free right before opening Razorpay Checkout.
import { createOrder } from "@/lib/zero-to-free";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const order = await createOrder();
  if (!keyId || !order) {
    return Response.json({ ok: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  return Response.json(
    { ok: true, key: keyId, order_id: order.id, amount: order.amount, currency: order.currency },
    { headers: { "Cache-Control": "no-store" } },
  );
}

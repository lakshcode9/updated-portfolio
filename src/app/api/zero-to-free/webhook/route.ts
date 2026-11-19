// Razorpay webhook for the Zero to Free kit.
// Razorpay dashboard: Webhooks -> URL https://lakshpujary.tech/api/zero-to-free/webhook,
// event "payment.captured", secret = RAZORPAY_WEBHOOK_SECRET.
import { fetchOrderEmail, isEmail, isKitPurchase, isValidSignature, sendKitEmail, type RazorpayPayment } from "@/lib/zero-to-free";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return new Response("Webhook not configured", { status: 500 });

  const raw = await req.text();
  if (!isValidSignature(raw, req.headers.get("x-razorpay-signature"), secret)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: { event?: string; payload?: { payment?: { entity?: RazorpayPayment } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Bad JSON", { status: 400 });
  }

  const payment = event.payload?.payment?.entity;
  // Acknowledge events we don't act on, so Razorpay doesn't retry them.
  if (event.event !== "payment.captured" || !payment || !isKitPurchase(payment)) {
    return Response.json({ ok: true, skipped: true });
  }

  // Email we collected on our page (order notes) wins; Checkout may not ask for one.
  let email = payment.notes?.email || (payment.order_id ? await fetchOrderEmail(payment.order_id) : null) || payment.email || null;
  if (!isEmail(email)) {
    console.error("zero-to-free: no email for payment", payment.id);
    return Response.json({ ok: true, skipped: "no-email" });
  }
  email = email.trim();
  const sent = await sendKitEmail(email, payment.id);
  if (!sent) {
    console.error("zero-to-free: delivery email failed", payment.id);
    // Non-2xx makes Razorpay retry later.
    return new Response("Email failed", { status: 502 });
  }
  return Response.json({ ok: true });
}

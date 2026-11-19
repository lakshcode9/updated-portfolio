// Thank-you page check: returns the kit link only for a real, captured kit payment.
import { fetchPayment, isKitPurchase, isValidCheckoutSignature, kitUrl } from "@/lib/zero-to-free";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const pid = q.get("payment_id") ?? "";
  // A valid checkout signature proves the payment succeeded, even if capture is still pending.
  const signed = isValidCheckoutSignature(q.get("order_id") ?? "", pid, q.get("signature") ?? "");
  const payment = await fetchPayment(pid);
  const link = kitUrl();
  if (!payment || !isKitPurchase(payment, signed) || !link) {
    return Response.json({ ok: false }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }
  return Response.json({ ok: true, url: link }, { headers: { "Cache-Control": "no-store" } });
}

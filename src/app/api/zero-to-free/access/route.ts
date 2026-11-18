// Thank-you page check: returns the kit link only for a real, captured kit payment.
import { fetchPayment, isKitPurchase, kitUrl } from "@/lib/zero-to-free";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const pid = new URL(req.url).searchParams.get("payment_id") ?? "";
  const payment = await fetchPayment(pid);
  const link = kitUrl();
  if (!payment || !isKitPurchase(payment) || !link) {
    return Response.json({ ok: false }, { status: 404, headers: { "Cache-Control": "no-store" } });
  }
  return Response.json({ ok: true, url: link }, { headers: { "Cache-Control": "no-store" } });
}

// Zero to Free kit delivery: shared helpers for the Razorpay webhook and the
// thank-you page access check. Nothing is stored; Razorpay is the source of truth.
import { createHmac, timingSafeEqual } from "node:crypto";

export const KIT_PRICE_PAISE = Number(process.env.ZTF_PRICE_PAISE ?? 19900);

export type RazorpayPayment = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  email?: string | null;
  order_id?: string | null;
  notes?: Record<string, string> | null;
};

export function isValidSignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

// A payment unlocks the kit only if it is captured, in INR, and at least the kit price.
export function isKitPurchase(p: RazorpayPayment, allowAuthorized = false): boolean {
  const okStatus = p.status === "captured" || (allowAuthorized && p.status === "authorized");
  return okStatus && p.currency === "INR" && p.amount >= KIT_PRICE_PAISE;
}

function razorpayAuth(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

export async function fetchPayment(paymentId: string): Promise<RazorpayPayment | null> {
  const auth = razorpayAuth();
  if (!auth || !/^pay_[A-Za-z0-9]+$/.test(paymentId)) return null;
  const res = await fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, {
    headers: { Authorization: auth },
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as RazorpayPayment;
}

// Creates a Razorpay order for one kit. Checkout on the sales page pays this order.
export async function createOrder(email: string): Promise<{ id: string; amount: number; currency: string } | null> {
  const auth = razorpayAuth();
  if (!auth) return null;
  const res = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: auth, "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: KIT_PRICE_PAISE,
      currency: "INR",
      receipt: `ztf_${Date.now()}`,
      notes: { product: "zero-to-free", email },
    }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return (await res.json()) as { id: string; amount: number; currency: string };
}

// Checkout handler signature: HMAC-SHA256(order_id + "|" + payment_id, key_secret).
export function isValidCheckoutSignature(orderId: string, paymentId: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret || !orderId || !paymentId || !signature) return false;
  return isValidSignature(`${orderId}|${paymentId}`, signature, secret);
}

export function kitUrl(): string | null {
  return process.env.ZTF_NOTION_URL || null;
}

export async function sendKitEmail(to: string, paymentId: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const link = kitUrl();
  if (!apiKey || !link) return false;
  const from = process.env.ZTF_FROM_EMAIL || "Laksh <kit@lakshpujary.tech>";

  const html = `<!doctype html><html><body style="margin:0;background:#17191e;font-family:Inter,Arial,sans-serif;color:#f4f1e9">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#17191e;padding:32px 16px"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#1f2228;border:1px solid #2a2e36;border-radius:16px">
<tr><td><img src="https://lakshpujary.tech/zero-to-free/covers/home.png" width="560" alt="" style="display:block;width:100%;border-radius:16px 16px 0 0"></td></tr>
<tr><td style="padding:32px">
<p style="margin:0 0 8px;font-family:monospace;font-size:12px;letter-spacing:1px;color:#8993a1">ZERO TO FREE &middot; THE AI ENGINEER KIT</p>
<h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;color:#f4f1e9">You're in. Here's your kit.</h1>
<p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#d8dbe0">Thanks for buying Zero to Free. Open the link below, then click <b>Duplicate</b> (top right) to copy the whole kit into your own free Notion account.</p>
<p style="margin:0 0 28px"><a href="${link}" style="display:inline-block;background:#ff5a3d;color:#17191e;font-weight:700;text-decoration:none;padding:16px 28px;border-radius:10px;font-size:16px">Open my kit &rarr;</a></p>
<p style="margin:0 0 8px;font-size:15px;color:#d8dbe0"><b>Start here:</b> open <i>00 Start Here</i>, then tick Day 1 in <i>04 The 30-Day Plan</i>.</p>
<p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#8993a1">Keep this email: it's your permanent access link. Problems? Reply to this email or write to info@lakshpujary.tech with your payment ID: ${paymentId}</p>
</td></tr></table></td></tr></table></body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: "info@lakshpujary.tech",
      subject: "Your Zero to Free kit is ready",
      html,
      text: `You're in. Open your kit: ${link}\nClick "Duplicate" (top right) to copy it into your Notion.\nProblems? Write to info@lakshpujary.tech with payment ID ${paymentId}.`,
    }),
  });
  return res.ok;
}

export async function fetchOrderEmail(orderId: string): Promise<string | null> {
  const auth = razorpayAuth();
  if (!auth || !/^order_[A-Za-z0-9]+$/.test(orderId)) return null;
  const res = await fetch(`https://api.razorpay.com/v1/orders/${orderId}`, { headers: { Authorization: auth }, cache: "no-store" });
  if (!res.ok) return null;
  const o = (await res.json()) as { notes?: Record<string, string> | null };
  return o.notes?.email || null;
}

export function isEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

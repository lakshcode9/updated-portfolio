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
  const from = process.env.ZTF_FROM_EMAIL || "Laksh <kit@updates.lakshpujary.tech>";

  const img = "https://lakshpujary.tech/zero-to-free";
  const step = (n: string, t: string, d: string) => `<tr><td style="padding:0 0 12px"><table width="100%" cellpadding="0" cellspacing="0" style="background:#16181c;border:1px solid #2a2e36;border-radius:12px"><tr>
<td width="56" valign="top" style="padding:18px 0 18px 18px"><div style="width:36px;height:36px;line-height:36px;border-radius:10px;background:#ff5a3d;color:#17191e;font-weight:800;font-size:16px;text-align:center;font-family:Arial,sans-serif">${n}</div></td>
<td style="padding:16px 18px 16px 8px;font-family:Arial,sans-serif"><div style="font-size:16px;font-weight:700;color:#f4f1e9;margin-bottom:3px">${t}</div><div style="font-size:14px;line-height:1.5;color:#9aa2ae">${d}</div></td></tr></table></td></tr>`;
  const cell = (k: string, t: string) => `<td width="50%" valign="top" style="padding:6px"><div style="background:#16181c;border:1px solid #2a2e36;border-radius:12px;padding:16px;font-family:Arial,sans-serif"><div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#ff5a3d;margin-bottom:6px">${k}</div><div style="font-size:14px;color:#f4f1e9;font-weight:700">${t}</div></div></td>`;

  const html = `<!doctype html><html><head><meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark"></head>
<body style="margin:0;padding:0;background:#0f1013">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">Your Zero to Free kit is ready. Open it, duplicate it, tick Day 1.</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1013;padding:28px 12px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

<tr><td style="padding:0 4px 18px;font-family:Arial,sans-serif;font-size:18px;font-weight:800;color:#f4f1e9">Zero to <span style="color:#ff5a3d">Free</span></td></tr>

<tr><td style="background:#1b1d22;border:1px solid #2a2e36;border-radius:20px;overflow:hidden">
<table width="100%" cellpadding="0" cellspacing="0">
<tr><td><img src="${img}/covers/home.png" width="600" alt="Zero to Free" style="display:block;width:100%;height:auto;border-radius:20px 20px 0 0"></td></tr>
<tr><td style="padding:36px 34px 8px;font-family:Arial,sans-serif">
<div style="display:inline-block;padding:6px 12px;border:1px solid #ff5a3d;border-radius:999px;font-family:'Courier New',monospace;font-size:11px;letter-spacing:1px;color:#ff5a3d">&#9679; PAYMENT CONFIRMED</div>
<h1 style="margin:18px 0 12px;font-size:34px;line-height:1.1;color:#f4f1e9;letter-spacing:-0.5px">You're in.<br><span style="color:#ff5a3d">Welcome to Zero to Free.</span></h1>
<p style="margin:0 0 26px;font-size:16px;line-height:1.65;color:#cfd3da">A job isn't freedom. But it can pay for it. Your kit is ready: the plan, the templates, the scripts and the Exit Plan, all in one Notion workspace.</p>
<table cellpadding="0" cellspacing="0"><tr><td style="border-radius:12px;background:#ff5a3d"><a href="${link}" style="display:inline-block;padding:18px 34px;font-family:Arial,sans-serif;font-size:17px;font-weight:800;color:#17191e;text-decoration:none">Open my kit &rarr;</a></td></tr></table>
<p style="margin:14px 0 0;font-size:13px;color:#8993a1">Button not working? Copy this link: <a href="${link}" style="color:#ff8a5c;word-break:break-all">${link}</a></p>
</td></tr>

<tr><td style="padding:30px 34px 6px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:1px;color:#8993a1">GET STARTED IN 3 STEPS</td></tr>
<tr><td style="padding:8px 34px 10px"><table width="100%" cellpadding="0" cellspacing="0">
${step("1", "Duplicate it", "Open the link and click <b style=\"color:#f4f1e9\">Duplicate</b> (top right). A free Notion account is enough.")}
${step("2", "Read 00 Start Here", "Five minutes. It shows you the order and the two ways in: a job or clients.")}
${step("3", "Tick Day 1", "Open <b style=\"color:#f4f1e9\">04 The 30-Day Plan</b>. About 2 hours a day for 30 days.")}
</table></td></tr>

<tr><td style="padding:20px 34px 6px;font-family:'Courier New',monospace;font-size:12px;letter-spacing:1px;color:#8993a1">WHAT'S WAITING FOR YOU</td></tr>
<tr><td style="padding:6px 28px 26px"><table width="100%" cellpadding="0" cellspacing="0">
<tr>${cell("30 DAYS", "Day-by-day plan")}${cell("12 IDEAS", "Proof-of-work projects")}</tr>
<tr>${cell("20 SCRIPTS", "Outreach that gets replies")}${cell("THE EXIT", "Paycheck to freedom")}</tr>
</table></td></tr>

<tr><td style="padding:0 34px 32px"><table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #2a2e36"><tr>
<td width="72" valign="top" style="padding-top:24px"><img src="${img}/img/laptop-typing.png" width="56" height="56" alt="" style="display:block;border-radius:12px"></td>
<td style="padding-top:24px;font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#cfd3da">I got hung up on, worked odd jobs, and kept sending messages until one client said yes. Everything I wish I'd had is in this kit. Go build your way out.<br><span style="color:#f4f1e9;font-weight:700">Laksh</span></td>
</tr></table></td></tr>
</table></td></tr>

<tr><td style="padding:22px 6px;font-family:Arial,sans-serif;font-size:12px;line-height:1.6;color:#6b7380;text-align:center">
Keep this email: it's your permanent access link.<br>
Need help? Reply or write to <a href="mailto:info@lakshpujary.tech" style="color:#8993a1">info@lakshpujary.tech</a> &middot; Payment ID: ${paymentId}<br>
<a href="https://lakshpujary.tech/zero-to-free" style="color:#8993a1">lakshpujary.tech/zero-to-free</a>
</td></tr>
</table></td></tr></table></body></html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: "info@lakshpujary.tech",
      subject: "You're in: your Zero to Free kit is ready",
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

"use server";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const KIT = "https://api.kit.com/v4";
// Kit form "Website signup (lakshpujary.tech)": double opt-in on, confirmed
// subscribers land on /newsletter/confirmed.
const DEFAULT_FORM_ID = "10165166";

/**
 * Adds an email to the Kit (kit.com) form in KIT_FORM_ID, using Kit API v4.
 *
 * The subscriber is created as "inactive" first, then added to the form, so a
 * form with double opt-in sends its confirmation email and the person only
 * becomes active after confirming. (Creating them as "active" would skip
 * consent.) Kit handles unsubscribe links and the confirmation email.
 */
export async function subscribe(_prev: SubscribeState, form: FormData): Promise<SubscribeState> {
  // Honeypot: real people never see or fill this field.
  if (String(form.get("company") ?? "").length > 0) {
    return { status: "ok", message: "Check your inbox to confirm." };
  }

  const email = String(form.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL.test(email) || email.length > 254) {
    return { status: "error", message: "That email doesn't look right." };
  }

  const apiKey = process.env.KIT_API_KEY;
  // The form ID isn't secret (Kit puts it in every embed). Env overrides it.
  const formId = process.env.KIT_FORM_ID || DEFAULT_FORM_ID;
  if (!apiKey || !formId || !/^\d+$/.test(formId)) {
    console.error("Newsletter: KIT_API_KEY or KIT_FORM_ID is not set.");
    return { status: "error", message: "Signups aren't open yet. Try again soon." };
  }

  const headers = { "Content-Type": "application/json", "X-Kit-Api-Key": apiKey };
  const post = (path: string, body: object) =>
    fetch(`${KIT}${path}`, { method: "POST", headers, body: JSON.stringify(body), signal: AbortSignal.timeout(8000) });

  try {
    // 1. Upsert the subscriber. An existing subscriber keeps their state.
    const created = await post("/subscribers", { email_address: email, state: "inactive" });
    if (!created.ok) {
      console.error("Newsletter: create subscriber failed", created.status, await created.text().catch(() => ""));
      return { status: "error", message: "Something went wrong. Try again in a minute." };
    }
    // 2. Add them to the form. This is what triggers the confirmation email.
    const added = await post(`/forms/${formId}/subscribers`, {
      email_address: email,
      referrer: "https://www.lakshpujary.tech/newsletter",
    });
    if (!added.ok) {
      console.error("Newsletter: add to form failed", added.status, await added.text().catch(() => ""));
      return { status: "error", message: "Something went wrong. Try again in a minute." };
    }
  } catch (err) {
    console.error("Newsletter: request failed", err);
    return { status: "error", message: "Something went wrong. Try again in a minute." };
  }

  return { status: "ok", message: "Almost done. Check your inbox to confirm." };
}

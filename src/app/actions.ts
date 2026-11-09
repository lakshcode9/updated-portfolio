"use server";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Adds an email to the Kit (kit.com) form set in KIT_FORM_ID. Kit sends the
 * confirmation email itself, so double opt-in and unsubscribe links are
 * handled there.
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
  const formId = process.env.KIT_FORM_ID;
  if (!apiKey || !formId || !/^\d+$/.test(formId)) {
    console.error("Newsletter: KIT_API_KEY or KIT_FORM_ID is not set.");
    return { status: "error", message: "Signups aren't open yet. Try again soon." };
  }

  try {
    const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email, tags: [] }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.error("Newsletter: Kit returned", res.status, await res.text().catch(() => ""));
      return { status: "error", message: "Something went wrong. Try again in a minute." };
    }
  } catch (err) {
    console.error("Newsletter: request failed", err);
    return { status: "error", message: "Something went wrong. Try again in a minute." };
  }

  return { status: "ok", message: "Almost done. Check your inbox to confirm." };
}

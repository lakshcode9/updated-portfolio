// Creates the "new explainer" email as a DRAFT broadcast in Kit (API v4).
// It never sends: Laksh opens the draft in Kit, checks it and presses send.
//
// Usage: KIT_API_KEY=... node scripts/newsletter/draft.mjs <slug> [<slug>...]
// Run by .github/workflows/newsletter-draft.yml when a new explainer is pushed.
//
// A draft is skipped if one for the same explainer already exists (matched on
// the broadcast description "explainer:<slug>"), so re-runs are safe.

import { emailCoverPath, readExplainer, renderEmail } from "./email.mjs";

const KIT = "https://api.kit.com/v4";
const key = process.env.KIT_API_KEY;
const slugs = process.argv.slice(2).filter((s) => /^[a-z0-9-]+$/.test(s));

if (!key) {
  console.error("KIT_API_KEY is not set.");
  process.exit(1);
}
if (!slugs.length) {
  console.log("No explainer slugs given; nothing to draft.");
  process.exit(0);
}

const headers = { "Content-Type": "application/json", "X-Kit-Api-Key": key };

async function kit(method, path, body) {
  const res = await fetch(`${KIT}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* not JSON */
  }
  if (!res.ok) {
    const msg = json?.errors?.join("; ") ?? text.slice(0, 300);
    throw new Error(`Kit ${method} ${path} -> HTTP ${res.status}: ${msg}`);
  }
  return json;
}

async function existingDescriptions() {
  const seen = new Set();
  let after = null;
  for (let page = 0; page < 10; page++) {
    const q = new URLSearchParams({ per_page: "100", ...(after ? { after } : {}) });
    const data = await kit("GET", `/broadcasts?${q}`);
    for (const b of data.broadcasts ?? []) if (b.description) seen.add(b.description);
    if (!data.pagination?.has_next_page) break;
    after = data.pagination.end_cursor;
  }
  return seen;
}

const seen = await existingDescriptions();
let failed = false;

for (const slug of slugs) {
  const marker = `explainer:${slug}`;
  if (seen.has(marker)) {
    console.log(`= ${slug}: a draft already exists in Kit, skipped.`);
    continue;
  }
  try {
    const e = readExplainer(slug);
    const { subject, preview, html } = renderEmail(e, emailCoverPath(slug));
    const data = await kit("POST", "/broadcasts", {
      subject,
      preview_text: preview,
      description: marker,
      content: html,
      public: false,
      published_at: new Date().toISOString(),
      send_at: null, // null = draft. Never schedule from here.
    });
    console.log(`+ ${slug}: draft created in Kit (broadcast ${data.broadcast?.id}, status ${data.broadcast?.status}).`);
  } catch (err) {
    failed = true;
    console.error(`! ${slug}: ${err.message}`);
  }
}

process.exit(failed ? 1 : 0);

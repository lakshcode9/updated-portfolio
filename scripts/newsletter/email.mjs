// Renders the "new explainer" newsletter email from content/explainers/<slug>.md.
//
// Deliverability rules this follows on purpose:
// - Mostly text. Two small images (avatar ~30 KB, cover thumbnail ~25 KB),
//   both on our own domain, with width/height and alt text, so the email
//   still reads fine with images blocked.
// - One main link (the explainer), plain wording, no link shorteners.
// - Table layout and inline styles: email clients ignore <style> and flexbox.
// Kit wraps this body in its template and adds the unsubscribe footer.
//
// Usage: node scripts/newsletter/email.mjs <slug> [--out file.html]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lakshpujary.tech").replace(/\/$/, "");

const C = { paper: "#F4F1E9", deep: "#EBE7DC", ink: "#17191E", signal: "#FF5A3D", muted: "#555B64", line: "#DEDAD0" };
const FONT_DISPLAY = "'Space Grotesk', 'Helvetica Neue', Arial, sans-serif";
const FONT_BODY = "Inter, 'Helvetica Neue', Arial, sans-serif";
const FONT_MONO = "'IBM Plex Mono', 'Courier New', monospace";

const esc = (s = "") =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

/** Headline with the *marked* word underlined in Signal Orange (border-bottom works in every client). */
const headline = (text) => esc(text).replace(/\*([^*]+)\*/g, `<span style="border-bottom:4px solid ${C.signal};">$1</span>`);

/** Small JPEG of the cover for email (the original PNG is 1080x1920 and too heavy). */
export async function ensureEmailCover(slug) {
  const src = path.join(ROOT, "public", "explainers", slug, "cover.png");
  const outDir = path.join(ROOT, "public", "email", "covers");
  const out = path.join(outDir, `${slug}.jpg`);
  if (!fs.existsSync(out)) {
    fs.mkdirSync(outDir, { recursive: true });
    await sharp(src).resize(240, 427, { fit: "cover" }).jpeg({ quality: 78, mozjpeg: true }).toFile(out);
  }
  return `/email/covers/${slug}.jpg`;
}

export function readExplainer(slug) {
  const file = path.join(ROOT, "content", "explainers", `${slug}.md`);
  const { data } = matter(fs.readFileSync(file, "utf8"));
  return { slug, ...data };
}

export function renderEmail(e, coverPath) {
  const url = `${SITE}/explainers/${e.slug}?utm_source=newsletter&utm_medium=email`;
  const summary = e.summary ?? e.description;
  const sources = (e.sources ?? []).length;
  const watch = e.youtube ? `https://www.youtube.com/shorts/${e.youtube}` : (e.instagram ?? null);

  const subject = e.title;
  const preview = e.description;

  const html = `<!-- Laksh | AI Explained: new explainer email -->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${C.paper};">

  <tr><td style="padding:0 4px 16px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="bottom" style="font-family:${FONT_MONO};font-size:12px;letter-spacing:2px;color:${C.muted};text-transform:uppercase;">
        <span style="display:inline-block;width:8px;height:8px;background:${C.signal};margin-right:8px;"></span>New explainer · ${esc(e.kicker ?? "")}
      </td>
      <td align="right" valign="bottom" width="72">
        <img src="${SITE}/email/avatar-wave.png" width="64" height="64" alt="Laksh's pixel-art avatar waving" style="display:block;border:0;width:64px;height:64px;">
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 4px;">
    <h1 style="margin:0 0 14px 0;font-family:${FONT_DISPLAY};font-size:30px;line-height:1.15;font-weight:700;color:${C.ink};letter-spacing:-0.5px;">${headline(e.headline ?? e.title)}</h1>
    <p style="margin:0 0 20px 0;font-family:${FONT_BODY};font-size:16px;line-height:1.6;color:${C.ink};">Hey, it's Laksh. New one's up. Here's the short version:</p>
  </td></tr>

  <tr><td style="padding:0 4px 22px 4px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.deep};border:1px solid ${C.line};border-radius:8px;">
      <tr>
        <td valign="top" width="96" style="padding:16px 0 16px 16px;">
          <a href="${url}" style="text-decoration:none;"><img src="${SITE}${coverPath}" width="80" height="142" alt="${esc(e.coverAlt ?? e.title)}" style="display:block;border:0;width:80px;height:142px;border-radius:4px;"></a>
        </td>
        <td valign="top" style="padding:16px;">
          <p style="margin:0 0 6px 0;font-family:${FONT_MONO};font-size:11px;letter-spacing:2px;color:${C.muted};text-transform:uppercase;">In short</p>
          <p style="margin:0;font-family:${FONT_BODY};font-size:15px;line-height:1.6;color:${C.ink};">${esc(summary)}</p>
        </td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:0 4px 8px 4px;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td style="background:${C.ink};border-radius:6px;">
        <a href="${url}" style="display:inline-block;padding:14px 22px;font-family:${FONT_BODY};font-size:16px;font-weight:600;color:${C.paper};text-decoration:none;">Read it and watch the reel</a>
      </td>
    </tr></table>
  </td></tr>

  <tr><td style="padding:0 4px 24px 4px;">
    <p style="margin:8px 0 0 0;font-family:${FONT_BODY};font-size:14px;line-height:1.6;color:${C.muted};">
      ${sources ? `The page links all ${sources} source${sources === 1 ? "" : "s"}, so you can check every claim.` : ""}${watch ? ` Prefer the video? <a href="${watch}" style="color:${C.ink};">Watch it here</a>.` : ""}
    </p>
  </td></tr>

  <tr><td style="padding:16px 4px 0 4px;border-top:1px solid ${C.line};">
    <p style="margin:0;font-family:${FONT_BODY};font-size:14px;line-height:1.6;color:${C.ink};">Spotted a mistake or want a topic covered? Just reply to this email.</p>
    <p style="margin:10px 0 0 0;font-family:${FONT_DISPLAY};font-size:15px;font-weight:700;color:${C.ink};">Laksh <span style="font-family:${FONT_MONO};font-size:11px;font-weight:400;letter-spacing:2px;color:${C.muted};text-transform:uppercase;">· AI, made visible.</span></p>
  </td></tr>

</table>
</td></tr>
</table>`;

  return { subject, preview, html };
}

// CLI: write a standalone preview file.
const isCli = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isCli) {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: node scripts/newsletter/email.mjs <slug> [--out file.html]");
    process.exit(1);
  }
  const outIdx = process.argv.indexOf("--out");
  const out = outIdx > -1 ? process.argv[outIdx + 1] : path.join(ROOT, `newsletter-preview-${slug}.html`);
  const e = readExplainer(slug);
  const cover = await ensureEmailCover(slug);
  const { subject, preview, html } = renderEmail(e, cover);
  fs.writeFileSync(
    out,
    `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(subject)}</title></head><body style="margin:0;background:${C.paper};">
<div style="font:12px monospace;padding:8px 12px;background:#ddd;color:#333;">Subject: ${esc(subject)}<br>Preview text: ${esc(preview)}</div>
${html}
<div style="font:12px monospace;padding:8px 12px;color:#777;text-align:center;">(Kit adds the unsubscribe link and mailing address here.)</div>
</body></html>`,
  );
  console.log(`Preview: ${out}`);
}

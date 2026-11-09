import { site } from "@/lib/site";

export const dynamic = "force-static";

// All crawlers allowed, including AI search and AI training bots (Laksh's
// choice, 9 Nov 2026). Content-Signal is a draft proposal (contentsignals.org);
// Next's MetadataRoute.Robots can't emit it, so robots.txt is served here.
export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

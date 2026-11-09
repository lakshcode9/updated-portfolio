import { getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getExplainers()
    .map((e) => {
      const url = `${site.url}/explainers/${e.slug}`;
      return `
    <item>
      <title>${esc(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${e.date}T09:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(e.pillarLabel)}</category>
      <description>${esc(e.description)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en-gb</language>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

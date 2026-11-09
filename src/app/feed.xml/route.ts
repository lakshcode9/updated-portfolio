import { getExplainer, getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

/**
 * RSS 2.0 feed with full content, so feed readers show the whole explainer and
 * email tools (e.g. a Kit RSS automation) can turn a new item into an email.
 */
export async function GET() {
  const list = getExplainers();
  const full = await Promise.all(list.map((e) => getExplainer(e.slug)));

  const items = full
    .filter((e) => e !== null)
    .map((e) => {
      const url = `${site.url}/explainers/${e.slug}`;
      const cover = `${site.url}${e.cover}`;
      const html = [
        `<p><img src="${cover}" alt="${esc(e.coverAlt)}" width="270" /></p>`,
        e.summary ? `<p><strong>In short:</strong> ${esc(e.summary)}</p>` : "",
        e.instagram ? `<p><a href="${e.instagram}">Watch the reel on Instagram</a></p>` : "",
        e.html,
        `<h2>Sources</h2><ol>${e.sources.map((s) => `<li><a href="${s.url}">${esc(s.title)}</a> (${esc(s.publisher)})</li>`).join("")}</ol>`,
        `<p><a href="${url}">Read it on the site</a></p>`,
      ].join("\n");
      return `
    <item>
      <title>${esc(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${e.date}T09:00:00Z`).toUTCString()}</pubDate>
      <dc:creator>Laksh</dc:creator>
      <category>${esc(e.pillarLabel)}</category>
      <description>${esc(e.summary ?? e.description)}</description>
      <content:encoded>${cdata(html)}</content:encoded>
      <media:thumbnail url="${cover}"/>
    </item>`;
    })
    .join("");

  const lastBuild = list[0] ? new Date(`${list[0].updated}T09:00:00Z`).toUTCString() : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(site.title)}</title>
    <link>${site.url}</link>
    <description>${esc(site.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <image>
      <url>${site.url}/avatar/wave-hello.png</url>
      <title>${esc(site.title)}</title>
      <link>${site.url}</link>
    </image>
    <atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}

import type { Metadata } from "next";
import { languages } from "@/lib/hreflang";
import { SiteFooterJa } from "@/components/SiteFooterJa";
import { SiteHeaderJa } from "@/components/SiteHeaderJa";
import { fontVariablesJa } from "@/lib/fonts";
import { site } from "@/lib/site";
import { translations } from "@/lib/i18n";

const t = translations.ja;

export const metadata: Metadata = {
  title: { default: `${site.title}: ${t.tagline}`, template: `%s · ${site.title}` },
  description: t.description,
  alternates: { canonical: "/jp", languages: languages("/", "/jp") },
  openGraph: { locale: "ja_JP" },
};

// Who runs the site, for search engines and AI answer engines (entity clarity).
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/jp#website`,
      url: `${site.url}/jp`,
      name: site.title,
      description: t.description,
      inLanguage: "ja",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Laksh",
      url: `${site.url}/about`,
      image: `${site.url}/avatar/wave-hello.png`,
      description: "AIの仕組みを短く、出典付きで解説する Laksh | AI Explained の制作者。",
      knowsAbout: ["Artificial intelligence", "Large language models", "AI agents", "Machine learning"],
      sameAs: site.links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
    },
  ],
};

export default function JapaneseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={fontVariablesJa}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          {t.skipToContent}
        </a>
        <SiteHeaderJa />
        <main id="main">{children}</main>
        <SiteFooterJa />
      </body>
    </html>
  );
}

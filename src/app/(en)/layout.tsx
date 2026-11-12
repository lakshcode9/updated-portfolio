import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/lib/site";

// Who runs the site, for search engines and AI answer engines (entity clarity).
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.title,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: "Laksh",
      url: `${site.url}/about`,
      image: `${site.url}/avatar/wave-hello.png`,
      description: "Makes short, sourced explainers on how AI works, as Laksh | AI Explained.",
      knowsAbout: ["Artificial intelligence", "Large language models", "AI agents", "Machine learning"],
      sameAs: site.links.filter((l) => l.href.startsWith("http")).map((l) => l.href),
    },
  ],
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

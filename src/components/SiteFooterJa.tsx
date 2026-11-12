import Link from "next/link";
import { site } from "@/lib/site";
import { translations } from "@/lib/i18n";

const t = translations.ja;

const siteLinks = [
  ["/jp/explainers", t.explainers],
  ["/jp/about", t.about],
  ["/feed.xml", t.rss],
] as const;

export function SiteFooterJa() {
  return (
    <footer className="mt-16 border-t border-line sm:mt-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-10 sm:px-6 sm:py-12">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-2xl font-bold tracking-tight">
            AIを、<span className="mark">目に見えるかたちで</span>。
          </p>
          <p className="mt-2 max-w-xs text-[0.9375rem] text-muted">{t.description}</p>
        </div>
        <nav aria-label="Site">
          <p className="kicker text-muted">{t.site}</p>
          <ul className="mt-2">
            {siteLinks.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center hover:text-signal">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center hover:text-signal">
                English version
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Elsewhere">
          <p className="kicker text-muted">{t.elsewhere}</p>
          <ul className="mt-2">
            {site.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center hover:text-signal" rel="me">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 font-mono text-xs tracking-wider text-muted uppercase sm:px-6 sm:pb-10">
        © {new Date().getFullYear()} Laksh · {t.copyright}
      </div>
    </footer>
  );
}

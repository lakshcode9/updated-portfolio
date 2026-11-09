import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr] sm:px-6">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            AI, made <span className="mark">visible</span>.
          </p>
          <p className="mt-3 max-w-xs text-[0.9375rem] text-muted">{site.description}</p>
        </div>
        <div>
          <p className="kicker text-muted">Site</p>
          <ul className="mt-3 space-y-1">
            {[
              ["/explainers", "Explainers"],
              ["/about", "About"],
              ["/newsletter", "Newsletter"],
              ["/feed.xml", "RSS"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-11 items-center hover:text-signal">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker text-muted">Elsewhere</p>
          <ul className="mt-3 space-y-1">
            {site.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center hover:text-signal" rel="me">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-10 font-mono text-xs tracking-wider text-muted uppercase sm:px-6">
        © {new Date().getFullYear()} Laksh · Every claim sourced
      </div>
    </footer>
  );
}

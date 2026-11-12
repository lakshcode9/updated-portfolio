import Link from "next/link";
import { LangSwitch } from "@/components/LangSwitch";
import { translations } from "@/lib/i18n";

const t = translations.ja;

const nav = [
  { href: "/jp/explainers", label: t.explainers },
  { href: "/jp/about", label: t.about },
];

export function SiteHeaderJa() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link href="/jp" className="flex items-baseline gap-2 py-2" aria-label={`Laksh, AI Explained, ${t.home}`}>
          <span className="font-display text-lg font-bold tracking-tight">Laksh</span>
          <span className="hidden font-mono text-[0.6875rem] tracking-[0.14em] whitespace-nowrap text-muted uppercase sm:inline">
            AI Explained
          </span>
        </Link>
        <nav aria-label="Main">
          <ul className="-mr-2 flex items-center sm:mr-0 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-2 text-[0.9375rem] font-medium transition-colors hover:text-signal max-[359px]:px-1 max-[359px]:text-sm sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <LangSwitch
                to="en"
                jaSlugs={[]}
                className="inline-flex min-h-11 items-center px-2 font-mono text-xs text-muted transition-colors hover:text-signal max-[359px]:px-1 sm:px-3"
                title="English version"
                label="EN"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

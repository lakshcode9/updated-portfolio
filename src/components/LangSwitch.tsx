"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * EN <-> 日本語 switch that lands on the matching page in the other language.
 * An English explainer only maps to /jp/explainers/<slug> when a Japanese version exists (jaSlugs);
 * pages with no Japanese counterpart (radar, newsletter) go to the other language's home.
 */
export function LangSwitch({
  to,
  jaSlugs,
  className,
  title,
  label,
}: {
  to: "ja" | "en";
  jaSlugs: string[];
  className?: string;
  title: string;
  label: string;
}) {
  const path = usePathname() || "/";
  let href = to === "ja" ? "/jp" : "/";
  if (to === "ja") {
    const m = path.match(/^\/explainers\/([a-z0-9-]+)\/?$/);
    if (/^\/(explainers|about)\/?$/.test(path)) href = `/jp${path.replace(/\/$/, "")}`;
    else if (m && jaSlugs.includes(m[1])) href = `/jp/explainers/${m[1]}`;
  } else {
    const rest = path.replace(/^\/jp/, "");
    href = rest === "" ? "/" : rest;
  }
  return (
    <Link href={href} className={className} title={title} hrefLang={to}>
      {label}
    </Link>
  );
}

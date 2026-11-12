import type { Metadata } from "next";
import { languages } from "@/lib/hreflang";
import { ExplainerCard } from "@/components/ExplainerCard";
import { getExplainersForLocale } from "@/lib/explainers-i18n";
import { translations, pillarTranslations } from "@/lib/i18n";
import type { PillarKey } from "@/lib/site";

const t = translations.ja;
const pillarsJa = pillarTranslations.ja;

export const metadata: Metadata = {
  title: t.explainers,
  description: t.explainersDesc,
  alternates: { canonical: "/jp/explainers", languages: languages("/explainers", "/jp/explainers") },
};

export default function ExplainersPageJa() {
  const all = getExplainersForLocale("ja");
  // Group by pillar only once there are enough to make it useful.
  const grouped = all.length >= 12;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <p className="kicker text-muted">{t.archive}</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
        すべての<span className="mark">解説</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">{t.explainersDesc}</p>

      {all.length === 0 ? (
        <div className="mt-14 rounded-lg border border-line bg-paper-deep/60 p-8 text-center">
          <p className="text-muted">日本語の解説はまだありません。近日公開予定です。</p>
        </div>
      ) : grouped ? (
        (Object.keys(pillarsJa) as PillarKey[]).map((key) => {
          const items = all.filter((e) => e.pillar === key);
          if (!items.length) return null;
          return (
            <section key={key} className="mt-14" aria-labelledby={`p-${key}`}>
              <h2 id={`p-${key}`} className="kicker text-muted">
                {pillarsJa[key]}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {items.map((e) => (
                  <ExplainerCard key={e.slug} e={e} basePath="/jp/explainers" />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {all.map((e, i) => (
            <ExplainerCard key={e.slug} e={e} priority={i < 2} basePath="/jp/explainers" />
          ))}
        </div>
      )}
    </div>
  );
}

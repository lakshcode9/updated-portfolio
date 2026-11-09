import type { Metadata } from "next";
import { ExplainerCard } from "@/components/ExplainerCard";
import { getExplainers } from "@/lib/explainers";
import { pillars, type PillarKey } from "@/lib/site";

export const metadata: Metadata = {
  title: "Explainers",
  description: "Every AI explainer: short videos with a written version and the sources behind each claim.",
  alternates: { canonical: "/explainers" },
};

export default function ExplainersPage() {
  const all = getExplainers();
  // Group by pillar only once there are enough to make it useful.
  const grouped = all.length >= 12;

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <p className="kicker text-muted">Archive</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-6xl">
        All <span className="mark">explainers</span>
      </h1>
      <p className="mt-4 max-w-xl text-lg text-ink/80">
        Each one is a short video, a written version you can skim, and the sources for every claim.
      </p>

      {grouped ? (
        (Object.keys(pillars) as PillarKey[]).map((key) => {
          const items = all.filter((e) => e.pillar === key);
          if (!items.length) return null;
          return (
            <section key={key} className="mt-14" aria-labelledby={`p-${key}`}>
              <h2 id={`p-${key}`} className="kicker text-muted">
                {pillars[key]}
              </h2>
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
                {items.map((e) => (
                  <ExplainerCard key={e.slug} e={e} />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {all.map((e, i) => (
            <ExplainerCard key={e.slug} e={e} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}

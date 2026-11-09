import type { Metadata } from "next";
import Link from "next/link";
import { buildRadar, type RadarTopic } from "@/lib/radar";

// Rebuilt on Vercel at most every 6 hours (incremental static regeneration).
export const revalidate = 21600;

export const metadata: Metadata = {
  title: "Radar",
  description:
    "What's moving in AI right now: headlines from public feeds, ranked by attention. Unchecked; the explainers are where things get verified.",
  alternates: { canonical: "/radar" },
  // An automatic headline list is thin content: keep it out of search results.
  robots: { index: false, follow: true },
};

const ago = (h: number) => (h < 1 ? "just now" : h < 48 ? `${Math.round(h)} h ago` : `${Math.round(h / 24)} d ago`);

const asOf = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  });

function Meta({ t, rank }: { t: RadarTopic; rank: number }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
      <span className="font-medium text-ink">{String(rank).padStart(2, "0")}</span>
      <span>{ago(t.lead.ageH)}</span>
      {t.pillars[0] && <span>{t.pillars[0]}</span>}
      {[...(t.sources.length > 1 ? [`${t.sources.length} sources`] : []), ...t.lead.signals].slice(0, 2).map((s) => (
        <span key={s}>{s}</span>
      ))}
    </p>
  );
}

/** Source line under a headline: who published it, plus the HN thread if any. */
function SourceLine({ t }: { t: RadarTopic }) {
  return (
    <p className="mt-1 font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
      {t.lead.sourceName}
      {t.lead.discussion && t.lead.discussion !== t.lead.url && (
        <>
          {" · "}
          <a href={t.lead.discussion} rel="noopener noreferrer nofollow" className="underline underline-offset-4 hover:text-signal">
            discussion
          </a>
        </>
      )}
      {t.items.length > 1 && (
        <>
          {" "}
          · +{t.items.length - 1} related {t.items.length === 2 ? "story" : "stories"}
        </>
      )}
    </p>
  );
}

/** Other coverage of the same story (the lead is already the headline). */
function AlsoCovered({ t, max }: { t: RadarTopic; max: number }) {
  const others = t.items.slice(1, max + 1);
  if (!others.length) return null;
  return (
    <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
      {others.map((it) => (
        <li key={it.url} className="flex gap-2 text-sm leading-snug">
          <span className="w-24 shrink-0 truncate pt-px font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
            {it.sourceName}
          </span>
          <span className="min-w-0">
            <a
              href={it.url}
              rel="noopener noreferrer nofollow"
              className="underline decoration-ink/20 underline-offset-4 hover:decoration-signal"
            >
              {it.title}
            </a>
            {it.discussion && it.discussion !== it.url && (
              <>
                {" "}
                <a href={it.discussion} rel="noopener noreferrer nofollow" className="whitespace-nowrap text-muted hover:text-signal">
                  · discussion
                </a>
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function RadarPage() {
  const radar = await buildRadar();
  const picks = radar.topics.slice(0, 3);
  const rest = radar.topics.slice(3);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-8 sm:px-6 sm:pt-16">
      <p className="kicker text-muted">Radar</p>
      <h1 className="mt-3 font-display text-[2.4rem] leading-[1.05] font-bold tracking-tight sm:text-6xl">
        What&apos;s moving in <span className="mark">AI</span>
      </h1>
      <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink/80 sm:text-lg">
        Headlines from {radar.sourcesTotal} public feeds, grouped by story and ranked by attention. This is what I&apos;m
        watching for the next explainer.
      </p>
      <p className="mt-4 rounded border border-dashed border-slate px-3 py-2 font-mono text-xs leading-relaxed text-muted">
        Collected automatically and not checked by me yet. Each link goes to the original source. Verified, sourced
        versions live in{" "}
        <Link href="/explainers" className="underline underline-offset-4 hover:text-signal">
          Explainers
        </Link>
        .
      </p>
      <p className="mt-3 font-mono text-[0.6875rem] tracking-wider text-muted uppercase">
        As of {asOf(radar.generatedAt)} · {radar.storyCount} stories · last {radar.days} days · {radar.sourcesOk}/
        {radar.sourcesTotal} sources
      </p>

      {radar.topics.length === 0 ? (
        <p className="mt-10 text-muted">The feeds didn&apos;t answer this time. Check back in a few hours.</p>
      ) : (
        <>
          <section aria-labelledby="picks" className="mt-10">
            <h2 id="picks" className="font-display text-2xl font-bold tracking-tight">
              Top stories
            </h2>
            <ol className="mt-4 space-y-3">
              {picks.map((t, i) => (
                <li key={t.lead.url} className="rounded-lg border border-line bg-paper-deep/60 p-4 sm:p-5">
                  <Meta t={t} rank={i + 1} />
                  <h3 className="mt-2 font-display text-lg leading-snug font-semibold sm:text-xl">
                    <a href={t.lead.url} rel="noopener noreferrer nofollow" className="hover:text-signal">
                      {t.lead.title}
                    </a>
                  </h3>
                  <SourceLine t={t} />
                  <AlsoCovered t={t} max={4} />
                </li>
              ))}
            </ol>
          </section>

          {rest.length > 0 && (
            <section aria-labelledby="rest" className="mt-12">
              <h2 id="rest" className="font-display text-2xl font-bold tracking-tight">
                Also moving
              </h2>
              <ol className="mt-4 divide-y divide-line border-y border-line">
                {rest.map((t, i) => (
                  <li key={t.lead.url} className="py-4">
                    <Meta t={t} rank={i + 4} />
                    <h3 className="mt-1.5 font-display text-base leading-snug font-semibold sm:text-lg">
                      <a href={t.lead.url} rel="noopener noreferrer nofollow" className="hover:text-signal">
                        {t.lead.title}
                      </a>
                    </h3>
                    <SourceLine t={t} />
                  </li>
                ))}
              </ol>
            </section>
          )}
        </>
      )}
    </div>
  );
}

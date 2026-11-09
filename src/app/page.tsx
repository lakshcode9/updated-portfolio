import Image from "next/image";
import Link from "next/link";
import { CardRail } from "@/components/CardRail";
import { ExplainerCard } from "@/components/ExplainerCard";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

export default function Home() {
  const explainers = getExplainers();
  const latest = explainers.slice(0, 8);

  return (
    <>
      {/* Hero. On phones the buttons and the avatar share the last row, so the
          first explainers show up within one screen. The avatar sits on the
          bottom edge, cropped at the chest, as in the reels. */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pt-8 sm:grid sm:grid-cols-[1.3fr_1fr] sm:gap-x-2 sm:px-6 sm:pt-16">
          <div className="rise sm:col-start-1 sm:row-start-1 sm:self-end">
            <p className="kicker text-muted">Laksh | AI Explained</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[1.02] font-bold tracking-[-0.03em] sm:mt-4 sm:text-7xl">
              AI, made <span className="mark">visible</span>.
            </h1>
            <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-ink/80 sm:mt-5 sm:text-xl">
              Short explainers on how AI actually works. One concept at a time, in plain words, with every claim
              sourced.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-3 sm:contents">
            <div className="flex flex-col gap-2 pb-6 sm:col-start-1 sm:row-start-2 sm:mt-7 sm:flex-row sm:gap-3 sm:self-start sm:pb-16">
              <Link
                href="/explainers"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-ink px-5 font-medium text-paper transition hover:bg-ink/85"
              >
                Start watching
              </Link>
              <Link
                href="#newsletter"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-ink/25 px-5 font-medium transition hover:border-ink"
              >
                Get them by email
              </Link>
            </div>
            <div className="-mb-px flex justify-end sm:col-start-2 sm:row-span-2 sm:row-start-1 sm:self-end">
              <Image
                src="/avatar/wave-hello.png"
                alt="Laksh's pixel-art avatar waving hello"
                width={420}
                height={420}
                priority
                sizes="(min-width: 640px) 420px, 160px"
                className="rise w-40 [animation-delay:120ms] sm:w-full sm:max-w-[420px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-20" aria-labelledby="latest">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-muted">New</p>
            <h2 id="latest" className="mt-2 font-display text-[1.75rem] font-bold tracking-tight sm:text-4xl">
              Latest explainers
            </h2>
          </div>
          <Link href="/explainers" className="inline-flex min-h-11 items-center font-medium hover:text-signal">
            All {explainers.length} →
          </Link>
        </div>
        <div className="mt-5 sm:mt-8">
          <CardRail label="Latest explainers">
            {latest.map((e, i) => (
              <ExplainerCard key={e.slug} e={e} priority={i < 2} />
            ))}
          </CardRail>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20" aria-labelledby="how">
        <p className="kicker text-muted">How these are made</p>
        <h2 id="how" className="mt-2 max-w-2xl font-display text-[1.75rem] font-bold tracking-tight sm:text-4xl">
          Accurate first, <span className="mark">pretty</span> second.
        </h2>
        <ol className="mt-6 grid gap-px overflow-hidden rounded-lg bg-line sm:mt-8 sm:grid-cols-3">
          {[
            ["01", "One concept", "Each video explains exactly one idea, in about 40 seconds."],
            ["02", "Every claim sourced", "Each page lists every source, so you can check the work."],
            ["03", "Illustrations are labelled", "When an animation simplifies what really happens, the video says so."],
          ].map(([n, t, d]) => (
            <li key={n} className="grid grid-cols-[2.25rem_1fr] bg-paper p-4 sm:block sm:p-6">
              <p className="pt-1 font-mono text-sm font-medium text-ink sm:pt-0">
                <span className="mr-2 hidden size-2 bg-signal align-middle sm:inline-block" aria-hidden />
                {n}
              </p>
              <div>
                <p className="font-display text-lg font-semibold sm:mt-3 sm:text-xl">{t}</p>
                <p className="mt-1 text-[0.9375rem] text-muted sm:mt-2 sm:text-base">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
        <NewsletterBlock id="newsletter" />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20" aria-labelledby="elsewhere">
        <h2 id="elsewhere" className="kicker text-muted">
          Elsewhere
        </h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {site.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                rel="me"
                className="group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-signal"
              >
                <span className="font-display text-lg font-semibold sm:text-xl">{l.label}</span>
                <span className="truncate font-mono text-[0.8125rem] text-muted group-hover:text-signal sm:text-sm">
                  {l.handle} ↗
                </span>
              </a>
            </li>
          ))}
          <li className="flex min-h-14 items-center justify-between gap-4 py-3 text-muted">
            <span className="font-display text-lg font-semibold sm:text-xl">YouTube</span>
            <span className="font-mono text-[0.8125rem] sm:text-sm">coming soon</span>
          </li>
        </ul>
      </section>
    </>
  );
}

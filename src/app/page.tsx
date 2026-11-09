import Image from "next/image";
import Link from "next/link";
import { ExplainerCard } from "@/components/ExplainerCard";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

export default function Home() {
  const explainers = getExplainers();
  const latest = explainers.slice(0, 8);

  return (
    <>
      {/* Hero: the avatar sits on the bottom edge, cropped at the chest, as in the reels. */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-end gap-2 px-4 pt-10 sm:grid-cols-[1.3fr_1fr] sm:px-6 sm:pt-16">
          <div className="rise pb-2 sm:pb-16">
            <p className="kicker text-muted">Laksh | AI Explained</p>
            <h1 className="mt-4 font-display text-[2.75rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-7xl">
              AI, made <span className="mark">visible</span>.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80 sm:text-xl">
              I make short explainers on how AI actually works. One concept at a time, in plain words,
              with every claim sourced.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/explainers"
                className="inline-flex min-h-12 items-center rounded-md bg-ink px-5 font-medium text-paper transition hover:bg-ink/85"
              >
                Start watching
              </Link>
              <Link
                href="#newsletter"
                className="inline-flex min-h-12 items-center rounded-md border border-ink/25 px-5 font-medium transition hover:border-ink"
              >
                Get new ones by email
              </Link>
            </div>
          </div>
          <div className="relative -mb-px flex justify-end">
            <Image
              src="/avatar/wave-hello.png"
              alt="Laksh's pixel-art avatar waving hello"
              width={420}
              height={420}
              priority
              sizes="(min-width: 640px) 420px, 70vw"
              className="rise w-[70%] max-w-[420px] [animation-delay:120ms] sm:w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20" aria-labelledby="latest">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="kicker text-muted">New</p>
            <h2 id="latest" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Latest explainers
            </h2>
          </div>
          <Link href="/explainers" className="inline-flex min-h-11 items-center font-medium hover:text-signal">
            All {explainers.length} →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
          {latest.map((e, i) => (
            <ExplainerCard key={e.slug} e={e} priority={i < 2} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6" aria-labelledby="how">
        <p className="kicker text-muted">How these are made</p>
        <h2 id="how" className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Accurate first, <span className="mark">pretty</span> second.
        </h2>
        <ol className="mt-8 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-3">
          {[
            ["01", "One concept", "Each video explains exactly one idea, in about 40 seconds."],
            ["02", "Every claim sourced", "Each page lists every source, so you can check the work."],
            [
              "03",
              "Illustrations are labelled",
              "When an animation simplifies what really happens, the video says so.",
            ],
          ].map(([n, t, d]) => (
            <li key={n} className="bg-paper p-5 sm:p-6">
              <p className="font-mono text-sm font-medium text-ink">
                <span className="mr-2 inline-block size-2 bg-signal align-middle" aria-hidden />
                {n}
              </p>
              <p className="mt-3 font-display text-xl font-semibold">{t}</p>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <NewsletterBlock id="newsletter" />
      </div>

      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6" aria-labelledby="elsewhere">
        <p className="kicker text-muted">Elsewhere</p>
        <h2 id="elsewhere" className="sr-only">
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
                <span className="font-display text-xl font-semibold">{l.label}</span>
                <span className="truncate font-mono text-sm text-muted group-hover:text-signal">
                  {l.handle} ↗
                </span>
              </a>
            </li>
          ))}
          <li className="flex min-h-14 items-center justify-between gap-4 py-3 text-muted">
            <span className="font-display text-xl font-semibold">YouTube</span>
            <span className="font-mono text-sm">coming soon</span>
          </li>
        </ul>
      </section>
    </>
  );
}

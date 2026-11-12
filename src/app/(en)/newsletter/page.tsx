import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { NewsletterForm } from "@/components/NewsletterForm";
import { getExplainers } from "@/lib/explainers";

export const metadata: Metadata = {
  title: "Newsletter",
  description: "One email when a new AI explainer is out: the video, the written version and the sources.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  const recent = getExplainers().slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-end gap-6 border-b border-line sm:grid-cols-[1.4fr_1fr]">
        <div className="pb-10 sm:pb-16">
          <p className="kicker text-muted">Newsletter</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            AI, explained in your <span className="mark">inbox</span>.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink/80">
            One email when a new explainer is out: the video, a short written version and the sources. That&apos;s it.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
          <p className="mt-2 text-sm text-muted">
            Prefer a feed reader?{" "}
            <a href="/feed.xml" className="underline underline-offset-4 hover:text-signal">
              Subscribe via RSS
            </a>
            .
          </p>
        </div>
        <Image
          src="/avatar/thumbs-up.png"
          alt="Laksh's pixel-art avatar giving a thumbs up"
          width={360}
          height={360}
          priority
          sizes="(min-width: 640px) 360px, 60vw"
          className="-mb-px ml-auto w-[60%] max-w-[360px] sm:w-full"
        />
      </div>

      {recent.length > 0 && (
        <section className="mt-12" aria-labelledby="recent">
          <h2 id="recent" className="kicker text-muted">
            Recently explained
          </h2>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {recent.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/explainers/${e.slug}`}
                  className="flex min-h-14 items-center justify-between gap-4 py-3 hover:text-signal"
                >
                  <span className="font-display text-lg font-semibold">{e.title}</span>
                  <span className="hidden shrink-0 font-mono text-xs text-muted sm:inline">{e.kicker}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

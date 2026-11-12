import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardRail } from "@/components/CardRail";
import { ExplainerCard } from "@/components/ExplainerCard";
import { getExplainers } from "@/lib/explainers";

// Kit redirects here after someone clicks the confirmation link.
export const metadata: Metadata = {
  title: "You're in",
  description: "Subscription confirmed.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/newsletter/confirmed" },
};

export default function ConfirmedPage() {
  const latest = getExplainers().slice(0, 4);
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-end gap-6 border-b border-line sm:grid-cols-[1.4fr_1fr]">
        <div className="pb-8 sm:pb-14">
          <p className="kicker text-muted">Newsletter</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            You&apos;re <span className="mark">in</span>.
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink/80">
            Thanks for confirming. You&apos;ll get one email when a new explainer is out. If it lands in spam or
            promotions, move it to your inbox so the next one finds you.
          </p>
        </div>
        <Image
          src="/avatar/thumbs-up.png"
          alt="Laksh's pixel-art avatar giving a thumbs up"
          width={320}
          height={320}
          priority
          sizes="(min-width: 640px) 320px, 50vw"
          className="-mb-px ml-auto w-[50%] max-w-[320px] sm:w-full"
        />
      </div>
      {latest.length > 0 && (
        <section className="mt-10" aria-labelledby="start">
          <div className="flex items-end justify-between gap-4">
            <h2 id="start" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Start here
            </h2>
            <Link href="/explainers" className="inline-flex min-h-11 items-center font-medium hover:text-signal">
              All →
            </Link>
          </div>
          <div className="mt-5">
            <CardRail label="Latest explainers">
              {latest.map((e) => (
                <ExplainerCard key={e.slug} e={e} />
              ))}
            </CardRail>
          </div>
        </section>
      )}
    </div>
  );
}

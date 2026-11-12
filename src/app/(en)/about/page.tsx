import type { Metadata } from "next";
import { languages } from "@/lib/hreflang";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Who makes Laksh | AI Explained, how each explainer is made, and what's coming next.",
  alternates: { canonical: "/about", languages: languages("/about", "/jp/about") },
};

// TODO(Laksh): add a few lines of your own story under "Hi, I'm Laksh".
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-end gap-6 border-b border-line sm:grid-cols-[1.4fr_1fr]">
        <div className="pb-8 sm:pb-14">
          <p className="kicker text-muted">About</p>
          <h1 className="mt-3 font-display text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="mark">Laksh</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/80">
            I make short videos that explain how AI actually works, one concept at a time, without the hype and
            without the jargon.
          </p>
        </div>
        <Image
          src="/avatar/hand-on-chin.png"
          alt="Laksh's pixel-art avatar, thinking"
          width={360}
          height={360}
          sizes="(min-width: 640px) 360px, 60vw"
          className="-mb-px ml-auto w-[60%] max-w-[360px] sm:w-full"
        />
      </div>

      <div className="prose-explainer mt-12 max-w-2xl">
        <h2>What this is</h2>
        <p>
          <strong>Laksh | AI Explained</strong> is a series of short videos, each on a single AI concept: how
          tokenization works, why a long chat &ldquo;forgets&rdquo;, what an AI agent actually did. Every video has a
          page here with a written version and the sources behind each claim.
        </p>
        <h2>The rules I follow</h2>
        <ul>
          <li>
            <strong>One concept per video.</strong> If it needs two ideas, it becomes two videos.
          </li>
          <li>
            <strong>Accuracy over spectacle.</strong> Every claim is checked against a source, and the sources are
            listed on the page.
          </li>
          <li>
            <strong>Illustrations are labelled.</strong> When an animation simplifies what happens inside a model, it
            says so. It never pretends to show the real internals.
          </li>
          <li>
            <strong>Educational, never promotional.</strong>
          </li>
        </ul>
        <h2>Why the avatar?</h2>
        <p>
          The pixel-art character is my on-screen co-host. It keeps the focus on the idea, not on me. That will change a
          little when I start on YouTube, where I&apos;ll show up on camera for longer experiments.
        </p>
        <h2>Get in touch</h2>
        <p>
          Corrections, topic ideas and collaboration requests go to <a href={`mailto:${site.email}`}>{site.email}</a>.
          New explainers come out on <a href="https://www.instagram.com/laksh.explains/">Instagram</a> first, and land in the{" "}
          <Link href="/newsletter">newsletter</Link>.
        </p>
      </div>
    </div>
  );
}

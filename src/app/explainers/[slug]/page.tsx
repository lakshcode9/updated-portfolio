import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExplainerCard } from "@/components/ExplainerCard";
import { Headline, plain } from "@/components/Headline";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { ReelPlayer } from "@/components/ReelPlayer";
import { formatDate, getExplainer, getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getExplainers().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const e = await getExplainer((await params).slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.description,
    alternates: { canonical: `/explainers/${e.slug}` },
    openGraph: { type: "article", title: e.title, description: e.description, publishedTime: e.date },
  };
}

export default async function ExplainerPage({ params }: Props) {
  const { slug } = await params;
  const e = await getExplainer(slug);
  if (!e) notFound();

  const more = getExplainers()
    .filter((x) => x.slug !== e.slug)
    .slice(0, 4);
  const url = `${site.url}/explainers/${e.slug}`;
  const playable = Boolean(e.youtube || e.video);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    description: e.description,
    datePublished: e.date,
    url,
    image: `${site.url}${e.cover}`,
    author: { "@type": "Person", name: "Laksh", url: site.url },
    citation: e.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
    ...((e.youtube || e.video) && {
      video: {
        "@type": "VideoObject",
        name: e.title,
        description: e.description,
        thumbnailUrl: `${site.url}${e.cover}`,
        uploadDate: e.date,
        ...(e.duration && { duration: `PT${Math.round(e.duration)}S` }),
        ...(e.youtube
          ? { embedUrl: `https://www.youtube.com/embed/${e.youtube}` }
          : { contentUrl: e.video!.startsWith("http") ? e.video : `${site.url}${e.video}` }),
      },
    }),
  };

  return (
    <article className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <Link href="/explainers" className="inline-flex min-h-11 items-center font-mono text-sm text-muted hover:text-signal">
        ← All explainers
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[360px_1fr] lg:gap-16">
        {/* Header comes first on phones so the title sits above the video. */}
        <header className="lg:col-start-2 lg:row-start-1">
          <p className="kicker text-muted">{e.kicker}</p>
          <h1 className="mt-3 font-display text-[2.25rem] leading-[1.05] font-bold tracking-[-0.02em] sm:text-5xl">
            <Headline text={e.headline} />
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">{e.description}</p>
          <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs tracking-wider text-muted uppercase">
            <time dateTime={e.date}>{formatDate(e.date)}</time>
            <span>{e.readingMinutes} min read</span>
            <span>{e.pillarLabel}</span>
          </p>
        </header>

        {/* Without an embedded video the cover is only a picture, so keep it small on phones. */}
        <aside
          className={`mx-auto w-full lg:sticky lg:top-24 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-[360px] lg:self-start ${
            playable ? "max-w-[360px]" : "max-w-[240px]"
          }`}
        >
          <ReelPlayer e={e} />
          {playable && (e.instagram || e.youtube) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {e.instagram && (
                <a
                  href={e.instagram}
                  className="inline-flex min-h-11 items-center rounded-md border border-ink/20 px-3 text-sm font-medium hover:border-ink"
                >
                  Instagram ↗
                </a>
              )}
              {e.youtube && (
                <a
                  href={`https://www.youtube.com/shorts/${e.youtube}`}
                  className="inline-flex min-h-11 items-center rounded-md border border-ink/20 px-3 text-sm font-medium hover:border-ink"
                >
                  YouTube ↗
                </a>
              )}
            </div>
          )}
        </aside>

        <div className="min-w-0 lg:col-start-2">
          {e.resource && (
            <a
              href={e.resource.href}
              className="mb-8 flex min-h-14 max-w-2xl items-center justify-between gap-4 rounded-lg bg-signal px-5 py-3 font-medium text-ink transition hover:brightness-95"
            >
              <span>{e.resource.label}</span>
              <span className="shrink-0 font-mono text-sm">PDF ↓</span>
            </a>
          )}

          <div className="prose-explainer max-w-2xl" dangerouslySetInnerHTML={{ __html: e.html }} />

          {e.sources.length > 0 && (
            <section className="mt-14 max-w-2xl border-t border-line pt-8" aria-labelledby="sources">
              <h2 id="sources" className="kicker text-muted">
                Sources
              </h2>
              <ol className="mt-5 space-y-4">
                {e.sources.map((s, i) => (
                  <li key={s.url} className="grid grid-cols-[2rem_1fr] gap-2">
                    <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <a
                        href={s.url}
                        className="font-medium underline decoration-ink/25 underline-offset-4 hover:decoration-signal"
                      >
                        {s.title}
                      </a>
                      <p className="mt-0.5 font-mono text-xs text-muted">{s.publisher}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">
                Spotted a mistake?{" "}
                <a
                  className="underline underline-offset-4 hover:text-signal"
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Correction: ${plain(e.headline)}`)}`}
                >
                  Tell me
                </a>{" "}
                and I&apos;ll fix it.
              </p>
            </section>
          )}
        </div>
      </div>

      <div className="mt-20">
        <NewsletterBlock />
      </div>

      {more.length > 0 && (
        <section className="mt-20" aria-labelledby="more">
          <h2 id="more" className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Watch next
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 lg:gap-x-6">
            {more.map((x) => (
              <ExplainerCard key={x.slug} e={x} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

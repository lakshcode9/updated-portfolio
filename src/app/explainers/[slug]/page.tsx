import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardRail } from "@/components/CardRail";
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
    authors: [{ name: "Laksh", url: `${site.url}/about` }],
    openGraph: {
      type: "article",
      title: e.title,
      description: e.description,
      publishedTime: e.date,
      modifiedTime: e.updated,
      authors: [`${site.url}/about`],
      section: e.pillarLabel,
    },
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

  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: e.title,
    description: e.summary ?? e.description,
    datePublished: e.date,
    dateModified: e.updated,
    url,
    mainEntityOfPage: url,
    inLanguage: "en",
    image: [`${site.url}${e.cover}`, `${url}/opengraph-image`],
    articleSection: e.pillarLabel,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    isPartOf: { "@id": `${site.url}/#website` },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      article,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Explainers", item: `${site.url}/explainers` },
          { "@type": "ListItem", position: 3, name: e.title, item: url },
        ],
      },
    ],
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
            <span>
              By{" "}
              <Link href="/about" rel="author" className="underline decoration-ink/25 underline-offset-4 hover:text-signal">
                Laksh
              </Link>
            </span>
            <time dateTime={e.date}>{formatDate(e.date)}</time>
            {e.updated !== e.date && (
              <span>
                Updated <time dateTime={e.updated}>{formatDate(e.updated)}</time>
              </span>
            )}
            <span>{e.readingMinutes} min read</span>
            <span>{e.pillarLabel}</span>
          </p>

          {/* Phones, no embedded video: a compact link row instead of a full-height cover. */}
          {!playable && e.instagram && (
            <a
              href={e.instagram}
              className="mt-6 flex items-center gap-4 rounded-lg border border-line bg-paper-deep/60 p-3 transition hover:border-ink/30 lg:hidden"
            >
              <Image
                src={e.cover}
                alt=""
                width={56}
                height={100}
                sizes="56px"
                className="h-[100px] w-14 shrink-0 rounded object-cover ring-1 ring-line"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">Watch the reel</span>
                <span className="mt-0.5 block font-mono text-xs text-muted">
                  {e.duration ? `${Math.round(e.duration)} s · ` : ""}Instagram
                </span>
              </span>
              <span className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-signal px-4 text-sm font-medium text-ink">
                Watch ↗
              </span>
            </a>
          )}
        </header>

        {/* Without an embedded video the cover is only a picture, so keep it small on phones. */}
        <aside
          className={`mx-auto w-full max-w-[360px] lg:sticky lg:top-24 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start ${
            playable ? "" : "hidden lg:block"
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

          {e.summary && (
            <section aria-labelledby="in-short" className="mb-10 max-w-2xl rounded-lg border border-line bg-paper-deep/60 p-5 sm:p-6">
              <h2 id="in-short" className="kicker text-muted">
                In short
              </h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed">{e.summary}</p>
            </section>
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
                    <span className="font-mono text-sm font-medium text-ink">{String(i + 1).padStart(2, "0")}</span>
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
          <div className="mt-5 sm:mt-6">
            <CardRail label="Watch next">
              {more.map((x) => (
                <ExplainerCard key={x.slug} e={x} />
              ))}
            </CardRail>
          </div>
        </section>
      )}
    </article>
  );
}

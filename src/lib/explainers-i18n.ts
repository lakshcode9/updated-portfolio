import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { pillars, type PillarKey } from "./site";
import { type Locale, pillarTranslations } from "./i18n";

function getDir(locale: Locale): string {
  const folder = locale === "ja" ? "explainers-jp" : "explainers";
  return path.join(process.cwd(), "content", folder);
}

export type Source = { title: string; publisher: string; url: string };

export type Explainer = {
  slug: string;
  /** Plain title, used for SEO and lists. */
  title: string;
  /** Display headline. Wrap one word in *asterisks* to underline it in Signal Orange. */
  headline: string;
  kicker: string;
  description: string;
  /** 40-60 word self-contained answer shown at the top ("In short"). */
  summary?: string;
  date: string;
  /** Last meaningful update, YYYY-MM-DD. Defaults to `date`. */
  updated: string;
  pillar: PillarKey;
  pillarLabel: string;
  cover: string;
  coverAlt: string;
  /** Seconds. */
  duration?: number;
  /** Self-hosted or CDN MP4 URL. */
  video?: string;
  /** YouTube video ID (Shorts work too). Takes priority over `video`. */
  youtube?: string;
  instagram?: string;
  /** Optional downloadable resource, e.g. a checklist PDF. */
  resource?: { label: string; href: string };
  sources: Source[];
  readingMinutes: number;
};

export type ExplainerWithBody = Explainer & { html: string };

function parse(file: string, locale: Locale): { meta: Explainer; body: string } {
  const slug = file.replace(/\.md$/, "");
  const dir = getDir(locale);
  const raw = fs.readFileSync(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const pillar = data.pillar as PillarKey;
  if (!(pillar in pillars)) throw new Error(`${file}: unknown pillar "${data.pillar}"`);
  const words = content.split(/\s+/).filter(Boolean).length;
  const pillarLabels = pillarTranslations[locale];
  const meta: Explainer = {
    slug,
    title: data.title,
    headline: data.headline ?? data.title,
    kicker: data.kicker,
    description: data.description,
    summary: data.summary,
    date: new Date(data.date).toISOString().slice(0, 10),
    updated: new Date(data.updated ?? data.date).toISOString().slice(0, 10),
    pillar,
    pillarLabel: pillarLabels[pillar],
    cover: data.cover ?? `/explainers/${slug}/cover.png`,
    coverAlt: data.coverAlt ?? data.title,
    duration: data.duration,
    video: data.video,
    youtube: data.youtube,
    instagram: data.instagram,
    resource: data.resource,
    sources: data.sources ?? [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
  return { meta, body: content };
}

export function getExplainersForLocale(locale: Locale): Explainer[] {
  const dir = getDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f, locale).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getExplainerForLocale(slug: string, locale: Locale): Promise<ExplainerWithBody | null> {
  const dir = getDir(locale);
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(dir, file))) return null;
  const { meta, body } = parse(file, locale);
  const html = String(
    await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(body),
  );
  return { ...meta, html };
}

export function formatDateForLocale(iso: string, locale: Locale) {
  const localeCode = locale === "ja" ? "ja-JP" : "en-GB";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(localeCode, {
    day: "numeric",
    month: locale === "ja" ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

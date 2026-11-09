import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { pillars, type PillarKey } from "./site";

const DIR = path.join(process.cwd(), "content", "explainers");

export type Source = { title: string; publisher: string; url: string };

export type Explainer = {
  slug: string;
  /** Plain title, used for SEO and lists. */
  title: string;
  /** Display headline. Wrap one word in *asterisks* to underline it in Signal Orange. */
  headline: string;
  kicker: string;
  description: string;
  date: string;
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

function parse(file: string): { meta: Explainer; body: string } {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const pillar = data.pillar as PillarKey;
  if (!(pillar in pillars)) throw new Error(`${file}: unknown pillar "${data.pillar}"`);
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: Explainer = {
    slug,
    title: data.title,
    headline: data.headline ?? data.title,
    kicker: data.kicker,
    description: data.description,
    date: new Date(data.date).toISOString().slice(0, 10),
    pillar,
    pillarLabel: pillars[pillar],
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

export function getExplainers(): Explainer[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parse(f).meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getExplainer(slug: string): Promise<ExplainerWithBody | null> {
  const file = `${slug}.md`;
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DIR, file))) return null;
  const { meta, body } = parse(file);
  const html = String(
    await unified().use(remarkParse).use(remarkGfm).use(remarkRehype).use(rehypeStringify).process(body),
  );
  return { ...meta, html };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

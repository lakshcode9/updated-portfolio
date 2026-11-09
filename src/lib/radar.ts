/**
 * Public topic radar: AI headlines from free feeds, grouped and ranked by
 * attention and fit with the BRAND.md pillars. Port of the local tool in
 * ai-visual-brand/templates/radar/radar.mjs (keep scoring changes in sync).
 *
 * Only titles, links, source names and dates are shown. Feed text is
 * untrusted data: React escapes it, and only http(s) links are kept.
 */

type Kind = "rss" | "atom" | "hn" | "hf-papers";
type Source = { id: string; name: string; url: string; weight: number; kind: Kind; primary?: boolean };

const SOURCES: Source[] = [
  { id: "openai", name: "OpenAI", url: "https://openai.com/news/rss.xml", weight: 1.4, kind: "rss", primary: true },
  { id: "deepmind", name: "Google DeepMind", url: "https://deepmind.google/blog/rss.xml", weight: 1.3, kind: "rss", primary: true },
  { id: "google-research", name: "Google Research", url: "https://research.google/blog/rss/", weight: 1.1, kind: "rss", primary: true },
  { id: "google-ai", name: "Google AI blog", url: "https://blog.google/technology/ai/rss/", weight: 1.1, kind: "rss", primary: true },
  { id: "hf-blog", name: "Hugging Face", url: "https://huggingface.co/blog/feed.xml", weight: 1.0, kind: "rss", primary: true },
  { id: "hf-papers", name: "HF papers", url: "https://huggingface.co/api/daily_papers?limit=50", weight: 0.9, kind: "hf-papers", primary: true },
  { id: "simonw", name: "Simon Willison", url: "https://simonwillison.net/atom/everything/", weight: 1.1, kind: "atom" },
  { id: "verge", name: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", weight: 0.9, kind: "atom" },
  { id: "techcrunch", name: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/", weight: 0.8, kind: "rss" },
  { id: "mittr", name: "MIT Tech Review", url: "https://www.technologyreview.com/topic/artificial-intelligence/feed", weight: 1.0, kind: "rss" },
  { id: "hn", name: "Hacker News", url: "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=400", weight: 1.0, kind: "hn" },
];

const PILLARS: Record<string, RegExp> = {
  "AI & LLMs": /\b(tokens?|tokeni[sz]\w*|context window|llms?|language models?|transformers?|attention|reasoning|chain[- ]of[- ]thought|hallucinat\w*|fine[- ]?tun\w*|pre-?train\w*|rlhf|distill\w*|benchmarks?|evals?|gpt[-\w.]*|chatgpt|claude|gemini|llama|mistral|qwen|deepseek|grok)\b/i,
  "How it works": /\b(embeddings?|rag|retrieval|vector|memory|inference|decoding|sampling|mixture[- ]of[- ]experts|moe|quanti[sz]\w*|diffusion|multimodal|vision|speech|voice|image generation|video generation|world models?|interpretab\w*|neurons?)\b/i,
  Infrastructure: /\b(gpus?|tpus?|chips?|nvidia|data ?cent(er|re)s?|compute|cuda|latency|serving|open[- ]source|open[- ]weights?|api|pricing|throughput|on[- ]device|local models?|llama\.cpp|ollama)\b/i,
  Agents: /\b(agents?|agentic|tool use|computer use|browser use|mcp|autonomous|coding agents?|codex|claude code|copilot|cursor|workflows?|automation|operator)\b/i,
  "Real world": /\b(security|exploits?|vulnerab\w*|jailbreak\w*|prompt injection|deepfakes?|health|medical|education|robots?|robotics|science|proteins?|weather|copyright|privacy|scams?|elections?)\b/i,
};

const AI_RELEVANT =
  /\b(ai|a\.i\.|llms?|gpt[-\w.]*|chatgpt|openai|anthropic|claude|gemini|deepmind|llama|mistral|qwen|deepseek|grok|transformers?|neural|machine learning|diffusion|agents?|agentic|copilot|codex|hugging ?face|inference|embeddings?|rag|tokens?|open[- ]weights?|multimodal|chatbots?|mcp)\b/i;
const BUSINESS =
  /\b(raises?|raised|funding|valuation|ipo|acquir\w*|acquisition|layoffs?|hires?|hiring|revenue|earnings|stock|shares|investors?|deal|partnership|appoints?|ceo|lawsuit|sues|sued|antitrust)\b/i;
const OPINION = /^(i|i'm|i’m|my|we|why i|in defense|stop|against)\b|\b(bubble|considered harmful|hot take|rant)\b/i;
const EXPLAINABLE = /^(how|why|what|inside|explained|a guide)\b|\b(explained|how it works|under the hood|deep dive)\b/i;
const STOP = new Set(
  "the a an and or for of to in on at by with from into over about as is are was were be been it its this that these those new now how why what you your our their his her they we i not no yes can will just more most than then after before up down out off via vs using use uses used make makes made get gets show shows says said one two first launches launch launched introduces introducing announces announced release released releases today week".split(
    " ",
  ),
);

// Topics already explained on the site rank lower.
const COVERED: { slug: string; keywords: string[] }[] = [
  { slug: "tokenization", keywords: ["tokeniz"] },
  { slug: "context-window", keywords: ["context window"] },
  { slug: "career-ops", keywords: ["career-ops", "career ops"] },
  { slug: "ai-948-exploits", keywords: ["paths to root", "948 linux", "948 kernel"] },
];

type Raw = {
  title: string;
  url: string;
  date: number;
  summary: string;
  points?: number;
  comments?: number;
  upvotes?: number;
  discussion?: string;
};

export type RadarItem = Raw & {
  sourceName: string;
  ageH: number;
  score: number;
  pillars: string[];
  signals: string[];
  covered: string | null;
};

export type RadarTopic = {
  lead: RadarItem;
  items: RadarItem[];
  sources: string[];
  score: number;
  pillars: string[];
  signals: string[];
};

export type Radar = {
  generatedAt: string;
  days: number;
  topics: RadarTopic[];
  storyCount: number;
  sourcesOk: number;
  sourcesTotal: number;
};

const decode = (s = "") =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
const strip = (s = "") =>
  decode(decode(s).replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
const tag = (block: string, names: string[]) => {
  for (const n of names) {
    const m = block.match(new RegExp(`<${n}(?:\\s[^>]*)?>([\\s\\S]*?)</${n}>`, "i"));
    if (m) return m[1];
  }
  return "";
};
function atomLink(block: string) {
  const links = [...block.matchAll(/<link\b([^>]*?)\/?>/gi)].map((m) => m[1]);
  const pick = links.find((a) => /rel=["']alternate["']/i.test(a)) ?? links.find((a) => !/rel=/i.test(a)) ?? links[0];
  const href = pick?.match(/href=["']([^"']+)["']/i)?.[1];
  return href ? decode(href) : strip(tag(block, ["link"]));
}

function parseXml(xml: string): Raw[] {
  return (xml.match(/<(item|entry)[\s>][\s\S]*?<\/(item|entry)>/gi) ?? []).map((b) => {
    const d = tag(b, ["pubDate", "published", "updated", "dc:date"]);
    return {
      title: strip(tag(b, ["title"])),
      url: atomLink(b),
      date: d ? Date.parse(strip(d)) : NaN,
      summary: strip(tag(b, ["description", "summary"])).slice(0, 300),
    };
  });
}

type HNHit = { title?: string; url?: string; objectID: string; created_at_i?: number; points?: number; num_comments?: number };
type HFPaper = {
  title?: string;
  publishedAt?: string;
  paper?: { id?: string; title?: string; summary?: string; upvotes?: number; publishedAt?: string };
};

async function fetchSource(src: Source, since: number): Promise<Raw[]> {
  let url = src.url;
  if (src.kind === "hn") url += `&numericFilters=created_at_i>${Math.floor(since / 1000)},points>=30`;
  const res = await fetch(url, {
    headers: { "User-Agent": "laksh-radar/1.0 (+https://www.lakshpujary.tech/radar)" },
    signal: AbortSignal.timeout(12000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (src.kind === "hn") {
    const json = (await res.json()) as { hits?: HNHit[] };
    return (json.hits ?? []).map((h) => ({
      title: h.title ?? "",
      url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
      discussion: `https://news.ycombinator.com/item?id=${h.objectID}`,
      date: (h.created_at_i ?? 0) * 1000,
      summary: "",
      points: h.points ?? 0,
      comments: h.num_comments ?? 0,
    }));
  }
  if (src.kind === "hf-papers") {
    const json = (await res.json()) as HFPaper[];
    return (Array.isArray(json) ? json : []).map((p) => ({
      title: p.paper?.title ?? p.title ?? "",
      url: `https://huggingface.co/papers/${p.paper?.id ?? ""}`,
      date: Date.parse(p.publishedAt ?? p.paper?.publishedAt ?? ""),
      summary: (p.paper?.summary ?? "").slice(0, 300),
      upvotes: p.paper?.upvotes ?? 0,
    }));
  }
  return parseXml(await res.text());
}

async function withRetry(src: Source, since: number) {
  try {
    return await fetchSource(src, since);
  } catch {
    await new Promise((r) => setTimeout(r, 2000));
    return fetchSource(src, since);
  }
}

const normUrl = (u: string) => {
  try {
    const x = new URL(u);
    x.hash = "";
    for (const k of [...x.searchParams.keys()]) if (/^utm_|^ref$|^source$/.test(k)) x.searchParams.delete(k);
    return `${x.hostname.replace(/^www\./, "")}${x.pathname.replace(/\/$/, "")}${x.search}`;
  } catch {
    return u;
  }
};

const tokens = (title: string) =>
  new Set(
    title
      .toLowerCase()
      .replace(/[‘’“”"(),:;!?]/g, " ")
      .split(/\s+/)
      .map((w) => w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, ""))
      .filter((w) => w.length >= 3 && !STOP.has(w)),
  );

function score(it: Raw, src: Source, now: number): RadarItem {
  const text = `${it.title} ${it.summary}`;
  const ageH = Math.max(0, (now - it.date) / 36e5);
  const aggregator = src.kind === "hn" || src.kind === "hf-papers";
  const signals: string[] = [];
  let s = src.weight * Math.exp(-ageH / 36) * (aggregator ? 5 : 10);
  if (it.points) {
    s += 3 * Math.log10(1 + it.points) + Math.log10(1 + (it.comments ?? 0));
    signals.push(`${it.points} HN points`);
  }
  if (it.upvotes) {
    s += 2.5 * Math.log10(1 + it.upvotes);
    signals.push(`${it.upvotes} upvotes`);
  }
  const pillars = Object.entries(PILLARS)
    .filter(([, re]) => re.test(text))
    .map(([p]) => p);
  s += Math.min(pillars.length, 3) * 1.2;
  if (!pillars.length) s -= 3;
  if (OPINION.test(it.title)) s -= 2;
  if (EXPLAINABLE.test(it.title)) s += 1;
  if (BUSINESS.test(it.title)) s -= 3.5;
  const t = it.title.toLowerCase();
  const covered = COVERED.find((c) => c.keywords.some((k) => t.includes(k)))?.slug ?? null;
  if (covered) s -= 5;
  return { ...it, sourceName: src.name, ageH, score: s, pillars, signals, covered };
}

type Tokenized = RadarItem & { tok: Set<string> };

function cluster(items: Tokenized[]): RadarTopic[] {
  const df = new Map<string, number>();
  for (const it of items) for (const t of it.tok) df.set(t, (df.get(t) ?? 0) + 1);
  const groups: { tok: Set<string>; items: Tokenized[] }[] = [];
  for (const it of [...items].sort((a, b) => b.score - a.score)) {
    const home = groups.find((g) => {
      const shared = [...it.tok].filter((t) => g.tok.has(t));
      const rare = shared.filter((t) => (df.get(t) ?? 0) <= 4 && /[a-z]/.test(t));
      const jac = shared.length / (it.tok.size + g.tok.size - shared.length || 1);
      return jac >= 0.34 || rare.length >= 2;
    });
    if (home) home.items.push(it);
    else groups.push({ tok: it.tok, items: [it] });
  }
  return groups.map((g) => {
    const items: RadarItem[] = g.items.map((it) => {
      const copy: Partial<Tokenized> = { ...it };
      delete copy.tok;
      return copy as RadarItem;
    });
    const lead = items[0];
    const sources = [...new Set(items.map((i) => i.sourceName))];
    const extra = items.slice(1).reduce((n, i) => n + (i.points ? Math.log10(1 + i.points) : 0), 0);
    const signals = [...new Set(items.flatMap((i) => i.signals))];
    if (sources.length > 1) signals.unshift(`${sources.length} sources`);
    return {
      lead,
      items,
      sources,
      score: lead.score + 2.2 * Math.log2(sources.length) + extra * 0.5,
      pillars: [...new Set(items.flatMap((i) => i.pillars))],
      signals,
    };
  });
}

export async function buildRadar({ days = 3, top = 30 } = {}): Promise<Radar> {
  const now = Date.now();
  const since = now - days * 864e5;
  const results = await Promise.allSettled(SOURCES.map((s) => withRetry(s, since)));
  const scored: RadarItem[] = [];
  results.forEach((r, i) => {
    if (r.status !== "fulfilled") return;
    const src = SOURCES[i];
    for (const it of r.value) {
      if (!it.title || !/^https?:\/\//.test(it.url) || !Number.isFinite(it.date) || it.date < since || it.date > now + 36e5)
        continue;
      if (src.kind === "hn" && !AI_RELEVANT.test(it.title)) continue;
      scored.push(score(it, src, now));
    }
  });

  const byUrl = new Map<string, RadarItem>();
  for (const it of scored) {
    const k = normUrl(it.url);
    const prev = byUrl.get(k);
    if (!prev || it.score > prev.score)
      byUrl.set(k, { ...it, points: it.points ?? prev?.points, discussion: it.discussion ?? prev?.discussion });
  }
  const items: Tokenized[] = [...byUrl.values()].map((it) => ({ ...it, tok: tokens(it.title) }));

  return {
    generatedAt: new Date(now).toISOString(),
    days,
    topics: cluster(items)
      .sort((a, b) => b.score - a.score)
      .slice(0, top),
    storyCount: items.length,
    sourcesOk: results.filter((r) => r.status === "fulfilled").length,
    sourcesTotal: SOURCES.length,
  };
}

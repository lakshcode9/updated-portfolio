import { getExplainers } from "@/lib/explainers";
import { brandCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Laksh | AI Explained explainer: title card with the reel cover";

export function generateStaticParams() {
  return getExplainers().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExplainers().find((x) => x.slug === slug)!;
  return brandCard({ kicker: e.kicker, headline: e.headline, image: e.cover, imageKind: "cover" });
}

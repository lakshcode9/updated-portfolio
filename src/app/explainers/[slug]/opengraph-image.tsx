import { getExplainers } from "@/lib/explainers";
import { brandCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Explainer share card";

export function generateStaticParams() {
  return getExplainers().map((e) => ({ slug: e.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getExplainers().find((x) => x.slug === slug)!;
  return brandCard({ kicker: e.kicker, headline: e.headline, image: e.cover, imageKind: "cover" });
}

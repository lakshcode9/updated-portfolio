import type { MetadataRoute } from "next";
import { getExplainers } from "@/lib/explainers";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const explainers = getExplainers();
  const latest = explainers[0]?.date;
  return [
    { url: site.url, lastModified: latest, priority: 1 },
    { url: `${site.url}/explainers`, lastModified: latest, priority: 0.9 },
    { url: `${site.url}/about`, priority: 0.5 },
    { url: `${site.url}/newsletter`, priority: 0.6 },
    ...explainers.map((e) => ({
      url: `${site.url}/explainers/${e.slug}`,
      lastModified: e.date,
      priority: 0.8,
      images: [`${site.url}${e.cover}`],
    })),
  ];
}

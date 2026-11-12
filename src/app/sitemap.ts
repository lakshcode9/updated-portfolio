import type { MetadataRoute } from "next";
import { getExplainers } from "@/lib/explainers";
import { getExplainersForLocale } from "@/lib/explainers-i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const explainers = getExplainers();
  const explainersJa = getExplainersForLocale("ja");
  const latest = explainers[0]?.date;
  const latestJa = explainersJa[0]?.date;

  return [
    // English pages
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
    // Japanese pages
    { url: `${site.url}/jp`, lastModified: latestJa ?? latest, priority: 0.9 },
    { url: `${site.url}/jp/explainers`, lastModified: latestJa ?? latest, priority: 0.8 },
    { url: `${site.url}/jp/about`, priority: 0.4 },
    ...explainersJa.map((e) => ({
      url: `${site.url}/jp/explainers/${e.slug}`,
      lastModified: e.date,
      priority: 0.7,
      images: [`${site.url}${e.cover}`],
    })),
  ];
}

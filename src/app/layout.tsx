import type { Metadata, Viewport } from "next";
import { languages } from "@/lib/hreflang";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.title}: ${site.tagline}`, template: `%s · ${site.title}` },
  description: site.description,
  applicationName: site.title,
  authors: [{ name: "Laksh", url: site.url }],
  alternates: { canonical: "/", languages: languages("/", "/jp"), types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", siteName: site.title, locale: "en_GB", url: "/" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4f1e9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // This layout does NOT render <html> or <body> - those are in locale-specific layouts
  return children;
}

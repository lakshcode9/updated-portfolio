import type { NextConfig } from "next";

// Routes from the old site. They point at the new home so old links and
// search results don't 404.
const oldRoutes = ["/blog", "/blog/:path*", "/mentorship", "/systems", "/sprint", "/learn", "/learn/:path*"];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return oldRoutes.map((source) => ({ source, destination: "/", permanent: true }));
  },
  // Zero to Free sales site: static files in public/zero-to-free.
  async rewrites() {
    return [
      { source: "/zero-to-free", destination: "/zero-to-free/index.html" },
      { source: "/zero-to-free/:page(contact|terms|privacy|refund|delivery|thank-you)", destination: "/zero-to-free/:page.html" },
    ];
  },
};

export default nextConfig;

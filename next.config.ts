import type { NextConfig } from "next";

// Routes from the old site. They point at the new home so old links and
// search results don't 404.
const oldRoutes = ["/blog", "/blog/:path*", "/mentorship", "/systems", "/sprint", "/learn", "/learn/:path*"];

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return oldRoutes.map((source) => ({ source, destination: "/", permanent: true }));
  },
};

export default nextConfig;

import { brandCard, ogSize } from "@/lib/og";

export const alt = "Laksh | AI Explained: AI, made visible.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return brandCard({
    kicker: "AI Explained",
    headline: "AI, made *visible*.",
    image: "/avatar/wave-hello.png",
    imageKind: "avatar",
  });
}

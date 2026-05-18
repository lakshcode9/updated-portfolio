"use client";

import dynamic from "next/dynamic";

const TouchEffect = dynamic(
  () => import("@/components/ui/touch-effect").then((mod) => mod.TouchEffect),
  { ssr: false }
);

export function TouchEffectWrapper() {
  return <TouchEffect />;
}

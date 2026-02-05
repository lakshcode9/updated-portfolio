"use client";

import { Hero } from "@/components/sections/Hero";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { Contact } from "@/components/sections/Contact";
import { DualCTAPopup } from "@/components/ui/dual-cta-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-white selection:bg-blue-500/30">
      <DualCTAPopup enabled={true} triggerAfterMs={5000} />
      <Hero />
      <WhatIDo />
      <LiveProjects />
      <Contact />
    </div>
  );
}


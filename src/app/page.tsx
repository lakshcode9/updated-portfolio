"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { MyStory } from "@/components/sections/Story";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { Mission } from "@/components/sections/Mission";
import { SystemBoot } from "@/components/intro/SystemBoot";
import { FocusContainer } from "@/components/ui/focus-container";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);

  // Prevent scrolling during boot
  useEffect(() => {
    if (!bootComplete) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [bootComplete]);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y md:snap-mandatory font-sans bg-background text-foreground scroll-smooth">
      <AnimatePresence>
        {!bootComplete && <SystemBoot onBootComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}>
        <div id="work" className="snap-start w-full min-h-screen flex items-center">
           <Hero />
        </div>
        
        <div className="snap-start w-full min-h-screen flex items-center justify-center">
          <FocusContainer className="w-full pt-32 pb-20 px-4 md:py-20 md:px-0">
            <MyStory />
          </FocusContainer>
        </div>
        
        <div className="snap-start w-full min-h-screen flex items-center justify-center">
          <FocusContainer className="w-full pt-32 pb-20 px-4 md:py-20 md:px-0">
            <WhatIDo />
          </FocusContainer>
        </div>
        
        <div className="snap-start w-full min-h-screen flex items-center justify-center">
          <FocusContainer className="w-full pt-32 pb-20 px-4 md:py-20 md:px-0">
            <LiveProjects />
          </FocusContainer>
        </div>
        
        <div className="snap-start w-full min-h-screen flex items-center justify-center">
          <FocusContainer className="w-full pt-32 pb-20 px-4 md:py-20 md:px-0">
            <Mission />
          </FocusContainer>
        </div>
      </div>
    </div>
  );
}

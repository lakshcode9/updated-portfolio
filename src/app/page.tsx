"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { MyStory } from "@/components/sections/Story";
import { PixelStory } from "@/components/sections/PixelStory";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { Mission } from "@/components/sections/Mission";
import { SystemBoot } from "@/components/intro/SystemBoot";
import { FocusContainer } from "@/components/ui/focus-container";
import { DualCTAPopup } from "@/components/ui/dual-cta-popup";
import { Arsenal } from "@/components/sections/Arsenal";
import { Contact } from "@/components/sections/Contact";
import { AnimatePresence } from "framer-motion";

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
    <>
      <AnimatePresence>
        {!bootComplete && <SystemBoot onBootComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${bootComplete ? "opacity-100" : "opacity-0"}`}>
        <DualCTAPopup enabled={bootComplete} triggerAfterMs={5000} />
        
        <div id="work" className="w-full flex items-center justify-center">
           <Hero />
        </div>
        
        <div className="w-full flex items-center justify-center">
          <FocusContainer className="w-full">
            <MyStory />
          </FocusContainer>
        </div>

        <div className="w-full flex items-center justify-center">
            <PixelStory />
        </div>
        
        <div className="w-full flex items-center justify-center">
          <FocusContainer className="w-full">
            <WhatIDo />
          </FocusContainer>
        </div>

        <div className="w-full flex items-center justify-center">
          <Arsenal />
        </div>
        
        <div className="w-full flex items-center justify-center">
          <FocusContainer className="w-full">
            <LiveProjects />
          </FocusContainer>
        </div>
        
        <div className="w-full flex items-center justify-center">
          <FocusContainer className="w-full">
            <Mission />
          </FocusContainer>
        </div>

        <div className="w-full flex items-center justify-center">
          <Contact />
        </div>
      </div>
    </>
  );
}

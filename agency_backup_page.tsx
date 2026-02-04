"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Rocket, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { LiveProjects } from "@/components/sections/LiveProjects";
import { Arsenal } from "@/components/sections/Arsenal";
import { Contact } from "@/components/sections/Contact";
import { FocusContainer } from "@/components/ui/focus-container";

export default function AgencyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* HEADER / NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
        <Link 
          href="/" 
          className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest">Back to Gateway</span>
        </Link>
        <div className="pointer-events-auto px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
           <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Status: Accepting 2 Clients</span>
        </div>
      </nav>

      {/* HERO SECTION WITH VSL */}
      <div className="relative pt-32 pb-20 px-6 flex flex-col items-center">
         <div className="absolute top-0 inset-x-0 h-[500px] bg-blue-500/5 blur-[120px] pointer-events-none" />
         
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* LEFT: Copy */}
            <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8 text-left"
             >
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
                    System: Enterprise_Architecture
                </span>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.9]">
                    We Don't Just Write Code.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">We Architect Scale.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
                    Most agencies hand you a repo and disappear. We build autonomous AI workforces and scalable backends that keep running while you sleep.
                    <span className="block mt-4 text-white font-medium italic">High Availability. Self-Healing Systems. Zero Overhead.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Button className="rounded-full h-14 px-8 bg-blue-500 hover:bg-blue-400 text-white font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        Book a Systems Audit
                    </Button>
                    <Button variant="outline" className="rounded-full h-14 px-8 border-white/10 hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        View Case Studies
                    </Button>
                </div>
            </motion.div>

             {/* RIGHT: VSL Phone Frame */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative mx-auto lg:mr-0 group"
            >
                {/* 1. The Glow Effect (Behind) */}
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                {/* 2. The Phone Chassis (Outer Container) */}
                <div 
                    className="relative w-[300px] md:w-[365px] h-[580px] md:h-[623px] bg-[#0a0a0a] rounded-[40px] p-[12px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_20px_50px_-10px_rgba(0,0,0,0.5)] border border-white/5 transition-transform duration-500 hover:scale-[1.01] hover:rotate-[1deg]"
                    style={{
                        boxShadow: `
                            0px 0px 0px 1px rgba(255, 255, 255, 0.05),
                            0px 1px 1px -0.5px rgba(0, 0, 0, 0.03),
                            0px 3px 3px -1.5px rgba(0, 0, 0, 0.03),
                            0px 6px 6px -3px rgba(0, 0, 0, 0.03),
                            0px 12px 12px -6px rgba(0, 0, 0, 0.03),
                            0px 24px 24px -12px rgba(0, 0, 0, 0.03),
                            0px 20px 60px -10px rgba(0, 0, 0, 0.5)
                        `
                    }}
                >
                    {/* 3. The "Screen" (Inner Container) */}
                    <div className="w-full h-full bg-zinc-900 rounded-[28px] overflow-hidden relative border border-white/5">
                        
                        {/* Video Mockup Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-zinc-800 to-black">
                             <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cursor-pointer border border-white/10">
                                <Rocket className="w-6 h-6 text-blue-400 ml-1" />
                             </div>
                             <span className="text-xs font-mono text-blue-400 tracking-widest uppercase mb-2">Agency VSL</span>
                             <h3 className="text-xl font-medium text-white max-w-[200px] leading-tight mb-4">
                                 How We Automate Your Business
                             </h3>
                             <p className="text-xs text-white/40 max-w-[200px]">
                                 [ Placeholder: Vertical Video for Agency Page ]
                             </p>
                        </div>
                    </div>
                </div>
            </motion.div>

         </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="py-12">
         <FocusContainer>
            <WhatIDo />
         </FocusContainer>
      </div>

      {/* TECH STACK */}
      <div className="py-12 bg-black/30">
        <Arsenal />
      </div>

      {/* LIVE PROJECTS */}
      <div className="py-12">
        <FocusContainer>
            <LiveProjects />
        </FocusContainer>
      </div>

      {/* FINAL CONTACT SECTION */}
      <div className="py-20">
         <Contact />
      </div>

    </div>
  );
}

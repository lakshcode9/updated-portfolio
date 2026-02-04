"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MyStory } from "@/components/sections/Story";
import { PixelStory } from "@/components/sections/PixelStory";
import SprintPage from "../sprint/page"; // We reuse the sprint page component as the curriculum view

export default function MentorshipPage() {
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
        <div className="pointer-events-auto px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
           <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Cohort Applications: Open</span>
        </div>
      </nav>

      {/* HERO SECTION WITH VSL */}
      <div className="relative pt-32 pb-20 px-6 flex flex-col items-center">
         <div className="absolute top-0 inset-x-0 h-[500px] bg-green-500/5 blur-[120px] pointer-events-none" />
         
         <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
             
             {/* LEFT: Copy */}
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="space-y-8 text-left"
             >
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
                    System: 180_Day_Protocol
                </span>
                <h1 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase leading-[0.9]">
                    From Founder<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">to Architect</span>
                </h1>
                <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed">
                    The exact blueprint I used to go from "business guy who hires devs" to building production AI systems myself. 
                    <span className="block mt-4 text-white font-medium italic">180 Days. Zero shortcuts. Full Technical Mastery.</span>
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Button className="rounded-full h-14 px-8 bg-green-500 hover:bg-green-400 text-black font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        Apply for Mentorship
                    </Button>
                    <Button variant="outline" className="rounded-full h-14 px-8 border-white/10 hover:bg-white text-white hover:text-black font-bold uppercase tracking-widest text-xs transition-all w-full sm:w-auto">
                        View The Curriculum
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
                <div className="absolute inset-0 bg-green-500/20 blur-[100px] rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

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
                                <CheckCircle2 className="w-6 h-6 text-green-400 ml-1" />
                             </div>
                             <span className="text-xs font-mono text-green-400 tracking-widest uppercase mb-2">Mentorship VSL</span>
                             <h3 className="text-xl font-medium text-white max-w-[200px] leading-tight mb-4">
                                 Why Most Founders Fail at Tech
                             </h3>
                             <p className="text-xs text-white/40 max-w-[200px]">
                                 [ Placeholder: Vertical Video for Mentorship Page ]
                             </p>
                        </div>
                    </div>
                </div>
            </motion.div>

         </div>
      </div>

      {/* STORY SECTION */}
      <div className="py-12 bg-black/50">
        <div className="w-full flex items-center justify-center">
            <FocusContainer>
                <MyStory />
            </FocusContainer>
        </div>
        <div className="w-full flex items-center justify-center -mt-12 md:mt-0">
             <PixelStory />
        </div>
      </div>

      {/* CURRICULUM (Using Sprint Page) */}
      <div className="py-20 border-t border-white/5">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-medium uppercase tracking-tight mb-4">The Protocol</h2>
            <p className="text-white/40">The exact roadmap we will follow together.</p>
        </div>
        <SprintPage />
      </div>

      {/* FINAL CTA */}
      <div className="py-32 px-6 bg-green-500/5 border-t border-green-500/10 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
             <h2 className="text-4xl md:text-6xl font-medium tracking-tighter uppercase">Ready to Build?</h2>
             <p className="text-lg text-white/50">
                I only take 5 students per cohort to ensure deep technical mentorship.
                If you are a founder who is tired of being "non-technical," this is for you.
             </p>
             <Button className="rounded-full h-16 px-12 bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                Start Your 180 Days
             </Button>
         </div>
      </div>

    </div>
  );
}

// Wrapper for FocusContainer since it wasn't exported from the page originally
import { FocusContainer } from "@/components/ui/focus-container";

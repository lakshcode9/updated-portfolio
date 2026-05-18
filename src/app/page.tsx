"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, User, Building2, Terminal, Cpu, Brain } from "lucide-react";
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
      
      {/* THE SPLIT FUNNEL (The Two Doors) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center">
            
            {/* DOOR A: MENTORSHIP */}
            <Link href="/mentorship" className="flex-1 group">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="h-full p-8 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 flex flex-col justify-between gap-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain className="w-32 h-32" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-6">
                            <Terminal className="w-6 h-6 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Learn AI</h2>
                        <p className="text-white/50 leading-relaxed">
                            "I want to understand AI and not get left behind."
                            <br/><br/>
                            <strong>1-on-1 AI Mentorship</strong> for professionals who want practical, hands-on guidance to master AI and future-proof their careers.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-green-400 font-bold tracking-widest uppercase text-sm group-hover:gap-6 transition-all">
                        <span>Apply for Mentorship</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </motion.div>
            </Link>

            {/* DOOR B: AGENCY (EXTERNAL LINK) */}
            <a href="https://autoikigai.space" target="_blank" rel="noopener noreferrer" className="flex-1 group">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="h-full p-8 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 flex flex-col justify-between gap-12 relative overflow-hidden"
                >
                     <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 className="w-32 h-32" />
                    </div>

                    <div className="space-y-4 relative z-10">
                         <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-6">
                            <Cpu className="w-6 h-6 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight">For Businesses</h2>
                         <p className="text-white/50 leading-relaxed">
                            "I need a system that works, yesterday."
                            <br/><br/>
                            Visit <strong>AutoIkigai Systems</strong>. We build autonomous AI workforces and backend architectures that scale.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-blue-400 font-bold tracking-widest uppercase text-sm group-hover:gap-6 transition-all">
                        <span>Visit Agency HQ</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </motion.div>
            </a>

        </div>
      </section>

      <WhatIDo />
      <LiveProjects />
      <Contact />
    </div>
  );
}

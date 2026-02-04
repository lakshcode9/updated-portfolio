
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ArrowRight, User, Building2, Terminal, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/Hero";
import { DualCTAPopup } from "@/components/ui/dual-cta-popup";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen flex flex-col items-center">
        
        <DualCTAPopup enabled={true} triggerAfterMs={3000} />

        {/* Header / Nav */}
        <nav className="w-full flex justify-between items-center mb-24 opacity-50 hover:opacity-100 transition-opacity">
            <span className="font-mono text-xs tracking-[0.3em]">LAKSH_PUJARY // SYSTEM_GATEWAY</span>
            <div className="flex gap-4">
                <a href="https://twitter.com/laksh_builds" target="_blank" className="hover:text-white/80 transition-colors"><Terminal className="w-4 h-4" /></a>
            </div>
        </nav>

        {/* 1. THE VSL HERO SECTION */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-12 mb-32">
            
           <Hero />

        </div>

        {/* 2. THE SPLIT FUNNEL (The Two Doors) */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-stretch justify-center">
            
            {/* DOOR A: MENTORSHIP */}
            <Link href="/mentorship" className="flex-1 group">
                <motion.div 
                    whileHover={{ y: -5 }}
                    className="h-full p-8 md:p-12 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 flex flex-col justify-between gap-12 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <User className="w-32 h-32" />
                    </div>
                    
                    <div className="space-y-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-6">
                            <Terminal className="w-6 h-6 text-green-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight">For Founders</h2>
                        <p className="text-white/50 leading-relaxed">
                            "I have the vision, but I can't build it myself."
                            <br/><br/>
                            Join the <strong>180-Day Founder-to-Engineer Protocol</strong>. Stop renting intelligence. Become the Architect.
                        </p>
                    </div>

                    <div className="flex items-center gap-4 text-green-400 font-bold tracking-widest uppercase text-sm group-hover:gap-6 transition-all">
                        <span>Start The Protocol</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </motion.div>
            </Link>

            {/* DOOR B: AGENCY (EXTERNAL LINK) */}
            <a href="https://autoikigai.systems" target="_blank" rel="noopener noreferrer" className="flex-1 group">
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

      </main>
    </div>
  );
}

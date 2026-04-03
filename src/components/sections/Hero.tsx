"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption"
import Link from "next/link"

export function Hero() {
  const heroText = "BRIDGING THE GAP BETWEEN BUSINESS STRATEGY AND AI IMPLEMENTATION. 4 YEARS BUILDING COMPANIES. NOW HELPING OTHERS LEVERAGE AI TO BUILD THEIRS."
  const triggers = ["BUSINESS", "STRATEGY", "AI", "IMPLEMENTATION", "BUILDING", "COMPANIES", "LEVERAGE"]

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center bg-background font-sans pt-24 md:pt-32 pb-12 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
        
        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-5xl w-full relative z-10 flex flex-col gap-8 md:gap-14 items-center px-4"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
            AI Strategist & Builder
          </span>
        </motion.div>

        <div className="flex flex-col gap-6 w-full items-center">
          <div className="flex items-center justify-center w-full">
            <HyperTextParagraph
              text={heroText}
              highlightWords={triggers}
              as="h1"
              className="text-xl sm:text-2xl md:text-5xl font-normal text-foreground leading-[1.2] md:leading-tight uppercase tracking-wide drop-shadow-2xl text-center max-w-4xl"
            />
          </div>

          <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground max-w-[85%] md:max-w-xl font-medium italic text-center uppercase tracking-widest">
            From college dropout to AI systems architect. Now helping professionals and businesses harness AI.
          </p>
        </div>
        
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          <Button size="lg" className="rounded-full px-8 h-12 text-xs font-bold transition-all hover:scale-105 active:scale-95" asChild>
            <Link href="/mentorship">LEARN AI</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-xs font-bold border-white/10 transition-all hover:bg-white hover:text-black active:scale-95" asChild>
            <a href="https://autoikigai.systems" target="_blank" rel="noopener noreferrer">FOR BUSINESSES</a>
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-col items-center gap-4 pt-12"
        >
          <div className="w-px h-10 bg-gradient-to-b from-blue-500/50 to-transparent animate-bounce" />
          <span className="text-[9px] uppercase tracking-[0.4em] text-muted-foreground font-black">Hover trigger words to decrypt my story</span>
        </motion.div>
      </motion.div>
    </section>
  )
}


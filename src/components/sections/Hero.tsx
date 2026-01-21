"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption"

export function Hero() {
  const heroText = "I'M TAKING 180 DAYS TO MASTER AI ENGINEERING AFTER 4 YEARS OF BUILDING AS A FOUNDER. DROPPED OUT IN 3 MONTHS TO LEARN BY SHIPPING. NO BULLSH*T. JUST THE GRIND."
  const triggers = ["180 DAYS", "MASTER", "AI", "FOUNDER", "DROPPED OUT", "SHIPPING", "GRIND"]

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background font-sans py-20 md:py-0">
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
        className="max-w-5xl w-full relative z-10 flex flex-col gap-6 md:gap-12 items-center justify-center min-h-[60vh] md:min-h-[80vh] px-4"
      >
        {/* Header Pill */}
        <div className="flex justify-center">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 px-4 py-1.5 md:px-6 md:py-2 rounded-full flex items-center gap-2 md:gap-3 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] text-white/80 uppercase">
              The 180-Day AI Sprint
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center w-full">
          <HyperTextParagraph
            text={heroText}
            highlightWords={triggers}
            className="text-2xl sm:text-4xl md:text-6xl font-normal text-foreground leading-snug uppercase tracking-wide drop-shadow-2xl text-center max-w-4xl mx-auto"
          />
        </div>

        <p className="text-sm sm:text-l md:text-xl text-muted-foreground max-w-[90%] md:max-w-2xl font-medium italic mt-2 md:mt-4 text-center">
          Leaving school was the start. Building systems is the mission.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
          <Button size="lg" className="rounded-full px-10 h-14 text-base font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95" asChild>
            <a href="#work">SHIP_HISTORY</a>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-10 h-14 text-base font-bold border-white/10 transition-all hover:bg-white hover:text-black active:scale-95" asChild>
            <a href="/sprint">DAILY_LOGS</a>
          </Button>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative mt-12 flex flex-col items-center gap-4 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-blue-500/50 to-transparent animate-bounce" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-black">Hover trigger words to decrypt my story</span>
      </motion.div>
    </section>
  )
}

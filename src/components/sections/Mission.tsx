"use client"

import { motion } from "framer-motion"
import { Target } from "lucide-react"

export function Mission() {
  return (
    <section className="py-12 px-6 md:py-24 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 blur-[100px] -z-10" />
      
      <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-[40px] bg-gradient-to-br from-card to-background border border-primary/10 relative overflow-hidden group">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center gap-8"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
            <Target className="w-8 h-8" />
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Current Mission</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              A 6-MONTH SPRINT TO <br className="hidden md:block" />
              DEEP ENGINEERING SKILL.
            </h2>
          </div>
          
          <div className="flex flex-col gap-6 text-lg md:text-xl text-muted-foreground max-w-2xl font-medium leading-relaxed italic">
            <p>
              Laksh is on a <span className="text-foreground font-bold">6-month sprint</span> to become a deeply skilled AI engineer while building a <span className="text-foreground font-bold underline decoration-primary/40 underline-offset-8">$10k/month AI business</span>.
            </p>
            <p>
              Everything he learns and builds is documented in public. No fluff. No hiding the failures.
            </p>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/sprint" 
              className="mt-4 px-10 py-5 bg-foreground text-background rounded-full font-black text-lg tracking-tight hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
            >
              FOLLOW THE PROGRESS
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

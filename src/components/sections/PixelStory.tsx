"use client"

import { motion } from "framer-motion"

export function PixelStory() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group"
        >
          {/* Video element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-[1.01]"
          >
            <source src="/videos/2d_pixel_art_1080p_202601260438.mp4" type="video/mp4" />
          </video>

          {/* Mask for VO tag and logo - localized vignettes */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top edge shadow */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent" />
            {/* Bottom edge shadow (hides VO tag) */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            {/* Left side shadow */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/40 to-transparent" />
            {/* Right side shadow */}
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/40 to-transparent" />
          </div>

          {/* Retro Overlay Effect (Scanlines) */}
          <div className="scanline" />
          
          {/* Glass Overlay with Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl bg-black/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">Protocol 180 // Initialized</span>
              </div>
              <h2 className="text-2xl md:text-5xl font-medium tracking-tighter text-white mb-4 uppercase italic">The Hermit Phase</h2>
              <p className="text-sm md:text-lg text-white/60 font-medium leading-relaxed italic">
                Leaving college was the shift. Rebuilding the stack from the binary up is the mission. 
                180 days in the vault until I emerge as the engineer I was always meant to be.
              </p>
            </motion.div>
          </div>

          {/* Glitch Frame Detail */}
          <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
            <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">Status</span>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest font-bold">Synchronizing...</span>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-12 flex flex-col items-center gap-4 opacity-20">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.5em] font-black">Memory_Artifact_01</span>
        </div>
      </div>
    </section>
  )
}

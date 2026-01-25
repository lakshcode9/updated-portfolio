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

          {/* Mask for VO tag - localized to bottom right corner only */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Very subtle subtle gradient specifically for the bottom-right corner to hide VO */}
            <div className="absolute bottom-0 right-0 w-64 h-32 bg-gradient-to-tl from-black via-black/40 to-transparent opacity-90" />
            {/* Subtle top/bottom vignettes for cinematic look */}
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Retro Overlay Effect (Scanlines) */}
          <div className="scanline" />
          
          {/* HUD Overlay with Content - Moved to Corner */}
          <div className="absolute inset-0 p-6 md:p-12 z-10 flex flex-col justify-end items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-md bg-black/60 backdrop-blur-lg p-8 rounded-2xl border border-white/10 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">Artifact_01 // 180_Days</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tighter text-white mb-3 uppercase italic">The Hermit Phase</h2>
              <p className="text-xs md:text-base text-white/80 font-medium leading-relaxed italic">
                Leaving college was the shift. Rebuilding the stack from the binary up is the mission. 
              </p>
            </motion.div>
          </div>

          {/* Top Label Detail */}
          <div className="absolute top-8 right-8 flex flex-col items-end z-20">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] leading-none mb-1">Archive_Status</span>
              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest font-bold animate-pulse">Synchronizing_Core...</span>
          </div>

          {/* Bottom Label Detail */}
          <div className="absolute bottom-8 right-10 z-20">
              <span className="text-[9px] font-mono text-white/10 uppercase tracking-[0.8em] font-black italic">MEM_LOG: LAKSH_VAULT</span>
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

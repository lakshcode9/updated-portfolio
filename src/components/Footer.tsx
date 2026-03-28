"use client"

import { Github, Instagram, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  
  // Hide footer on the learn dashboard to prevent sidebar overlap
  if (pathname?.startsWith("/learn")) return null

  return (
    <footer className="border-t border-border/40 py-16 px-6 bg-card/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8 text-center md:text-left">
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold tracking-tighter">LAKSH</h3>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Building AI systems that turn chaos into working products.
          </p>
        </div>
        
        <div className="flex items-center gap-8 md:gap-6">
          <a href="mailto:info@lakshpujary.tech" className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2" aria-label="Email">
            <Mail className="w-6 h-6 md:w-5 md:h-5" />
          </a>
          <a href="https://github.com/lakshcode9" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2" aria-label="GitHub">
            <Github className="w-6 h-6 md:w-5 md:h-5" />
          </a>
          <a href="https://www.instagram.com/lakshbuilds/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2" aria-label="Instagram">
            <Instagram className="w-6 h-6 md:w-5 md:h-5" />
          </a>
        </div>
        
        <p className="text-[10px] md:text-xs text-muted-foreground/60 uppercase tracking-widest font-medium">
          © {new Date().getFullYear()} Laksh. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

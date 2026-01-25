"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const navItems = [
  { name: "Work", href: "/#work" },
  { name: "Systems", href: "/systems" },
  { name: "Sprint", href: "/sprint" },
  { name: "Contact", href: "/#contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  if (pathname?.startsWith("/learn")) return null

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between p-4 md:p-6 md:justify-center transition-all duration-300",
      isOpen ? "bg-background" : "backdrop-blur-xl bg-background/80 border-b border-border/40"
    )}>
      <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-start">
        <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
          LAKSH
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden text-foreground p-2 -mr-2 relative z-[1001]"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          <div className="space-y-1.5 flex flex-col items-end">
            <span className={cn("block w-6 h-0.5 bg-current transition-transform duration-300 origin-right", isOpen && "-rotate-45 translate-y-[1px]")}></span>
            <span className={cn("block w-4 h-0.5 bg-current transition-opacity duration-300", isOpen && "opacity-0")}></span>
            <span className={cn("block w-6 h-0.5 bg-current transition-transform duration-300 origin-right", isOpen && "rotate-45 -translate-y-[1px]")}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#030303] z-[2000] md:hidden flex flex-col items-center justify-center p-6"
          >
            {/* Close button inside full screen menu */}
            <button 
              className="absolute top-6 right-6 p-2 text-white hover:opacity-70 transition-opacity"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex flex-col items-center gap-12">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-5xl font-bold tracking-tighter transition-all hover:scale-110 uppercase",
                    pathname === item.href ? "text-white" : "text-white/40"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Work", href: "/#work" },
  { name: "Systems", href: "/systems" },
  { name: "Sprint", href: "/sprint" },
  { name: "Contact", href: "/#contact" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:justify-center backdrop-blur-md bg-background/50 border-b border-border/40">
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
          className="md:hidden text-foreground p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1.5">
            <span className={cn("block w-6 h-0.5 bg-current transition-transform duration-300", isOpen && "rotate-45 translate-y-2")}></span>
            <span className={cn("block w-6 h-0.5 bg-current transition-opacity duration-300", isOpen && "opacity-0")}></span>
            <span className={cn("block w-6 h-0.5 bg-current transition-transform duration-300", isOpen && "-rotate-45 -translate-y-2")}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border/40 p-6 md:hidden flex flex-col items-center gap-6 shadow-2xl"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

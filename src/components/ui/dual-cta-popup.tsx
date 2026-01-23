"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Building2, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DualCTAPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already shown this session
    if (typeof window !== "undefined") {
      const alreadyShown = sessionStorage.getItem("popup_shown");
      if (alreadyShown) {
        return;
      }
    }

    // Show popup after 8 seconds delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem("popup_shown", "true");
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[201] max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-card border border-border/40 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">Choose Your Path</span>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight mt-2">
                  How Can I Help You?
                </h2>
                <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto">
                  Whether you&apos;re learning AI engineering or need systems built for your business, I&apos;ve got you covered.
                </p>
              </div>

              {/* Dual Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Option 1: Individuals */}
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-background border border-border/40 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium">Learn From Me</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground flex-1">
                    Get personalized guidance on your AI engineering journey. 1:1 coaching, roadmap reviews, and accountability.
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    <Button 
                      className="w-full rounded-full font-medium group"
                      asChild
                    >
                      <a href="https://cal.com/lakshpujary" target="_blank" rel="noopener noreferrer">
                        Book a 1:1 Call
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full font-medium"
                      asChild
                    >
                      <a href="/The_180-Day_AI_Engineer_Sprint.pdf" target="_blank">
                        <Download className="w-4 h-4 mr-2" />
                        Download Free Roadmap
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Option 2: Businesses */}
                <div className="flex flex-col gap-4 p-6 rounded-xl bg-background border border-border/40 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-medium">Hire My Agency</h3>
                  </div>
                  
                  <p className="text-sm text-muted-foreground flex-1">
                    Need AI automation for your business? We build lead gen systems, WhatsApp bots, and custom AI pipelines.
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    <Button 
                      className="w-full rounded-full font-medium bg-blue-500 hover:bg-blue-600 group"
                      asChild
                    >
                      <a href="https://autoikigai.systems" target="_blank" rel="noopener noreferrer">
                        Explore AutoIkigai
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full rounded-full font-medium"
                      asChild
                    >
                      <a href="https://cal.com/lakshpujary/agency" target="_blank" rel="noopener noreferrer">
                        Book a Discovery Call
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <p className="text-center text-xs text-muted-foreground mt-6">
                Not sure? <a href="mailto:lakshpoojary64@gmail.com" className="text-primary hover:underline">Email me</a> and let&apos;s figure it out together.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

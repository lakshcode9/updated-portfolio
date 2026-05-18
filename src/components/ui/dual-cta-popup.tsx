"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Building2, ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DualCTAPopupProps {
  triggerAfterMs?: number;
  enabled?: boolean;
}

export function DualCTAPopup({ triggerAfterMs = 5000, enabled = true }: DualCTAPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Check if already shown this session
    const alreadyShown = sessionStorage.getItem("popup_shown");
    if (alreadyShown === "true") {
      setHasTriggered(true);
      return;
    }

    // Guaranteed timer-based trigger
    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasTriggered(true);
      sessionStorage.setItem("popup_shown", "true");
    }, triggerAfterMs);

    return () => clearTimeout(timer);
  }, [enabled, hasTriggered, triggerAfterMs]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[3000]"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[3001] max-w-3xl w-full flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="bg-card border border-border/40 rounded-2xl shadow-2xl relative w-full flex flex-col max-h-[90vh] pointer-events-auto overflow-hidden">
              {/* Close Button - Outside scrollable area */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-foreground/80 hover:text-foreground transition-colors z-[3010] p-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 md:bg-transparent md:border-none"
                aria-label="Close popup"
              >
                <X className="w-6 h-6 md:w-5 md:h-5" />
              </button>

              <div className="overflow-y-auto p-6 md:p-8">
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
                      <h3 className="text-lg font-medium">Learn AI With Me</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground flex-1">
                      Whether you&apos;re starting an AI agency, a professional wanting to use AI at work, or just leveling up your skills—I&apos;ll help you get there faster.
                    </p>

                    <div className="flex flex-col gap-3 mt-2">
                      <Button 
                        className="w-full rounded-full font-medium group"
                        asChild
                      >
                        <a href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-coaching" target="_blank" rel="noopener noreferrer">
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
                          Download My Roadmap
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
                        className="w-full rounded-full font-medium bg-blue-600 hover:bg-blue-700 group"
                        asChild
                      >
                        <a href="https://autoikigai.space" target="_blank" rel="noopener noreferrer">
                          Explore AutoIkigai
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full rounded-full font-medium"
                        asChild
                      >
                        <a href="https://cal.com/ラクシュ-9q0fjl/intro-meeting-for-businesses" target="_blank" rel="noopener noreferrer">
                          Book a Discovery Call
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                  Not sure? <a href="mailto:info@lakshpujary.tech" className="text-primary hover:underline">Email me</a> and let&apos;s figure it out together.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

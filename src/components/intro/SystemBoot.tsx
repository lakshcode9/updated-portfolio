"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemBootProps {
  onBootComplete: () => void;
}

export const SystemBoot: React.FC<SystemBootProps> = ({ onBootComplete }) => {
  const [bootStep, setBootStep] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Fake boot sequence logs
  const logs = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MAP...",
    "VERIFYING SYSTEM INTEGRITY...",
    "ESTABLISHING SECURE CONNECTION...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    if (bootStep < logs.length) {
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
      }, 400); // Fast log scrolling
      return () => clearTimeout(timer);
    }
  }, [bootStep, logs.length]);

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Play sound here if we had one
    setTimeout(() => {
      onBootComplete();
    }, 1500); // Wait for unlock animation
  };

  return (
    <motion.div
      className={cn(
        "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black font-mono text-white overflow-hidden",
        isUnlocked && "pointer-events-none"
      )}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            className="w-full max-w-md px-6 flex flex-col gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            {/* Terminal Logs */}
            <div className="w-full h-32 flex flex-col justify-end text-xs md:text-sm text-green-500/70 border-l-2 border-green-500/30 pl-4 font-mono">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: bootStep >= i ? 1 : 0, x: bootStep >= i ? 0 : -10 }}
                  className="mb-1"
                >
                  {`> ${log}`}
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-green-500 mt-1"
                style={{ display: bootStep >= logs.length ? "block" : "none" }}
              />
            </div>

            {/* Interaction Area */}
            {bootStep >= logs.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-6"
              >
                <div className="text-center space-y-2">
                  <h1 className="text-2xl md:text-3xl font-bold tracking-[0.2em]">RESTRICTED AREA</h1>
                  <p className="text-muted-foreground text-sm uppercase tracking-widest">Identify yourself to proceed</p>
                </div>

                <button
                  onClick={handleUnlock}
                  className="group relative flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all active:scale-95"
                >
                  <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-white/20 group-hover:border-white/40 transition-colors">
                    <Lock className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">Access Protocol</div>
                    <div className="text-lg font-bold tracking-widest text-white group-hover:text-blue-400 transition-colors">ENTER_SYSTEM</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:translate-x-1 group-hover:text-blue-400 transition-all" />
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-full blur-xl transition-all" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock Animation Overlay */}
      <AnimatePresence>
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center bg-white"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-black text-4xl font-bold tracking-tighter"
            >
              ACCESS GRANTED
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

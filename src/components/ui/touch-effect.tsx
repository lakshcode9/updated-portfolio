"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function TouchEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    // Only enable on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const newRipple = {
        id: Date.now(),
        x: touch.clientX,
        y: touch.clientY,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 800);
    };

    window.addEventListener("touchstart", handleTouchStart);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute rounded-full bg-white/30 border border-white/50 blur-[1px]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "40px",
              height: "40px",
              x: "-50%",
              y: "-50%",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

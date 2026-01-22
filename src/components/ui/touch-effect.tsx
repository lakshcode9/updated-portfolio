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
            initial={{ opacity: 0.6, scale: 0, borderWidth: "2px" }}
            animate={{ opacity: 0, scale: 1.5, borderWidth: "0px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }} // Cubic bezier for "pop"
            className="absolute rounded-full border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "50px",
              height: "50px",
              x: "-50%",
              y: "-50%",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

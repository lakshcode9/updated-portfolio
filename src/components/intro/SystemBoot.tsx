"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemBootProps {
  onBootComplete: () => void;
}

export const SystemBoot: React.FC<SystemBootProps> = ({ onBootComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-dismiss after 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onBootComplete, 800); // Wait for exit animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onBootComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          {/* Curtain Effect - Top */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 bg-black z-10"
            exit={{ 
              y: "-100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
          />
          
          {/* Curtain Effect - Bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-black z-10"
            exit={{ 
              y: "100%",
              transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
          />

          {/* Center Text */}
          <motion.div
            className="relative z-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              lakshpujary.tech
            </h1>
            <motion.div 
              className="w-24 h-[2px] bg-white/30"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

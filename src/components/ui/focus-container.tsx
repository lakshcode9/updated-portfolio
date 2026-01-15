"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface FocusContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusContainer: React.FC<FocusContainerProps> = ({ children, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Removed blur/opacity effects as they were causing visibility issues
  // The scroll snap in page.tsx now handles the "focus" aspect mechanically
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

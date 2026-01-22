"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the follower
  const springConfig = { damping: 25, stiffness: 100 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-10%", // Adjust based on the cursor's hot spot (usually top-left)
        translateY: "-10%", 
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <img
          src="/cursors/cursor.png"
          alt="Cursor"
          className={`w-12 h-auto transition-opacity duration-200 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] ${isHovering ? "opacity-0" : "opacity-100"}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
        <img
          src="/cursors/pointer.png"
          alt="Pointer"
          className={`w-12 h-auto transition-opacity duration-200 drop-shadow-[0_0_2px_rgba(255,255,255,0.8)] ${isHovering ? "opacity-100" : "opacity-0"}`}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { cursorMode, cursorText } = useCursor();
  const [isTouch, setIsTouch] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check touch screen
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Apply cursor-none class to body when custom cursor is active
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorMode !== "default";

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
    >
      <motion.div
        animate={{
          width: isExpanded ? 84 : 12,
          height: isExpanded ? 84 : 12,
          scale: isExpanded ? 1 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`flex items-center justify-center rounded-full border border-champagne/40 bg-caramel/20 backdrop-blur-sm transition-colors duration-300 ${
          isExpanded ? "bg-caramel/80 text-espresso shadow-xl shadow-caramel/20 border-champagne" : "bg-champagne"
        }`}
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-bold tracking-widest text-espresso uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

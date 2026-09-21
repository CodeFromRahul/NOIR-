"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-espresso text-cream"
        >
          {/* Glowing ambient light */}
          <div className="absolute w-96 h-96 bg-cocoa/30 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            <h1 className="font-serif text-5xl md:text-7xl tracking-[0.25em] font-light text-champagne mb-4">
              NOIRÉ
            </h1>
            
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 0.8, letterSpacing: "0.25em" }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xs uppercase font-light text-cream/70 tracking-[0.25em]"
            >
              Crafted slowly.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute bottom-16 w-32 h-[1px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

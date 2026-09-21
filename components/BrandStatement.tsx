"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BrandStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const statementText = "GOOD CHOCOLATE TAKES TIME.";
  const words = statementText.split(" ");

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] flex items-center justify-center py-32 px-6 bg-espresso bg-noise overflow-hidden"
    >
      {/* Background glow & subtle texture */}
      <div className="absolute w-[600px] h-[600px] bg-cocoa/20 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,130,74,0.05)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 space-y-8">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.35em] text-caramel font-semibold"
        >
          Philosophical Imperative
        </motion.span>

        <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl tracking-[0.02em] font-light text-cream leading-[1.05] flex flex-wrap justify-center gap-x-6 gap-y-3">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.2 + idx * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={idx === 1 ? "gold-gradient-text italic font-normal" : ""}
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="font-serif text-lg sm:text-xl text-cream/70 italic font-light max-w-xl mx-auto pt-6"
        >
          No shortcuts in fermentation. No artificial hurry in conching. Only patience and reverence for the bean.
        </motion.p>
      </div>
    </section>
  );
}

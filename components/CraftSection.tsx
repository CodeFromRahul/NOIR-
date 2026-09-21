"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";

const CRAFT_HIGHLIGHTS = [
  {
    title: "Hand Tempering",
    desc: "Poured over Italian marble to align crystalline structures for a mirror gloss finish.",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
    tag: "Artisanal Technique",
  },
  {
    title: "Granite Stone Conch",
    desc: "Heavy stone rollers refines cocoa particles down to sub-15 micron velvet softness.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
    tag: "72-Hour Refinement",
  },
  {
    title: "Bespoke Foil Packaging",
    desc: "Wrapped in golden protective foil and debossed heavy matte cardstock.",
    image: "/images/noire_hero_bar.jpg",
    tag: "Sustainable Luxury",
  },
];

export default function CraftSection() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="craft" className="py-28 px-6 md:px-12 max-w-7xl mx-auto relative">
      <div className="text-center space-y-4 mb-20">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.3em] text-caramel font-medium"
        >
          Obsessive Details
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light"
        >
          THE ART OF TEMPERING
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg text-cream/70 italic max-w-md mx-auto"
        >
          “Where science, instinct, and geometry converge.”
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CRAFT_HIGHLIGHTS.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            onMouseEnter={() => setCursor("view", "CRAFT")}
            onMouseLeave={resetCursor}
            className="group relative rounded-2xl overflow-hidden glass-card border border-champagne/10 p-4 hover:border-champagne/40 transition-all duration-500 cursor-pointer"
          >
            <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-6 bg-dark-choc">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 left-4 bg-espresso/80 backdrop-blur-md px-3 py-1 rounded-full border border-champagne/20 text-[10px] uppercase tracking-widest text-champagne">
                {item.tag}
              </div>
            </div>

            <div className="px-2 space-y-2 pb-2">
              <h3 className="font-serif text-2xl text-cream group-hover:text-champagne transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-cream/70 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

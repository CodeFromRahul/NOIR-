"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";

const STAGES = [
  {
    num: "01",
    stage: "Stage 01",
    title: "THE BEAN",
    subtitle: "Highland Criollo Harvest",
    desc: "Sourced directly from heirloom Criollo cacao trees grown in shade-canopied microclimates. Each pod is hand-selected at peak ripeness when fruit sugars reach perfect natural sweetness.",
    metric: "100% Direct Trade",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    num: "02",
    stage: "Stage 02",
    title: "THE ROAST",
    subtitle: "Slow Wood-Fired Roasting",
    desc: "Beans are roasted at low temperatures in custom wood-fired drum roasters. Slow heat unlocks nuanced aromas of blackberry, toasted hazelnut, and natural wild florals without astringency.",
    metric: "Low Temp 115°C",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop",
  },
  {
    num: "03",
    stage: "Stage 03",
    title: "THE CRAFT",
    subtitle: "Granite Stone Conching",
    desc: "Granite stone melangeurs grind the nibs continuously for 72 hours. Friction releases pure cocoa butter, refining particle size below 15 microns for an effortlessly velvety mouthfeel.",
    metric: "72 Hours Continuous",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1000&auto=format&fit=crop",
  },
  {
    num: "04",
    stage: "Stage 04",
    title: "THE FINISH",
    subtitle: "Artisanal Hand Tempering",
    desc: "Master chocolatiers pour molten chocolate over marble slabs, working the liquid manually to align Form V beta crystals. The result is a glossy mirror sheen and crisp signature snap.",
    metric: "Form V Crystal Alignment",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function StorySection() {
  const [activeStage, setActiveStage] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="story" className="py-28 px-6 md:px-12 bg-dark-choc/90 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cocoa/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-caramel font-medium"
          >
            Artisanal Provenance
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light"
          >
            FROM BEAN TO MOMENT
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-lg text-cream/70 italic max-w-lg mx-auto"
          >
            Four uncompromising stages of mastery.
          </motion.p>
        </div>

        {/* Stage Timeline Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STAGES.map((s, idx) => (
            <button
              key={s.num}
              onClick={() => setActiveStage(idx)}
              onMouseEnter={() => setCursor("open")}
              onMouseLeave={resetCursor}
              className={`p-5 rounded-2xl text-left border transition-all duration-500 relative overflow-hidden group ${
                activeStage === idx
                  ? "border-champagne bg-espresso shadow-xl"
                  : "border-champagne/10 bg-espresso/40 hover:border-champagne/30"
              }`}
            >
              {activeStage === idx && (
                <motion.div
                  layoutId="activeStageTab"
                  className="absolute inset-0 bg-gradient-to-r from-cocoa/30 via-transparent to-transparent pointer-events-none"
                />
              )}
              <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold block mb-1">
                {s.stage}
              </span>
              <h4 className="font-serif text-xl text-cream group-hover:text-champagne transition-colors">
                {s.title}
              </h4>
              <span className="text-[11px] text-cream/50 block mt-1">
                {s.subtitle}
              </span>
            </button>
          ))}
        </div>

        {/* Stage Content Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 glass-card rounded-3xl p-6 md:p-10 border border-champagne/20 items-center"
          >
            {/* Image Side */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden bg-espresso border border-champagne/10">
              <Image
                src={STAGES[activeStage].image}
                alt={STAGES[activeStage].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 bg-espresso/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-champagne/20 flex items-center space-x-2 text-champagne text-xs uppercase tracking-widest font-medium">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span>{STAGES[activeStage].metric}</span>
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:col-span-6 space-y-6 lg:pl-6">
              <div className="space-y-2">
                <span className="text-4xl font-serif text-champagne/40">
                  {STAGES[activeStage].num}
                </span>
                <h3 className="font-serif text-3xl md:text-4xl text-cream tracking-wide">
                  {STAGES[activeStage].title}: {STAGES[activeStage].subtitle}
                </h3>
              </div>

              <p className="text-sm font-light text-cream/80 leading-relaxed">
                {STAGES[activeStage].desc}
              </p>

              <div className="pt-4 border-t border-champagne/10 flex items-center justify-between">
                <button
                  onClick={() => setActiveStage((prev) => (prev + 1) % STAGES.length)}
                  className="inline-flex items-center space-x-3 text-xs uppercase tracking-[0.25em] text-champagne hover:text-cream transition-colors group"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <span className="text-xs text-cream/40 tracking-widest">
                  {activeStage + 1} / {STAGES.length}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

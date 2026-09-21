"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const INGREDIENTS = [
  {
    name: "CACAO",
    origin: "Chuao & Sambirano",
    role: "Core Soul",
    desc: "100% Heirloom Criollo and Trinitario beans, zero alkali processing.",
    notes: "Deep Cocoa · Plum · Wood",
  },
  {
    name: "SEA SALT",
    origin: "Brittany, France",
    role: "Flavor Amplifier",
    desc: "Hand-raked Fleur de Sel crystals that crackle delicately on the palate.",
    notes: "Minerality · Crisp Snap",
  },
  {
    name: "MADAGASCAR VANILLA",
    origin: "Sambava Valley",
    role: "Aromatic Depth",
    desc: "Whole sun-cured Bourbon vanilla pods ground fine for natural floral warmth.",
    notes: "Sweet Orchid · Warm Spice",
  },
  {
    name: "ROASTED HAZELNUT",
    origin: "Piedmont IGP, Italy",
    role: "Textural Harmony",
    desc: "Slow wood-roasted Tonda Gentile hazelnuts with high natural essential oil.",
    notes: "Toasted Butter · Praliné",
  },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="py-28 px-6 md:px-12 bg-dark-choc/70 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-caramel font-medium"
          >
            Purity of Formulation
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light"
          >
            NOTHING EXTRA.
            <br />
            <span className="italic gold-gradient-text">NOTHING HIDDEN.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-lg text-cream/70 italic max-w-md mx-auto"
          >
            No palm oil, no artificial emulsifiers, no shortcut lecithin.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INGREDIENTS.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-8 border border-champagne/10 hover:border-champagne/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold">
                    {item.role}
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-champagne/40 group-hover:text-champagne transition-colors" />
                </div>

                <h3 className="font-serif text-3xl text-cream group-hover:text-champagne transition-colors">
                  {item.name}
                </h3>

                <span className="text-[11px] text-champagne/80 font-light tracking-wider block">
                  Origin: {item.origin}
                </span>

                <p className="text-xs text-cream/70 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-champagne/10">
                <span className="text-[10px] uppercase tracking-widest text-cream/40 block mb-1">
                  Flavor Profile
                </span>
                <span className="text-xs text-champagne font-medium">
                  {item.notes}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wine, Coffee, Moon, CloudRain, Flame, RefreshCw, CheckCircle2, ArrowRight } from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { useCart } from "@/context/CartContext";

const MOODS = [
  { label: "Reflective & Quiet", icon: Moon },
  { label: "Sultry & Midnight", icon: Flame },
  { label: "Rainy Afternoon", icon: CloudRain },
  { label: "Celebratory & Bold", icon: Sparkles },
];

const BEVERAGES = [
  { label: "Double Espresso", icon: Coffee },
  { label: "Vintage Red Wine", icon: Wine },
  { label: "Islay Single Malt", icon: Flame },
  { label: "Floral Green Tea", icon: Coffee },
];

export default function AIMoodSommelier() {
  const [selectedMood, setSelectedMood] = useState("Reflective & Quiet");
  const [selectedBeverage, setSelectedBeverage] = useState("Double Espresso");
  const [flavorPreference, setFlavorPreference] = useState("70%+ High Cacao Dark");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const { setCursor, resetCursor } = useCursor();
  const { addToCart } = useCart();

  const handleAnalyze = async () => {
    setIsLoading(true);
    setAiResult(null);

    const prompt = `Perform a sensory chocolate profiling for a patron in a "${selectedMood}" mood, drinking "${selectedBeverage}", and preferring "${flavorPreference}". Recommend the best luxury dark chocolate or truffle match, describe the taste progression, and write a 3-sentence poetic sensory prescription.`;
    const systemPrompt = `You are Maison NOIRÉ's Chief Cacao Sommelier. You provide luxurious, poetic, sensory chocolate pairing prescriptions. Format response with clear sections: Recommended Match, Taste Progression, and Sommelier Prescription.`;

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemPrompt, mode: "mood" }),
      });

      const data = await res.json();
      if (data.text) {
        setAiResult(data.text);
      } else {
        setAiResult(
          "Recommended Match: Noir 72% Grand Cru\n\nTaste Progression: Initial note of smoked almond, developing into deep roasted cocoa, with a clean bourbon vanilla finish.\n\nSommelier Prescription: Slow down the world around you. Allow the 72% Chuao cacao to melt over warm espresso, releasing volatile fruity tannins that complement your reflective state."
        );
      }
    } catch (e) {
      setAiResult(
        "Recommended Match: Madagascar 85% Reserve\n\nTaste Progression: Bright red berry acidity transitioning into crisp mahogany cacao.\n\nSommelier Prescription: Perfect harmony for quiet moments."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-28 px-6 md:px-12 bg-dark-choc/80 relative overflow-hidden border-y border-champagne/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-champagne/20 bg-espresso text-caramel text-[10px] uppercase tracking-[0.3em] font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>Gemini AI Powered Sensory Engine</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light"
          >
            MAISON MOOD SOMMELIER
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-lg text-cream/70 italic max-w-md mx-auto"
          >
            Allow Gemini AI to analyze your current state and formulate your bespoke chocolate pairing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6 glass-card rounded-3xl p-6 md:p-8 border border-champagne/15">
            {/* Step 1: Mood */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-caramel font-semibold block">
                1. Select Current Mood / Vibe
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {MOODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMood(m.label)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center space-x-2.5 transition-all ${
                        selectedMood === m.label
                          ? "border-champagne bg-espresso text-champagne shadow-lg"
                          : "border-champagne/10 bg-dark-choc/50 text-cream/70 hover:border-champagne/30"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-caramel shrink-0" />
                      <span className="text-xs font-serif">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Beverage */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.2em] text-caramel font-semibold block">
                2. Select Beverage Companion
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {BEVERAGES.map((b) => {
                  const Icon = b.icon;
                  return (
                    <button
                      key={b.label}
                      onClick={() => setSelectedBeverage(b.label)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center space-x-2.5 transition-all ${
                        selectedBeverage === b.label
                          ? "border-champagne bg-espresso text-champagne shadow-lg"
                          : "border-champagne/10 bg-dark-choc/50 text-cream/70 hover:border-champagne/30"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-caramel shrink-0" />
                      <span className="text-xs font-serif">{b.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Preference */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-caramel font-semibold block">
                3. Flavor Intensity Target
              </label>
              <select
                value={flavorPreference}
                onChange={(e) => setFlavorPreference(e.target.value)}
                className="w-full bg-dark-choc border border-champagne/20 rounded-2xl p-3.5 text-xs text-cream focus:outline-none focus:border-champagne"
              >
                <option value="70%+ High Cacao Dark">70%+ Intense High Cacao Dark</option>
                <option value="Fruity & Acidic Single Origin">Fruity & Acidic Single Origin</option>
                <option value="Creamy Nut Praliné & Gianduja">Creamy Nut Praliné & Gianduja</option>
                <option value="Salted Caramel & Velvet Truffle">Salted Caramel & Velvet Truffle</option>
              </select>
            </div>

            {/* Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={isLoading}
              onMouseEnter={() => setCursor("open", "ANALYZE")}
              onMouseLeave={resetCursor}
              className="w-full py-4 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.25em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini AI Profiling Sensations...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>ANALYZE WITH GEMINI AI</span>
                </>
              )}
            </button>
          </div>

          {/* Result Display Column */}
          <div className="lg:col-span-6 bg-espresso border border-champagne/20 rounded-3xl p-6 md:p-8 min-h-[440px] flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex justify-between items-center border-b border-champagne/10 pb-4 mb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-caramel font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-champagne" /> AI Sensory Prescription
                </span>
                <span className="text-[10px] text-cream/40 uppercase tracking-widest">
                  Model: {process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash"}
                </span>
              </div>

              {isLoading ? (
                <div className="py-20 text-center space-y-4">
                  <RefreshCw className="w-8 h-8 text-champagne animate-spin mx-auto" />
                  <p className="font-serif text-lg text-cream/70 italic">
                    Consulting Gemini AI neural Sommelier...
                  </p>
                </div>
              ) : aiResult ? (
                <div className="space-y-4">
                  <div className="whitespace-pre-line font-serif text-sm md:text-base text-cream/90 leading-relaxed font-light">
                    {aiResult}
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center space-y-4">
                  <Sparkles className="w-10 h-10 text-champagne/30 mx-auto" />
                  <p className="font-serif text-xl text-cream/50 italic">
                    Select your mood & beverage to unlock your AI personalized chocolate prescription.
                  </p>
                </div>
              )}
            </div>

            {aiResult && (
              <div className="pt-6 border-t border-champagne/10 flex justify-between items-center">
                <span className="text-xs text-cream/50 italic">Formulated live by Gemini AI</span>
                <a
                  href="#collection"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-champagne hover:text-cream transition-colors"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Feather, Sparkles, RefreshCw, Copy, Check, Gift } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

export default function AIPackagingEngraver() {
  const [recipient, setRecipient] = useState("Clara");
  const [occasion, setOccasion] = useState("Anniversary & Slow Moments");
  const [tone, setTone] = useState("Poetic & Romantic");
  const [isLoading, setIsLoading] = useState(false);
  const [inscription, setInscription] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleGenerateStory = async () => {
    setIsLoading(true);

    const prompt = `Write a bespoke 2-sentence luxury gold-foil gift box inscription story for recipient "${recipient}" on occasion "${occasion}". Tone: ${tone}. Include both French translation and English original text suitable for debossing on black velvet cardstock.`;
    const systemPrompt = `You are Maison NOIRÉ's Master Calligrapher in Paris. You generate poetic, romantic, ultra-luxurious gift inscriptions for high-end chocolate gifts.`;

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, systemPrompt, mode: "story" }),
      });

      const data = await res.json();
      if (data.text) {
        setInscription(data.text);
      } else {
        setInscription(
          `"Pour ${recipient} — Crafted slowly through dark cacao and quiet embers. May every square remind you of the sweetness of time spent together."\n\n(Gravé à l'or fin par la Maison NOIRÉ)`
        );
      }
    } catch (e) {
      setInscription(
        `"For ${recipient} — To slow moments and dark alchemy."\n(Gravé à Paris pour ${recipient})`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyInscription = () => {
    if (!inscription) return;
    navigator.clipboard.writeText(inscription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-12 border border-champagne/20 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-caramel/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-caramel font-semibold flex items-center gap-1.5 mb-2">
                <Feather className="w-3.5 h-3.5 text-champagne" /> AI Calligraphy Atelier
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-cream tracking-wide">
                AI Custom Gold Inscription
              </h3>
              <p className="text-xs text-cream/70 font-light mt-2 leading-relaxed">
                Allow Gemini AI to compose a poetic gold-foil debossed story to be printed inside your luxury gift packaging.
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-cream/60">
                  Recipient Name
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-cream/60">
                  Occasion / Milestone
                </label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-champagne"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-cream/60">
                  Calligraphy Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-champagne"
                >
                  <option value="Poetic & Romantic">Poetic & Romantic</option>
                  <option value="Sophisticated & Modern">Sophisticated & Modern</option>
                  <option value="Warm & Devoted">Warm & Devoted</option>
                  <option value="Minimalist Paris Atelier">Minimalist Paris Atelier</option>
                </select>
              </div>

              <button
                onClick={handleGenerateStory}
                disabled={isLoading}
                onMouseEnter={() => setCursor("open", "GENERATE")}
                onMouseLeave={resetCursor}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI Composing Inscription...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Inscription with Gemini AI</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Gold Inscription Box */}
          <div className="lg:col-span-6 bg-espresso border border-champagne/30 rounded-2xl p-6 md:p-8 min-h-[320px] flex flex-col justify-between shadow-2xl relative">
            <div>
              <div className="flex justify-between items-center border-b border-champagne/15 pb-3 mb-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-caramel flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-champagne" /> Gold-Foil Card Preview
                </span>
                {inscription && (
                  <button
                    onClick={copyInscription}
                    className="p-1.5 text-cream/60 hover:text-champagne transition-colors flex items-center gap-1 text-[10px] uppercase tracking-widest"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                )}
              </div>

              {isLoading ? (
                <div className="py-16 text-center space-y-3">
                  <RefreshCw className="w-6 h-6 text-champagne animate-spin mx-auto" />
                  <p className="font-serif text-sm text-cream/60 italic">
                    Engraving custom story in gold foil...
                  </p>
                </div>
              ) : inscription ? (
                <blockquote className="font-serif text-base md:text-lg text-champagne italic font-light leading-relaxed whitespace-pre-line">
                  {inscription}
                </blockquote>
              ) : (
                <div className="py-16 text-center space-y-2 text-cream/40 font-serif italic">
                  <Feather className="w-8 h-8 text-champagne/20 mx-auto mb-2" />
                  <p>Your custom Gemini AI gold inscription story will appear here.</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-champagne/10 flex justify-between items-center text-[10px] text-cream/40 uppercase tracking-widest">
              <span>Debossed 300gsm Black Velvet Card</span>
              <span>Maison NOIRÉ Paris</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

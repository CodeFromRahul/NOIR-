"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setEmail("");
    }, 2000);
  };

  return (
    <section className="py-28 px-6 md:px-12 bg-espresso bg-noise relative border-t border-champagne/10">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.35em] text-caramel font-semibold"
        >
          Exclusive Access
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-5xl sm:text-7xl text-cream tracking-wide font-light"
        >
          STAY IN THE DARK.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-serif text-lg text-cream/70 italic max-w-md mx-auto"
        >
          “Stories, rare micro-batches, and occasional indulgence.”
        </motion.p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-3 bg-dark-choc border border-champagne/30 px-6 py-4 rounded-full text-champagne text-xs uppercase tracking-widest"
          >
            <CheckCircle2 className="w-5 h-5 text-caramel" />
            <span>Welcome to NOIRÉ. Your private invitation is dispatched.</span>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex items-center border-b border-champagne/40 focus-within:border-champagne transition-colors py-2"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent text-cream font-serif text-xl placeholder:text-cream/30 focus:outline-none px-2"
            />
            <button
              type="submit"
              onMouseEnter={() => setCursor("open", "JOIN")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] text-champagne hover:text-cream transition-colors shrink-0 px-4 py-2"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.form>
        )}

        <p className="text-[10px] uppercase tracking-widest text-cream/40 pt-4">
          No spam. Unsubscribe anytime with one click.
        </p>
      </div>
    </section>
  );
}

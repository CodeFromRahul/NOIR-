"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "The kind of chocolate you stop eating everything else for.",
    author: "Éléonore de Saint-Germain",
    title: "Culinary Editor, Vogue Paris",
    rating: 5,
  },
  {
    quote: "An ethereal balance of bitter complexity and velvety finish. NOIRÉ redefines luxury confectionery.",
    author: "Chef Marcus Vance",
    title: "Three-Star Michelin Master",
    rating: 5,
  },
  {
    quote: "The packaging is haute couture, but the taste is pure unadulterated transcendence.",
    author: "Julian Thorne",
    title: "Design Director, Wallpaper*",
    rating: 5,
  },
  {
    quote: "Every single origin bar tells a sensory story of terrain, elevation, and artisanal patience.",
    author: "Sophia Lin",
    title: "International Cacao Sommelier",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);

  const prevTestimonial = () => {
    setCurrent((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setCurrent((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-28 px-6 md:px-12 bg-dark-choc/80 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <Quote className="w-12 h-12 text-champagne/20 mx-auto mb-6" />

        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-center space-x-1 text-caramel">
                {[...Array(TESTIMONIALS[current].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-caramel text-caramel" />
                ))}
              </div>

              <blockquote className="font-serif text-3xl sm:text-5xl text-cream font-light leading-snug tracking-wide italic max-w-3xl mx-auto">
                “{TESTIMONIALS[current].quote}”
              </blockquote>

              <div>
                <cite className="not-italic font-serif text-xl text-champagne block">
                  {TESTIMONIALS[current].author}
                </cite>
                <span className="text-xs uppercase tracking-[0.25em] text-cream/50 mt-1 block font-light">
                  {TESTIMONIALS[current].title}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex justify-center items-center space-x-6 mt-10">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full border border-champagne/20 text-cream/70 hover:text-cream hover:border-champagne hover:bg-white/5 transition-all"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex space-x-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-champagne" : "bg-champagne/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full border border-champagne/20 text-cream/70 hover:text-cream hover:border-champagne hover:bg-white/5 transition-all"
            aria-label="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

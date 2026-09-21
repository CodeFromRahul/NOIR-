"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Clock, User } from "lucide-react";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";

interface Article {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  snippet: string;
  fullText: string[];
  image: string;
  featured?: boolean;
}

const ARTICLES: Article[] = [
  {
    id: "art-of-tempering",
    title: "The Art of Tempering",
    category: "Technique",
    readTime: "5 min read",
    date: "September 14, 2026",
    author: "Master Chocolatier Jean-Luc",
    featured: true,
    snippet: "Why crystal Form V is the secret behind that clean crisp snap and mirror sheen finish.",
    fullText: [
      "Tempering chocolate is not merely an engineering phase—it is a conversation with cocoa butter molecules. Pure cocoa butter exhibits polymorphous crystallization, forming six distinct crystal structures (Form I through Form VI). Only Form V yields the signature glossy sheen, high heat resistance, and satisfying snap when broken.",
      "Our chocolatiers temper entirely by hand over heavy Italian Carrara marble slabs. By pouring two-thirds of melted dark chocolate at 45°C onto the cool marble, continuous scraping and folding agitates the liquid down to 27°C, encouraging dense Form V crystal nuclei to propagate.",
      "Once re-incorporated with the remaining warm chocolate, the mass stabilizes at exactly 31.5°C—the golden window of perfection before molding."
    ],
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "where-cacao-comes-from",
    title: "Where Our Cacao Comes From",
    category: "Terroir",
    readTime: "7 min read",
    date: "August 28, 2026",
    author: "Elena Rostova, Direct Sourcing",
    snippet: "Journey into the shade-canopied microclimates of Venezuela and Madagascar.",
    fullText: [
      "Terroir dictates flavor just as deeply in cacao as in fine wine. Our flagship Criollo beans originate from single-family micro-estates nestled between volcanic slopes and coastal mist.",
      "In Venezuela's Chuao valley, ocean breeze salt meets mineral-rich soil, instilling natural notes of toasted almond and dried prune. In Madagascar's Sambirano river valley, tropical rains and high sunshine yield citrus and red berry vibrancy.",
      "We pay 45% above Fair Trade minimums directly to farmers, insuring sustainable soil stewardship and heirloom tree preservation for generations."
    ],
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "why-dark-chocolate-tastes-different",
    title: "Why Dark Chocolate Tastes Different",
    category: "Sensory",
    readTime: "4 min read",
    date: "August 12, 2026",
    author: "Dr. Henriette Dupont",
    snippet: "Unpacking tannins, polyphenols, and the 600 volatile aroma compounds in high cacao.",
    fullText: [
      "A single bite of 72% dark chocolate contains over 600 aroma compounds—more than double that of red wine. Flavonoids, tannins, and essential oils dance across different taste receptors on the human tongue.",
      "Industrial chocolate masks astringency with heavy refining and added sugar. NOIRÉ celebrates natural bean acidity by conching slowly for 72 hours under low heat, allowing volatile acetic acid to evaporate gently while retaining delicate berry and floral top notes."
    ],
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ritual-of-slow-chocolate",
    title: "The Ritual of Slow Chocolate",
    category: "Lifestyle",
    readTime: "6 min read",
    date: "July 30, 2026",
    author: "Camille Laurent",
    snippet: "How to pause, observe, snap, and melt high cacao for complete mindfulness.",
    fullText: [
      "Eating chocolate quickly deprives the senses. Slow chocolate is an intentional mindfulness practice. Begin by breaking a square near your ear—listen for the sharp, high-frequency snap of Form V tempering.",
      "Inhale the aroma before placing the chocolate on your tongue. Allow it to melt naturally without chewing. As the cocoa butter warms to 34°C, aroma compounds release in waves: initial roasted nuts, mid-palette dried fruits, and a lingering dark cacao finish."
    ],
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="journal" className="py-28 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-caramel font-medium block mb-2">
            Editorial Perspectives
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl text-cream tracking-wide font-light">
            THE JOURNAL
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-cream/50 max-w-xs">
          Essays on cacao culture, artisanal craft, and sensory mindfulness.
        </p>
      </div>

      {/* Asymmetric Magazine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Featured Big Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setSelectedArticle(ARTICLES[0])}
          onMouseEnter={() => setCursor("open", "READ")}
          onMouseLeave={resetCursor}
          className="md:col-span-7 group glass-card rounded-3xl p-6 border border-champagne/10 hover:border-champagne/40 transition-all duration-500 cursor-pointer flex flex-col justify-between"
        >
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-6 bg-dark-choc">
            <Image
              src={ARTICLES[0].image}
              alt={ARTICLES[0].title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4 bg-espresso/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/20 text-[10px] uppercase tracking-widest text-champagne">
              {ARTICLES[0].category}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-cream/50">
              <span>{ARTICLES[0].date}</span>
              <span>{ARTICLES[0].readTime}</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-cream group-hover:text-champagne transition-colors">
              {ARTICLES[0].title}
            </h3>

            <p className="text-sm font-light text-cream/70 leading-relaxed">
              {ARTICLES[0].snippet}
            </p>

            <div className="pt-2 flex items-center space-x-2 text-xs uppercase tracking-widest text-champagne font-medium">
              <span>Read Full Story</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>
        </motion.div>

        {/* Right Stacked Articles */}
        <div className="md:col-span-5 flex flex-col space-y-8">
          {ARTICLES.slice(1).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              onClick={() => setSelectedArticle(article)}
              onMouseEnter={() => setCursor("open", "READ")}
              onMouseLeave={resetCursor}
              className="group glass-card rounded-2xl p-5 border border-champagne/10 hover:border-champagne/40 transition-all duration-500 cursor-pointer flex space-x-4 items-center"
            >
              <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-dark-choc shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-caramel">
                  <span>{article.category}</span>
                  <span className="text-cream/40">{article.readTime}</span>
                </div>

                <h4 className="font-serif text-xl text-cream group-hover:text-champagne transition-colors">
                  {article.title}
                </h4>

                <p className="text-xs text-cream/60 line-clamp-2 font-light">
                  {article.snippet}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Reader Drawer */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl p-4 md:p-12 overflow-y-auto flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-espresso border border-champagne/20 rounded-3xl p-6 md:p-12 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-dark-choc text-cream/70 hover:text-cream border border-champagne/20 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-caramel">
                <span>{selectedArticle.category}</span>
                <span>·</span>
                <span className="flex items-center space-x-1 text-cream/50">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{selectedArticle.readTime}</span>
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-5xl text-cream tracking-wide">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center space-x-3 text-xs text-cream/60 border-y border-champagne/10 py-3">
                <User className="w-4 h-4 text-champagne" />
                <span>By {selectedArticle.author}</span>
                <span>·</span>
                <span>Published {selectedArticle.date}</span>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-dark-choc border border-champagne/10">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 text-cream/80 font-light text-base leading-relaxed">
                {selectedArticle.fullText.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-champagne/10 text-center">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-8 py-3 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne hover:text-espresso transition-all"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

const ALL_SEARCH_ITEMS = [
  {
    id: "noir-72",
    name: "Noir 72% Grand Cru",
    category: "Dark Chocolate",
    cacao: "72%",
    price: 24,
    desc: "Notes of blackberry, roasted almond, and smoked bourbon vanilla.",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "sea-salt-caramel",
    name: "Sea Salt Caramel Velvet",
    category: "Filled Chocolates",
    cacao: "68%",
    price: 26,
    desc: "Slow-cooked butter caramel infused with hand-harvested Brittany sea salt.",
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "hazelnut-praline",
    name: "Hazelnut Praliné Crisp",
    category: "Praliné",
    cacao: "64%",
    price: 28,
    desc: "Piedmont hazelnut praliné layered with caramelized wafer crunch.",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "madagascar-85",
    name: "Madagascar 85% Reserve",
    category: "Single Origin",
    cacao: "85%",
    price: 30,
    desc: "Intense single-estate cacao with red berry acidity and crisp finish.",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "pistachio-velvet",
    name: "Pistachio Velvet Bar",
    category: "Specialty",
    cacao: "65%",
    price: 32,
    desc: "Bronte pistachio paste folded into velvety Venezuelan dark chocolate.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "espresso-dark",
    name: "Espresso Dark Infusion",
    category: "Dark Chocolate",
    cacao: "75%",
    price: 25,
    desc: "Ethiopian Yirgacheffe coffee beans finely ground with dark cacao.",
    image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredItems = ALL_SEARCH_ITEMS.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase()) ||
      item.cacao.includes(query)
  );

  const popularTags = ["72% Cacao", "Single Origin", "Caramel", "Pistachio", "Hazelnut", "Espresso"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[125] bg-espresso/95 backdrop-blur-2xl p-4 sm:p-6 md:p-12 overflow-y-auto flex flex-col"
        >
          {/* Header */}
          <div className="max-w-5xl mx-auto w-full flex justify-between items-center mb-8">
            <span className="font-serif text-2xl tracking-[0.2em] text-champagne">
              NOIRÉ SEARCH
            </span>
            <button
              onClick={onClose}
              className="p-3 text-cream/70 hover:text-cream hover:bg-white/5 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Large Input Box */}
          <div className="max-w-4xl mx-auto w-full mb-10 relative">
            <div className="flex items-center border-b border-champagne/30 focus-within:border-champagne transition-colors py-4">
              <Search className="w-8 h-8 text-champagne/60 mr-4 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search by flavor, cacao %, or origin..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-serif text-2xl md:text-4xl text-cream placeholder:text-cream/30 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-xs uppercase tracking-widest text-cream/50 hover:text-cream px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Popular Tags */}
            <div className="flex flex-wrap gap-2 mt-4 items-center">
              <span className="text-xs uppercase tracking-wider text-cream/50 mr-2">
                Popular Searches:
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="text-xs px-3.5 py-1.5 rounded-full border border-champagne/20 bg-dark-choc text-champagne/80 hover:text-cream hover:border-champagne transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          <div className="max-w-5xl mx-auto w-full flex-1">
            <h3 className="text-xs uppercase tracking-[0.25em] text-cream/50 mb-6">
              {filteredItems.length} {filteredItems.length === 1 ? "Product" : "Products"} Found
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group glass-card rounded-lg p-4 border border-champagne/10 hover:border-champagne/40 transition-all flex space-x-4 cursor-pointer"
                  onClick={() => {
                    onSelectProduct(item.id);
                    onClose();
                  }}
                >
                  <div className="relative w-20 h-24 rounded overflow-hidden bg-dark-choc shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] uppercase tracking-widest text-caramel">
                          {item.cacao} Cacao
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-cream/40 group-hover:text-champagne transition-colors" />
                      </div>
                      <h4 className="font-serif text-lg text-cream group-hover:text-champagne transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-cream/60 line-clamp-2 mt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-champagne/10">
                      <span className="font-serif text-cream font-medium">
                        ${item.price}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="text-[11px] uppercase tracking-wider text-champagne hover:underline"
                      >
                        + Add to Bag
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

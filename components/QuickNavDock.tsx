"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, Sparkles, Compass, Layers } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

interface QuickNavDockProps {
  onOpenSearch: () => void;
}

export default function QuickNavDock({ onOpenSearch }: QuickNavDockProps) {
  const { totalItems, openCart, isCheckoutOpen, isAuthModalOpen } = useCart();
  const { setCursor, resetCursor } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide dock if full checkout or auth modal is active
  if (isCheckoutOpen || isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          /* md:hidden ensures NO duplicate bottom navbar appears on laptop/desktop! */
          className="fixed bottom-4 left-4 z-30 md:hidden flex items-center space-x-1 bg-espresso/95 border border-champagne/30 rounded-full px-3 py-2 shadow-[0_15px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl"
        >
          <a
            href="#collection"
            className="p-1.5 text-cream/70 hover:text-champagne transition-colors rounded-full flex items-center space-x-1 text-[10px] uppercase font-medium"
            title="Collection"
          >
            <Layers className="w-4 h-4 text-caramel shrink-0" />
            <span className="text-[9px] uppercase tracking-wider">Catalog</span>
          </a>

          <a
            href="#story"
            className="p-1.5 text-cream/70 hover:text-champagne transition-colors rounded-full flex items-center space-x-1 text-[10px] uppercase font-medium"
            title="Bean-to-Moment Story"
          >
            <Compass className="w-4 h-4 text-caramel shrink-0" />
            <span className="text-[9px] uppercase tracking-wider">Story</span>
          </a>

          <a
            href="#mood"
            className="p-1.5 text-cream/70 hover:text-champagne transition-colors rounded-full flex items-center space-x-1 text-[10px] uppercase font-medium"
            title="AI Mood Sommelier"
          >
            <Sparkles className="w-4 h-4 text-caramel shrink-0" />
            <span className="text-[9px] uppercase tracking-wider">AI</span>
          </a>

          <div className="w-[1px] h-3.5 bg-champagne/20 mx-0.5" />

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 text-cream/70 hover:text-champagne transition-colors rounded-full"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Quick Bag */}
          <button
            onClick={openCart}
            className="relative p-1.5 text-cream/70 hover:text-champagne transition-colors rounded-full"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-caramel text-espresso font-bold text-[9px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

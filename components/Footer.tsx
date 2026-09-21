"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-espresso border-t border-champagne/10 pt-20 pb-12 px-6 md:px-12 text-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-champagne/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              onMouseEnter={() => setCursor("open", "NOIRÉ")}
              onMouseLeave={resetCursor}
              className="inline-block"
            >
              <h3 className="font-serif text-3xl tracking-[0.25em] text-cream font-light">
                NOIRÉ
              </h3>
            </Link>
            <p className="font-serif text-lg text-cream/70 italic">
              “Crafted slowly. Savoured completely.”
            </p>
            <p className="text-xs text-cream/50 font-light max-w-sm leading-relaxed">
              Heirloom single-origin cacao hand-crafted in limited micro-batches. Dedicated to the quiet luxury of slow moments.
            </p>
          </div>

          {/* Navigation Col */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-caramel font-semibold block mb-2">
              Navigation
            </span>
            <ul className="space-y-2.5 text-xs uppercase tracking-widest text-cream/70">
              {["Collection", "Our Story", "Craft", "Ingredients", "Journal"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "")}`}
                    className="hover:text-champagne transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact Col */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-caramel font-semibold block mb-2">
              Connect & Social
            </span>
            <div className="flex space-x-6 text-xs uppercase tracking-widest text-cream/70">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-champagne transition-colors"
              >
                Pinterest
              </a>
              <a
                href="mailto:concierge@noire-chocolatier.com"
                className="hover:text-champagne transition-colors"
              >
                Concierge
              </a>
            </div>

            <div className="pt-4 border-t border-champagne/10 space-y-1 text-xs text-cream/50">
              <p>Maison NOIRÉ Atelier</p>
              <p>Rue du Faubourg Saint-Honoré, Paris</p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-cream/40 space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#" className="hover:text-cream/70 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream/70 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cream/70 transition-colors">
              Luxury Shipping Policy
            </a>
          </div>

          <div className="flex items-center space-x-6">
            <span>© {new Date().getFullYear()} NOIRÉ Chocolatier. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setCursor("open", "TOP")}
              onMouseLeave={resetCursor}
              className="p-2.5 rounded-full border border-champagne/20 text-cream/70 hover:text-cream hover:border-champagne hover:bg-white/5 transition-all"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

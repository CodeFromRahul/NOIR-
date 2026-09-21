"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenSearch: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openCart, user, openAuthModal, logout } = useCart();
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Collection", href: "#collection" },
    { name: "Our Story", href: "#story" },
    { name: "Craft", href: "#craft" },
    { name: "Ingredients", href: "#ingredients" },
    { name: "Journal", href: "#journal" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-nav py-4 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-espresso/80 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            onMouseEnter={() => setCursor("open")}
            onMouseLeave={resetCursor}
            className="md:hidden text-cream/90 hover:text-champagne transition-colors p-2"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo */}
          <Link
            href="/"
            onMouseEnter={() => setCursor("open", "NOIRÉ")}
            onMouseLeave={resetCursor}
            className="group flex flex-col items-center"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.25em] font-light text-cream group-hover:text-champagne transition-colors">
              NOIRÉ
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-caramel/90 font-medium -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Chocolatier
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setCursor("open")}
                onMouseLeave={resetCursor}
                className="relative text-xs uppercase tracking-[0.25em] text-cream/80 hover:text-cream font-medium transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-champagne transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 md:space-x-5">
            {/* User Auth Button */}
            {user ? (
              <div className="hidden sm:flex items-center space-x-2 text-xs text-champagne bg-dark-choc border border-champagne/20 px-3 py-1.5 rounded-full">
                <span className="font-serif">Patron {user.name.split(" ")[0]}</span>
                <button
                  onClick={logout}
                  className="p-1 text-cream/40 hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                onMouseEnter={() => setCursor("open", "LOGIN")}
                onMouseLeave={resetCursor}
                className="p-2 text-cream/80 hover:text-champagne transition-colors hover:scale-110 active:scale-95 duration-200"
                aria-label="Member login"
              >
                <UserIcon className="w-5 h-5 stroke-[1.5]" />
              </button>
            )}

            {/* Search Action */}
            <button
              onClick={onOpenSearch}
              onMouseEnter={() => setCursor("open")}
              onMouseLeave={resetCursor}
              className="p-2 text-cream/80 hover:text-champagne transition-colors hover:scale-110 active:scale-95 duration-200"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={openCart}
              onMouseEnter={() => setCursor("open", "BAG")}
              onMouseLeave={resetCursor}
              className="relative p-2 text-cream/80 hover:text-champagne transition-colors hover:scale-110 active:scale-95 duration-200 group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-caramel text-espresso font-bold text-[10px] flex items-center justify-center shadow-md"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-2xl flex flex-col justify-between p-8 md:hidden"
          >
            <div className="flex justify-between items-center border-b border-champagne/10 pb-6">
              <span className="font-serif text-2xl tracking-[0.2em] text-champagne">
                NOIRÉ
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-cream/80 hover:text-cream"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col space-y-6 my-auto">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-cream/90 hover:text-champagne transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="pt-4 border-t border-champagne/10">
                {user ? (
                  <div className="flex justify-between items-center text-sm text-champagne">
                    <span>Member: {user.name}</span>
                    <button onClick={logout} className="text-red-400 text-xs">Sign Out</button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal();
                    }}
                    className="text-sm uppercase tracking-widest text-caramel underline"
                  >
                    Member Sign In →
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-champagne/10 pt-6 text-center text-xs tracking-widest text-cream/50 uppercase">
              Crafted slowly. Savoured completely.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

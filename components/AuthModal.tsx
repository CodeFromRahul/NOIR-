"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, openCheckout } = useCart();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: name || (email ? email.split("@")[0] : "Luxury Patron"),
      email: email || "patron@noire-chocolatier.com",
    });
    openCheckout();
  };

  const handleGuestCheckout = () => {
    login({
      name: "Guest Patron",
      email: "guest@noire-chocolatier.com",
    });
    openCheckout();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAuthModal}
        className="fixed inset-0 z-[130] bg-black/85 backdrop-blur-xl p-4 overflow-y-auto flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-md w-full bg-espresso border border-champagne/25 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 my-auto"
        >
          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-2 text-cream/50 hover:text-cream rounded-full hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 pt-2">
            <span className="font-serif text-3xl tracking-[0.2em] text-cream">
              NOIRÉ
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-caramel">
              Maison Member Portal
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-champagne/15 text-xs uppercase tracking-widest font-medium">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                tab === "login"
                  ? "border-champagne text-champagne"
                  : "border-transparent text-cream/50 hover:text-cream"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab("register")}
              className={`flex-1 pb-3 text-center transition-colors border-b-2 ${
                tab === "register"
                  ? "border-champagne text-champagne"
                  : "border-transparent text-cream/50 hover:text-cream"
              }`}
            >
              Register Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-cream/60">
                  Full Name
                </label>
                <div className="flex items-center border border-champagne/20 rounded-xl px-3 py-2.5 bg-dark-choc focus-within:border-champagne">
                  <UserIcon className="w-4 h-4 text-champagne/60 mr-2" />
                  <input
                    type="text"
                    required
                    placeholder="Éléonore de Saint-Germain"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-xs text-cream focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-cream/60">
                Email Address
              </label>
              <div className="flex items-center border border-champagne/20 rounded-xl px-3 py-2.5 bg-dark-choc focus-within:border-champagne">
                <Mail className="w-4 h-4 text-champagne/60 mr-2" />
                <input
                  type="email"
                  required
                  placeholder="patron@noire-chocolatier.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs text-cream focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] uppercase tracking-wider text-cream/60">
                Password
              </label>
              <div className="flex items-center border border-champagne/20 rounded-xl px-3 py-2.5 bg-dark-choc focus-within:border-champagne">
                <Lock className="w-4 h-4 text-champagne/60 mr-2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-xs text-cream focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>{tab === "login" ? "Sign In & Continue" : "Create Member Account"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Guest Checkout Option */}
          <div className="pt-2 border-t border-champagne/10 text-center space-y-3">
            <button
              onClick={handleGuestCheckout}
              className="text-xs uppercase tracking-widest text-cream/70 hover:text-champagne transition-colors underline"
            >
              Continue as Guest Patron →
            </button>
            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-cream/40">
              <ShieldCheck className="w-3.5 h-3.5 text-caramel" />
              <span>256-Bit SSL Encrypted Luxury Checkout</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

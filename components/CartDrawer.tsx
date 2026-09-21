"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, user, openAuthModal, openCheckout } = useCart();

  const freeShippingThreshold = 80;
  const progress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  const handleCheckoutClick = () => {
    closeCart();
    if (!user) {
      openAuthModal();
    } else {
      openCheckout();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Slide-over */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[110] w-full max-w-md bg-espresso border-l border-champagne/10 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-champagne/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-5 h-5 text-champagne" />
                <h2 className="font-serif text-2xl tracking-wider text-cream font-light">
                  YOUR SELECTION
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-cream/60 hover:text-cream transition-colors rounded-full hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            {items.length > 0 && (
              <div className="bg-dark-choc/80 px-6 py-3 border-b border-champagne/10">
                <div className="flex justify-between text-xs font-light text-cream/80 mb-1.5">
                  {remainingForFreeShipping > 0 ? (
                    <span>
                      Add <strong className="text-champagne">${remainingForFreeShipping.toFixed(2)}</strong> more for Complimentary Packaging
                    </span>
                  ) : (
                    <span className="text-champagne font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 inline" /> Complimentary Luxury Shipping Unlocked
                    </span>
                  )}
                </div>
                <div className="w-full h-1 bg-espresso rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cocoa via-caramel to-champagne transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <p className="font-serif text-2xl text-cream/40 italic">
                    Your bag is currently empty.
                  </p>
                  <p className="text-xs text-cream/60 tracking-wider uppercase">
                    Discover our slow-crafted collection
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-4 px-6 py-2.5 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne hover:text-espresso transition-all"
                  >
                    Explore Chocolates
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex space-x-4 border-b border-champagne/10 pb-6"
                  >
                    <div className="relative w-20 h-20 rounded-md overflow-hidden bg-dark-choc border border-champagne/10 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      <span className="absolute top-1 left-1 bg-espresso/90 text-champagne text-[9px] font-semibold px-1.5 py-0.5 rounded border border-champagne/20">
                        {item.cacao}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-lg text-cream tracking-wide">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-cream/40 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>
                        {item.weight && (
                          <span className="text-[11px] text-cream/50 tracking-wider">
                            {item.weight}
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center space-x-2 border border-champagne/20 rounded-full px-2 py-0.5 bg-dark-choc">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-cream/60 hover:text-cream p-1"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-cream">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-cream/60 hover:text-cream p-1"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-serif text-lg text-champagne font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-champagne/10 bg-dark-choc/90 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-cream/60">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-cream/60">
                    <span>Luxury Gift Packaging</span>
                    <span className="text-champagne">Included</span>
                  </div>
                  <div className="flex justify-between text-xs text-cream/60">
                    <span>Express Chilled Delivery</span>
                    <span>$12.00</span>
                  </div>
                  <div className="border-t border-champagne/10 pt-2 flex justify-between items-baseline">
                    <span className="font-serif text-lg text-cream">Total</span>
                    <span className="font-serif text-2xl text-champagne">
                      ${(subtotal + 12).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg shadow-caramel/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center space-x-1.5 text-[10px] text-cream/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-caramel" />
                  <span>White-Glove Delivery Guarantee</span>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

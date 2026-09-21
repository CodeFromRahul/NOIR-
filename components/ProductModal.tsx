"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Sparkles, Check, Utensils, Thermometer, ShieldAlert, BookOpen } from "lucide-react";
import Image from "next/image";
import { Product } from "./ProductCard";
import { useCart } from "@/context/CartContext";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "ingredients" | "recipe">("details");
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-xl p-3 sm:p-6 md:p-10 overflow-y-auto flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-4xl w-full bg-espresso border border-champagne/20 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 my-auto max-h-[92vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-espresso/90 text-cream/70 hover:text-cream border border-champagne/20 backdrop-blur-md transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Visual Column */}
          <div className="md:col-span-5 relative aspect-square md:aspect-auto min-h-[300px] bg-dark-choc">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-black/20" />

            <div className="absolute bottom-6 left-6 flex flex-col space-y-2">
              <div className="flex items-center space-x-2 bg-espresso/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-champagne/20">
                <Sparkles className="w-3.5 h-3.5 text-caramel" />
                <span className="text-[10px] uppercase tracking-widest text-champagne font-medium">
                  {product.origin}
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Detail & Interactive Tabs Column */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] uppercase tracking-[0.25em] text-caramel font-semibold">
                  {product.cacao} Cacao
                </span>
                <span className="text-xs text-cream/50 uppercase tracking-widest">
                  {product.weight}
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-cream tracking-wide mb-3">
                {product.name}
              </h2>

              {/* Detail Tabs Header */}
              <div className="flex border-b border-champagne/10 gap-4 mb-4">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-2 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 ${
                    activeTab === "details"
                      ? "border-champagne text-champagne"
                      : "border-transparent text-cream/50 hover:text-cream"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("ingredients")}
                  className={`pb-2 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 ${
                    activeTab === "ingredients"
                      ? "border-champagne text-champagne"
                      : "border-transparent text-cream/50 hover:text-cream"
                  }`}
                >
                  Ingredients & Ratios
                </button>
                <button
                  onClick={() => setActiveTab("recipe")}
                  className={`pb-2 text-xs uppercase tracking-widest font-medium transition-colors border-b-2 ${
                    activeTab === "recipe"
                      ? "border-champagne text-champagne"
                      : "border-transparent text-cream/50 hover:text-cream"
                  }`}
                >
                  Home Master Recipe
                </button>
              </div>

              {/* Tab Content 1: Overview */}
              {activeTab === "details" && (
                <div className="space-y-4">
                  <p className="text-sm font-light text-cream/75 leading-relaxed">
                    {product.desc}
                  </p>

                  <div className="bg-dark-choc/80 rounded-2xl p-4 border border-champagne/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-champagne font-medium block">
                      Tasting Notes
                    </span>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      {product.tastingNotes.map((note) => (
                        <div
                          key={note}
                          className="flex items-center space-x-2 text-xs text-cream/80"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-caramel" />
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab Content 2: Ingredients */}
              {activeTab === "ingredients" && (
                <div className="space-y-4">
                  <div className="bg-dark-choc/80 rounded-2xl p-4 border border-champagne/10 space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-champagne font-medium block flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-caramel" />
                      Complete Formulation Breakdown
                    </span>
                    <ul className="space-y-2 pt-2">
                      {product.ingredientsList.map((ing, i) => (
                        <li key={i} className="text-xs text-cream/80 flex items-center justify-between border-b border-champagne/5 pb-1">
                          <span>{ing}</span>
                          <Check className="w-3.5 h-3.5 text-caramel shrink-0 ml-2" />
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.allergens && (
                    <div className="flex items-start space-x-2 p-3 rounded-xl bg-amber-950/40 border border-amber-500/20 text-xs text-amber-200/80">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{product.allergens}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Tab Content 3: Home Master Recipe */}
              {activeTab === "recipe" && product.homeRecipe && (
                <div className="space-y-4">
                  <div className="bg-dark-choc/90 rounded-2xl p-4 border border-champagne/10 space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-champagne font-medium flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-caramel" />
                      Chocolatier Tempering Parameters
                    </span>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-espresso p-2 rounded-lg border border-champagne/10">
                        <span className="text-[9px] uppercase tracking-wider text-cream/40 block">Melt Temp</span>
                        <span className="text-caramel font-semibold">{product.homeRecipe.temperatures.melt}</span>
                      </div>
                      <div className="bg-espresso p-2 rounded-lg border border-champagne/10">
                        <span className="text-[9px] uppercase tracking-wider text-cream/40 block">Cool Temp</span>
                        <span className="text-caramel font-semibold">{product.homeRecipe.temperatures.cool}</span>
                      </div>
                      <div className="bg-espresso p-2 rounded-lg border border-champagne/10">
                        <span className="text-[9px] uppercase tracking-wider text-cream/40 block">Working Temp</span>
                        <span className="text-champagne font-semibold">{product.homeRecipe.temperatures.work}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-wider text-cream/50 block mb-1">Equipment Needed:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.homeRecipe.equipments.map((eq) => (
                          <span key={eq} className="text-[9px] px-2 py-0.5 rounded bg-cocoa/40 text-cream/70 border border-champagne/10">
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-wider text-cream/50 block mb-1">Creation Steps:</span>
                      <ol className="space-y-1.5 list-decimal list-inside text-xs text-cream/80">
                        {product.homeRecipe.steps.map((st, idx) => (
                          <li key={idx} className="leading-relaxed">{st}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* Price & Quantity Selector */}
              <div className="flex items-center justify-between border-t border-champagne/10 pt-4 mt-4">
                <div>
                  <span className="text-[10px] text-cream/40 uppercase tracking-widest block">
                    Total Price
                  </span>
                  <span className="font-serif text-3xl text-champagne">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center space-x-3 border border-champagne/30 rounded-full px-3 py-1.5 bg-dark-choc">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-1 text-cream/60 hover:text-cream transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-semibold text-cream px-2">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-1 text-cream/60 hover:text-cream transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ADD TO BAG Button */}
            <button
              onClick={handleAdd}
              disabled={added}
              className={`w-full py-4 rounded-full font-medium text-xs uppercase tracking-[0.25em] transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso hover:brightness-110 active:scale-[0.98]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>ADDED TO BAG</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO BAG · ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

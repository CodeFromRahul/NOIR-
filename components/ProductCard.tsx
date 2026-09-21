"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, Eye, Utensils, Compass } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useCursor } from "@/context/CursorContext";

export interface Product {
  id: string;
  name: string;
  category: string;
  cacao: string;
  price: number;
  weight: string;
  origin: string;
  desc: string;
  tastingNotes: string[];
  image: string;
  ingredientsList: string[];
  allergens?: string;
  homeRecipe?: {
    equipments: string[];
    temperatures: { melt: string; cool: string; work: string };
    steps: string[];
  };
  originStoryline?: {
    harvestYear: string;
    farmerCoop: string;
    elevation: string;
    narrative: string;
  };
}

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export default function ProductCard({ product, onOpenDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between glass-card rounded-2xl p-5 border border-champagne/10 hover:border-champagne/40 transition-all duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.7)] overflow-hidden"
    >
      {/* Micro Gold Foil Shine Overlay */}
      <div className="absolute -inset-full top-0 block bg-gradient-to-r from-transparent via-champagne/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out pointer-events-none" />

      {/* Cacao Tag & Origin */}
      <div className="flex justify-between items-center z-10 mb-4">
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-caramel border border-caramel/30 bg-espresso/80 px-3 py-1 rounded-full backdrop-blur-md">
          {product.cacao} Cacao
        </span>
        <span className="text-xs text-cream/50 tracking-wider font-light flex items-center gap-1">
          <Compass className="w-3 h-3 text-champagne/60" /> {product.origin}
        </span>
      </div>

      {/* Image Wrapper */}
      <div
        onClick={() => onOpenDetails(product)}
        onMouseEnter={() => setCursor("view", "DETAILS")}
        onMouseLeave={resetCursor}
        className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-dark-choc mb-6 cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Hover Quick View Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="w-full py-3 rounded-full bg-champagne/90 text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center space-x-2 hover:bg-cream transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Storyline & Recipe →</span>
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-serif text-2xl text-cream group-hover:text-champagne transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          <span className="font-serif text-xl font-medium text-champagne ml-2">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Classic Ornament Line */}
        <div className="flex items-center space-x-2 opacity-40 group-hover:opacity-100 transition-opacity duration-500">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
          <span className="text-[10px] text-caramel">❦</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
        </div>

        <p className="text-xs text-cream/65 font-light leading-relaxed line-clamp-2">
          {product.desc}
        </p>

        {/* Storyline Indicator */}
        <div className="flex items-center space-x-1 text-[10px] text-caramel uppercase tracking-widest pt-1">
          <Utensils className="w-3 h-3 inline" />
          <span>Includes Terroir Storyline & Recipe</span>
        </div>

        {/* Tasting Notes Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {product.tastingNotes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="text-[9px] uppercase tracking-widest text-cream/60 bg-cocoa/30 px-2 py-0.5 rounded border border-champagne/10 group-hover:border-champagne/30 transition-colors"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Add to Bag Action */}
        <div className="pt-4 border-t border-champagne/10 flex items-center justify-between">
          <span className="text-[11px] text-cream/40 uppercase tracking-widest">
            {product.weight}
          </span>
          <button
            onClick={() => addToCart(product)}
            onMouseEnter={() => setCursor("add")}
            onMouseLeave={resetCursor}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-champagne/30 bg-espresso/80 text-cream text-[11px] uppercase tracking-widest font-medium hover:bg-caramel hover:text-espresso hover:border-caramel transition-all duration-300 shadow-md group/btn cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-champagne group-hover/btn:text-espresso transition-colors" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

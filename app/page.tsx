"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductCollection, { PRODUCTS_DATA } from "@/components/ProductCollection";
import ProductModal from "@/components/ProductModal";
import ProductCard, { Product } from "@/components/ProductCard";
import StorySection from "@/components/StorySection";
import CraftSection from "@/components/CraftSection";
import IngredientsSection from "@/components/IngredientsSection";
import BrandStatement from "@/components/BrandStatement";
import AIMoodSommelier from "@/components/AIMoodSommelier";
import AIPackagingEngraver from "@/components/AIPackagingEngraver";
import TestimonialSection from "@/components/TestimonialSection";
import JournalSection from "@/components/JournalSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import CartDrawer from "@/components/CartDrawer";
import ChocolatierChatbot from "@/components/ChocolatierChatbot";
import AuthModal from "@/components/AuthModal";
import CheckoutPortal from "@/components/CheckoutPortal";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSelectProductById = (id: string) => {
    const p = PRODUCTS_DATA.find((item) => item.id === id);
    if (p) setSelectedProduct(p);
  };

  return (
    <main className="min-h-screen bg-espresso text-cream overflow-x-hidden selection:bg-caramel selection:text-espresso">
      {/* Floating Navbar */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Hero Section */}
      <HeroSection />

      {/* Product Collection */}
      <ProductCollection onOpenDetails={(prod) => setSelectedProduct(prod)} />

      {/* Storytelling Section - From Bean to Moment */}
      <StorySection />

      {/* Craftsmanship Section */}
      <CraftSection />

      {/* Minimalist Ingredients Section */}
      <IngredientsSection />

      {/* NEW GEMINI AI FEATURE 1: Maison Mood Sommelier & Sensory Engine */}
      <AIMoodSommelier />

      {/* Premium Brand Statement */}
      <BrandStatement />

      {/* NEW GEMINI AI FEATURE 2: AI Gold Inscription & Packaging Story Engraver */}
      <AIPackagingEngraver />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Editorial Journal */}
      <JournalSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Portals */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectProduct={handleSelectProductById}
      />

      <CartDrawer />

      {/* Real Gemini AI Powered Sommelier & Recipe Generator Chatbot */}
      <ChocolatierChatbot />

      {/* Authentication Modal */}
      <AuthModal />

      {/* Multi-Step Checkout & Live Tracking Portal */}
      <CheckoutPortal />
    </main>
  );
}

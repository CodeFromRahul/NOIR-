"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  ChefHat,
  RefreshCw,
  Copy,
  Check,
  Wine,
  Thermometer,
  Bot,
  Utensils,
  Award,
  Volume2,
  VolumeX,
  ShoppingBag,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Gift,
  Compass,
  ArrowRight,
  Flame,
  Star,
  Zap,
} from "lucide-react";
import { useCursor } from "@/context/CursorContext";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface RecommendedProduct {
  id: string;
  name: string;
  cacao: string;
  price: number;
  origin: string;
  image: string;
  desc: string;
}

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  feedback?: "liked" | "disliked" | null;
  recommendedProduct?: RecommendedProduct;
  recipeCard?: {
    title: string;
    cacao: string;
    equipments: string[];
    temperatures: { melt: string; cool: string; work: string };
    ingredients: string[];
    steps: string[];
    pairingNotes: string;
    ratings: { bitterness: number; aroma: number; velvet: number; acidity: number };
    kitPrice: number;
  };
  followUps?: string[];
}

const FEATURED_CHOCOLATES: RecommendedProduct[] = [
  {
    id: "noir-72",
    name: "Noir 72% Grand Cru",
    cacao: "72%",
    price: 1850,
    origin: "Chuao, Venezuela",
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop",
    desc: "Single-estate Criollo cacao with notes of dark cocoa, roasted almond, and smoked bourbon vanilla.",
  },
  {
    id: "sea-salt-caramel",
    name: "Sea Salt Caramel Velvet",
    cacao: "68%",
    price: 1950,
    origin: "Brittany, France",
    image: "https://images.unsplash.com/photo-1581798459219-318e76aecc7b?q=80&w=1000&auto=format&fit=crop",
    desc: "Slow-cooked golden butter caramel infused with Hand-harvested Fleur de Sel.",
  },
  {
    id: "hazelnut-praline",
    name: "Hazelnut Praliné Crisp",
    cacao: "64%",
    price: 2100,
    origin: "Piedmont, Italy",
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=1000&auto=format&fit=crop",
    desc: "Slow-roasted Piedmont IGP hazelnut praliné layered with caramelized wafer crunch.",
  },
  {
    id: "matcha-white-gold",
    name: "Uji Matcha White Gold",
    cacao: "38%",
    price: 2300,
    origin: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1000&auto=format&fit=crop",
    desc: "Ceremonial Grade Uji Matcha ground stone-milled into single-farm white cocoa butter.",
  },
];

export default function ChocolatierChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const { setCursor, resetCursor } = useCursor();
  const { addToCart } = useCart();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Bienvenue à Maison NOIRÉ! I am your Senior Master Chocolatier & Sensory Sommelier.\n\nAsk me about single-origin terroir, tempering science, artisanal master recipes, or wine pairings. How may I guide your sensory journey today?",
      followUps: [
        "Suggest wine pairing for 72% dark chocolate",
        "Give me a recipe for Salted Caramel Truffles",
        "Explain dark chocolate tempering temperatures",
        "Recommend a luxury gift box",
      ],
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    try {
      const qLower = query.toLowerCase();
      const isRecipeQuery =
        qLower.includes("recipe") ||
        qLower.includes("make") ||
        qLower.includes("truffle") ||
        qLower.includes("bar") ||
        qLower.includes("ingredient") ||
        qLower.includes("caramel") ||
        qLower.includes("lavender") ||
        qLower.includes("matcha");

      const systemPrompt = `You are Maison NOIRÉ's Senior French Master Chocolatier & Cacao Scientist. Respond with elegant, warm, highly detailed advice on dark chocolate, single-origin cacao, tempering temperatures, sensory notes, and wine pairings. Keep answers structured and exquisite. ${
        isRecipeQuery
          ? "The user is requesting a chocolate recipe formulation. Include precise percentages, tempering temperatures (Melt 48°C, Cool 27°C, Work 31.5°C), and equipment."
          : ""
      }`;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query, systemPrompt, mode: "chat" }),
      });

      const data = await res.json();
      const replyText = data.text || "Our master chocolatiers are tempering your response with artisanal precision.";

      // Match product recommendation
      let matchedProduct: RecommendedProduct | undefined = undefined;
      if (qLower.includes("gift") || qLower.includes("recommend") || qLower.includes("dark") || qLower.includes("72%")) {
        matchedProduct = FEATURED_CHOCOLATES[0];
      } else if (qLower.includes("caramel") || qLower.includes("salt") || qLower.includes("sweet")) {
        matchedProduct = FEATURED_CHOCOLATES[1];
      } else if (qLower.includes("nut") || qLower.includes("hazelnut") || qLower.includes("crunch")) {
        matchedProduct = FEATURED_CHOCOLATES[2];
      } else if (qLower.includes("matcha") || qLower.includes("tea") || qLower.includes("white")) {
        matchedProduct = FEATURED_CHOCOLATES[3];
      }

      let recipeCardData: ChatMessage["recipeCard"] | undefined = undefined;
      if (isRecipeQuery) {
        const cleanTitle = query.slice(0, 30).replace(/give me a recipe for|recipe|how to make/gi, "").trim();
        recipeCardData = {
          title: `Artisanal ${cleanTitle || "Noir Creation"} Masterwork`,
          cacao: "72% Grand Cru",
          equipments: ["Marble Tempering Slab", "Infrared Thermometer", "Polycarbonate Bar Mold", "Digital Scale"],
          temperatures: { melt: "48°C / 118°F", cool: "27°C / 80°F", work: "31.5°C / 89°F" },
          ingredients: [
            "70.0% Single-Origin Cacao Mass",
            "20.0% Organic Cane Sugar",
            "8.0% Deodorized Cocoa Butter",
            `2.0% Fine Botanicals & (${query.slice(0, 20)})`,
          ],
          steps: [
            "Infuse cocoa butter gently under low heat (40°C) with natural aromas.",
            "Melt 70% dark chocolate mass over water bath to 48°C.",
            "Agitate 2/3 on marble slab until thickened to 27°C.",
            "Re-combine and work at 31.5°C. Mold into sleek debossed Noir bars and chill at 12°C.",
          ],
          pairingNotes: "Pairs elegantly with vintage Bordeaux or dark roasted Oolong tea.",
          ratings: { bitterness: 4.8, aroma: 5.0, velvet: 4.9, acidity: 3.5 },
          kitPrice: 2450,
        };
      }

      // Generate dynamic follow-up options
      const dynamicFollowUps: string[] = [];
      if (isRecipeQuery) {
        dynamicFollowUps.push("🍷 What wine pairs best with this recipe?");
        dynamicFollowUps.push("🌡️ Show detailed marble tempering steps");
        dynamicFollowUps.push("📦 Order Recipe Kit for ₹2,450");
      } else if (qLower.includes("wine") || qLower.includes("pair")) {
        dynamicFollowUps.push("🍫 Recommend 72% Single-Origin Bar");
        dynamicFollowUps.push("☕ What coffee roast pairs with Dark Cacao?");
        dynamicFollowUps.push("🎁 Show Luxury Gift Box options");
      } else {
        dynamicFollowUps.push("🍷 Suggest wine pairing");
        dynamicFollowUps.push("👨‍🍳 Show tempering temperature chart");
        dynamicFollowUps.push("✨ Tell me the Chuao Venezuela terroir storyline");
      }

      const botId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          sender: "bot",
          text: replyText,
          recipeCard: recipeCardData,
          recommendedProduct: matchedProduct,
          followUps: dynamicFollowUps,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Our chocolatiers recommend melting 72% dark cacao to 48°C, cooling over marble to 27°C, and working at 31.5°C for perfect snap.",
          followUps: ["🍷 Suggest wine pairing", "🌡️ Tempering temperatures"],
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const speakMessage = (id: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.92;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleFeedback = (id: string, type: "liked" | "disliked") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, feedback: msg.feedback === type ? null : type } : msg
      )
    );
  };

  const copyRecipe = (id: string, card: ChatMessage["recipeCard"]) => {
    if (!card) return;
    const text = `NOIRÉ MASTER RECIPE: ${card.title}\nCacao: ${card.cacao}\nTemps: Melt ${card.temperatures.melt} | Work ${card.temperatures.work}\nIngredients:\n${card.ingredients.join("\n")}\nSteps:\n${card.steps.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const addKitToCart = (card: ChatMessage["recipeCard"]) => {
    if (!card) return;
    addToCart({
      id: `kit-${Date.now()}`,
      name: `${card.title} Tasting Kit`,
      price: card.kitPrice,
      cacao: card.cacao,
      weight: "250g Master Kit",
      image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=1000&auto=format&fit=crop",
    });
    setAddedProductId(`kit-${card.title}`);
    setTimeout(() => setAddedProductId(null), 2500);
  };

  const addProductToCart = (prod: RecommendedProduct) => {
    addToCart({
      id: prod.id,
      name: prod.name,
      price: prod.price,
      cacao: prod.cacao,
      weight: "100g Master Bar",
      image: prod.image,
    });
    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 2500);
  };

  return (
    <>
      {/* Sleek Circular Floating Icon Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setCursor("open", "SOMMELIER")}
            onMouseLeave={resetCursor}
            className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso shadow-[0_15px_35px_rgba(0,0,0,0.7)] border border-champagne/40 flex items-center justify-center group cursor-pointer"
            aria-label="Open Maison Chocolatier Sommelier"
          >
            <div className="relative flex items-center justify-center">
              <ChefHat className="w-6 h-6 stroke-[1.8] text-espresso group-hover:rotate-12 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-espresso animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Drawer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.94 }}
            transition={{ type: "spring", damping: 26, stiffness: 340 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-6 sm:bottom-6 z-[100] w-full sm:w-[450px] h-[90vh] sm:h-[640px] bg-espresso/98 border-t sm:border border-champagne/30 rounded-t-3xl sm:rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.85)] flex flex-col justify-between overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-dark-choc p-4 border-b border-champagne/15 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 6, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-caramel/20 border border-champagne/40 flex items-center justify-center text-champagne shrink-0 relative shadow-inner"
                >
                  <Bot className="w-5 h-5 text-caramel" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-espresso" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-cream tracking-wide flex items-center gap-1.5">
                    Maison NOIRÉ Sommelier
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-caramel uppercase tracking-widest block font-medium">
                      Audio Voice & Interactive Recipe AI
                    </span>
                    {speakingId && (
                      <span className="flex items-center space-x-0.5">
                        <span className="w-1 h-2 bg-caramel animate-pulse" />
                        <span className="w-1 h-3 bg-champagne animate-pulse delay-75" />
                        <span className="w-1 h-1 bg-caramel animate-pulse delay-150" />
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-cream/60 hover:text-cream rounded-full hover:bg-white/10 transition-all hover:scale-110 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Interactive Sensory Filter Pills */}
            <div className="bg-espresso/90 px-3 py-2 border-b border-champagne/10 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
              {[
                { label: "🍷 Wine Pairing", query: "Suggest wine pairing for 72% dark chocolate", icon: Wine },
                { label: "✨ Custom Recipe", query: "Give me a recipe for Salted Lavender Dark Truffles", icon: Sparkles },
                { label: "🌡️ Tempering Guide", query: "Explain dark chocolate tempering temperatures", icon: Thermometer },
                { label: "🎁 Luxury Gift", query: "Recommend a luxury chocolate gift box", icon: Gift },
                { label: "🍇 Terroir Story", query: "Tell me about Chuao Venezuela cacao origin", icon: Compass },
              ].map((pill) => (
                <motion.button
                  key={pill.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage(pill.query)}
                  className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-dark-choc border border-champagne/20 text-champagne/90 hover:border-champagne hover:text-cream shrink-0 flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>{pill.label}</span>
                </motion.button>
              ))}
            </div>

            {/* CHAT MESSAGES SCROLL CONTAINER */}
            <div
              ref={scrollContainerRef}
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-4 space-y-4 touch-pan-y overscroll-contain"
              style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-lg ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-caramel to-champagne text-espresso font-medium rounded-br-none shadow-caramel/10"
                          : "bg-dark-choc/95 text-cream/90 border border-champagne/15 rounded-bl-none"
                      }`}
                    >
                      <div className="flex justify-between items-start gap-2">
                        <p className="whitespace-pre-line flex-1 font-sans">{msg.text}</p>
                        {msg.sender === "bot" && (
                          <button
                            onClick={() => speakMessage(msg.id, msg.text)}
                            className="p-1 rounded text-cream/40 hover:text-champagne transition-colors shrink-0 cursor-pointer"
                            title="Read Aloud"
                          >
                            {speakingId === msg.id ? (
                              <VolumeX className="w-4 h-4 text-caramel animate-pulse" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      {/* Embedded Product Recommendation Card */}
                      {msg.recommendedProduct && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 p-3 rounded-2xl bg-espresso/90 border border-champagne/25 flex items-center space-x-3 shadow-xl group"
                        >
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-dark-choc border border-champagne/20">
                            <Image
                              src={msg.recommendedProduct.image}
                              alt={msg.recommendedProduct.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-widest text-caramel font-semibold">
                              {msg.recommendedProduct.cacao} Cacao · {msg.recommendedProduct.origin}
                            </span>
                            <h5 className="font-serif text-xs text-champagne font-semibold truncate">
                              {msg.recommendedProduct.name}
                            </h5>
                            <span className="text-xs text-cream font-medium block">
                              ₹{msg.recommendedProduct.price.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <button
                            onClick={() => addProductToCart(msg.recommendedProduct!)}
                            className="p-2 rounded-xl bg-gradient-to-r from-caramel to-champagne text-espresso font-medium text-[10px] hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0 cursor-pointer flex items-center space-x-1"
                          >
                            {addedProductId === msg.recommendedProduct.id ? (
                              <Check className="w-4 h-4 text-espresso" />
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </motion.div>
                      )}

                      {/* Formatted Interactive Recipe Card */}
                      {msg.recipeCard && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.4 }}
                          className="mt-3 p-3.5 rounded-2xl bg-espresso border border-champagne/25 space-y-3 text-[11px] text-cream shadow-xl"
                        >
                          <div className="flex justify-between items-start border-b border-champagne/15 pb-2">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-caramel font-semibold flex items-center gap-1">
                                <Award className="w-3 h-3" /> {msg.recipeCard.cacao}
                              </span>
                              <h4 className="font-serif text-sm md:text-base text-champagne font-semibold mt-0.5">
                                {msg.recipeCard.title}
                              </h4>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyRecipe(msg.id, msg.recipeCard!)}
                              className="p-1.5 rounded-md bg-dark-choc border border-champagne/20 text-cream/70 hover:text-champagne transition-all cursor-pointer"
                              title="Copy Master Recipe"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </motion.button>
                          </div>

                          {/* Flavor Ratings */}
                          {msg.recipeCard.ratings && (
                            <div className="grid grid-cols-2 gap-2 bg-dark-choc/80 p-2 rounded-xl border border-champagne/10 text-[10px]">
                              <div className="flex justify-between items-center">
                                <span className="text-cream/60">Bitterness:</span>
                                <span className="text-caramel font-semibold">4.8 / 5</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-cream/60">Aroma:</span>
                                <span className="text-caramel font-semibold">5.0 / 5</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-cream/60">Velvet Finish:</span>
                                <span className="text-caramel font-semibold">4.9 / 5</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-cream/60">Berry Acidity:</span>
                                <span className="text-champagne font-semibold">3.5 / 5</span>
                              </div>
                            </div>
                          )}

                          {/* Tempering Targets */}
                          <div className="grid grid-cols-3 gap-1.5 text-[9px] text-center">
                            <div className="bg-dark-choc p-2 rounded-xl border border-champagne/10">
                              <span className="text-cream/40 block uppercase tracking-wider">Melt</span>
                              <strong className="text-caramel font-semibold text-xs">{msg.recipeCard.temperatures.melt}</strong>
                            </div>
                            <div className="bg-dark-choc p-2 rounded-xl border border-champagne/10">
                              <span className="text-cream/40 block uppercase tracking-wider">Cool</span>
                              <strong className="text-caramel font-semibold text-xs">{msg.recipeCard.temperatures.cool}</strong>
                            </div>
                            <div className="bg-dark-choc p-2 rounded-xl border border-champagne/10">
                              <span className="text-cream/40 block uppercase tracking-wider">Work</span>
                              <strong className="text-champagne font-semibold text-xs">{msg.recipeCard.temperatures.work}</strong>
                            </div>
                          </div>

                          {/* Master Formulation Ratios */}
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-wider text-caramel font-semibold flex items-center gap-1">
                              <Utensils className="w-3 h-3" /> Master Formulation Ratios:
                            </span>
                            <ul className="grid grid-cols-1 gap-1 text-[10px] text-cream/80 bg-dark-choc/60 p-2 rounded-xl border border-champagne/10">
                              {msg.recipeCard.ingredients.map((ing, i) => (
                                <li key={i} className="flex items-center justify-between">
                                  <span>{ing}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Steps */}
                          <div className="space-y-1">
                            <span className="text-[9px] uppercase tracking-wider text-caramel font-semibold flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-caramel" /> Master Craft Steps:
                            </span>
                            <ol className="list-decimal list-inside text-[10px] text-cream/80 space-y-1 bg-dark-choc/60 p-2 rounded-xl border border-champagne/10">
                              {msg.recipeCard.steps.map((st, i) => (
                                <li key={i} className="leading-relaxed">{st}</li>
                              ))}
                            </ol>
                          </div>

                          {/* 1-Click Add Recipe Tasting Kit to Bag */}
                          <button
                            onClick={() => addKitToCart(msg.recipeCard!)}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-semibold text-[10px] uppercase tracking-widest shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mt-2 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add Tasting Kit to Bag · ₹{msg.recipeCard.kitPrice.toLocaleString("en-IN")}</span>
                          </button>
                        </motion.div>
                      )}

                      {/* Interactive Feedback & Reactions Bar */}
                      {msg.sender === "bot" && (
                        <div className="flex items-center justify-between border-t border-champagne/10 mt-2.5 pt-2 text-[10px] text-cream/50">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => toggleFeedback(msg.id, "liked")}
                              className={`p-1 rounded hover:text-caramel transition-colors cursor-pointer flex items-center gap-1 ${
                                msg.feedback === "liked" ? "text-caramel font-semibold" : ""
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              {msg.feedback === "liked" && <span>Saved</span>}
                            </button>
                            <button
                              onClick={() => toggleFeedback(msg.id, "disliked")}
                              className={`p-1 rounded hover:text-rose-400 transition-colors cursor-pointer ${
                                msg.feedback === "disliked" ? "text-rose-400" : ""
                              }`}
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-serif italic text-[10px] text-champagne/50">Maison NOIRÉ Atelier</span>
                        </div>
                      )}
                    </div>

                    {/* Interactive Dynamic Follow-Up Chips */}
                    {msg.sender === "bot" && msg.followUps && msg.followUps.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                        {msg.followUps.map((chip, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleSendMessage(chip)}
                            className="text-[10px] bg-dark-choc/80 text-champagne/90 border border-champagne/20 rounded-full px-3 py-1 hover:border-champagne hover:bg-espresso transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                          >
                            <span>{chip}</span>
                            <ArrowRight className="w-2.5 h-2.5 text-caramel" />
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 bg-dark-choc/90 text-champagne text-xs px-4 py-3 rounded-2xl w-max border border-champagne/20 shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-caramel" />
                  <span className="font-serif italic text-cream/80">
                    Sommelier formulating response...
                  </span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-dark-choc border-t border-champagne/15 flex items-center space-x-2 shrink-0 shadow-2xl"
            >
              <input
                type="text"
                placeholder="Ask recipe, wine pairing, or ingredients..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-espresso border border-champagne/20 rounded-full px-4 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-caramel to-champagne text-espresso font-medium hover:brightness-110 transition-all shrink-0 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

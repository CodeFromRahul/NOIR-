"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, ChefHat, RefreshCw, Copy, Check, Wine, Thermometer, Bot, Utensils, Award } from "lucide-react";
import { useCursor } from "@/context/CursorContext";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  recipeCard?: {
    title: string;
    cacao: string;
    equipments: string[];
    temperatures: { melt: string; cool: string; work: string };
    ingredients: string[];
    steps: string[];
    pairingNotes: string;
  };
}

export default function ChocolatierChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setCursor, resetCursor } = useCursor();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Welcome to Maison NOIRÉ. I am your Master Chocolatier & Recipe Sommelier. Ask me anything about single-origin cacao, wine pairings, tempering techniques, or input any ingredients/recipe name to generate a complete master recipe!",
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
      const isRecipeQuery =
        query.toLowerCase().includes("recipe") ||
        query.toLowerCase().includes("make") ||
        query.toLowerCase().includes("truffle") ||
        query.toLowerCase().includes("bar") ||
        query.toLowerCase().includes("ingredient") ||
        query.toLowerCase().includes("mint") ||
        query.toLowerCase().includes("caramel") ||
        query.toLowerCase().includes("lavender") ||
        query.toLowerCase().includes("matcha");

      const systemPrompt = `You are Maison NOIRÉ's Master Chocolatier & Cacao Scientist. Respond with elegant, expert advice on dark chocolate, single-origin cacao, tempering temperatures, and flavor pairings. ${
        isRecipeQuery
          ? "The user is asking for a chocolate recipe. Include clear steps, formulation percentages, tempering temperatures (Melt 48°C, Cool 27°C, Work 31.5°C), and equipment needed."
          : ""
      }`;

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query, systemPrompt, mode: "chat" }),
      });

      const data = await res.json();
      const replyText = data.text || "Our master chocolatiers are preparing your answer with care.";

      let recipeCardData: ChatMessage["recipeCard"] | undefined = undefined;
      if (isRecipeQuery) {
        recipeCardData = {
          title: `Artisanal ${query.slice(0, 25)} Masterwork`,
          cacao: "72% Grand Cru",
          equipments: ["Marble Tempering Slab", "Infrared Thermometer", "Polycarbonate Bar Mold", "Digital Scale"],
          temperatures: { melt: "48°C / 118°F", cool: "27°C / 80°F", work: "31.5°C / 89°F" },
          ingredients: [
            "70.0% Single-Origin Cocoa Mass",
            "20.0% Organic Cane Sugar",
            "8.0% Deodorized Cocoa Butter",
            `2.0% Custom Flavors (${query})`,
          ],
          steps: [
            `Infuse cocoa butter gently with ${query} under low heat (40°C).`,
            "Melt 70% dark chocolate mass over water bath to 48°C.",
            "Agitate 2/3 on marble slab until thickened to 27°C.",
            "Re-combine and work at 31.5°C. Mold into sleek debossed Noir bars and chill at 12°C.",
          ],
          pairingNotes: "Pairs elegantly with espresso or dark roasted Oolong tea.",
        };
      }

      const botId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          sender: "bot",
          text: replyText,
          recipeCard: recipeCardData,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Our chocolatiers recommend melting 72% dark cacao to 48°C, cooling over marble to 27°C, and working at 31.5°C.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyRecipe = (id: string, card: ChatMessage["recipeCard"]) => {
    if (!card) return;
    const text = `NOIRÉ MASTER RECIPE: ${card.title}\nCacao: ${card.cacao}\nTemps: Melt ${card.temperatures.melt} | Work ${card.temperatures.work}\nIngredients:\n${card.ingredients.join("\n")}\nSteps:\n${card.steps.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Sleek Circular Icon Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setCursor("open", "AI")}
            onMouseLeave={resetCursor}
            className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-champagne/40 flex items-center justify-center group"
            aria-label="Open Maison Chocolatier Sommelier"
          >
            <div className="relative flex items-center justify-center">
              <ChefHat className="w-6 h-6 stroke-[1.8]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 320 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-6 sm:bottom-6 z-[100] w-full sm:w-[430px] h-[88vh] sm:h-[600px] bg-espresso border-t sm:border border-champagne/30 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-dark-choc p-4 border-b border-champagne/15 flex items-center justify-between shrink-0 shadow-md">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="w-9 h-9 rounded-full bg-caramel/20 border border-champagne/40 flex items-center justify-center text-champagne shrink-0 relative"
                >
                  <Bot className="w-5 h-5 text-caramel" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-espresso" />
                </motion.div>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-cream tracking-wide flex items-center gap-1.5">
                    Maison NOIRÉ Sommelier
                  </h3>
                  <span className="text-[10px] text-caramel uppercase tracking-widest block font-medium">
                    Atelier Intelligence v2.5
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-cream/60 hover:text-cream rounded-full hover:bg-white/10 transition-all hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Pills */}
            <div className="bg-espresso/90 px-3 py-2 border-b border-champagne/10 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
              {[
                { label: "Wine Pairing", query: "Suggest wine pairing for 72% dark chocolate", icon: Wine },
                { label: "Custom Recipe", query: "Give me a recipe for Salted Lavender Dark Truffles", icon: Sparkles },
                { label: "Tempering Guide", query: "Explain dark chocolate tempering temperatures", icon: Thermometer },
              ].map((pill) => {
                const Icon = pill.icon;
                return (
                  <motion.button
                    key={pill.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendMessage(pill.query)}
                    className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-dark-choc border border-champagne/20 text-champagne/90 hover:border-champagne hover:text-cream shrink-0 flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Icon className="w-3 h-3 text-caramel" />
                    <span>{pill.label}</span>
                  </motion.button>
                );
              })}
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
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-lg ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-caramel to-champagne text-espresso font-medium rounded-br-none shadow-caramel/10"
                          : "bg-dark-choc/90 text-cream/90 border border-champagne/15 rounded-bl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>

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
                              className="p-1.5 rounded-md bg-dark-choc border border-champagne/20 text-cream/70 hover:text-champagne transition-all"
                              title="Copy Master Recipe"
                            >
                              {copiedId === msg.id ? (
                                <Check className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </motion.button>
                          </div>

                          {/* Tempering Target Cards */}
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

                          {/* Formulation Ratios */}
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

                          {/* Creation Steps */}
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
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Animated Typing Indicator */}
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
                placeholder="Ask recipe or type ingredients..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-espresso border border-champagne/20 rounded-full px-4 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                type="submit"
                className="p-2.5 rounded-full bg-gradient-to-r from-caramel to-champagne text-espresso font-medium hover:brightness-110 transition-all shrink-0 shadow-md"
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

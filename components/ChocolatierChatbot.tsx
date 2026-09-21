"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, ChefHat, RefreshCw, Copy, Check, Wine, Thermometer, Bot } from "lucide-react";
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

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Welcome to Maison NOIRÉ. I am powered by Gemini AI as your Master Chocolatier & Recipe Sommelier. Ask me anything about single-origin cacao, wine pairings, tempering techniques, or input any ingredients/recipe name to generate a complete master recipe!",
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

      const systemPrompt = `You are Maison NOIRÉ's Master Chocolatier & Cacao Scientist powered by Gemini AI. Respond with elegant, expert advice on dark chocolate, single-origin cacao, tempering temperatures, and flavor pairings. ${
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
      const replyText = data.text || "Our chocolatiers are crafting your response.";

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

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
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
    const text = `NOIRÉ GEMINI AI MASTER RECIPE: ${card.title}\nCacao: ${card.cacao}\nTemps: Melt ${card.temperatures.melt} | Work ${card.temperatures.work}\nIngredients:\n${card.ingredients.join("\n")}\nSteps:\n${card.steps.join("\n")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            onMouseEnter={() => setCursor("open", "SOMMELIER")}
            onMouseLeave={resetCursor}
            className="fixed bottom-5 right-5 z-30 p-3.5 md:p-4 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-champagne/40 hover:scale-108 active:scale-95 transition-all duration-300 flex items-center space-x-2 group"
            aria-label="Open Gemini AI Chocolatier Sommelier"
          >
            <ChefHat className="w-5 h-5 md:w-6 md:h-6 stroke-[1.8]" />
            <span className="font-serif text-[11px] md:text-xs uppercase tracking-[0.2em] font-semibold pr-1 flex items-center gap-1">
              Gemini AI Sommelier
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 right-0 left-0 sm:left-auto sm:right-6 sm:bottom-6 z-[100] w-full sm:w-[420px] h-[85vh] sm:h-[580px] bg-espresso border-t sm:border border-champagne/30 rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="bg-dark-choc p-4 border-b border-champagne/15 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-caramel/20 border border-champagne/40 flex items-center justify-center text-champagne shrink-0">
                  <Bot className="w-5 h-5 text-caramel" />
                </div>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-cream tracking-wide flex items-center gap-1.5">
                    Maison NOIRÉ Gemini AI
                  </h3>
                  <span className="text-[10px] text-caramel uppercase tracking-widest block">
                    Model: {process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-2.5-flash"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-cream/60 hover:text-cream rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Pills */}
            <div className="bg-espresso/90 px-3 py-2 border-b border-champagne/10 flex gap-2 overflow-x-auto scrollbar-none shrink-0">
              <button
                onClick={() => handleSendMessage("Suggest wine pairing for 72% dark chocolate")}
                className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-dark-choc border border-champagne/20 text-champagne/90 hover:border-champagne shrink-0 flex items-center gap-1 active:scale-95"
              >
                <Wine className="w-3 h-3" /> Wine Pairing
              </button>
              <button
                onClick={() => handleSendMessage("Give me a recipe for Salted Lavender Dark Truffles")}
                className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-dark-choc border border-champagne/20 text-champagne/90 hover:border-champagne shrink-0 flex items-center gap-1 active:scale-95"
              >
                <Sparkles className="w-3 h-3" /> Custom Recipe
              </button>
              <button
                onClick={() => handleSendMessage("Explain dark chocolate tempering temperatures")}
                className="text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full bg-dark-choc border border-champagne/20 text-champagne/90 hover:border-champagne shrink-0 flex items-center gap-1 active:scale-95"
              >
                <Thermometer className="w-3 h-3" /> Tempering Guide
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-caramel text-espresso font-medium rounded-br-none"
                        : "bg-dark-choc/90 text-cream/90 border border-champagne/15 rounded-bl-none"
                    }`}
                  >
                    {msg.text}

                    {/* Formatted Recipe Card if generated */}
                    {msg.recipeCard && (
                      <div className="mt-3 p-3 rounded-xl bg-espresso border border-champagne/20 space-y-2 text-[11px] text-cream">
                        <div className="flex justify-between items-start border-b border-champagne/10 pb-2">
                          <div>
                            <span className="text-[9px] uppercase tracking-widest text-caramel block">
                              {msg.recipeCard.cacao}
                            </span>
                            <h4 className="font-serif text-sm md:text-base text-champagne font-semibold">
                              {msg.recipeCard.title}
                            </h4>
                          </div>
                          <button
                            onClick={() => copyRecipe(msg.id, msg.recipeCard!)}
                            className="p-1.5 text-cream/60 hover:text-champagne transition-colors"
                            title="Copy Recipe"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-[9px] text-center bg-dark-choc p-1.5 rounded border border-champagne/10">
                          <div><span className="text-cream/40 block">Melt</span> <strong className="text-caramel">{msg.recipeCard.temperatures.melt}</strong></div>
                          <div><span className="text-cream/40 block">Cool</span> <strong className="text-caramel">{msg.recipeCard.temperatures.cool}</strong></div>
                          <div><span className="text-cream/40 block">Work</span> <strong className="text-champagne">{msg.recipeCard.temperatures.work}</strong></div>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-cream/50 block">Gemini AI Ratios:</span>
                          <ul className="list-disc list-inside text-[10px] text-cream/80 space-y-0.5">
                            {msg.recipeCard.ingredients.map((ing, i) => (
                              <li key={i}>{ing}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-cream/50 block">Creation Steps:</span>
                          <ol className="list-decimal list-inside text-[10px] text-cream/80 space-y-1">
                            {msg.recipeCard.steps.map((st, i) => (
                              <li key={i}>{st}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 bg-dark-choc/80 text-champagne text-xs px-4 py-2.5 rounded-2xl w-max border border-champagne/10">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-caramel" />
                  <span>Gemini AI formulating answer...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-dark-choc border-t border-champagne/15 flex items-center space-x-2 shrink-0"
            >
              <input
                type="text"
                placeholder="Ask Gemini AI recipe or ingredients..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-espresso border border-champagne/20 rounded-full px-4 py-2.5 text-xs text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-caramel text-espresso hover:brightness-110 active:scale-95 transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Truck, Gift, CreditCard, CheckCircle2, ShieldCheck, ArrowRight, Navigation, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import confetti from "canvas-confetti";

export default function CheckoutPortal() {
  const { isCheckoutOpen, closeCheckout, user, items, subtotal, clearCart, placedOrder, setPlacedOrder } = useCart();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Address Form State
  const [street, setStreet] = useState("14 Rue du Faubourg Saint-Honoré");
  const [city, setCity] = useState("Paris");
  const [country, setCountry] = useState("France");
  const [postalCode, setPostalCode] = useState("75008");

  // Gift State
  const [giftNote, setGiftNote] = useState("To my dearest, savor every moment of this dark alchemy.");
  const [giftBox, setGiftBox] = useState("Black Velvet & Gold Embossed Box");

  // Payment State
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892");
  const [cardExpiry, setCardExpiry] = useState("09/28");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const shippingFee = subtotal >= 4000 ? 0 : 350;

  const handleCompleteOrder = () => {
    setIsProcessing(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#B9824A", "#D8C2A4", "#F4EDE3", "#160C08"],
    });

    setTimeout(() => {
      const order = {
        orderId: `NOIR-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        items: [...items],
        total: subtotal + shippingFee,
        shippingAddress: `${street}, ${city}, ${postalCode}, ${country}`,
        status: "Dispatched" as const,
        estimatedDelivery: "2 Hours · Express Temperature-Controlled Dispatch",
      };

      setPlacedOrder(order);
      setIsProcessing(false);
      clearCart();
      setStep(4); // Move to Live Tracking Map!
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckout}
          className="fixed inset-0 z-[140] bg-black/90 backdrop-blur-2xl p-4 md:p-8 overflow-y-auto flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-espresso border border-champagne/25 rounded-3xl p-6 md:p-10 shadow-2xl space-y-6 my-auto max-h-[92vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeCheckout}
              className="absolute top-6 right-6 p-2 text-cream/50 hover:text-cream rounded-full hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between border-b border-champagne/15 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-caramel font-semibold block">
                  Maison NOIRÉ Checkout
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-cream tracking-wide">
                  {step === 1 && "1. Delivery Location & Zone Map"}
                  {step === 2 && "2. Packaging & Gift Inscription"}
                  {step === 3 && "3. Payment & Concierge Confirmation"}
                  {step === 4 && "4. Live Dispatch & Courier Tracking"}
                </h2>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-xs font-serif text-champagne/80">
                <span className={step === 1 ? "text-caramel font-bold" : ""}>01 Location</span>
                <span>→</span>
                <span className={step === 2 ? "text-caramel font-bold" : ""}>02 Packaging</span>
                <span>→</span>
                <span className={step === 3 ? "text-caramel font-bold" : ""}>03 Payment</span>
                <span>→</span>
                <span className={step === 4 ? "text-caramel font-bold" : ""}>04 Live Map</span>
              </div>
            </div>

            {/* STEP 1: Delivery Address & Interactive SVG Map */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-cream/60">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={user?.name || "Luxury Patron"}
                      disabled
                      className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream/80"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-cream/60">
                      Street Address
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-cream/60">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-cream/60">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-dark-choc border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                    >
                      <span>Proceed to Packaging</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Interactive Vector Map Preview */}
                <div className="md:col-span-6 bg-dark-choc/80 rounded-2xl p-4 border border-champagne/15 flex flex-col justify-between space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] uppercase tracking-widest text-caramel flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" /> Paris Atelier Express Radius
                    </span>
                    <span className="text-[10px] text-emerald-400 font-medium">Zone Active</span>
                  </div>

                  {/* SVG Delivery Route Map Visual */}
                  <div className="relative w-full h-48 rounded-xl bg-espresso overflow-hidden border border-champagne/10 flex items-center justify-center">
                    <svg className="w-full h-full text-champagne/20" viewBox="0 0 400 200">
                      <path d="M10 100 Q 100 20, 200 100 T 390 100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                      <circle cx="80" cy="80" r="6" fill="#B9824A" />
                      <circle cx="80" cy="80" r="14" fill="#B9824A" fillOpacity="0.2" className="animate-ping" />
                      <text x="70" y="60" fill="#D8C2A4" fontSize="10" fontFamily="serif">Atelier Paris</text>

                      <circle cx="280" cy="110" r="6" fill="#F4EDE3" />
                      <text x="270" y="130" fill="#F4EDE3" fontSize="10" fontFamily="serif">{city}</text>

                      <path d="M 80 80 Q 180 40 280 110" fill="none" stroke="#B9824A" strokeWidth="2.5" />
                    </svg>

                    <div className="absolute bottom-2 left-2 bg-espresso/90 border border-champagne/20 px-3 py-1 rounded text-[10px] text-champagne">
                      Est. Temperature-Controlled Flight: 2.5h
                    </div>
                  </div>

                  <div className="text-[11px] text-cream/60 space-y-1">
                    <p>✔ Chilled dry-ice insulated casing included.</p>
                    <p>✔ White-glove courier hand-delivery guaranteed.</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Packaging & Gift Inscription */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-wider text-caramel font-semibold block">
                    Select Luxury Packaging Presentation
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      "Black Velvet & Gold Embossed Box",
                      "Minimalist Matte Ebony Case",
                      "Artisanal Wooden Gift Chest",
                    ].map((box) => (
                      <button
                        key={box}
                        onClick={() => setGiftBox(box)}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          giftBox === box
                            ? "border-champagne bg-dark-choc shadow-lg"
                            : "border-champagne/10 bg-espresso/50 hover:border-champagne/30"
                        }`}
                      >
                        <Gift className="w-5 h-5 text-champagne mb-2" />
                        <h4 className="font-serif text-lg text-cream">{box}</h4>
                        <span className="text-[10px] text-cream/50 uppercase tracking-widest">Included</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-caramel font-semibold block">
                    Personalized Gold-Debossed Calligraphy Note
                  </label>
                  <textarea
                    rows={3}
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    className="w-full bg-dark-choc border border-champagne/20 rounded-2xl p-4 text-xs font-serif text-cream italic placeholder:text-cream/30 focus:outline-none focus:border-champagne"
                  />
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-champagne/15">
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs uppercase tracking-widest text-cream/60 hover:text-cream"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-caramel to-champagne text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-lg hover:brightness-110 transition-all flex items-center space-x-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Simulation */}
            {step === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-dark-choc p-4 rounded-2xl border border-champagne/20 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-caramel uppercase tracking-widest font-semibold">Payment Details</span>
                      <CreditCard className="w-4 h-4 text-champagne" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-wider text-cream/60">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-espresso border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-cream/60">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-espresso border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-cream/60">CVC</label>
                        <input
                          type="text"
                          value="882"
                          readOnly
                          className="w-full bg-espresso border border-champagne/20 rounded-xl px-3 py-2 text-xs text-cream"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs uppercase tracking-widest text-cream/60 hover:text-cream"
                    >
                      ← Back to Packaging
                    </button>
                    <button
                      onClick={handleCompleteOrder}
                      disabled={isProcessing}
                      className="px-8 py-3.5 rounded-full bg-gradient-to-r from-caramel via-champagne to-caramel text-espresso font-medium text-xs uppercase tracking-[0.2em] shadow-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center space-x-2"
                    >
                      {isProcessing ? (
                        <span>Authorizing Luxury Dispatch...</span>
                      ) : (
                        <>
                          <span>AUTHORIZE ORDER · ₹{(subtotal + shippingFee).toLocaleString("en-IN")}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Order Summary Sidebar */}
                <div className="md:col-span-5 bg-dark-choc/80 rounded-2xl p-4 border border-champagne/15 space-y-4">
                  <h4 className="font-serif text-lg text-cream border-b border-champagne/10 pb-2">
                    Selection Summary
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {items.map((it) => (
                      <div key={it.id} className="flex justify-between text-xs text-cream/80">
                        <span>{it.quantity}x {it.name}</span>
                        <span>₹{(it.price * it.quantity).toLocaleString("en-IN")}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-champagne/10 pt-2 text-xs space-y-1">
                    <div className="flex justify-between text-cream/60"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-cream/60"><span>Express Chilled Shipping</span><span>{shippingFee === 0 ? "FREE" : "₹350"}</span></div>
                    <div className="flex justify-between font-serif text-lg text-champagne pt-2"><span>Total</span><span>₹{(subtotal + shippingFee).toLocaleString("en-IN")}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Live Order Confirmation & Interactive Courier Map Tracking */}
            {step === 4 && placedOrder && (
              <div className="space-y-6 text-center py-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 rounded-full bg-caramel/20 border border-champagne/40 flex items-center justify-center mx-auto text-champagne"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-[0.3em] text-caramel font-semibold">
                    Order Verified: {placedOrder.orderId}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-cream tracking-wide">
                    COURIER DISPATCHED
                  </h3>
                  <p className="text-xs text-cream/70 max-w-md mx-auto">
                    Your chocolate selection has left the Maison NOIRÉ Paris Atelier in a temperature-controlled vault.
                  </p>
                </div>

                {/* LIVE MAP TRACKING CANVAS / ANIMATED SVG */}
                <div className="relative w-full max-w-2xl mx-auto h-56 rounded-2xl bg-dark-choc border border-champagne/20 overflow-hidden p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs z-10">
                    <span className="text-caramel uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-champagne animate-pulse" /> Live Courier GPS Feed
                    </span>
                    <span className="bg-espresso/80 text-champagne text-[10px] px-3 py-1 rounded-full border border-champagne/20">
                      Status: {placedOrder.status}
                    </span>
                  </div>

                  {/* Animated Path Simulation */}
                  <div className="relative flex-1 flex items-center justify-center">
                    <svg className="w-full h-full text-champagne/30" viewBox="0 0 500 150">
                      <path d="M 50 75 Q 250 10 450 75" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />

                      {/* Paris Origin */}
                      <circle cx="50" cy="75" r="8" fill="#B9824A" />
                      <text x="30" y="110" fill="#D8C2A4" fontSize="11" fontFamily="serif">Atelier Paris</text>

                      {/* Animated Moving Courier Icon */}
                      <g className="animate-bounce" style={{ transform: "translate(240px, 42px)" }}>
                        <circle cx="0" cy="0" r="10" fill="#F4EDE3" />
                        <circle cx="0" cy="0" r="18" fill="#F4EDE3" fillOpacity="0.2" className="animate-ping" />
                      </g>

                      {/* Recipient Destination */}
                      <circle cx="450" cy="75" r="8" fill="#D8C2A4" />
                      <text x="410" y="110" fill="#F4EDE3" fontSize="11" fontFamily="serif">Your Destination</text>
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-cream/70 border-t border-champagne/10 pt-2 z-10">
                    <span>Shipping Address: {placedOrder.shippingAddress}</span>
                    <span className="text-champagne font-medium">{placedOrder.estimatedDelivery}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={closeCheckout}
                    className="px-8 py-3 rounded-full border border-champagne/30 text-champagne text-xs uppercase tracking-widest hover:bg-champagne hover:text-espresso transition-all"
                  >
                    Return to Atelier Collection
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

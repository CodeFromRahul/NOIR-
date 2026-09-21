"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useCursor } from "@/context/CursorContext";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Mouse parallax motion values
  const mouseX = useSpring(0, { damping: 30, stiffness: 200 });
  const mouseY = useSpring(0, { damping: 30, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 30);
    mouseY.set(y * 30);
  };

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const productRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Canvas floating cocoa particles effect
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
    }> = [];

    const colors = ["#D8C2A4", "#B9824A", "#4A281C"];

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-espresso bg-noise"
    >
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70"
      />

      {/* Atmospheric Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cocoa/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-caramel/15 rounded-full blur-[160px] pointer-events-none" />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
      >
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-champagne/20 bg-dark-choc/60 text-champagne text-[11px] uppercase tracking-[0.3em] font-medium backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-caramel" />
            <span>SMALL BATCH · HANDCRAFTED · 72% CACAO</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-[0.02em] font-light text-cream leading-[1.05]"
          >
            CHOCOLATE,
            <br />
            <span className="italic font-normal gold-gradient-text">
              REIMAGINED.
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-xl font-light text-cream/70 tracking-wide max-w-lg leading-relaxed"
          >
            Crafted slowly.
            <br />
            Savoured completely.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-4"
          >
            <a
              href="#collection"
              onMouseEnter={() => setCursor("discover")}
              onMouseLeave={resetCursor}
              className="inline-flex items-center space-x-4 px-8 py-4 rounded-full border border-champagne/40 bg-dark-choc/90 text-cream text-xs uppercase tracking-[0.25em] font-medium hover:bg-champagne hover:text-espresso hover:border-champagne hover:scale-[1.03] transition-all duration-300 shadow-xl shadow-black/40 group"
            >
              <span>Discover Collection</span>
              <ArrowRight className="w-4 h-4 text-champagne group-hover:text-espresso group-hover:translate-x-1.5 transition-all duration-300" />
            </a>
          </motion.div>
        </div>

        {/* Right Column Product Visual with Parallax */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <motion.div
            style={{
              scale: heroScale,
              rotate: productRotate,
              x: mouseX,
              y: mouseY,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setCursor("view", "72% CACAO")}
            onMouseLeave={resetCursor}
            className="relative w-[320px] sm:w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-champagne/20 shadow-[0_30px_70px_rgba(0,0,0,0.8)] group cursor-pointer"
          >
            <Image
              src="/images/noire_hero_bar.jpg"
              alt="NOIRÉ Grand Cru Dark Chocolate Bar"
              fill
              sizes="(max-width: 768px) 320px, 420px"
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Framing Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-transparent to-black/20" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-cream">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-caramel block mb-1">
                  Edition 01
                </span>
                <h3 className="font-serif text-2xl text-cream tracking-wide">
                  Noir Céleste 72%
                </h3>
              </div>
              <span className="text-xs uppercase tracking-widest text-champagne/90 border border-champagne/30 px-3 py-1 rounded-full bg-espresso/60 backdrop-blur-md">
                Grand Cru
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-cream/40">
          Scroll to savor
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-champagne/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}

"use client";

import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from "react";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const works = [
  {
    id: 1,
    title: "Brand Identity",
    cat: "Visual System & Logos",
    desc: "Complete brand architecture — strategy, identity system, and visual language for premium businesses ready to dominate their market.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=85",
    color: "#FF4D00",
    year: "2024",
    tag: "Branding",
  },
  {
    id: 2,
    title: "Web Design",
    cat: "Next.js & GSAP",
    desc: "Cinematic web experiences with buttery-smooth animations, pixel-perfect layouts, and conversion-optimised UX.",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=85",
    color: "#3B82F6",
    year: "2024",
    tag: "Web",
  },
  {
    id: 3,
    title: "AI Automation",
    cat: "n8n & OpenAI",
    desc: "Autonomous agents that eliminate repetitive work, qualify leads, and scale your operations 24/7 without hiring.",
    img: "https://images.unsplash.com/photo-1633511090164-b4421b033878?w=800&q=85",
    color: "#8B5CF6",
    year: "2025",
    tag: "AI",
  },
  {
    id: 4,
    title: "SaaS UI/UX",
    cat: "Product Engineering",
    desc: "Dashboard experiences built for clarity — reducing onboarding time and increasing daily active user retention.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=85",
    color: "#10B981",
    year: "2024",
    tag: "SaaS",
  },
  {
    id: 5,
    title: "Logo Design",
    cat: "Minimalist Marks",
    desc: "Iconic, timeless logos that define market presence — from wordmarks to abstract symbols engineered for recall.",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=85",
    color: "#F59E0B",
    year: "2025",
    tag: "Logo",
  },
  {
    id: 6,
    title: "AI Chatbots",
    cat: "Conversational AI",
    desc: "Intelligent assistants that qualify leads, answer support queries, and close deals — running 24/7 on autopilot.",
    img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=85",
    color: "#EC4899",
    year: "2025",
    tag: "AI",
  },
];

const CARD_COUNT = works.length;
const STEP = 360 / CARD_COUNT;

export function PortfolioSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [radius, setRadius] = useState(300);
  const [mounted, setMounted] = useState(false);
  const angleRef = useRef(0);

  /* ── Cylinder rotation helper ── */
  const spinTo = useCallback(
    (newIndex: number, delta: number) => {
      if (isAnimating) return;
      setIsAnimating(true);

      angleRef.current += delta;

      /* Animate info panel out → cylinder → info panel in */
      const infoTl = gsap.timeline();
      infoTl
        .to(".work-info-anim", {
          y: 20,
          opacity: 0,
          duration: 0.25,
          ease: "power2.in",
          stagger: 0.05,
        })
        .to(
          cylinderRef.current,
          {
            rotateY: angleRef.current,
            duration: 1.0,
            ease: "power3.inOut",
            onComplete: () => {
              setActiveIndex(newIndex);
              setIsAnimating(false);
            },
          },
          0
        )
        .fromTo(
          ".work-info-anim",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.07 },
          "-=0.35"
        );
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    const ni = (activeIndex + 1) % CARD_COUNT;
    spinTo(ni, -STEP);
  }, [activeIndex, spinTo]);

  const prev = useCallback(() => {
    const ni = (activeIndex - 1 + CARD_COUNT) % CARD_COUNT;
    spinTo(ni, STEP);
  }, [activeIndex, spinTo]);

  const goTo = useCallback(
    (i: number) => {
      if (i === activeIndex) return;
      const forward = i > activeIndex;
      const diff = Math.abs(i - activeIndex);
      spinTo(i, forward ? -diff * STEP : diff * STEP);
    },
    [activeIndex, spinTo]
  );

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, prev]);

  /* ── Scroll-triggered entrance ── */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Section fade in */
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      /* Left panel lines cascade in */
      gsap.fromTo(
        ".slider-line",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Cylinder entrance — tilt in from right */
      gsap.fromTo(
        cylinderRef.current,
        { rotateY: -35, x: 120, opacity: 0 },
        {
          rotateY: 0,
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );

      /* Info panel stagger */
      gsap.fromTo(
        ".work-info-anim",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ── Wheel handler ── */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      if (!inView) return;

      const now = Date.now();
      if (now - lastWheel < 700) return;
      lastWheel = now;

      if (e.deltaY > 0) next();
      else prev();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  useLayoutEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setRadius(window.innerWidth > 768 ? 440 : 300);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const aw = works[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen bg-transparent overflow-hidden flex items-center pt-40 pb-24 md:pt-48 z-20"
    >
      {/* Film grain */}
      <div className="grain-overlay" />

      {/* Dynamic colour ambient bleed — intensified */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 70% 50%, ${aw.color}22, transparent 65%)`,
        }}
      />
      {/* Top-left subtle glow */}
      <div
        className="absolute top-0 left-0 w-96 h-96 pointer-events-none rounded-full blur-[120px] opacity-20 transition-all duration-1000"
        style={{ background: aw.color }}
      />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 60%, rgba(10,10,10,0.6) 100%)"
      }} />

      {/* Gradient dividers */}
      <div className="gradient-divider-top" />

      <div className="container mx-auto max-w-7xl px-6 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">

        {/* ── LEFT: Info panel ── */}
        <div ref={infoRef} className="flex-1 text-white min-w-0">

          {/* Section label */}
          <div className="slider-line mb-10 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-[var(--brand-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">Selected Works</span>
          </div>

          {/* Big heading */}
          <div className="slider-line mb-6 pb-6 px-1 pt-2">
            <h2 className="font-display text-[clamp(3.5rem,7vw,7.5rem)] font-black leading-[1.1] uppercase tracking-tighter">
              Creative<br />
              <span className="text-white/20">Portfolio</span>
            </h2>
          </div>

          <p className="slider-line text-sm text-white/40 max-w-xs leading-relaxed mb-12">
            Handcrafted digital experiences across branding, web, AI, and SaaS.
          </p>

          {/* ── Active work details ── */}
          <div className="border-t border-white/8 pt-8 space-y-4">

            {/* Category + year */}
            <div className="work-info-anim flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: aw.color }}
                />
                <span className="text-[11px] font-black uppercase tracking-[0.22em]" style={{ color: aw.color }}>
                  {aw.cat}
                </span>
              </div>
              <span className="text-xs text-white/30 font-mono">{aw.year}</span>
            </div>

            {/* Title */}
            <h3
              className="work-info-anim font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase tracking-tight leading-none transition-colors duration-500"
              style={{ color: aw.color }}
            >
              {aw.title}
            </h3>

            {/* Description */}
            <p className="work-info-anim text-white/45 text-sm leading-relaxed max-w-sm">
              {aw.desc}
            </p>

            {/* View project CTA */}
            <div className="work-info-anim pt-2">
              <button className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300">
                <span>View Case Study</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* ── Navigation controls ── */}
          <div className="flex items-center gap-5 mt-12">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 active:scale-90 disabled:opacity-30"
              aria-label="Previous work"
            >
              <ArrowLeft size={18} />
            </button>

            {/* Counter */}
            <div className="font-mono text-sm tabular-nums">
              <span className="text-white font-bold text-xl">{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="text-white/20 mx-1">/</span>
              <span className="text-white/30">{String(CARD_COUNT).padStart(2, "0")}</span>
            </div>

            <button
              onClick={next}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 active:scale-90 disabled:opacity-30"
              aria-label="Next work"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* ── RIGHT: 3D Cylinder ── */}
        <div
          className="flex-1 flex items-center justify-center cursor-drag"
          style={{ perspective: "1200px", minHeight: "360px" }}
        >
          <div
            ref={cylinderRef}
            className="relative will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              width: "240px",
              height: "320px",
            }}
          >
            {works.map((work, i) => {
              const angle = i * STEP;
              const isActive = i === activeIndex;
              return (
                <div
                  key={work.id}
                  className="absolute inset-0 cursor-pointer"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${mounted ? radius : 300}px)`,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  suppressHydrationWarning
                  onClick={() => goTo(i)}
                >
                  <div
                    className="w-full h-full rounded-2xl overflow-hidden border transition-all duration-500 group"
                    style={{
                      borderColor: isActive ? `${work.color}40` : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? `0 30px 80px -10px ${work.color}30, 0 0 0 1px ${work.color}20`
                        : "0 20px 60px -10px rgba(0,0,0,0.7)",
                      filter: isActive ? "none" : "saturate(0.7) brightness(0.8)",
                    }}
                  >
                    <img
                      src={work.img}
                      alt={work.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      style={{ filter: isActive ? "none" : "inherit" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span
                        className="inline-block text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded"
                        style={{ background: `${work.color}22`, color: work.color }}
                      >
                        {work.tag}
                      </span>
                      <h4 className="text-white font-display font-bold text-sm mt-1.5 leading-tight tracking-tight drop-shadow-lg">
                        {work.title}
                      </h4>
                    </div>
                    {/* Active ring with pulse */}
                    {isActive && (
                      <div
                        className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                        style={{
                          borderColor: `${work.color}50`,
                          animation: "pulse-ring 3s ease-in-out infinite",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Dot pagination ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {works.map((w, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-400 hover:opacity-80"
            style={{
              width: i === activeIndex ? "28px" : "6px",
              height: "6px",
              borderRadius: "999px",
              background: i === activeIndex ? aw.color : "rgba(255,255,255,0.18)",
              transform: i === activeIndex ? "scale(1)" : "scale(1)",
            }}
            aria-label={`Go to work ${i + 1}`}
          />
        ))}
      </div>

      {/* Pulse ring keyframe (inline for module isolation) */}
      <style>{`
        @keyframes pulse-ring {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}

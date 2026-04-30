"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Bot, Monitor, Layout, PenTool, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { icon: <Bot size={28} />, title: "AI Automation Agency", desc: "Transform your business with intelligent enterprise automation. Custom AI chatbots, n8n workflows, and OpenAI integrations to scale your operations rapidly.", color: "#8B5CF6" },
  { icon: <Monitor size={28} />, title: "High-Performance Web Dev", desc: "SEO-optimized Next.js web development and Vibe Coding. We craft pixel-perfect, responsive digital experiences with cinematic GSAP animations.", color: "#3B82F6" },
  { icon: <Layout size={28} />, title: "SaaS UI/UX Product Design", desc: "End-to-end design and development for B2B SaaS products. From user research and wireframing to high-converting dashboards and design systems.", color: "#10B981" },
  { icon: <PenTool size={28} />, title: "Premium Brand Identity", desc: "Crafting minimalist logos and comprehensive visual systems that define your unique market position and help you dominate your competition.", color: "#FF4D00" },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Section heading */
      gsap.fromTo(
        ".services-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      /* Staggered card entrance */
      gsap.fromTo(
        ".service-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: { trigger: ".service-card", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 bg-[#0A0A0A] overflow-hidden">
      {/* Gradient dividers */}
      <div className="gradient-divider-top" />
      <div className="gradient-divider-bottom" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Heading */}
        <div className="services-heading mb-20 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">What We Do</span>
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black leading-tight tracking-tighter uppercase text-white">
            We build brands <br />that{" "}
            <span className="text-[var(--brand-orange)]">
              stand out.
            </span>
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="service-card group relative h-[380px] overflow-hidden rounded-2xl cursor-default
                bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]
                hover:border-white/[0.15] transition-colors duration-500"
            >
              {/* Scanning sweep */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "hud-sweep 4s linear infinite",
                }}
              />

              {/* Top colored glow on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${s.color}, transparent)` }}
              />

              {/* Ambient colored background blur on hover */}
              <div
                className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-[80px]"
                style={{ background: s.color }}
              />

              {/* Icon */}
              <motion.div 
                className="absolute top-8 left-8 z-10"
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `${s.color}15`,
                    color: s.color,
                    boxShadow: `0 0 20px ${s.color}15, inset 0 0 0 1px ${s.color}30`,
                  }}
                >
                  {s.icon}
                </div>
              </motion.div>

              {/* Title */}
              <div className="absolute top-28 left-8 transition-all duration-500 origin-left group-hover:top-10 group-hover:left-28 z-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white drop-shadow-md">{s.title}</h3>
              </div>

              {/* Description */}
              <div className="absolute top-44 left-8 right-8 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:top-28">
                <p className="text-sm md:text-base leading-relaxed text-white/70 line-clamp-3 group-hover:line-clamp-none">
                  {s.desc}
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex items-center gap-2 text-sm font-bold"
                  style={{ color: s.color }}
                >
                  Explore service <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom progress bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[3px] transition-all duration-700 ease-out group-hover:w-full"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color})` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* hud-sweep keyframe */}
      <style>{`
        @keyframes hud-sweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}

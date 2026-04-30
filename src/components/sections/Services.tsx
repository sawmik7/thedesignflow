"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Bot, Monitor, Layout, PenTool, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  { icon: <Bot size={28} />, title: "AI Automation", desc: "Transform your business with intelligent automation. Custom AI chatbots, n8n/Zapier workflows, and OpenAI integrations that save you hours every week.", color: "#8B5CF6" },
  { icon: <Monitor size={28} />, title: "Vibe Coding", desc: "Building high-performance, modern websites using Next.js and GSAP. We craft pixel-perfect, responsive digital experiences with cinematic animations.", color: "#3B82F6" },
  { icon: <Layout size={28} />, title: "SaaS UI/UX", desc: "End-to-end design and development for SaaS products. From user research and wireframing to high-fidelity dashboards and design systems.", color: "#10B981" },
  { icon: <PenTool size={28} />, title: "Brand Identity", desc: "Crafting minimalist logos and comprehensive visual systems that define your unique market position and help you stand out from the competition.", color: "#FF4D00" },
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
            <div
              key={i}
              className="service-card group relative h-[380px] overflow-hidden rounded-2xl cursor-default
                bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]
                hover:border-white/[0.15] transition-all duration-500
                hover:-translate-y-1"
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

              {/* Icon */}
              <div className="absolute top-8 left-8 transition-all duration-500 group-hover:translate-x-1 z-10">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                  style={{
                    background: `${s.color}15`,
                    color: s.color,
                    boxShadow: `0 0 20px ${s.color}10`,
                  }}
                >
                  {s.icon}
                </div>
              </div>

              {/* Title */}
              <div className="absolute top-24 left-8 transition-all duration-500 origin-left group-hover:top-8 group-hover:left-20 z-10">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">{s.title}</h3>
              </div>

              {/* Description */}
              <div className="absolute top-40 left-8 right-8 transition-all duration-500 opacity-60 group-hover:opacity-100 group-hover:top-24">
                <p className="text-sm md:text-base leading-relaxed text-white/50 line-clamp-3 group-hover:line-clamp-none">
                  {s.desc}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 flex items-center gap-2 text-sm font-bold"
                  style={{ color: s.color }}
                >
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

              {/* Bottom progress bar */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full"
                style={{ background: s.color }}
              />
            </div>
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

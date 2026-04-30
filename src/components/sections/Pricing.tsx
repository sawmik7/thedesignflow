"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layout,
  Clock,
  Palette,
  Type,
  FileText,
  PenTool,
  Monitor,
  Zap,
  Sparkles,
  Star,
  Calendar,
  Layers,
  ArrowUpRight,
} from "lucide-react";

export interface Package {
  type: string;
  name: string;
  sub: string;
  price: string;
  time: string;
  features: { icon: React.ReactNode; text: string }[];
  highlight: boolean;
}

const packages: Package[] = [
  {
    type: "Foundation",
    name: "Brand Architect",
    sub: "Complete Brand & Logo System",
    price: "$2,500",
    time: "3-4 weeks",
    features: [
      { icon: <Palette size={16} />, text: "Logo & Brand Mark" },
      { icon: <Type size={16} />, text: "Typography System" },
      { icon: <PenTool size={16} />, text: "Style Guidelines" },
      { icon: <FileText size={16} />, text: "Brand Strategy" },
      { icon: <Layout size={16} />, text: "Social Templates" },
    ],
    highlight: false,
  },
  {
    type: "Digital",
    name: "Web Presence",
    sub: "High-end Next.js Site",
    price: "$6,500",
    time: "4-6 weeks",
    features: [
      { icon: <Layout size={16} />, text: "Cinematic UI/UX" },
      { icon: <Sparkles size={16} />, text: "GSAP Motions" },
      { icon: <Monitor size={16} />, text: "Next.js Codebase" },
      { icon: <Zap size={16} />, text: "Performance Built" },
      { icon: <FileText size={16} />, text: "Technical AI SEO" },
    ],
    highlight: false,
  },
  {
    type: "Intelligence",
    name: "AI & SaaS Apps",
    sub: "Custom agents & products",
    price: "$9,500",
    time: "6-8 weeks",
    features: [
      { icon: <Zap size={16} />, text: "Vibe Coding Frontend" },
      { icon: <Layout size={16} />, text: "SaaS Dashboard UI" },
      { icon: <Monitor size={16} />, text: "LLM Orchestration" },
      { icon: <Sparkles size={16} />, text: "Autonomous Agents" },
      { icon: <Layers size={16} />, text: "Workflow Automation" },
    ],
    highlight: true,
  },
  {
    type: "Empire",
    name: "Complete Ecosystem",
    sub: "The Top 1% Standard",
    price: "$18,000",
    time: "10-12 weeks",
    features: [
      { icon: <Star size={16} />, text: "Complete Visual Identity" },
      { icon: <Monitor size={16} />, text: "Marketing & Web Apps" },
      { icon: <Zap size={16} />, text: "AI Agent Workforce" },
      { icon: <Layers size={16} />, text: "Scalable Infrastructure" },
      { icon: <Clock size={16} />, text: "Post-Launch Retainer" },
    ],
    highlight: false,
  },
];

export function Pricing({ scrollToContact }: { scrollToContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.fromTo(
        ".pricing-heading",
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
        ".pricing-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: ".pricing-card", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-20 sm:py-32 md:py-44 px-5 sm:px-8 md:px-12 bg-[#0A0A0A] overflow-hidden">
      {/* Gradient dividers */}
      <div className="gradient-divider-top" />
      <div className="gradient-divider-bottom" />

      {/* Subtle ambient glow behind popular card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Heading */}
        <div className="pricing-heading text-center mb-16 md:mb-24">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">Pricing</span>
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tighter uppercase text-white">
            Transparent Investment.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`pricing-card relative rounded-[2rem] overflow-hidden flex flex-col h-full transition-all duration-500 group
                bg-white/[0.03] backdrop-blur-xl border
                shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]
                hover:-translate-y-3 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_80px_rgba(0,0,0,0.5)]
                ${pkg.highlight
                  ? "border-[var(--brand-orange)]/30 scale-105 z-10"
                  : "border-white/[0.08] hover:border-white/[0.15]"
                }`}
            >
              {/* Highlight glow */}
              {pkg.highlight && (
                <div className="absolute inset-0 pointer-events-none rounded-[2rem]"
                  style={{ boxShadow: "0 0 60px rgba(255,77,0,0.08), inset 0 0 60px rgba(255,77,0,0.03)" }}
                />
              )}

              {/* Popular badge */}
              {pkg.highlight && (
                <div className="absolute top-6 right-4 z-20 pointer-events-none">
                  <div className="relative transform rotate-12">
                    <span className="font-hand text-2xl text-[var(--brand-orange)] font-bold">
                      Popular
                    </span>
                    <svg
                      width="40"
                      height="20"
                      viewBox="0 0 100 60"
                      className="text-[var(--brand-orange)] absolute top-full right-0"
                    >
                      <path
                        d="M90,10 Q40,50 10,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="p-8 relative z-10">
                <div className="mb-6 opacity-30 text-white">
                  <svg
                    width="40"
                    height="24"
                    viewBox="0 0 40 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="0.5" y="0.5" width="14" height="23" rx="2" />
                    <rect
                      x="18.5"
                      y="0.5"
                      width="14"
                      height="23"
                      rx="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-1 text-white">
                  <span
                    className={
                      pkg.highlight ? "text-[var(--brand-orange)]" : "text-white/60"
                    }
                  >
                    {pkg.type}
                  </span>{" "}
                  {pkg.name}
                </h3>
                <p className="text-xs text-white/40 mb-6">{pkg.sub}</p>
                <div className="mb-8">
                  <span className="text-xs text-white/30 block mb-1">
                    Starting from
                  </span>
                  <span className="font-display text-4xl font-bold tracking-tight text-white">
                    {pkg.price}
                  </span>
                </div>
                <button
                  onClick={scrollToContact}
                  className={`w-fit rounded-full px-6 py-3 text-xs font-bold flex items-center gap-2 transition-all duration-300 active:scale-95
                    ${pkg.highlight
                      ? "bg-[var(--brand-orange)] text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
                      : "border border-white/20 text-white hover:bg-[var(--brand-orange)] hover:border-[var(--brand-orange)] hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
                    }`}
                >
                  Start project <ArrowUpRight size={14} />
                </button>
              </div>
              <div className="bg-white/[0.03] p-8 flex-grow relative z-10 border-t border-white/[0.06]">
                <ul className="space-y-4">
                  {pkg.features.map((feat, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-xs font-medium text-white/50"
                    >
                      <div className="mt-0.5 shrink-0 text-[var(--brand-orange)]/60">
                        {feat.icon}
                      </div>
                      <span>{feat.text}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-xs font-medium text-white/50 pt-2 mt-2 border-t border-white/[0.06]">
                    <div className="mt-0.5 shrink-0 text-[var(--brand-orange)]/60">
                      <Calendar size={16} />
                    </div>
                    <span>Delivery {pkg.time}*</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

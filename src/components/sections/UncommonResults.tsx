import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ShieldCheck, Stars, Zap, Palette } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const items = [
  {
    id: "01",
    name: "Premium brand identity.",
    desc: "Minimalist logos, comprehensive guidelines, and harmonious color typography systems built to command premium market positions.",
    image: "/projects/brandpulse.png",
    detailImage: "/projects/brandpulse_detail.png",
    tag: "BRANDING",
    icon: <Palette size={16} className="text-accent" />,
  },
  {
    id: "02",
    name: "SaaS UI/UX design.",
    desc: "High-conversion product dashboard wireframes, full design systems in Figma, and butter-smooth interactive prototypes.",
    image: "/projects/cortex.png",
    detailImage: "/projects/cortex_detail.png",
    tag: "PRODUCT UI/UX",
    icon: <Stars size={16} className="text-accent" />,
  },
  {
    id: "03",
    name: "High-performance web dev.",
    desc: "Cinematic Next.js/Vite websites powered by responsive custom-drawn layouts, fluid clamp typography, and performant GSAP motion.",
    image: "/projects/flowai.png",
    detailImage: "/projects/flowai_detail.png",
    tag: "DEVELOPMENT",
    icon: <Zap size={16} className="text-accent" />,
  },
  {
    id: "04",
    name: "AI automation agency.",
    desc: "Intelligent autonomous workflows, n8n custom integrations, GPT-4 database connections, and AI agents driving active business scale.",
    image: "/projects/aura.png",
    detailImage: "/projects/aura_detail.png",
    tag: "AUTOMATION",
    icon: <ShieldCheck size={16} className="text-accent" />,
  },
];

export default function UncommonResults() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Fade-in reveals for elements
    gsap.fromTo(
      ".results-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      }
    );

    // Lusion-style smooth scroll parallax zoom on inner images
    gsap.fromTo(
      ".lusion-reveal-img",
      { scale: 1.25 },
      {
        scale: 1.0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 w-full transition-colors duration-700 bg-[var(--background)] text-[var(--foreground)] border-t border-[var(--color-border)]"
    >
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Section Headline */}
        <div className="max-w-4xl mb-12 md:mb-24 results-reveal opacity-0">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-neutral-400 block mb-4">
            ↳ CASE STUDIES
          </span>
          <h2 className="font-hero font-light text-[40px] sm:text-[60px] md:text-[5vw] lg:text-[76px] leading-[1.05] tracking-[-0.03em] text-[var(--foreground)]">
            Uncommon results.
            <span className="font-sans font-normal text-neutral-500 text-[20px] sm:text-[28px] md:text-[32px] block mt-6 leading-relaxed max-w-2xl">
              We don&apos;t just build, we partner to craft market leaders.
            </span>
          </h2>
        </div>

        {/* ── Split Interactive Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ── Left Column: Sticky Mockup Frame ── */}
          <div 
            className="hidden lg:block lg:col-span-5 lg:sticky lg:top-32 w-full aspect-[4/3] rounded-none bg-neutral-950/20 border border-[var(--color-border)] p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.15)] relative overflow-hidden group lusion-reveal-container cursor-pointer"
            data-cursor-label="VIEW ➔"
          >
            {/* Subtle glass reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-10" />

            {/* Absolute stacked images representing mockups */}
            <div className="w-full h-full rounded-none overflow-hidden bg-neutral-900 border border-[var(--color-border)] relative">
              {items.map((item, index) => {
                const isActive = activeIdx === index;
                return (
                  <div
                    key={item.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 translate-y-6 pointer-events-none"
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-top filter contrast-[1.02] lusion-reveal-img"
                    />
                    {/* Cinematic bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                    {/* Meta tag label inside mockup */}
                    <div className="absolute bottom-6 left-6 flex items-center gap-3 backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-4 py-2 font-mono text-[9px] tracking-widest text-white uppercase">
                      {item.icon}
                      <span>{item.tag}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Interactive Editorial List ── */}
          <div className="lg:col-span-7 flex flex-col border-t border-b border-[var(--color-border)] divide-y divide-[var(--color-border)] results-reveal opacity-0">
            {items.map((item, index) => {
              const isActive = activeIdx === index;
              return (
                <div
                  key={item.id}
                  className="py-6 md:py-10 cursor-pointer transition-all duration-500 relative group flex flex-col"
                  onMouseEnter={() => setActiveIdx(index)}
                  onClick={() => setActiveIdx(activeIdx === index ? -1 : index)}
                >
                  <div className="flex justify-between items-baseline gap-6 w-full">
                    <h3 
                      className={`font-hero font-light text-2xl sm:text-4xl lg:text-[40px] xl:text-[50px] tracking-tight leading-[1.1] transition-all duration-500 ${
                        isActive 
                          ? "text-[var(--foreground)] opacity-100" 
                          : "text-[var(--foreground)] opacity-25 group-hover:opacity-60"
                      }`}
                    >
                      {item.name}
                    </h3>
                    
                    {/* Subtle Arrow indicator for the active item */}
                    <div className={`transition-all duration-500 ${
                      isActive 
                        ? "opacity-100 translate-x-0 rotate-45 scale-110" 
                        : "opacity-0 -translate-x-4 pointer-events-none"
                    }`}>
                      <ArrowUpRight size={28} className="text-[var(--color-text)]" />
                    </div>
                  </div>

                  {/* Smooth Accordion reveal for active item description */}
                  <div 
                    style={{
                      display: "grid",
                      gridTemplateRows: isActive ? "1fr" : "0fr",
                      transition: "grid-template-rows 500ms cubic-bezier(0.16, 1, 0.3, 1), opacity 500ms ease",
                      opacity: isActive ? 1 : 0
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-sans max-w-xl mt-6">
                        {item.desc}
                      </p>

                      {/* ── MOBILE FALLBACK MOCKUP: Stacks neatly inside the accordion when screen is smaller than lg ── */}
                      <div className="lg:hidden mt-6 w-full aspect-[16/10] rounded-none overflow-hidden border border-[var(--color-border)] relative shadow-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 backdrop-blur-md bg-black/40 border border-white/10 rounded-full px-3 py-1.5 font-mono text-[8px] tracking-widest text-white uppercase">
                          {item.icon}
                          <span>{item.tag}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

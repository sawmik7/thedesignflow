import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check, Sparkles, Calendar, Zap, MessageSquare, Monitor, Palette } from "lucide-react";
import { packages } from "@/data/pricing";
import { pushGTMEvent } from "@/hooks/useGTM";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const icons = [Palette, Zap, Monitor, MessageSquare];

export function Pricing({ scrollToContact }: { scrollToContact: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Grid cells entry stagger
    gsap.fromTo(
      ".pricing-card",
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
        },
      }
    );

    // Section reveal
    gsap.fromTo(
      ".pricing-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="py-24 md:py-32 px-6 md:px-12 w-full transition-colors duration-700 bg-[var(--background)] text-[var(--foreground)] border-t border-neutral-300/20"
    >
      <div className="max-w-[1800px] mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-4xl mb-20 pricing-reveal opacity-0">
          <span className="font-mono text-xs tracking-[0.35em] uppercase text-neutral-400 block mb-4">
            ↳ INVESTMENT
          </span>
          <h2 className="font-hero font-light text-[40px] sm:text-[52px] leading-[1.05] tracking-[-0.02em]">
            Transparent pricing. <span className="font-sans font-normal text-neutral-500 text-[24px] sm:text-[32px] block mt-4 leading-snug">Designed for hyper-growth startups. Zero hidden fees.</span>
          </h2>
        </div>

        {/* ── 4-Column Side-by-Side Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => {
            const Icon = icons[index] || Zap;
            const isHighlight = pkg.highlight; // Web Dev is highlighted

            return (
              <div
                key={index}
                className={`pricing-card group flex flex-col justify-between p-8 rounded-3xl border transition-all duration-700 relative opacity-0 ${
                  isHighlight
                    ? "bg-neutral-950/40 border-accent/40 shadow-[0_30px_70px_rgba(200,169,110,0.06),inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "bg-neutral-500/2 border-neutral-300/20 shadow-sm hover:border-neutral-300/40"
                }`}
              >
                {/* Spotlight glowing border highlight */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl"
                  style={{
                    background: isHighlight
                      ? "radial-gradient(ellipse at 50% 0%, rgba(200, 169, 110, 0.08) 0%, transparent 60%)"
                      : "radial-gradient(ellipse at 50% 0%, rgba(255, 77, 0, 0.03) 0%, transparent 60%)",
                  }}
                />

                {/* Highly structured header info */}
                <div>
                  {/* Top info and badge */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-mono text-[10px] tracking-widest text-neutral-400 font-bold uppercase">
                      {pkg.type} // PACKAGE
                    </span>
                    {isHighlight && (
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-accent/15 border border-accent/30 rounded-full font-mono text-[8px] tracking-widest text-accent uppercase font-bold">
                        <Sparkles size={8} /> MOST POPULAR
                      </div>
                    )}
                  </div>

                  {/* Icon and Name */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                      isHighlight
                        ? "bg-accent/10 border-accent/25 text-accent"
                        : "bg-neutral-500/5 border-neutral-300/20 text-neutral-400 group-hover:border-accent/30 group-hover:bg-accent/5 group-hover:text-accent"
                    }`}>
                      <Icon size={18} />
                    </div>
                    <h3 className="font-hero font-light text-2xl uppercase tracking-tight text-[var(--foreground)] leading-none">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Price presentation */}
                  <div className="flex items-baseline gap-1.5 mb-6 border-b border-neutral-300/10 pb-6">
                    <span className="font-hero font-light text-5xl tracking-tight text-[var(--foreground)]">
                      {pkg.price}
                    </span>
                    {pkg.unit && (
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                        / {pkg.unit}
                      </span>
                    )}
                  </div>

                  {/* Short summary desc */}
                  <p className="text-[13px] leading-relaxed text-neutral-500 font-sans mb-8 min-h-[40px]">
                    {pkg.sub}
                  </p>

                  {/* Features Checklist */}
                  <div className="space-y-4 mb-10">
                    <span className="font-mono text-[9px] tracking-widest text-neutral-400 uppercase font-bold block">
                      FEATURES INCLUDED:
                    </span>
                    <ul className="space-y-3.5">
                      {pkg.features.map((feat, j) => (
                        <li key={j} className="flex items-start gap-3 text-xs font-sans text-neutral-500 group-hover:text-neutral-600 transition-colors duration-500">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                            isHighlight
                              ? "bg-accent/15 border-accent/20 text-accent"
                              : "bg-neutral-500/5 border-neutral-300/20 text-neutral-400 group-hover:border-accent/30 group-hover:text-accent"
                          }`}>
                            <Check size={9} strokeWidth={3} />
                          </div>
                          <span>{feat.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing Card CTA Buttons */}
                <div className="mt-auto pt-6 border-t border-neutral-300/10 space-y-4">
                  {(pkg.type === "01" || pkg.type === "02") ? (
                    <>
                      {/* Primary: Order on Fiverr */}
                      <a
                        href="https://www.fiverr.com/thedesignflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => pushGTMEvent('fiverr_cta_click', { package: pkg.name, price: pkg.price, source: 'pricing_section' })}
                        className={`w-full min-h-[48px] rounded-2xl font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-95 group/btn border shadow-sm ${
                          isHighlight
                            ? "bg-accent text-black border-accent hover:bg-transparent hover:text-white"
                            : "bg-neutral-900 text-white border-neutral-300/10 hover:bg-accent hover:text-black hover:border-accent"
                        }`}
                      >
                        <span>Order on Fiverr</span>
                        <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </a>
                      
                      {/* Secondary: Get Custom Quote */}
                      <button
                        onClick={scrollToContact}
                        className="w-full text-center font-mono text-[9px] text-neutral-400 uppercase tracking-widest hover:text-accent transition-colors duration-300 block"
                      >
                        Or Get Custom Quote
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Primary: Start Project */}
                      <button
                        onClick={() => { pushGTMEvent('cta_click', { cta: 'pricing_contact', package: pkg.name }); scrollToContact(); }}
                        className={`w-full min-h-[48px] rounded-2xl font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-300 transform active:scale-95 group/btn border shadow-sm ${
                          isHighlight
                            ? "bg-accent text-black border-accent hover:bg-transparent hover:text-white"
                            : "bg-neutral-900 text-white border-neutral-300/10 hover:bg-accent hover:text-black hover:border-accent"
                        }`}
                      >
                        <span>Start Project</span>
                        <ArrowUpRight size={13} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                      </button>

                      {/* Secondary: Order via Fiverr */}
                      <a
                        href="https://www.fiverr.com/thedesignflow"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => pushGTMEvent('fiverr_cta_click', { package: pkg.name, price: pkg.price, source: 'pricing_section' })}
                        className="w-full text-center font-mono text-[9px] text-neutral-400 uppercase tracking-widest hover:text-accent transition-colors duration-300 block"
                      >
                        Or Order via Fiverr
                      </a>
                    </>
                  )}

                  <div className="flex items-center justify-center gap-2 mt-4 font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                    <Calendar size={11} className="text-accent/60" />
                    <span>TIMELINE: {pkg.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small detail warning notice */}
        <div className="mt-16 text-center text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          * ALL SERVICES INCLUDE SPRINT REVIEWS · 100% SECURE ESCROW CONTRACTS · 14-DAY POST-HANDOFF SUPPORT
        </div>
      </div>
    </section>
  );
}

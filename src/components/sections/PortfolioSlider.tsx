"use client";

import React, { useLayoutEffect, useRef, useCallback, useEffect, useState } from "react";
import { ArrowRight, ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { works } from "@/lib/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortfolioSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", skipSnaps: false }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".slider-header",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
      gsap.fromTo(
        ".slider-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 sm:py-32 bg-[#0A0A0A] overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--brand-orange)]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-8 sm:px-10 md:px-12 relative z-10 mb-16 slider-header">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[var(--brand-orange)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">Selected Works</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black uppercase tracking-tight text-white leading-[1.1]">
              Creative <br className="hidden md:block" />
              <span className="text-white/30">Portfolio</span>
            </h2>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden w-full pl-8 sm:pl-10 md:pl-12" ref={emblaRef}>
        <div className="flex gap-6 md:gap-8 pb-10" style={{ touchAction: "pan-y" }}>
          {works.map((aw, i) => (
            <div 
              key={i} 
              className="slider-card relative flex-shrink-0 min-w-0"
              style={{ flex: "0 0 85%", maxWidth: "100%" }}
            >
              <motion.div 
                whileHover={{ scale: 0.98, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group relative rounded-[2rem] overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-md h-[450px] md:h-[550px] flex flex-col cursor-grab active:cursor-grabbing"
              >
                {/* Image Section */}
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 opacity-80" />
                  <motion.img 
                    src={aw.img} 
                    alt={aw.title} 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  />
                  {/* Category Badge - Top Left */}
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: aw.color }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">{aw.cat}</span>
                  </div>
                  {/* Year Tag - Top Right */}
                  <div className="absolute top-5 right-5 z-20 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] font-bold font-mono text-white/60">{aw.year}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-20 -mt-16 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight mb-3 group-hover:text-[var(--brand-orange)] transition-colors">
                      {aw.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                      {aw.desc}
                    </p>
                  </div>
                  <Link
                    href={`/portfolio/${aw.slug}`}
                    className="inline-flex items-center gap-2 mt-6 text-[11px] font-black uppercase tracking-[0.2em] transition-colors pointer-events-auto"
                    style={{ color: aw.color }}
                  >
                    View Case Study <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Breakpoint Overrides for Embla Slides */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) { .slider-card { flex: 0 0 45%; } }
        @media (min-width: 1024px) { .slider-card { flex: 0 0 32%; } }
      `}} />
    </section>
  );
}

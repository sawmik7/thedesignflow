"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowRight, UploadCloud } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact({ scrollToContact }: { scrollToContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-form",
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: ".contact-form", start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-form" className="relative py-32 md:py-44 px-6 bg-[#0A0A0A] overflow-hidden">
      {/* Gradient divider */}
      <div className="gradient-divider-top" />

      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Heading */}
        <div className="contact-heading text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">Get in Touch</span>
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tighter uppercase text-white">
            Let&apos;s Start a Project
          </h2>
        </div>

        <form
          className="contact-form p-8 md:p-12 rounded-[2.5rem] space-y-8
            bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Name
              </label>
              <input
                type="text"
                className="w-full border-b border-white/10 py-3 focus:outline-none focus:border-[var(--brand-orange)] transition-colors bg-transparent text-white placeholder-white/20"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Company
              </label>
              <input
                type="text"
                className="w-full border-b border-white/10 py-3 focus:outline-none focus:border-[var(--brand-orange)] transition-colors bg-transparent text-white placeholder-white/20"
                placeholder="Acme Inc."
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Email
              </label>
              <input
                type="email"
                className="w-full border-b border-white/10 py-3 focus:outline-none focus:border-[var(--brand-orange)] transition-colors bg-transparent text-white placeholder-white/20"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Phone
              </label>
              <input
                type="tel"
                className="w-full border-b border-white/10 py-3 focus:outline-none focus:border-[var(--brand-orange)] transition-colors bg-transparent text-white placeholder-white/20"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
              Project Details
            </label>
            <textarea
              rows={4}
              className="w-full border-b border-white/10 py-3 focus:outline-none focus:border-[var(--brand-orange)] transition-colors bg-transparent text-white placeholder-white/20 resize-none"
              placeholder="Tell me about your goals..."
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 block">
              Attachments
            </label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[var(--brand-orange)]/30 hover:bg-[var(--brand-orange)]/5 transition-all duration-300">
              <UploadCloud size={32} className="text-white/30 mb-2" />
              <span className="text-sm text-white/40 font-medium">
                Click to upload or drag and drop
              </span>
              <span className="text-xs text-white/25 mt-1">
                SVG, PNG, JPG or PDF (max. 10MB)
              </span>
              <input type="file" className="hidden" />
            </div>
          </div>

          <button
            type="submit"
            className="group w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]
              bg-gradient-to-r from-[var(--brand-orange)] to-[#FF6A33] text-white
              hover:shadow-[0_0_30px_rgba(255,77,0,0.3)]"
          >
            Send Message <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </form>
      </div>
    </section>
  );
}

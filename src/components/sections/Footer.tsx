"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Mail, Twitter, Instagram, Dribbble, Linkedin, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Giant text entrance */
      gsap.fromTo(
        ".footer-headline",
        { y: "100%", skewY: 4 },
        {
          y: "0%",
          skewY: 0,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      /* Email link */
      gsap.fromTo(
        ".footer-email",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );

      /* Social icons stagger */
      gsap.fromTo(
        ".footer-social",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-social", start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={sectionRef} id="contact" className="relative bg-[#0a0a0a] text-white py-32 md:py-40 px-6 overflow-hidden">
      {/* Gradient divider */}
      <div className="gradient-divider-top" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.04) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto max-w-5xl text-center relative z-10">
        {/* Giant CTA text with mask reveal */}
        <div className="overflow-hidden mb-12">
          <h2 className="footer-headline font-display text-[12vw] md:text-[10vw] font-black tracking-tighter leading-none cursor-default group">
            <span className="inline-block hover:text-[var(--brand-orange)] transition-colors duration-500">
              LET&apos;S WORK
            </span>
          </h2>
        </div>

        <div className="flex flex-col items-center gap-8 mb-20">
          <a
            href="mailto:hello@hasanul.com"
            className="footer-email group inline-flex items-center gap-4 text-xl md:text-2xl font-bold pb-2 relative"
          >
            <Mail className="group-hover:scale-110 transition-transform text-white/60 group-hover:text-[var(--brand-orange)]" />
            <span className="text-white/80 group-hover:text-white transition-colors">hello@hasanul.design</span>
            {/* Animated underline */}
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--brand-orange)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </a>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.06] gap-6">
          <div className="text-sm font-bold text-white/30">
            © 2026 Hasanul Kabir. Level 2 Fiverr Seller.
          </div>

          <div className="flex items-center gap-6">
            {[Twitter, Instagram, Dribbble, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="footer-social text-white/30 hover:text-[var(--brand-orange)] hover:scale-110 transition-all duration-300"
                aria-label={`Social link ${i + 1}`}
              >
                <Icon size={20} />
              </a>
            ))}

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="footer-social ml-4 w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[var(--brand-orange)] hover:border-[var(--brand-orange)]/30 transition-all duration-300 active:scale-90"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

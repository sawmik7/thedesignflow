"use client";

import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import gsap from "gsap";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isScrolled: boolean;
  scrollToContact: () => void;
}

const navItems = ["Work", "Services", "Pricing", "About"];

export function Navbar({ isMenuOpen, setIsMenuOpen, isScrolled, scrollToContact }: NavbarProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  /* Animate mobile menu open/close */
  useLayoutEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      menuTlRef.current = gsap.timeline();
      menuTlRef.current
        .fromTo(
          menuRef.current,
          { opacity: 0, visibility: "hidden" },
          { opacity: 1, visibility: "visible", duration: 0.4, ease: "power2.out" }
        )
        .fromTo(
          ".mobile-menu-item",
          { y: "100%", skewY: 5, opacity: 0 },
          { y: "0%", skewY: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power4.out" },
          "-=0.2"
        );
    } else if (menuTlRef.current) {
      gsap.to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.visibility = "hidden";
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 md:pt-4 px-4">
        <div
          className={`flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled
              ? "w-[95%] md:w-[700px] bg-[#0a0a0a]/60 backdrop-blur-xl text-white shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-full px-5 py-2.5 border border-white/[0.05]"
              : "w-full max-w-7xl bg-transparent py-3"
          }`}
        >
          <div className="font-display font-bold text-lg md:text-xl tracking-widest lowercase z-50 cursor-pointer text-white">
            thedesignflow<span className="text-[var(--brand-orange)]">.</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="group relative py-1 hover:text-white transition-colors duration-300"
              >
                {item}
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--brand-orange)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className={`hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 active:scale-95 ${
                isScrolled
                  ? "bg-white text-black hover:bg-[var(--brand-orange)] hover:text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
                  : "bg-white text-black hover:bg-[var(--brand-orange)] hover:text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
              }`}
            >
              Start a project <ArrowUpRight size={16} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white bg-transparent relative z-50"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-90" : ""}`}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Dark cinematic mobile menu ── */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#0A0A0A] z-40 flex flex-col justify-center px-8"
        style={{ opacity: 0, visibility: "hidden" }}
      >
        {/* Background ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,77,0,0.06) 0%, transparent 70%)" }}
        />

        {navItems.map((item) => (
          <div key={item} className="overflow-hidden mb-2">
            <a
              onClick={() => setIsMenuOpen(false)}
              href={`#${item.toLowerCase()}`}
              className="mobile-menu-item block font-display text-5xl sm:text-6xl font-black uppercase tracking-tight text-white hover:text-[var(--brand-orange)] transition-colors duration-300 py-2"
            >
              {item}
            </a>
          </div>
        ))}
        <div className="overflow-hidden mb-2">
          <button
            onClick={() => {
              scrollToContact();
              setIsMenuOpen(false);
            }}
            className="mobile-menu-item block font-display text-5xl sm:text-6xl font-black uppercase tracking-tight text-white hover:text-[var(--brand-orange)] transition-colors duration-300 text-left py-2"
          >
            Contact
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            © 2026 thedesignflow
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">
            hello@hasanul.design
          </span>
        </div>
      </div>
    </>
  );
}

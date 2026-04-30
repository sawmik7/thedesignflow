"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { splitIntoChars } from "@/lib/splitText";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted) return;

    if (sessionStorage.getItem("preloaded")) {
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      sessionStorage.setItem("preloaded", "true");
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("preloaded", "true");
          onComplete();
        },
      });

      // ── Phase 1: Grid lines sweep in ──────────────────────
      tl.fromTo(".pl-h-line", { scaleX: 0 }, {
        scaleX: 1, duration: 0.6, stagger: 0.08, ease: "expo.out", transformOrigin: "left",
      }, 0)
      .fromTo(".pl-v-line", { scaleY: 0 }, {
        scaleY: 1, duration: 0.5, stagger: 0.07, ease: "expo.out", transformOrigin: "top",
      }, 0.1)

      // ── Phase 2: Counter ticks 0→100 ──────────────────────
      .fromTo(".pl-counter", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.15)
      .to(".pl-counter", {
        innerHTML: 100,
        duration: 1.4,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        onUpdate() {
          const el = document.querySelector(".pl-counter");
          if (el) {
            const v = parseInt(el.innerHTML);
            el.innerHTML = String(v).padStart(2, "0");
          }
        },
      }, 0.25)

      // ── Phase 3: Brand chars cascade in from below ─────────
      .fromTo(".pl-char", { y: "110%", skewY: 8 }, {
        y: "0%", skewY: 0, duration: 0.8, stagger: 0.035, ease: "power4.out",
      }, 0.5)

      // ── Phase 4: Orange dot pulse ─────────────────────────
      .to(".pl-dot", { scale: 2.2, duration: 0.25, ease: "power2.out" }, "-=0.15")
      .to(".pl-dot", { scale: 1, duration: 0.25, ease: "power2.in" })

      // ── Phase 5: Tagline slides in ────────────────────────
      .fromTo(".pl-tagline", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
      }, "-=0.2")

      // ── Phase 6: Progress bar fills ───────────────────────
      .fromTo(".pl-bar-fill", { scaleX: 0 }, {
        scaleX: 1, duration: 0.7, ease: "expo.inOut", transformOrigin: "left",
      }, "-=0.3")

      // ── Phase 7: Hold ──────────────────────────────────────
      .to({}, { duration: 0.35 })

      // ── Phase 8: Everything splits apart vertically ────────
      .to(".pl-top-half", {
        yPercent: -110, duration: 0.9, ease: "expo.inOut",
      })
      .to(".pl-bot-half", {
        yPercent: 110, duration: 0.9, ease: "expo.inOut",
      }, "<")

      // ── Phase 9: Container fades out ──────────────────────
      .to(container.current, { opacity: 0, duration: 0.15 }, "-=0.1");

    }, container);

    return () => ctx.revert();
  }, [mounted, onComplete]);

  if (!mounted || (typeof window !== "undefined" && sessionStorage.getItem("preloaded"))) {
    return null;
  }

  const brandText = "thedesignflow";
  const chars = splitIntoChars(brandText);

  // Grid: 4 h-lines, 5 v-lines
  const hLines = [15, 38, 62, 85];
  const vLines = [20, 40, 60, 80];

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* ── Grid lines ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {hLines.map((top, i) => (
          <div
            key={`h${i}`}
            className="pl-h-line absolute left-0 right-0 h-[1px]"
            style={{ top: `${top}%`, background: "rgba(255,255,255,0.05)" }}
          />
        ))}
        {vLines.map((left, i) => (
          <div
            key={`v${i}`}
            className="pl-v-line absolute top-0 bottom-0 w-[1px]"
            style={{ left: `${left}%`, background: "rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>

      {/* ── Ambient orange glow ────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── TOP HALF (splits upward) ───────────────── */}
      <div className="pl-top-half absolute top-0 left-0 right-0 h-1/2 overflow-hidden flex items-end justify-center pb-0 pointer-events-none" style={{ background: "#060608", zIndex: 10 }} />

      {/* ── BOT HALF (splits downward) ─────────────── */}
      <div className="pl-bot-half absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden pointer-events-none" style={{ background: "#060608", zIndex: 10 }} />

      {/* ── CENTER CONTENT ─────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-5">

        {/* Counter — top-right corner style */}
        <div
          className="absolute top-8 right-10 font-mono text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          <span>Loading</span>
          <span className="pl-counter text-white/60">00</span>
          <span>%</span>
        </div>

        {/* Small top label */}
        <div
          className="pl-tagline text-[9px] font-black uppercase tracking-[0.5em] mb-2"
          style={{ color: "var(--brand-orange)", opacity: 0 }}
        >
          Creative Studio
        </div>

        {/* Brand text */}
        <div className="overflow-hidden flex items-baseline pb-1">
          <h1
            className="font-display font-black tracking-tighter text-white flex items-baseline"
            style={{ fontSize: "clamp(2rem, 7vw, 5.5rem)" }}
          >
            {chars.map(({ char, index }) => (
              <span
                key={index}
                className="pl-char inline-block"
                style={{ willChange: "transform" }}
              >
                {char}
              </span>
            ))}
            <span
              className="pl-char pl-dot inline-block ml-1"
              style={{ color: "var(--brand-orange)", willChange: "transform" }}
            >
              .
            </span>
          </h1>
        </div>

        {/* Progress bar */}
        <div className="w-48 md:w-72 h-[2px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div
            className="pl-bar-fill h-full rounded-full"
            style={{ background: "linear-gradient(to right, var(--brand-orange), #FF8C42)", transformOrigin: "left" }}
          />
        </div>

        {/* Bottom label */}
        <div
          className="pl-tagline text-[9px] font-medium uppercase tracking-[0.35em] mt-1"
          style={{ color: "rgba(255,255,255,0.2)", opacity: 0 }}
        >
          Hasanul Kabir · Portfolio 2026
        </div>
      </div>

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { splitIntoChars } from "@/lib/splitText";

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    // Check if already preloaded in this session
    if (sessionStorage.getItem("preloaded")) {
      onComplete();
      return;
    }

    // Also check reduced motion
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

      // 1. Characters stagger in from bottom
      tl.fromTo(
        ".preloader-char",
        { y: "100%", skewY: 10, opacity: 0 },
        {
          y: "0%",
          skewY: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        }
      )
      // 2. Orange dot pulses
      .to(".preloader-dot", {
        scale: 2.5,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.2")
      .to(".preloader-dot", {
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      })
      // 3. Line expands
      .fromTo(".preloader-line",
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: "expo.out" },
        "-=0.1"
      )
      // 4. Slight pause
      .to({}, { duration: 0.2 })
      // 5. Fade out text & line
      .to([textRef.current, ".preloader-line"], {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      // 6. Curtain lift
      .to(container.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "expo.inOut",
      });
    }, container);

    return () => ctx.revert();
  }, [mounted, onComplete]);

  // If already preloaded or not mounted, render nothing
  if (!mounted || (typeof window !== "undefined" && sessionStorage.getItem("preloaded"))) {
    return null;
  }

  const brandText = "thedesignflow";
  const chars = splitIntoChars(brandText);

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
    >
      <div ref={textRef} className="relative flex items-baseline overflow-hidden pb-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white flex">
          {chars.map(({ char, index }) => (
            <span
              key={index}
              className="preloader-char inline-block"
              style={{ willChange: "transform, opacity" }}
            >
              {char}
            </span>
          ))}
          <span className="preloader-char preloader-dot inline-block text-[var(--brand-orange)] ml-1">.</span>
        </h1>
      </div>
      
      {/* Loading bar illusion */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-8 w-48 h-[1px] bg-white/20 overflow-hidden">
        <div className="preloader-line w-full h-full bg-[var(--brand-orange)] origin-center" />
      </div>

      {/* Subtle grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

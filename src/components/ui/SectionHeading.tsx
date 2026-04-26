"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionHeadingProps {
  label: string;
  headline: string;
  /** Words to render dimmed (at 20% opacity). */
  dimWords?: string[];
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  headline,
  dimWords = [],
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sh-label",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".sh-line-inner",
        { y: "105%", skewY: 4 },
        {
          y: "0%",
          skewY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 78%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split headline into words, apply dim treatment to specified words
  const words = headline.split(" ");
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} ${className}`}>
      {/* Label */}
      <div className="sh-label mb-6 flex items-center gap-3">
        <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">
          {label}
        </span>
        <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
      </div>

      {/* Headline */}
      <div className="overflow-hidden pb-4">
        <h2 className="sh-line-inner font-display text-[clamp(2rem,5vw,4.5rem)] font-black tracking-tighter leading-[1.15] uppercase">
          {words.map((word, i) => {
            const isDim = dimWords.includes(word.replace(/[.,!?]/g, ""));
            return (
              <React.Fragment key={i}>
                <span className={isDim ? "text-white/20" : "text-white"}>
                  {word}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </h2>
      </div>
    </div>
  );
}

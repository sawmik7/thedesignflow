import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

    // Split headline text into words using SplitType
    const split = new SplitType(headingRef.current, { types: "words" });

    const ctx = gsap.context(() => {
      // 1. Label Reveal
      gsap.fromTo(
        ".sh-label",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 85%" },
        }
      );

      // 2. Dynamic Word-Mask Reveal (Uncommon Design Group style)
      if (split.words && split.words.length > 0) {
        split.words.forEach((word) => {
          // Create overflow-hidden mask container
          const parent = document.createElement("span");
          parent.style.display = "inline-block";
          parent.style.overflow = "hidden";
          parent.style.verticalAlign = "top";
          
          word.parentNode?.insertBefore(parent, word);
          parent.appendChild(word);
          
          // Style inner word element for clean sliding
          word.style.display = "inline-block";
          word.classList.add("sh-word-inner");
        });

        gsap.fromTo(
          ".sh-word-inner",
          { y: "115%" },
          {
            y: "0%",
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.035,
            force3D: true,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  const words = headline.split(" ");
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div ref={containerRef} className={`flex flex-col ${alignClass} ${className}`}>
      {/* Label */}
      <div className="sh-label mb-6 flex items-center gap-3 opacity-0">
        <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">
          {label}
        </span>
        <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
      </div>

      {/* Headline */}
      <h2 
        ref={headingRef}
        className="font-display text-[clamp(2.2rem,5.5vw,4.5rem)] font-black tracking-tightest leading-[1.1] uppercase w-full select-none"
      >
        {words.map((word, i) => {
          const isDim = dimWords.includes(word.replace(/[.,!?]/g, ""));
          return (
            <span key={i} className={isDim ? "text-white/25" : "text-white"}>
              {word}
            </span>
          );
        })}
      </h2>
    </div>
  );
}

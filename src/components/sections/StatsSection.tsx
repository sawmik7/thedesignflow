import React, { useRef } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import LottieIcon from "@/components/ui/LottieIcon";

const stats = [
  {
    value: 8,
    suffix: "+",
    label: "Years Exp",
    prefix: "",
    icon: (
      <LottieIcon
        url="/lottie/time.json"
        trigger="scroll"
        className="w-12 h-12 mb-6"
        speed={1.2}
      />
    ),
    accent: "#C8A96E",
  },
  {
    value: 280,
    suffix: "+",
    label: "Projects",
    prefix: "",
    icon: (
      <LottieIcon
        url="/lottie/projects.json"
        trigger="scroll"
        className="w-12 h-12 mb-6"
        speed={1.0}
      />
    ),
    accent: "#C8A96E",
  },
  {
    value: 5,
    suffix: "%",
    label: "Standard",
    prefix: "Top ",
    icon: (
      <LottieIcon
        url="/lottie/standard.json"
        trigger="scroll"
        className="w-12 h-12 mb-6"
        speed={1.0}
      />
    ),
    accent: "#C8A96E",
  },
  {
    value: 4.9,
    suffix: "★",
    label: "Rating",
    prefix: "",
    decimals: 1,
    icon: (
      <LottieIcon
        url="/lottie/rating.json"
        trigger="scroll"
        className="w-12 h-12 mb-6"
        speed={1.2}
      />
    ),
    accent: "#C8A96E",
  },
];


export default function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const CountUpComponent = (CountUp as any).default || CountUp;

  useGSAP(() => {
    if (!containerRef.current) return;

    // Stagger path drawing
    gsap.fromTo(
      ".stat-svg-path",
      { strokeDashoffset: (i, target) => parseFloat(window.getComputedStyle(target).strokeDasharray) || 200 },
      {
        strokeDashoffset: 0,
        duration: 1.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );

    // Grid cells slide reveals
    gsap.fromTo(
      ".stat-grid-cell",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative bg-black py-24 md:py-32 px-6 md:px-12 border-y border-white/5 overflow-hidden w-full transition-colors duration-700"
    >
      <div className="max-w-[1800px] mx-auto w-full">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-grid-cell group flex flex-col items-start border-l border-white/10 pl-6 md:pl-10 relative opacity-0"
            >
              {/* Custom Self-Drawing SVG Icon */}
              {stat.icon}

              {/* Number presentation */}
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-hero font-light text-white mb-3 tracking-tighter flex items-baseline">
                <span className="text-[0.6em] font-normal mr-1">{stat.prefix}</span>
                <CountUpComponent
                  end={stat.value}
                  duration={2.5}
                  decimals={stat.decimals || 0}
                  suffix={stat.suffix}
                  enableScrollSpy
                  scrollSpyDelay={100}
                />
              </div>

              {/* Sub-label */}
              <p className="text-[10px] md:text-xs text-white/40 font-mono uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors duration-500">
                {stat.label}
              </p>

              {/* Accent overlay hover lights */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 pointer-events-none -left-2 rounded-xl"
                style={{
                  background: `radial-gradient(circle at 10% 20%, ${stat.accent} 0%, transparent 60%)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Ticking badge bottom */}
        <div className="mt-16 border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/30 uppercase">
          <span>✦ LEVEL 2 FIVERR SELLER</span>
          <span>✦ TOP RATED DESIGN SQUAD</span>
          <span>✦ EST. 2016 · REMOTE WORLDWIDE</span>
        </div>
      </div>
    </section>
  );
}

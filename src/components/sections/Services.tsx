import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

// HAND-CRAFTED MINIMAL SVG ANIMATIONS INSIDE COMPONENT

// 01 Sprints & AI Workflows: Connecting pipeline path with dynamic moving node
function IconAISprints() {
  const lineRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!lineRef.current || !dotRef.current) return;
    const length = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
    })
      .to(dotRef.current, {
        motionPath: {
          path: lineRef.current,
          align: lineRef.current,
          alignOrigin: [0.5, 0.5],
        },
        opacity: 1,
        duration: 2.2,
        ease: "power2.inOut",
      }, 0)
      .to(lineRef.current, {
        strokeDashoffset: -length,
        duration: 2.2,
        ease: "power2.inOut",
      })
      .to(dotRef.current, {
        opacity: 0,
        duration: 0.4,
      }, "-=0.4");
  }, []);

  return (
    <svg className="w-24 h-24 stroke-neutral-400 group-hover:stroke-[var(--brand-orange)] transition-colors duration-500" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
      <path
        ref={lineRef}
        d="M10 50 Q30 20, 50 50 T90 50"
      />
      <circle
        ref={dotRef}
        cx="10"
        cy="50"
        r="4"
        className="fill-[var(--brand-orange)] stroke-none opacity-0"
      />
      <circle cx="10" cy="50" r="2" className="fill-neutral-400" />
      <circle cx="50" cy="50" r="2" className="fill-neutral-400" />
      <circle cx="90" cy="50" r="2" className="fill-neutral-400" />
    </svg>
  );
}

// 02 UX/UI Design: Overlapping intersecting Venn circles that pulse and rotate
function IconUXUI() {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const circles = containerRef.current.querySelectorAll("circle");
    gsap.to(circles, {
      scale: 1.06,
      stagger: 0.15,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      transformOrigin: "center center",
    });
  }, []);

  return (
    <svg ref={containerRef} className="w-24 h-24 stroke-neutral-400 group-hover:stroke-[var(--brand-orange)] transition-colors duration-500" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
      <circle cx="50" cy="38" r="18" />
      <circle cx="38" cy="60" r="18" />
      <circle cx="62" cy="60" r="18" />
    </svg>
  );
}

// 03 Design Direction: Isometric arrow pulsing and casting a moving shadow
function IconDirection() {
  const arrowRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current, {
      y: -6,
      x: 6,
      duration: 1.4,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <svg className="w-24 h-24 stroke-neutral-400 group-hover:stroke-[var(--brand-orange)] transition-colors duration-500" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
      {/* Dynamic shadow */}
      <path d="M25 75 L75 75" className="stroke-neutral-300 stroke-dasharray-[4,4] stroke-[0.8]" />
      <g ref={arrowRef}>
        <path d="M35 65 L65 35 M65 35 L45 35 M65 35 L65 55" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="30" y="30" width="40" height="40" className="stroke-dasharray-[2,2] stroke-[0.8]" />
      </g>
    </svg>
  );
}

// 04 Strategy & Discovery Workshops: Branching connecting nodes that pulse staggers
function IconStrategy() {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const dots = containerRef.current.querySelectorAll("circle.node");
    const lines = containerRef.current.querySelectorAll("line");

    gsap.to(dots, {
      r: 5,
      duration: 1.2,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    
    gsap.to(lines, {
      strokeWidth: 1.8,
      duration: 1.2,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <svg ref={containerRef} className="w-24 h-24 stroke-neutral-400 group-hover:stroke-[var(--brand-orange)] transition-colors duration-500" viewBox="0 0 100 100" fill="none" strokeWidth="1.2">
      <line x1="50" y1="50" x2="20" y2="30" />
      <line x1="50" y1="50" x2="80" y2="30" />
      <line x1="50" y1="50" x2="50" y2="80" />
      <circle cx="50" cy="50" r="3" className="node fill-neutral-400 group-hover:fill-[var(--brand-orange)] transition-colors duration-500" />
      <circle cx="20" cy="30" r="3" className="node fill-neutral-400 group-hover:fill-[var(--brand-orange)] transition-colors duration-500" />
      <circle cx="80" cy="30" r="3" className="node fill-neutral-400 group-hover:fill-[var(--brand-orange)] transition-colors duration-500" />
      <circle cx="50" cy="80" r="3" className="node fill-neutral-400 group-hover:fill-[var(--brand-orange)] transition-colors duration-500" />
    </svg>
  );
}

const SERVICES = [
  {
    id: "001",
    title: "Design Sprints",
    description: "The clue is in the name: we realise your visual concept at pace.",
    icon: <IconAISprints />,
    tags: [],
  },
  {
    id: "002",
    title: "UX and UI Design",
    description: "We solve problems with strategic design.",
    icon: <IconUXUI />,
    tags: [],
  },
  {
    id: "003",
    title: "Design Direction",
    description: "We tactically expand your brand into the digital world.",
    icon: <IconDirection />,
    tags: [],
  },
  {
    id: "004",
    title: "Discovery Workshops",
    description: "We facilitate workshops that fast track discovery of your brand's identity and direction.",
    icon: <IconStrategy />,
    tags: [],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Stagger reveal on grid cells
    gsap.fromTo(
      ".services-grid-cell",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // Unseen-style staggered mask reveals for services headline
    gsap.fromTo(
      ".services-title-mask",
      { y: "115%" },
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="services" className="py-24 md:py-32 px-6 md:px-12 w-full overflow-hidden transition-colors duration-700">
      <div className="max-w-[1800px] mx-auto">
        
        {/* ── Split Header Block (Uncommondesign style) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-24">
          
          {/* Left Title */}
          <div className="lg:col-span-7">
            <h2 className="font-hero font-light text-[40px] sm:text-[60px] md:text-[5vw] lg:text-[76px] leading-[1.05] tracking-[-0.03em] select-none text-[var(--foreground)]">
              <span className="unseen-line-mask block">
                <span className="unseen-line-text block services-title-mask">Design that delivers</span>
              </span>
              <span className="unseen-line-mask block mt-2">
                <span className="unseen-line-text block services-title-mask">
                  <span className="italic font-normal font-serif text-[var(--brand-orange)]">uncommonly</span>
                </span>
              </span>
              <span className="unseen-line-mask block mt-2">
                <span className="unseen-line-text block services-title-mask">good results</span>
              </span>
            </h2>
            <div className="w-fit border border-neutral-300/40 rounded-full px-5 py-2.5 mt-8 text-xs font-mono tracking-widest uppercase text-neutral-500">
              /HOME
            </div>
          </div>

          {/* Right Description & Action */}
          <div className="lg:col-span-5 lg:pt-6 flex flex-col items-start gap-8">
            <p className="text-xl md:text-2xl text-[var(--foreground)] font-light leading-relaxed max-w-md">
              We don&apos;t just design, we partner with you to achieve unmatched quality.
            </p>
            <div>
              <button
                onClick={() => {
                  const target = document.getElementById("services");
                  if (target) target.scrollIntoView({ behavior: "smooth" });
                }}
                className="group/btn inline-flex items-center gap-6 border border-neutral-300/30 hover:border-neutral-300/60 bg-neutral-200/40 hover:bg-neutral-200/80 text-black px-6 py-2.5 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto select-none"
              >
                <span className="font-sans text-sm font-semibold tracking-wide text-[#121212]">Our Services</span>
                <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-white transition-transform duration-300 group-hover/btn:translate-x-1.5">
                  <span className="text-[10px] font-bold">➔</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ── 4-Column Minimal Grid (Uncommon Theme) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-b border-neutral-300/40 divide-y md:divide-y-0 md:divide-x divide-neutral-300/40">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="services-grid-cell group p-8 md:py-16 flex flex-col justify-between min-h-[460px] hover:bg-neutral-500/5 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0"
            >
              {/* Top info */}
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-xs text-neutral-400 tracking-widest uppercase">
                  {service.id}
                </span>
              </div>

              {/* Graphic Icon Area */}
              <div className="flex justify-center items-center h-32 mb-12 group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                {service.icon}
              </div>

              {/* Title & Desc */}
              <div className="mt-auto">
                <h3 className="font-hero font-light text-3xl uppercase tracking-tight text-[var(--foreground)] mb-4 group-hover:text-[var(--brand-orange)] transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-500 group-hover:text-neutral-600 transition-colors duration-500 font-sans">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

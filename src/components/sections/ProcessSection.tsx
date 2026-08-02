import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pushGTMEvent } from "@/hooks/useGTM";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import LottieIcon from "@/components/ui/LottieIcon";

const steps = [
  {
    id: "01",
    title: "Discovery Call",
    description:
      "A free 30-min call to understand your goals, timeline, and vision. No fluff — just the right questions.",
    accent: "#FF4D00",
    icon: (
      <LottieIcon
        url="/lottie/discovery.json"
        trigger="autoplay"
        loop={true}
        className="w-10 h-10"
        speed={0.8}
      />
    ),
  },
  {
    id: "02",
    title: "Proposal & Kickoff",
    description:
      "You receive a detailed scope, timeline, and pricing within 24 hours. Once approved, we start immediately.",
    accent: "#FF4D00",
    icon: (
      <LottieIcon
        url="/lottie/proposal.json"
        trigger="autoplay"
        loop={true}
        className="w-10 h-10"
        speed={0.8}
      />
    ),
  },
  {
    id: "03",
    title: "Design & Build",
    description:
      "We work in focused sprints with regular check-ins. You see progress early and often — no black-box surprises.",
    accent: "#FF4D00",
    icon: (
      <LottieIcon
        url="/lottie/design.json"
        trigger="autoplay"
        loop={true}
        className="w-10 h-10"
        speed={0.8}
      />
    ),
  },
  {
    id: "04",
    title: "Delivery & Handoff",
    description:
      "Final files, documentation, and a 14-day support window so nothing falls through the cracks after launch.",
    accent: "#FF4D00",
    icon: (
      <LottieIcon
        url="/lottie/delivery.json"
        trigger="autoplay"
        loop={true}
        className="w-10 h-10"
        speed={0.9}
      />
    ),
  },
];


export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // 1. Title reveal
    gsap.fromTo(
      ".process-title-item",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    // Unseen-style staggered line mask reveals for header
    gsap.fromTo(
      ".process-title-mask",
      { y: "115%" },
      {
        y: "0%",
        duration: 1.2,
        stagger: 0.15,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    // 2. SVG Paths self-drawing
    gsap.fromTo(
      ".process-svg-path",
      { strokeDashoffset: (i, target) => parseFloat(window.getComputedStyle(target).strokeDasharray) || 200 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      }
    );

    // 3. Stagger card opacity entry
    gsap.fromTo(
      ".process-step-item",
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    // 4. Vertical scroll-drawn connector progress line
    gsap.fromTo(
      ".process-progress-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: ".process-steps-container",
          start: "top 35%",
          end: "bottom 65%",
          scrub: 0.5,
        },
      }
    );

    // 5. Scroll-linked step highlighting
    steps.forEach((_, i) => {
      gsap.fromTo(
        `.process-step-card-${i}`,
        { borderColor: "rgba(255,255,255,0.07)", backgroundColor: "transparent" },
        {
          borderColor: "rgba(255,77,0,0.25)",
          backgroundColor: "rgba(255,77,0,0.015)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.process-step-card-${i}`,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      gsap.fromTo(
        `.process-step-number-${i}`,
        { color: "rgba(255,255,255,0.04)" },
        {
          color: "rgba(255,77,0,0.08)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: `.process-step-card-${i}`,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 bg-black overflow-hidden relative w-full border-t border-white/5"
    >
      {/* Background grain & grid */}
      <div className="grain-overlay" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="max-w-[1800px] mx-auto w-full" ref={containerRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* ── Left Column: Editorial Tagline & Steps Counter ── */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="process-title-item font-mono text-xs tracking-[0.35em] uppercase text-accent block opacity-0">
                ↳ OUR WORKFLOW
              </span>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase font-medium tracking-tight leading-none text-white">
                <span className="unseen-line-mask block">
                  <span className="unseen-line-text block process-title-mask">Four Steps.</span>
                </span>
                <span className="unseen-line-mask block mt-1.5">
                  <span className="unseen-line-text block process-title-mask text-accent">Zero Surprises.</span>
                </span>
              </h2>
              <p className="process-title-item text-base text-white/40 leading-relaxed font-sans max-w-sm pt-4 opacity-0">
                We work in ultra-focused sprints with complete design transparency. You see real progress early and often — never a black-box handoff.
              </p>
            </div>

            <div className="process-title-item pt-12 hidden lg:block opacity-0">
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full font-mono text-[9px] tracking-widest uppercase text-white/40">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                Agile Sprints System
              </div>
            </div>
          </div>

          {/* ── Right Column: Stacked timeline ── */}
          <div className="lg:col-span-8 relative process-steps-container">
            {/* The vertical connector timeline background line */}
            <div className="absolute left-[38px] top-8 bottom-8 w-[1px] bg-white/10 hidden md:block" />

            {/* The vertical scroll-drawn progress connector line */}
            <div className="absolute left-[38px] top-8 bottom-8 w-[1px] bg-accent origin-top scale-y-0 hidden md:block process-progress-line" />

            <div className="flex flex-col gap-8 relative z-10">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className="process-step-item opacity-0 flex flex-col md:flex-row gap-6 md:gap-12 items-start"
                >
                  {/* Left: The vertical marker bubble */}
                  <div className="hidden md:flex w-20 h-20 rounded-full items-center justify-center bg-black border border-white/10 flex-shrink-0 relative group">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-xs font-mono font-bold text-white group-hover:border-accent/40 group-hover:text-accent transition-colors duration-500">
                      {step.id}
                    </div>
                  </div>

                  {/* Right: The content step card */}
                  <div
                    className={`process-step-card-${i} flex-1 group relative p-8 md:p-10 rounded-2xl border transition-all duration-700`}
                    style={{
                      borderColor: "rgba(255,255,255,0.07)",
                      background: "rgba(255,255,255,0.01)",
                    }}
                  >
                    {/* Ghost index number reveal */}
                    <span
                      className={`process-step-number-${i} absolute -top-8 right-4 text-[10rem] font-display font-black leading-none select-none pointer-events-none opacity-5`}
                    >
                      {step.id}
                    </span>

                    {/* Card Inner Head: Icon & Badge */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500">
                          {step.icon}
                        </div>
                        <div>
                          <span className="font-mono text-[9px] tracking-widest text-accent uppercase font-bold block">
                            PHASE {step.id}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl uppercase font-bold text-white tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <span className="font-mono text-[10px] tracking-widest text-white/30 uppercase hidden sm:block">
                        // PROCESS
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-white/50 leading-relaxed font-sans group-hover:text-white/70 transition-colors duration-500">
                      {step.description}
                    </p>

                    {step.id === "01" && (
                      <div className="mt-6">
                        <a
                          href="https://calendly.com/thedesignflow/30min"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => pushGTMEvent('cta_click', { cta: 'discovery_call_book', source: 'process_section' })}
                          className="inline-flex items-center gap-2 px-5 py-3 bg-accent text-white font-mono text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all duration-300 font-bold transform active:scale-95 shadow-sm border border-accent"
                        >
                          Book Discovery Call →
                        </a>
                      </div>
                    )}

                    {/* Spotlight glow light hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.015] transition-opacity duration-700 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(ellipse at 30% 30%, ${step.accent} 0%, transparent 65%)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

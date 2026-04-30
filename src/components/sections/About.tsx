"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, Award, Zap, Users } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "10+", label: "Years Active", color: "#FF4D00" },
  { value: "280+", label: "Projects Delivered", color: "#3B82F6" },
  { value: "Top 1%", label: "Design Standard", color: "#8B5CF6" },
];

const credentials = [
  { icon: Award, label: "Fiverr Level 2 Seller" },
  { icon: Zap, label: "AI Automation Expert" },
  { icon: Users, label: "Global Clientele" },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Section container fade ── */
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      /* ── Label + headline mask reveal ── */
      gsap.fromTo(
        ".about-headline-line",
        { y: "105%", skewY: 4 },
        {
          y: "0%",
          skewY: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: { trigger: ".about-text-col", start: "top 75%" },
        }
      );

      /* ── Body text paragraphs slide in ── */
      gsap.fromTo(
        ".about-para",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-text-col", start: "top 65%" },
        }
      );

      /* ── Stats count-up entrance ── */
      gsap.fromTo(
        ".about-stat",
        { y: 40, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".about-stats-row", start: "top 80%" },
        }
      );

      /* ── Credential badges ── */
      gsap.fromTo(
        ".about-cred",
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-creds", start: "top 80%" },
        }
      );

      /* ── Video card reveal ── */
      gsap.fromTo(
        ".about-video-col",
        { x: -60, opacity: 0, rotateY: -8 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      /* ── Floating stat cards entrance ── */
      gsap.fromTo(
        ".about-float-card",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
        }
      );

      /* ── Continuous ambient float for the stat cards ── */
      gsap.to(".about-float-card", {
        y: -10,
        duration: 3.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "start" },
      });

      /* ── Video autoplay on enter ── */
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          if (!videoRef.current) return;
          videoRef.current.muted = false;
          setIsMuted(false);
          videoRef.current.play().catch(() => {
            setAudioBlocked(true);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch(() => {});
            }
          });
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    if (audioBlocked) setAudioBlocked(false);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 sm:py-28 md:py-40 px-8 sm:px-10 md:px-12 bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="gradient-divider-top" />
        <div className="gradient-divider-bottom" />
        {/* Orange radial — right side */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] opacity-[0.08]" style={{ background: "#FF4D00" }} />
        {/* Cool blue radial — left side for visual tension */}
        <div className="absolute top-1/3 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[200px] opacity-[0.04]" style={{ background: "#3B82F6" }} />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-28 items-center">

          {/* ── LEFT: Video Portrait ── */}
          <div className="about-video-col relative order-2 lg:order-1" style={{ perspective: "1000px" }}>

            {/* Section label (desktop left) */}
            <div className="hidden lg:flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">About Me</span>
            </div>

            {/* Video card */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[2.5rem] overflow-hidden mx-auto lg:mx-0 group shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]">

              {/* Gradient overlays */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 z-10 bg-gradient-to-br from-[var(--brand-orange)]/5 via-transparent to-transparent pointer-events-none" />

              {/* Border glow */}
              <div className="absolute inset-0 z-20 rounded-[2.5rem] ring-1 ring-white/10 group-hover:ring-[var(--brand-orange)]/20 transition-all duration-700 pointer-events-none" />

              {/* Audio blocked overlay */}
              {audioBlocked && (
                <div className="absolute inset-0 z-40 bg-black/70 backdrop-blur-sm flex items-center justify-center p-6">
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.muted = false;
                        setIsMuted(false);
                        setAudioBlocked(false);
                      }
                    }}
                    className="px-8 py-4 bg-[var(--brand-orange)] text-white rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,77,0,0.5)]"
                  >
                    Enable Audio
                  </button>
                </div>
              )}

              {/* Video */}
              <video
                ref={videoRef}
                src="/assets/images/Man_in_suit_202604050234.mp4"
                poster="/assets/images/Professional_headshot_of_202604050232.png"
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* HUD: top-left badge */}
              <div className="absolute top-5 left-5 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-orange)] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/60">Live</span>
              </div>

              {/* Sound toggle */}
              <button
                onClick={toggleSound}
                className="absolute bottom-5 right-5 z-30 w-11 h-11 rounded-full bg-white/8 backdrop-blur-xl border border-white/12 flex items-center justify-center text-white hover:bg-[var(--brand-orange)] hover:border-[var(--brand-orange)] transition-all duration-400 active:scale-95"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* ── Floating stat cards ── */}
            <div className="absolute -right-4 md:-right-10 top-1/3 -translate-y-1/2 flex flex-col gap-4 z-30">
              <div className="about-float-card px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[var(--brand-orange)]/30 transition-colors duration-500 shadow-xl">
                <span className="block text-[2rem] font-black text-[var(--brand-orange)] leading-none">10+</span>
                <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-neutral-500 mt-1">Years Active</span>
              </div>
              <div className="about-float-card px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-colors duration-500 shadow-xl translate-x-4 md:translate-x-8">
                <span className="block text-[2rem] font-black text-blue-400 leading-none">280+</span>
                <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-neutral-500 mt-1">Projects Built</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Narrative ── */}
          <div className="about-text-col order-1 lg:order-2">

            {/* Section label (mobile) */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">About Me</span>
            </div>

            {/* Headline */}
            <div className="mb-10 w-full max-w-full">
              <div className="overflow-hidden pb-6 w-full">
                <div className="about-headline-line font-display text-[clamp(2.5rem,4.5vw,5.5rem)] font-black tracking-tighter leading-[1.2] uppercase text-white whitespace-nowrap">
                  Designing
                </div>
              </div>
              <div className="overflow-hidden pb-6 w-full">
                <div className="about-headline-line font-display text-[clamp(2.5rem,4.5vw,5.5rem)] font-black tracking-tighter leading-[1.2] uppercase text-white/20 whitespace-nowrap">
                  The Flow.
                </div>
              </div>
            </div>

            {/* Role pill */}
            <div className="about-para inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[var(--brand-orange)]/25 bg-[var(--brand-orange)]/5 mb-10">
              <span className="w-1 h-1 rounded-full bg-[var(--brand-orange)]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                Brand Strategist & AI Architect
              </span>
            </div>

            {/* Body copy */}
            <div className="space-y-5 max-w-xl mb-10">
              <p className="about-para text-white/50 text-base leading-relaxed">
                I am <strong className="text-white font-bold">Hasanul</strong>, a visionary at the intersection of aesthetic precision and autonomous logic. My mission: transform ambitious companies into undeniable market icons.
              </p>
              <p className="about-para text-white/50 text-base leading-relaxed">
                I build <strong className="text-white font-bold">The Flow</strong> — where strategic branding meets cutting-edge AI to create digital ecosystems that don&apos;t just exist, they perform. We engineer trust. We launch autonomous growth machines.
              </p>
              <p className="about-para text-white/50 text-base leading-relaxed">
                As a verified Level 2 Seller with a decade of mastery and 280+ successful pivots — from boutique branding to enterprise AI deployments — my process is a relentless pursuit of the Top 1% standard.
              </p>
            </div>

            {/* ── Stats row ── */}
            <div className="about-stats-row grid grid-cols-3 gap-4 mb-10">
              {stats.map((s) => (
                <div key={s.label} className="about-stat group">
                  <div
                    className="text-[clamp(1.4rem,3vw,2.2rem)] font-black font-display leading-none mb-1 transition-colors duration-300"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-600">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ── Credential badges ── */}
            <div className="about-creds flex flex-wrap gap-3">
              {credentials.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="about-cred inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                >
                  <Icon size={12} className="text-[var(--brand-orange)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.15em] text-white/45">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

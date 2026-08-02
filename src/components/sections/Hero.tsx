import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { TextScramble } from "@/utils/textScramble";
import LottieIcon from "@/components/ui/LottieIcon";
import TopoCanvas from "@/components/ui/TopoCanvas";


export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageBoxRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);

  // Scramble eyebrow text
  useEffect(() => {
    if (!scrambleRef.current) return;
    const fx = new TextScramble(scrambleRef.current);
    const phrases = ["DESIGN STUDIO", "DIGITAL CRAFT", "MOTION & CODE", "THE DESIGN FLOW"];
    let i = 0;
    const next = () => {
      fx.setText(phrases[i]).then(() => setTimeout(next, 3200));
      i = (i + 1) % phrases.length;
    };
    setTimeout(next, 1000);
  }, []);

  // Coordinated premium GSAP intro timeline + parallax on scroll
  useGSAP(() => {
    if (!sectionRef.current) return;

    // 1. Text reveals sliding up from overflow-hidden container
    const tl = gsap.timeline({ delay: 0.15 });

    tl.fromTo(
      ".hero-title-line",
      { y: "115%", rotate: 1.5 },
      {
        y: 0,
        rotate: 0,
        duration: 1.25,
        ease: "power4.out",
        stagger: 0.08,
        force3D: true,
      }
    );

    // 2. 3D Canvas container reveals: translate and fade in coordination
    if (imageBoxRef.current) {
      tl.fromTo(
        imageBoxRef.current,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power4.out",
          force3D: true,
        },
        "-=0.95" // overlap with title reveal
      );
    }

    // 3. Fade in bottom bar tagline, buttons, and scroll indicator
    tl.fromTo(
      ".hero-fade-in",
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        force3D: true,
      },
      "-=0.75"
    );

    // 4. Parallax scroll effect on TopoCanvas container on scroll
    if (imageBoxRef.current) {
      gsap.to(imageBoxRef.current, {
        y: "-8%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#000000] text-[#F0EDE6] overflow-hidden flex flex-col"
    >
      {/* Subtle grain overlay */}
      <div className="grain-overlay" />

      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)" }}
      />

      {/* Fullscreen 3D Topographical Canvas Background */}
      <div
        ref={imageBoxRef}
        className="absolute inset-0 w-full h-full z-0 opacity-0 pointer-events-none"
      >
        <TopoCanvas />
      </div>

      {/* Main layout container — layered over background with pointer-events-none */}
      <div className="flex-1 flex flex-col justify-between w-full max-w-[1800px] mx-auto px-6 md:px-12 pt-36 pb-12 z-10 relative pointer-events-none">

        {/* ── Top: Giant heading overlay ── */}
        <div className="relative flex flex-col md:block">
          
          {/* Utopai-style editorial sidebar text */}
          <div className="absolute -left-12 top-0 h-full hidden xl:flex flex-col justify-center gap-12 text-[10px] font-mono uppercase tracking-[0.5em] text-white/20 origin-left -rotate-90">
            <span>The Future of Design</span>
            <span>Est. 2016</span>
          </div>

          {/* Heading — Utopai-scale, left-anchored. z-30, relative, and mix-blend-difference */}
          <div className="relative z-30 md:max-w-[70%] lg:max-w-[65%] pointer-events-none">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-accent" />
              <span
                ref={scrambleRef}
                className="font-mono text-[11px] tracking-[0.35em] uppercase text-accent min-w-[140px]"
              >
                DESIGN STUDIO
              </span>
            </div>

            {/* H1 — screen filling, responsive, and mix-blend-difference for gold/black dynamic color contrast */}
            <h1 className="font-hero font-light text-[40px] sm:text-[60px] md:text-[6.5vw] lg:text-[90px] xl:text-[109px] leading-[1.05] tracking-[-0.02em] select-none lowercase first-letter:uppercase mix-blend-difference">
              <div className="overflow-hidden flex flex-wrap gap-x-[0.25em]">
                <span className="relative block overflow-hidden">
                  <span className="hero-title-line block">Elite</span>
                </span>
                <span className="relative block overflow-hidden">
                  <span className="hero-title-line block font-serif-display font-light italic pr-1.5">UI/UX &</span>
                </span>
              </div>
              <div className="overflow-hidden flex flex-wrap gap-x-[0.25em] mt-1 sm:mt-2">
                <span className="relative block overflow-hidden">
                  <span className="hero-title-line block text-accent/90">AI Automation</span>
                </span>
                <span className="relative block overflow-hidden">
                  <span className="hero-title-line block text-accent/90 font-serif-display font-light italic pr-1.5">for SaaS</span>
                </span>
              </div>
            </h1>
          </div>

        </div>

        {/* Mobile CTA — Centered below headers on touch viewports */}
        <div className="flex md:hidden justify-center mt-8 w-full">
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="hero-fade-in flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest border border-white/20 rounded-full px-6 py-3 hover:bg-white hover:text-black active:scale-[0.97] transition-[background-color,color,border-color,transform] duration-200 opacity-0 pointer-events-auto cursor-pointer"
          >
            View Our Work <span>→</span>
          </button>
        </div>

        {/* ── Bottom bar: tagline + scroll indicator ── */}
        <div className="flex items-end justify-between mt-16 md:mt-8">
          {/* Left: Tagline + service icons */}
          <div className="flex flex-col gap-6">
            {/* Tagline — Utopai spaced tracking style */}
            <p className="hero-fade-in font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 max-w-[400px] leading-relaxed opacity-0">
              Full-Stack Designer & Frontend Architect.
              <br />Building cinematic digital identities.
            </p>

            {/* Service icons row */}
            <div className="hero-fade-in flex items-center gap-6 opacity-0">
              {[
                { icon: "/lottie/discovery.json", label: "Branding" },
                { icon: "/lottie/design.json",    label: "SaaS UI" },
                { icon: "/lottie/proposal.json",  label: "Web" },
                { icon: "/lottie/delivery.json",  label: "Motion" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 group cursor-pointer pointer-events-auto">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 bg-white/[0.03] group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-300">
                    <LottieIcon
                      url={icon}
                      trigger="autoplay"
                      loop={true}
                      className="w-5 h-5"
                      speed={0.7}
                    />
                  </div>
                  <span className="font-mono text-[8px] tracking-[0.25em] uppercase text-white/25 group-hover:text-accent/60 transition-colors duration-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <a
            href="/contact"
            data-cursor="magnetic"
            className="hero-fade-in hidden md:flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest bg-accent text-black font-semibold rounded-full px-6 py-3.5 hover:bg-white active:scale-[0.97] transition-[background-color,color,transform] duration-200 opacity-0 pointer-events-auto cursor-pointer shadow-[0_0_20px_rgba(200,169,110,0.3)]"
          >
            Book Your Free Discovery Call <span>→</span>
          </a>

          {/* Scroll indicator — Utopai mouse icon */}
          <div className="hero-fade-in flex flex-col items-center gap-2 opacity-0">
            {/* Mouse outline */}
            <div className="w-6 h-9 rounded-full border border-white/30 flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="w-[2px] h-2.5 bg-white/60 rounded-full"
              />
            </div>
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/30">SCROLL</span>
          </div>
        </div>
      </div>
    </section>
  );
}

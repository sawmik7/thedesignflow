"use client";

import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  scrollToContact: () => void;
  entranceActive?: boolean;
}

const SKILLS = [
  { label: "Frontend Dev", color: "#FF4D00" },
  { label: "UI/UX Design", color: "#8B5CF6" },
  { label: "GSAP Pro", color: "#10B981" },
  { label: "Motion Design", color: "#3B82F6" },
  { label: "Next.js", color: "#F59E0B" },
  { label: "Micro-Animations", color: "#EC4899" },
  { label: "Design Systems", color: "#06B6D4" },
  { label: "Figma", color: "#FF4D00" },
  { label: "Framer Motion", color: "#8B5CF6" },
  { label: "Brand Identity", color: "#10B981" },
  { label: "SaaS UI", color: "#3B82F6" },
  { label: "AI Automation", color: "#F59E0B" },
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    let raf: number;
    const maxFrames = 22;

    function tick() {
      frame++;
      const next = text
        .split("")
        .map((char, i) => {
          const reveal = Math.floor((frame / maxFrames) * text.length);
          if (i < reveal) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (frame < maxFrames) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, text]);

  return <>{display}</>;
}

export function Hero({ scrollToContact, entranceActive = true }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const skillsTrackRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Cursor glow follower
  useEffect(() => {
    const glow = cursorGlowRef.current;
    if (!glow) return;
    const move = (e: MouseEvent) => {
      gsap.to(glow, { x: e.clientX - 150, y: e.clientY - 150, duration: 0.8, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Infinite skills marquee
  useLayoutEffect(() => {
    const track = skillsTrackRef.current;
    if (!track) return;
    // wait a tick for layout
    const id = setTimeout(() => {
      const totalWidth = track.scrollWidth / 2;
      gsap.to(track, { x: -totalWidth, duration: 30, ease: "none", repeat: -1 });
    }, 100);
    return () => clearTimeout(id);
  }, []);

  useGSAP(() => {
    if (!entranceActive) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    gsap.set(`.${styles.liquidBlob}`, { scale: 0, opacity: 0 });
    gsap.set(badgeRef.current, { y: -20, opacity: 0 });
    gsap.set(headlineRef.current, { y: 60, opacity: 0 });
    gsap.set(subRef.current, { y: 30, opacity: 0 });
    gsap.set(ctaRef.current, { y: 20, opacity: 0 });
    gsap.set(secondaryCtaRef.current, { y: 20, opacity: 0 });
    gsap.set(statsRef.current, { y: 30, opacity: 0 });
    gsap.set(scrollIndicatorRef.current, { opacity: 0 });

    tl.to(`.${styles.liquidBlob}`, { scale: 1, opacity: 1, duration: 2.2, stagger: 0.15, ease: "elastic.out(1, 0.75)" })
      .to(badgeRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=2")
      .to(headlineRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1.6")
      .to(subRef.current, { y: 0, opacity: 1, duration: 0.9 }, "-=0.7")
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
      .to(secondaryCtaRef.current, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.55")
      .to(statsRef.current, { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .to(scrollIndicatorRef.current, { opacity: 1, duration: 0.8 }, "-=0.3");

    // Stat counters
    const counters = document.querySelectorAll(`.${styles.statNumber}`);
    counters.forEach((el) => {
      const target = parseInt(el.getAttribute("data-target") || "0", 10);
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        delay: 1.6,
        ease: "power2.out",
        onUpdate() { (el as HTMLElement).textContent = Math.round(obj.val) + "+"; },
      });
    });

    // Ambient blobs
    gsap.to(".blob1", { x: "8%", y: "12%", duration: 22, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob2", { x: "-12%", y: "-8%", duration: 28, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob3", { x: "10%", y: "-10%", duration: 18, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".blob4", { x: "-8%", y: "14%", duration: 24, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // Parallax out
    gsap.to(blobsRef.current, {
      y: 180,
      ease: "none",
      scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1.5 },
    });
    gsap.to(headlineRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: { trigger: container.current, start: "top top", end: "bottom top", scrub: 1 },
    });

    // Stats counter animation
    const stats = gsap.utils.toArray<HTMLElement>('.stat-number');
    stats.forEach((stat) => {
      const target = parseFloat(stat.getAttribute('data-target') || "0");
      const suffix = stat.getAttribute('data-suffix') || "";
      
      ScrollTrigger.create({
        trigger: container.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
              stat.innerHTML = Math.round(this.targets()[0].val) + suffix;
            }
          });
        },
        once: true
      });
    });

  }, { scope: container, dependencies: [entranceActive] });

  // Magnetic CTA
  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(ref.current, { x: x * 0.38, y: y * 0.38, duration: 0.4, ease: "power2.out" });
  };

  const handleMouseLeave = (ref: React.RefObject<HTMLElement | null>) => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section ref={container} className={styles.heroSection} id="hero">
      {/* Cursor glow */}
      <div ref={cursorGlowRef} className={styles.cursorGlow} />
      <div className={styles.grainOverlay} />
      <div className={styles.gridLines} />

      {/* Blobs */}
      <div ref={blobsRef} className={styles.blobsContainer}>
        <div className={`${styles.liquidBlob} ${styles.blob1} blob1`} />
        <div className={`${styles.liquidBlob} ${styles.blob2} blob2`} />
        <div className={`${styles.liquidBlob} ${styles.blob3} blob3`} />
        <div className={`${styles.liquidBlob} ${styles.blob4} blob4`} />
      </div>

      {/* Main content */}
      <div className={styles.perspectiveContainer}>

        {/* Badge */}
        <div ref={badgeRef} className={styles.badge}>
          <Sparkles size={12} className={styles.badgeIcon} />
          <span>Available for new projects</span>
          <span className={styles.badgeDot} />
        </div>

        {/* Headline — always visible, GSAP animates from y:60,opacity:0 */}
        <h1 ref={headlineRef} className={styles.headline}>
          <span className={styles.headlineLine}>
            <span className={styles.headlineWord}>
              <ScrambleText text="CRAFTING" active={entranceActive} />
            </span>
          </span>
          <span className={styles.headlineLine}>
            <span className={`${styles.headlineWord} ${styles.headlineWordGlow}`}>
              <ScrambleText text="DIGITAL" active={entranceActive} />
            </span>
          </span>
          <span className={styles.headlineLine}>
            <span className={styles.headlineWord}>
              <ScrambleText text="EXCELLENCE" active={entranceActive} />
            </span>
          </span>
        </h1>

        {/* Sub headline */}
        <div ref={subRef} className={styles.subHeadline}>
          <span className={styles.subLine} />
          <p>Full-Stack Designer & Frontend Architect — building cinematic digital identities</p>
          <span className={styles.subLine} />
        </div>

        {/* CTAs */}
        <div className={styles.ctaRow}>
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            onMouseMove={(e) => handleMouseMove(e, ctaRef)}
            onMouseLeave={() => handleMouseLeave(ctaRef)}
            className={styles.magneticCta}
            id="hero-cta-primary"
          >
            <span className={styles.ctaBg} />
            <span className={styles.ctaLabel}>Start Your Vision</span>
            <span className={styles.ctaArrow}><ArrowRight size={18} /></span>
          </button>

          <a
            ref={secondaryCtaRef}
            href="#portfolio"
            onMouseMove={(e) => handleMouseMove(e, secondaryCtaRef)}
            onMouseLeave={() => handleMouseLeave(secondaryCtaRef)}
            className={styles.secondaryCta}
            id="hero-cta-secondary"
          >
            View Work
          </a>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mt-12 w-full max-w-4xl mx-auto px-4">
          {[
            { value: 280, label: "Projects Built", suffix: "+" },
            { value: 10, label: "Years Active", suffix: "+" },
            { value: 100, label: "Client Satisfaction", suffix: "%" },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center group">
              <span 
                className={`stat-number ${styles.statNumber} font-tabular-nums text-4xl md:text-5xl font-black text-white mb-2`} 
                data-target={s.value} 
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </span>
              <span className="text-sm md:text-base font-bold uppercase tracking-widest text-white/60 group-hover:text-[var(--brand-orange)] transition-colors duration-300">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills marquee */}
      <div className={styles.skillsMarqueeWrap}>
        <div className={styles.skillsFade} />
        <div className={styles.skillsTrackOuter}>
          <div ref={skillsTrackRef} className={styles.skillsTrack}>
            {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
              <div key={i} className={styles.skillPill} style={{ "--pill-color": skill.color } as React.CSSProperties}>
                <span className={styles.pillDot} />
                {skill.label}
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.skillsFade} ${styles.skillsFadeRight}`} />
      </div>

      {/* Scroll indicator */}
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <ChevronDown size={16} className={styles.scrollChevron} />
      </div>
    </section>
  );
}

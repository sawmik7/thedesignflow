"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { splitIntoChars } from "@/lib/splitText";
import styles from "./Hero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroProps {
  scrollToContact: () => void;
  entranceActive?: boolean;
}

export function Hero({ scrollToContact, entranceActive = true }: HeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subHeadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);

  const headlineChars = splitIntoChars("WEIGHTLESS\nDIGITAL\nEXPERIENCES");

  useGSAP(() => {
    if (!entranceActive) return;

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 1. Initial State
    gsap.set(".char", { y: 100, opacity: 0, rotateX: -90 });
    gsap.set(subHeadlineRef.current, { y: 20, opacity: 0 });
    gsap.set(ctaRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(`.${styles.liquidBlob}`, { scale: 0, opacity: 0 });

    // 2. Entrance Sequence
    tl.to(`.${styles.liquidBlob}`, {
      scale: 1,
      opacity: 1,
      duration: 2,
      stagger: 0.2,
      ease: "elastic.out(1, 0.8)",
    })
    .to(".char", {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.2,
      stagger: 0.02,
    }, "-=1.5")
    .to(subHeadlineRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
    }, "-=0.8")
    .to(ctaRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.7)",
    }, "-=0.6");

    // 3. Ambient Liquid Movement
    gsap.to(".blob1", {
      x: "10%",
      y: "15%",
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".blob2", {
      x: "-15%",
      y: "-10%",
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
    gsap.to(".blob3", {
      x: "12%",
      y: "-12%",
      duration: 22,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 4. Parallax Scroll
    gsap.to(blobsRef.current, {
      y: 150,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(headlineRef.current, {
      y: -100,
      opacity: 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

  }, { scope: container });

  // Magnetic Button Effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ctaRef.current) return;
    const btn = ctaRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!ctaRef.current) return;
    gsap.to(ctaRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section ref={container} className={styles.heroSection}>
      <div className={styles.grainOverlay} />
      
      {/* Liquid Blobs Background */}
      <div ref={blobsRef} className="absolute inset-0">
        <div className={`${styles.liquidBlob} ${styles.blob1} blob1`} />
        <div className={`${styles.liquidBlob} ${styles.blob2} blob2`} />
        <div className={`${styles.liquidBlob} ${styles.blob3} blob3`} />
      </div>

      <div className={`${styles.perspectiveContainer} relative z-20`}>
        <div ref={subHeadlineRef} className={styles.subHeadline}>
          Crafting Elite Digital Identities
        </div>

        <h1 ref={headlineRef} className={styles.headline}>
          {headlineChars.map((item, i) => (
            <span key={i} className="inline-block">
              {item.char === "\n" ? (
                <br />
              ) : (
                <span className="char inline-block whitespace-pre">
                  {item.char}
                </span>
              )}
            </span>
          ))}
        </h1>

        <div className="mt-8">
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={styles.magneticCta}
          >
            Start Your Vision
            <ArrowRight size={20} className="ml-3" />
          </button>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-30 animate-bounce">
          <div className="w-px h-12 bg-white" />
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}

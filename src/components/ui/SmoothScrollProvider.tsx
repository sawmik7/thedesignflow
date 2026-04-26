"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<import("lenis").default | null>(null);

  useEffect(() => {
    // Dynamic import avoids SSR issues with Lenis
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;

      // Synchronize Lenis scroll position with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      const rafCallback = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(rafCallback);
        lenis.destroy();
      };
    });

    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}

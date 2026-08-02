
import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SmoothScrollContext = createContext<Lenis | null>(null);

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || window.innerWidth < 768 || window.location.search.includes("no-lenis")) {
      return;
    }

    const lenisInstance = new Lenis({
      lerp: 0.08,      // Tighter tracking (was 0.10)
      duration: 0.9,   // Slightly snappier (was 1.0)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2.0, // Better mobile feel (was 1.5)
    });


    setLenis(lenisInstance);

    lenisInstance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(tick);

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenisInstance.destroy();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={lenis}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

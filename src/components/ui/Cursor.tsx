
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const cursorDot = useRef<HTMLDivElement>(null);
  const cursorRing = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Touch device

    const quickToX = gsap.quickTo(cursorRing.current, "x", {
      duration: 0.4,
      ease: "power3",
    });
    const quickToY = gsap.quickTo(cursorRing.current, "y", {
      duration: 0.4,
      ease: "power3",
    });

    const quickToDotX = gsap.quickTo(cursorDot.current, "x", {
      duration: 0.1,
      ease: "power3",
    });
    const quickToDotY = gsap.quickTo(cursorDot.current, "y", {
      duration: 0.1,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      quickToX(e.clientX);
      quickToY(e.clientY);
      quickToDotX(e.clientX);
      quickToDotY(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest(
        'a, button, [data-cursor="magnetic"], [data-cursor="video"], img'
      ) as HTMLElement | null;

      if (interactiveEl) {
        setIsHovered(true);

        if (interactiveEl.dataset.cursorLabel) {
          setLabel(interactiveEl.dataset.cursorLabel);
        } else if (interactiveEl.dataset.cursor === "video") {
          setLabel("▶ PLAY");
        } else if (interactiveEl.tagName.toLowerCase() === "img") {
          setLabel("DRAG ✥");
        } else {
          setLabel(null);
        }

        if (interactiveEl.dataset.cursor === "magnetic") {
          const rect = interactiveEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const distanceX = e.clientX - centerX;
          const distanceY = e.clientY - centerY;

          gsap.to(interactiveEl, {
            x: distanceX * 0.3,
            y: distanceY * 0.3,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      } else {
        setIsHovered(false);
        setLabel(null);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest(
        'a, button, [data-cursor="magnetic"], [data-cursor="video"], img'
      ) as HTMLElement | null;

      if (interactiveEl && interactiveEl.dataset.cursor === "magnetic") {
        gsap.to(interactiveEl, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDot}
        className={`fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      <div
        ref={cursorRing}
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-[10px] tracking-widest transition-all duration-300 font-mono ${
          isHovered
            ? "w-[80px] h-[80px] border-white/20 bg-white/10 text-white"
            : "w-[40px] h-[40px] border-white/50 text-transparent bg-transparent"
        }`}
      >
        {label}
      </div>
    </>
  );
}

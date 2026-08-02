import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";

type TextRevealOptions = {
  type?: "words" | "chars" | "lines";
  animation?: "slide-up" | "fade" | "reveal-mask";
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
  threshold?: number;
};

export function useTextReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: TextRevealOptions = {}
) {
  const {
    type = "words",
    animation = "slide-up",
    stagger = 0.04,
    duration = 1.0,
    delay = 0,
    scrollTrigger = true,
    threshold = 0.2,
  } = options;

  useEffect(() => {
    if (!ref.current) return;
    
    // Check for reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = ref.current;
    
    // Use SplitType as a robust alternative to SplitText
    const split = new SplitType(element, { types: type });
    const targetElements = type === "chars" ? split.chars : type === "words" ? split.words : split.lines;

    if (!targetElements || targetElements.length === 0) return;

    let fromProps: gsap.TweenVars = {};
    let toProps: gsap.TweenVars = {
      duration,
      stagger,
      delay,
      ease: "power4.out",
    };

    if (animation === "slide-up") {
      fromProps = { y: "80%", opacity: 0 };
      toProps = { ...toProps, y: "0%", opacity: 1 };
    } else if (animation === "fade") {
      fromProps = { opacity: 0 };
      toProps = { ...toProps, opacity: 1 };
    } else if (animation === "reveal-mask") {
      fromProps = { y: "100%" };
      toProps = { ...toProps, y: "0%", ease: "power4.inOut" };
      // For reveal-mask, we need wrapper hidden overflow
      if (type === "lines" && split.lines) {
        split.lines.forEach((line) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "inline-block";
          line.parentNode?.insertBefore(wrapper, line);
          wrapper.appendChild(line);
        });
      }
    }

    // Set initial state
    gsap.set(targetElements, fromProps);

    const ctx = gsap.context(() => {
      if (scrollTrigger) {
        gsap.to(targetElements, {
          ...toProps,
          scrollTrigger: {
            trigger: element,
            start: `top ${100 - threshold * 100}%`,
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.to(targetElements, toProps);
      }
    }, element);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [animation, delay, duration, scrollTrigger, stagger, threshold, type, ref]);
}

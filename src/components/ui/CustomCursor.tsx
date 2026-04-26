"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 28, stiffness: 350 });
  const springY = useSpring(cursorY, { damping: 28, stiffness: 350 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, .cursor-hover-target"
      );
      const dragTarget = target.closest(".cursor-drag");

      if (dragTarget) {
        setIsHovering(true);
        setCursorLabel("Drag");
      } else if (interactive) {
        setIsHovering(true);
        setCursorLabel("");
      } else {
        setIsHovering(false);
        setCursorLabel("");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      {/* Outer ring */}
      <motion.div
        ref={ringRef}
        className="flex items-center justify-center rounded-full border border-[var(--brand-orange)]/40"
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering
            ? "rgba(255, 77, 0, 0.6)"
            : "rgba(255, 77, 0, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--brand-orange)]"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      {/* Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--brand-orange)]" />
    </motion.div>
  );
}

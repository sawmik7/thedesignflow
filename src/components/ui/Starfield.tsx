"use client";

import React, { useEffect, useRef, memo } from "react";
import gsap from "gsap";

interface StarfieldProps {
  numStars?: number;
  burstActive?: boolean;
}

export const Starfield = memo(function Starfield({ numStars = 150, burstActive = false }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<{ x: number; y: number; vx: number; vy: number; radius: number; color: string; burstVx: number; burstVy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const effectiveStars = isMobile ? Math.min(numStars, 80) : numStars;
    const connectionThreshold = isMobile ? 8100 : 14400; 

    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const initStars = () => {
      starsRef.current = [];
      for (let i = 0; i < effectiveStars; i++) {
        const isOrange = Math.random() > 0.9;
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          burstVx: 0,
          burstVy: 0,
          radius: Math.random() * 1.5 + 0.5,
          color: isOrange ? "rgba(255, 77, 0, 0.8)" : "rgba(255, 255, 255, 0.8)",
        });
      }
    };

    const resizeHandler = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const scrollHandler = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = delta * 0.1;
      lastScrollY = currentScrollY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      scrollVelocity *= 0.95; // friction for scroll velocity

      for (let i = 0; i < starsRef.current.length; i++) {
        const star = starsRef.current[i];

        // Starfield Burst Logic (Phase 9)
        star.burstVx *= 0.92;
        star.burstVy *= 0.92;

        // Repulsion Logic
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let repX = 0;
        let repY = 0;
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          repX = (dx / dist) * force * 2;
          repY = (dy / dist) * force * 2;
        }

        // Apply velocities + scroll acceleration
        star.x += star.vx + star.burstVx + repX;
        star.y += star.vy + star.burstVy + repY - scrollVelocity;

        // Wrap around
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        // Draw Star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Connect Stars
        for (let j = i + 1; j < starsRef.current.length; j++) {
          const star2 = starsRef.current[j];
          const distSq = (star.x - star2.x) ** 2 + (star.y - star2.y) ** 2;

          if (distSq < connectionThreshold) {
            const maxDist = Math.sqrt(connectionThreshold);
            const opacity = 1 - Math.sqrt(distSq) / maxDist;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star2.x, star2.y);
            // Mix connection color slightly if orange involved
            const isAnyOrange = star.color.includes("255, 77") || star2.color.includes("255, 77");
            ctx.strokeStyle = isAnyOrange ? `rgba(255, 77, 0, ${opacity * 0.15})` : `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("scroll", scrollHandler);
    
    resizeHandler();
    draw();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("scroll", scrollHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, [numStars]);

  // Handle Burst trigger
  useEffect(() => {
    if (burstActive && starsRef.current.length > 0) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      
      starsRef.current.forEach((star) => {
        const dx = star.x - cx;
        const dy = star.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
          const force = 15;
          star.burstVx = (dx / dist) * force;
          star.burstVy = (dy / dist) * force;
        }
      });
    }
  }, [burstActive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-0 fade-in-starfield"
      style={{ mixBlendMode: "screen" }}
    />
  );
});

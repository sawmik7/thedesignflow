"use client";

import React, { useRef, useState } from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Optional accent color for hover border glow (e.g., "#FF4D00"). */
  glowColor?: string;
  /** Enable subtle 3D tilt on mouse move. */
  tilt?: boolean;
  /** HTML tag to render. */
  as?: "div" | "article" | "li";
}

export function GlassCard({
  children,
  className = "",
  glowColor,
  tilt = false,
  as: Tag = "div",
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const onMouseMove = (e: React.MouseEvent) => {
    if (!tilt || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const xRel = (e.clientX - left) / width - 0.5;
    const yRel = (e.clientY - top) / height - 0.5;
    setTransform(
      `perspective(800px) rotateY(${xRel * 6}deg) rotateX(${-yRel * 6}deg)`
    );
  };

  const onMouseLeave = () => {
    if (!tilt) return;
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  const hoverBorderStyle = glowColor
    ? {
        "--gc-glow": glowColor,
        "--gc-glow-20": `${glowColor}33`,
        "--gc-glow-shadow": `0 0 30px ${glowColor}15`,
      } as React.CSSProperties
    : {};

  return (
    <Tag
      ref={cardRef as React.RefObject<HTMLDivElement>}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/[0.03] backdrop-blur-xl
        border border-white/[0.08]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_4px_24px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-out
        hover:border-white/[0.15]
        ${glowColor ? "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),var(--gc-glow-shadow)]" : ""}
        ${className}
      `}
      style={{
        transform,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        willChange: tilt ? "transform" : undefined,
        ...hoverBorderStyle,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Scanning light sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "hud-sweep 4s linear infinite",
        }}
      />
      {children}
    </Tag>
  );
}

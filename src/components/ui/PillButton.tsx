"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PillButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export function PillButton({ children, variant = "primary", className, ...props }: PillButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ease-out overflow-hidden group";
  
  const variants = {
    primary: "bg-[var(--brand-orange)] text-white hover:shadow-[0_0_20px_rgba(255,77,0,0.4)]",
    secondary: "bg-[var(--foreground)] text-[var(--background)] hover:scale-105",
    outline: "border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

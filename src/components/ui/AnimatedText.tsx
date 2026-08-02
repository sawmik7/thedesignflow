
import { useRef, ReactNode } from "react";
import { useTextReveal } from "@/hooks/useTextReveal";

type AnimatedTextProps = {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  type?: "words" | "chars" | "lines";
  animation?: "slide-up" | "fade" | "reveal-mask";
  stagger?: number;
  duration?: number;
  delay?: number;
  scrollTrigger?: boolean;
};

export default function AnimatedText({
  children,
  as = "p",
  className = "",
  type = "words",
  animation = "slide-up",
  stagger = 0.04,
  duration = 1.0,
  delay = 0,
  scrollTrigger = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useTextReveal(ref, {
    type,
    animation,
    stagger,
    duration,
    delay,
    scrollTrigger,
  });

  const Tag = as as any;

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}

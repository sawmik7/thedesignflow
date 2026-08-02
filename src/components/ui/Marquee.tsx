
import React from "react";

interface MarqueeProps {
  text: string;
  reverse?: boolean;
  speed?: "slow" | "medium" | "fast";
  className?: string;
}

export default function Marquee({
  text,
  reverse = false,
  speed = "medium",
  className = "",
}: MarqueeProps) {
  const durationMap = {
    slow: "60s",
    medium: "35s",
    fast: "20s",
  };

  const animationName = reverse ? "marquee-reverse" : "marquee";

  return (
    <>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
      `}</style>
      <div 
        className={`relative flex overflow-hidden whitespace-nowrap w-full py-6 select-none marquee-container ${className}`}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div 
          className="flex w-fit font-display uppercase text-[clamp(12px,2vw,18px)] tracking-[0.3em] text-[#F0EDE6] marquee-content"
          style={{
            animation: `${animationName} ${durationMap[speed]} linear infinite`,
          }}
        >
          {/* We need enough clones to fill the screen and overlap for seamless loop */}
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
          <span className="px-4">{text}</span>
        </div>
      </div>
    </>
  );
}

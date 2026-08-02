
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topPanel = useRef<HTMLDivElement>(null);
  const bottomPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (hasLoaded) {
      if (container.current) container.current.style.display = "none";
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("hasLoaded", "true");
        if (container.current) container.current.style.display = "none";
      },
    });

    const mockObj = { val: 0 };
    tl.to(mockObj, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(mockObj.val)),
    });

    if (textRef.current) {
      const chars = textRef.current.innerText.split("");
      textRef.current.innerText = "";
      chars.forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = "0";
        textRef.current?.appendChild(span);
      });

      tl.to(
        textRef.current.children,
        {
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=1.5"
      );
    }

    tl.to(
      counterRef.current,
      {
        opacity: 0,
        duration: 0.4,
      },
      "-=0.2"
    );

    tl.to(
      topPanel.current,
      {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
      },
      "split"
    );
    tl.to(
      bottomPanel.current,
      {
        y: "100%",
        duration: 1,
        ease: "power4.inOut",
      },
      "split"
    );
  }, []);

  if (typeof window !== "undefined" && sessionStorage.getItem("hasLoaded")) return null;

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
    >
      <div
        ref={topPanel}
        className="absolute top-0 left-0 w-full h-1/2 bg-black origin-top"
      />
      <div
        ref={bottomPanel}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black origin-bottom"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={counterRef}
          className="text-[25vw] leading-none text-[#F0EDE6] font-display"
        >
          {progress}
        </div>
        <div
          ref={textRef}
          className="text-[#F0EDE6] tracking-[0.4em] text-sm mt-4 uppercase font-mono"
        >
          The Design Flow
        </div>
      </div>
    </div>
  );
}

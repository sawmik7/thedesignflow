import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Client {
  name: string;
  logo: string;
}

const clients: Client[] = [
  { name: "Streaming", logo: "/images/clients/streaming.svg" },
  { name: "Beazy", logo: "/images/clients/beazy.svg" },
  { name: "Ai4Testers", logo: "/images/clients/ai4testers.svg" },
  { name: "Nexus Hotel", logo: "/images/clients/nexushotel.svg" },
  { name: "Kompress", logo: "/images/clients/kompress.png" },
  { name: "GymFlow", logo: "/images/clients/gymflow.png" },
  { name: "Diary Entry", logo: "/images/clients/diaryentry.png" },
  { name: "Masterly", logo: "/images/clients/masterly.svg" },
  { name: "Lumoo", logo: "/images/clients/lumoo.svg" },
  { name: "Yomou", logo: "/images/clients/yomou.svg" },
  { name: "Fowlio", logo: "/images/clients/fowlio.svg" },
  { name: "PinPorter", logo: "/images/clients/pinporter.svg" },
  { name: "w3bpage", logo: "/images/clients/w3bpage.svg" },
  { name: "Imprint", logo: "/images/clients/imprint.svg" },
  { name: "Stockshelf", logo: "/images/clients/stockshelf.svg" },
  { name: "Tawsil", logo: "/images/clients/tawsil.svg" },
  { name: "Reem", logo: "/images/clients/reem.svg" },
  { name: "Stellium", logo: "/images/clients/stellium.svg" },
];

export default function ClientMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const items = track.children;
    if (items.length < 2) return;

    // Standard GSAP horizontal seamless marquee
    // We animate the track wrapper containing two identical columns.
    // Transition from xPercent: 0 to xPercent: -50 (since it contains 2 repeated rows)
    const tween = gsap.to(track, {
      xPercent: -50,
      ease: "none",
      duration: 40, // speed of scrolling
      repeat: -1,
    });

    tweenRef.current = tween;

    // Stagger in elements on load
    gsap.fromTo(
      ".client-logo-wrapper",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (tweenRef.current) {
      // Slow down instead of sudden pause for a more elegant fluid feel
      gsap.to(tweenRef.current, { timeScale: 0.2, duration: 0.8, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1.0, duration: 0.8, ease: "power2.out" });
    }
  };

  // Duplicate list to ensure seamless marquee coverage
  const marqueeItems = [...clients, ...clients, ...clients, ...clients];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black py-16 md:py-20 border-b border-white/5 overflow-hidden select-none"
    >
      {/* Subtle background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-white/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#C8A96E] uppercase block mb-1">
            Proven Track Record
          </span>
          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">
            Trusted by fast-growing startups & international brands
          </h3>
        </div>
        <div className="hidden md:block text-right">
          <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase">
            ✦ SCROLL TO EXPLORE WORK
          </span>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div
        className="relative w-full overflow-hidden flex"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left & Right gradient fades for premium cinema feel */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex whitespace-nowrap min-w-max gap-12 md:gap-20 py-4 items-center"
        >
          {marqueeItems.map((client, index) => (
            <div
              key={index}
              className="client-logo-wrapper flex items-center justify-center shrink-0 h-12 md:h-16 px-6 md:px-8 bg-white/[0.02] border border-white/[0.04] rounded-xl hover:border-white/10 hover:bg-white transition-all duration-500 cursor-pointer group"
              title={client.name}
            >
              <img
                src={client.logo}
                alt={`${client.name} Logo`}
                className="h-6 md:h-8 max-w-[120px] md:max-w-[160px] object-contain opacity-40 group-hover:opacity-100 transition-all duration-700 select-none pointer-events-none"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

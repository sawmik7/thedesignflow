
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "@/lib/gsap";

const NAV_LINKS = ["Work", "Services", "Pricing", "Studio", "Blog"];

export default function Navigation() {
  const pillRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastScrollY || y < 80);
      lastScrollY = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!pillRef.current) return;
    gsap.to(pillRef.current, {
      y: isVisible ? "0%" : "-200%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, [isVisible]);

  return (
    <>
      {/* ── Floating Pill Nav ───────────────────────────── */}
      <div
        ref={pillRef}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[min(680px,92vw)]"
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-between px-5 py-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          {/* Left: Menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 text-[#F0EDE6]/80 hover:text-white transition-colors group"
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`block w-5 h-[1px] bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-[1px] bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase hidden sm:block">
              {isOpen ? "Close" : "Menu"}
            </span>
          </button>

          {/* Center: Logo — Jeroen Style */}
          <Link to="/" className="flex items-center group">
            <span className="font-display text-lg tracking-[0.05em] uppercase font-black transition-colors duration-300">
              <span className="text-accent group-hover:text-white">THE</span>
              <span className="text-white group-hover:text-accent"> DESIGN </span>
              <span className="text-accent group-hover:text-white">FLOW</span>
              <span className="text-[8px] align-top ml-0.5 opacity-50 tracking-normal">TM</span>
            </span>
          </Link>

          {/* Right: CTA */}
          <Link
            to="/#contact"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                const el = document.getElementById("contact");
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            data-cursor="magnetic"
            className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-[#F0EDE6]/80 hover:text-white transition-colors"
          >
            <span className="hidden sm:block">Get Started</span>
            <span className="text-accent">↗</span>
          </Link>
        </div>
      </div>

      {/* ── Full Screen Menu ─────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 50% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 50% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 50% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-[#000000] flex flex-col justify-center px-8 md:px-24"
          >
            {/* Nav items */}
            <div className="flex flex-col gap-2">
              {[...NAV_LINKS, "Contact"].map((item, i) => {
                const isHomeAnchor = ["work", "services", "pricing", "contact"].includes(item.toLowerCase());
                const toPath = isHomeAnchor ? `/#${item.toLowerCase()}` : `/${item.toLowerCase()}`;

                return (
                  <motion.div
                    key={item}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link
                      to={toPath}
                      onClick={(e) => {
                        if (window.location.pathname === "/" && isHomeAnchor) {
                          const el = document.getElementById(item.toLowerCase());
                          if (el) {
                            e.preventDefault();
                            setIsOpen(false);
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        } else {
                          setIsOpen(false);
                        }
                      }}
                      className="group flex items-baseline gap-6 py-3 border-b border-white/5 hover:border-white/20 transition-colors"
                    >
                      <span className="font-mono text-xs text-white/20 w-8">0{i + 1}</span>
                      <span className="font-display text-[10vw] md:text-[7vw] uppercase text-[#F0EDE6] group-hover:text-accent transition-colors leading-none tracking-[-0.04em]">
                        {item}
                      </span>
                      <span className="ml-auto text-white/20 text-sm group-hover:text-accent group-hover:translate-x-1 transition-all">↗</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-10 left-8 md:left-24 right-8 md:right-24 flex justify-between font-mono text-[10px] tracking-widest text-white/30 uppercase"
            >
              <div className="flex gap-8">
                {["Twitter", "Instagram", "LinkedIn"].map(s => (
                  <a key={s} href="#" className="hover:text-white transition-colors">{s}</a>
                ))}
              </div>
              <a href="mailto:thedesignflow.ai@gmail.com" className="hover:text-white transition-colors">
                thedesignflow.ai@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}




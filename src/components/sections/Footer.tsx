import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import Marquee from "@/components/ui/Marquee";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const lenis = useSmoothScroll();

  const letsWord = "LET'S";
  const talkWord = "TALK";

  useGSAP(() => {
    if (!footerRef.current) return;

    // Coordinated GSAP ScrollTrigger timeline for premium reveals
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        invalidateOnRefresh: true,
      }
    });

    // 1. Stagger letters of LET'S TALK with 3D perspective and rotateX
    gsap.set(".footer-char", { transformPerspective: 800 });
    tl.fromTo(
      ".footer-char",
      { 
        y: "110%", 
        rotateX: -55, 
        scale: 0.85, 
        opacity: 0 
      },
      {
        y: "0%",
        rotateX: 0,
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: "cubic-bezier(0.16, 1, 0.3, 1)",
        stagger: 0.05,
        force3D: true,
      }
    );

    // 2. Stagger social links fade-in and slide-up
    tl.fromTo(
      ".footer-fade-in",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.06,
        force3D: true,
      },
      "-=0.9" // start during heading stagger
    );

    // 3. Stagger credits at bottom
    tl.fromTo(
      ".footer-credit-item",
      { opacity: 0, y: 10 },
      {
        opacity: 0.4, // Match original color scale
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      },
      "-=0.4"
    );

  }, { scope: footerRef });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer ref={footerRef} className="bg-[#050505] text-[#F0EDE6] pt-24 pb-12 relative overflow-hidden flex flex-col transition-colors duration-700">
      <Marquee 
        text="THE DESIGN FLOW ✦ 8+ YEARS EXPERIENCE ✦ 280+ PROJECTS DELIVERED ✦ 100+ UNIQUE CLIENTS ✦ 4.9★ RATING ✦ LEVEL 2 FIVERR SELLER ✦ BRAND DESIGN ✦ AI AUTOMATION ✦ SAAS UI/UX ✦ WEB DESIGN ✦" 
        speed="medium" 
        className="mb-12 border-t border-b border-white/10" 
      />

      <div className="px-6 md:px-12 flex-1 flex flex-col justify-between">
        
        {/* ── Massive character-stagger email link ── */}
        <div className="w-full mb-24 overflow-hidden" ref={titleContainerRef}>
          <a 
            href="mailto:thedesignflow.ai@gmail.com"
            className="block w-full group"
          >
            <h2 className="font-hero font-light text-[17vw] leading-[0.8] uppercase whitespace-nowrap flex flex-wrap gap-x-8 select-none">
              
              {/* Word 1: LET'S */}
              <div className="flex overflow-hidden py-4">
                {letsWord.split("").map((char, index) => (
                  <span 
                    key={index} 
                    className="footer-char inline-block transition-transform duration-500 group-hover:-translate-y-3 group-hover:text-[var(--brand-orange)]"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {char}
                  </span>
                ))}
              </div>

              {/* Word 2: TALK */}
              <div className="flex overflow-hidden py-4">
                {talkWord.split("").map((char, index) => (
                  <span 
                    key={index} 
                    className="footer-char inline-block transition-transform duration-500 group-hover:translate-y-3 group-hover:text-[var(--brand-orange)]"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {char}
                  </span>
                ))}
              </div>

            </h2>
          </a>
        </div>

        {/* ── Grid: Info, Navigation, Social ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6 mb-24 border-t border-white/10 pt-12">
          
          <div className="md:col-span-6 max-w-sm footer-fade-in opacity-0">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mb-6">About Us</h3>
            <p className="text-xl font-light text-white/80 font-sans leading-relaxed">
              We are a premium digital design and motion studio building award-winning, cinematic web experiences.
            </p>
          </div>
          
          <div className="md:col-span-3 footer-fade-in opacity-0">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mb-6">Navigation</h3>
            <ul className="space-y-3 font-display text-2xl uppercase">
              {["Work", "Services", "Studio", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`/${item === "Contact" ? "contact" : item.toLowerCase()}`} 
                    className="hover:text-[var(--brand-orange)] transition-colors relative inline-block group"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--brand-orange)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3 footer-fade-in opacity-0">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-white/50 mb-6">Social</h3>
            <ul className="space-y-3 font-mono text-sm tracking-widest uppercase text-white/70">
              {[
                { name: "Twitter (X)", url: "https://twitter.com/thedesignflow" },
                { name: "Instagram", url: "https://instagram.com/thedesignflow" },
                { name: "LinkedIn", url: "https://linkedin.com/in/thedesignflow" },
                { name: "Fiverr", url: "https://fiverr.com/thedesignflow" }
              ].map((social) => (
                <li key={social.name} className="flex items-center gap-1.5 group/social">
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-[var(--brand-orange)] transition-colors flex items-center gap-1"
                  >
                    {social.name}
                    <ArrowUpRight size={12} className="opacity-40 group-hover/social:opacity-100 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5 transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Dynamic Credits Footer Bar ── */}
        <div className="flex flex-col md:flex-row items-center justify-between font-mono text-[10px] tracking-widest uppercase text-white/40 pt-6 border-t border-white/10 gap-6">
          <p className="footer-credit-item opacity-0">© 2026 THE DESIGN FLOW</p>
          <p className="footer-credit-item opacity-0 hidden md:block">DESIGNED & BUILT WITH ♥</p>
          <button 
            onClick={scrollToTop}
            className="footer-credit-item opacity-0 flex items-center gap-2 hover:text-[var(--brand-orange)] hover:opacity-100 transition-colors group"
          >
            BACK TO TOP
            <span className="inline-block p-2 rounded-full border border-white/20 group-hover:border-[var(--brand-orange)] group-hover:rotate-180 transition-all duration-500">
              ↑
            </span>
          </button>
        </div>

      </div>
    </footer>
  );
}


import React, { useLayoutEffect, useRef } from "react";
import { Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  { name: "Aleksey K.", role: "Founder, SaaS Launch", text: "Absolute professional. Hasanul delivered a clean, ultra-modern Figma design system for our SaaS dashboard. Developer handoff was flawless, saving us weeks of coding. Highly recommend!" },
  { name: "Sarah L.", role: "CEO, Lumina AI", text: "Unbelievable branding work! The brand guidelines PDF is exceptionally detailed. He understood our AI startup's vision immediately and created a visual identity that wowed our investors." },
  { name: "Daniel M.", role: "Product Lead, Apex Tech", text: "Hasanul is an elite designer. The Next.js landing page built with custom GSAP animations looks stunning, loads fast, and has doubled our lead conversion rate since launch." },
  { name: "Viktor P.", role: "Co-Founder, DevFlow", text: "Exceptional UI/UX redesign. Our web app user retention increased by 40% because of the intuitive navigation flows he designed. Will definitely hire again for Phase 2." },
  { name: "Chloe G.", role: "CMO, Nova Analytics", text: "The AI automation workflow design is top-notch. He set up seamless n8n automation and GPT-4 integrations that saved our sales team countless hours. A true productivity game-changer!" },
  { name: "Julian B.", role: "VP of Product, SpaceCart", text: "Superb execution from start to finish. He delivered pixel-perfect Figma screens for our complex e-commerce flow. Very responsive, attentive to details, and ahead of schedule." }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef1 = useRef<HTMLDivElement>(null);
  const marqueeRef2 = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(
        ".testimonial-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Infinite Marquee Animation
      if (marqueeRef1.current) {
        gsap.to(marqueeRef1.current, {
          xPercent: -50, // Move half the width (since we duplicated content)
          ease: "none",
          duration: 40,
          repeat: -1,
        });
      }
      
      if (marqueeRef2.current) {
        gsap.to(marqueeRef2.current, {
          xPercent: -50,
          ease: "none",
          duration: 35, // Slightly different speed for parallax feel
          repeat: -1,
        });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Split testimonials into two rows for the marquee
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  const TestimonialCard = ({ t }: { t: typeof testimonials[0] }) => (
    <motion.div 
      whileHover={{ y: -8, scale: 1.02, rotate: -1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex-shrink-0 w-[300px] sm:w-[350px] md:w-[450px] p-8 md:p-10 rounded-[2rem] 
                 bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.08] 
                 backdrop-blur-2xl transition-colors duration-500 
                 hover:bg-white/[0.08] hover:border-[var(--brand-orange)]/40 hover:shadow-[0_0_40px_-10px_rgba(255,77,0,0.2)] 
                 mx-4 cursor-pointer whitespace-normal overflow-hidden"
    >
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white/[0.15] group-hover:via-[var(--brand-orange)]/60 to-transparent transition-colors duration-500" />
      
      {/* Decorative Background Blob */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[var(--brand-orange)]/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="flex gap-1 text-[var(--brand-orange)] mb-6 opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_10px_rgba(255,77,0,0.3)]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill="currentColor" />
        ))}
      </div>
      <p className="font-display text-lg md:text-xl text-white/90 mb-8 leading-relaxed font-medium">
        &ldquo;{t.text}&rdquo;
      </p>
      <div className="flex items-center gap-4 mt-auto relative z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-orange)]/20 to-transparent border border-[var(--brand-orange)]/30 flex items-center justify-center font-bold text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
          {t.name.charAt(0)}
        </div>
        <div>
          <div className="font-bold text-white group-hover:text-[var(--brand-orange)] transition-colors">{t.name}</div>
          <div className="text-xs text-white/40 uppercase tracking-wider font-semibold">{t.role}</div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-20 sm:py-32 md:py-44 bg-[#080808] overflow-hidden">
      {/* Gradient dividers */}
      <div className="gradient-divider-top" />
      <div className="gradient-divider-bottom" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none translate-x-[-20%] translate-y-[-20%]"
        style={{ background: "radial-gradient(circle, rgba(255,77,0,0.05) 0%, transparent 60%)" }}
      />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none translate-x-[20%] translate-y-[20%]"
        style={{ background: "radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 60%)" }}
      />

      <div className="container mx-auto px-8 sm:px-10 md:px-12 relative z-10 mb-20">
        <div className="testimonial-heading text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--brand-orange)]">Testimonials</span>
            <div className="h-[1px] w-8 bg-[var(--brand-orange)]" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-black tracking-tighter uppercase text-white mb-4">
            Client Words
          </h2>
          <p className="text-white/40 text-lg max-w-md mx-auto">
            Trusted by founders and product teams to deliver exceptional digital experiences.
          </p>
        </div>
      </div>

      {/* ── Marquee Row 1 ── */}
      <div className="relative z-10 flex w-full overflow-hidden mb-8" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div ref={marqueeRef1} className="flex whitespace-nowrap w-max hover:[animation-play-state:paused]">
          {/* Duplicate row content 3 times for seamless infinite loop */}
          {[...row1, ...row1, ...row1, ...row1].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* ── Marquee Row 2 ── */}
      <div className="relative z-10 flex w-full overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
        <div ref={marqueeRef2} className="flex whitespace-nowrap w-max ml-[-200px] hover:[animation-play-state:paused]">
          {[...row2, ...row2, ...row2, ...row2].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

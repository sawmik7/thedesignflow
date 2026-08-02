// src/components/sections/UtopaiSlider.tsx
// Exact replica of Utopai Studios sticky vertical scroll-driven work section.
// Performance optimizations:
//   - scrub: 0.5 (snappier response)
//   - onUpdate throttled via requestAnimationFrame
//   - Videos: preload="none" except first, play/pause managed precisely
//   - contain: layout paint on wrapper via CSS
//   - No box-shadow or transform on video cards (GPU compositing only via opacity)

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/lib/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = works;
// Snappier cinematic scroll height: 240vh total height for 6 slides (about 40vh scroll per slide)
const SCROLL_HEIGHT_VH = Math.min(SLIDES.length * 40, 240);

export default function UtopaiSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef     = useRef<HTMLDivElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);
  const titleRefs  = useRef<(HTMLHeadingElement | null)[]>([]);
  const subRefs    = useRef<(HTMLParagraphElement | null)[]>([]);
  const cardRefs   = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // rAF throttle ref for onUpdate
  const rafRef     = useRef<number | null>(null);
  const lastIdx    = useRef<number>(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pin     = pinRef.current;
    const strip   = stripRef.current;
    if (!section || !pin || !strip) return;

    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduceMotion) {
      section.classList.add("reduce-motion");
    }

    const ctx = gsap.context(() => {
      const cards = strip.querySelectorAll<HTMLElement>(".div_herovideoinnerholder");
      if (cards.length === 0) return;

      const numSlots = SLIDES.length - 1;

      // ── Initialize all text, card, & button states ────────────────
      SLIDES.forEach((_, i) => {
        const title = titleRefs.current[i];
        const sub   = subRefs.current[i];
        const els   = [title, sub].filter(Boolean) as HTMLElement[];
        gsap.set(els, { autoAlpha: i === 0 ? 1 : 0, y: (shouldReduceMotion || i === 0) ? 0 : 24 });
        
        const card = cardRefs.current[i];
        if (card) {
          gsap.set(card, { opacity: i === 0 ? 1 : (shouldReduceMotion ? 0 : 0.3) });
        }

        const btn = buttonRefs.current[i];
        if (btn) {
          gsap.set(btn, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.95, pointerEvents: i === 0 ? "auto" : "none" });
        }
      });

      // Robust video toggle inside onUpdate
      const activateCard = (idx: number, prevIdx: number) => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          const vid = card.querySelector("video");
          if (vid) {
            if (i === idx) {
              card.classList.add("is-active");
              if (vid.paused) vid.play().catch(() => {});
            } else {
              card.classList.remove("is-active");
              if (!vid.paused) vid.pause();
            }
          }
        });
      };

      // Activate first card immediately on mount
      if (cardRefs.current[0]) {
        cardRefs.current[0].classList.add("is-active");
        const firstVideo = cardRefs.current[0]?.querySelector("video");
        if (firstVideo) firstVideo.play().catch(() => {});
      }

      // ── Master timeline — drives vertical translate, fades, and opacities ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.35,
          pin: pin,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate(self) {
            if (rafRef.current !== null) return;
            rafRef.current = requestAnimationFrame(() => {
              rafRef.current = null;

              const activeIdx = Math.min(
                Math.max(Math.round(self.progress * numSlots), 0),
                SLIDES.length - 1
              );

              // Update vertical progress line indicator
              const progressBar = pin?.querySelector<HTMLElement>(".utopai-slider-progress-line");
              if (progressBar) {
                progressBar.style.height = `${self.progress * 100}%`;
              }

              if (activeIdx === lastIdx.current) return;
              const prevIdx = lastIdx.current;
              lastIdx.current = activeIdx;

              activateCard(activeIdx, prevIdx);
            });
          },

          onLeave() {
            cardRefs.current.forEach((card) => {
              card?.querySelector("video")?.pause();
            });
          },
          onLeaveBack() {
            cardRefs.current.forEach((card) => {
              card?.querySelector("video")?.pause();
            });
          },
          onEnter() {
            cardRefs.current.forEach((card) => {
              if (!card) return;
              const vid = card.querySelector("video");
              if (vid) {
                card.classList.contains("is-active")
                  ? vid.play().catch(() => {})
                  : vid.pause();
              }
            });
          },
          onEnterBack() {
            cardRefs.current.forEach((card) => {
              if (!card) return;
              const vid = card.querySelector("video");
              if (vid) {
                card.classList.contains("is-active")
                  ? vid.play().catch(() => {})
                  : vid.pause();
              }
            });
          },
        },
      });

      // A. Vertical strip translation (disabled for reduced motion)
      if (!shouldReduceMotion) {
        tl.fromTo(
          strip,
          {
            y: 0,
          },
          {
            y: () => {
              const lastOffsetTop = (cards[cards.length - 1] as HTMLElement).offsetTop;
              return -lastOffsetTop;
            },
            ease: "none",
            duration: numSlots,
            force3D: true,
          },
          0
        );
      }

      // B. Inject scroll-scrub text transitions, card depth parallax, blur & grayscale transitions
      for (let i = 1; i <= numSlots; i++) {
        // ── FADE OUT PREVIOUS SLIDE ──
        tl.to(
          [titleRefs.current[i - 1], subRefs.current[i - 1]].filter(Boolean),
          {
            autoAlpha: 0,
            y: shouldReduceMotion ? 0 : -28,
            filter: "blur(6px)",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.8
        );

        tl.to(
          cardRefs.current[i - 1],
          {
            opacity: shouldReduceMotion ? 0 : 0.35,
            scale: shouldReduceMotion ? 1 : 0.94,
            filter: "blur(4px) grayscale(80%)",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.8
        );

        tl.to(
          buttonRefs.current[i - 1],
          {
            autoAlpha: 0,
            scale: 0.95,
            pointerEvents: "none",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.8
        );

        // ── FADE IN CURRENT SLIDE ──
        tl.fromTo(
          [titleRefs.current[i], subRefs.current[i]].filter(Boolean),
          {
            autoAlpha: 0,
            y: shouldReduceMotion ? 0 : 28,
            filter: "blur(6px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.6
        );

        tl.fromTo(
          cardRefs.current[i],
          {
            opacity: shouldReduceMotion ? 0 : 0.35,
            scale: shouldReduceMotion ? 1 : 0.94,
            filter: "blur(4px) grayscale(80%)",
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px) grayscale(0%)",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.6
        );

        tl.fromTo(
          buttonRefs.current[i],
          {
            autoAlpha: 0,
            scale: 0.95,
            pointerEvents: "none",
          },
          {
            autoAlpha: 1,
            scale: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power2.inOut",
          },
          i - 0.6
        );
      }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      // Cancel any pending rAF on unmount
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section_hero_home_sticky"
      style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
    >
      {/* Pinned inner viewport — GSAP pins this div */}
      <div ref={pinRef} className="div_hero_home_new">

        {/* ── Left: Stacked title headings ── */}
        <div className="div_headingwrapper">
          {SLIDES.map((slide, i) => (
            <h2
              key={slide.id}
              ref={(el) => { titleRefs.current[i] = el; }}
              className="h1_hero_home"
            >
              {slide.title}
            </h2>
          ))}
        </div>

        {/* ── Center: Vertical scrolling video strip ── */}
        <div className="div_videowrapper_vertical" ref={stripRef}>
          {SLIDES.map((slide, i) => (
            <Link
              key={slide.id}
              to={`/work/${slide.slug}`}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="div_herovideoinnerholder w-inline-block"
              aria-label={`View ${slide.title} work`}
            >
              <div className="div_herovideo w-background-video w-background-video-atom">
                {slide.video ? (
                  <video
                    autoPlay={true}
                    loop
                    muted
                    playsInline
                    /* Preload metadata to show cover frame immediately */
                    preload={i === 0 ? "auto" : "metadata"}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  >
                    {slide.video.endsWith(".mp4") ? (
                      <>
                        <source src={slide.video} type="video/mp4" />
                        <source src={slide.video.replace(".mp4", ".webm")} type="video/webm" />
                      </>
                    ) : (
                      <>
                        <source src={slide.video.replace(".webm", ".mp4")} type="video/mp4" />
                        <source src={slide.video} type="video/webm" />
                      </>
                    )}
                    {/* Poster fallback if video fails */}
                    <img
                      src={slide.img}
                      alt={slide.title}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </video>
                ) : (
                  <img
                    src={slide.img}
                    alt={slide.title}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                )}
                {/* Cinematic bottom gradient */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* ── Right: Subtitle stack ── */}
        <div className="div_hero_rightside">
          <div className="div_subtitlewrapper">
            {SLIDES.map((slide, i) => (
              <p
                key={slide.id}
                ref={(el) => { subRefs.current[i] = el; }}
                className="p_subtitle_home"
              >
                {slide.subtitle}
              </p>
            ))}
          </div>
        </div>

        {/* ── Bottom Mobile Buttons ── */}
        <div className="div_hero_buttonholder mobile flex md:hidden justify-center items-center absolute bottom-12 left-0 right-0 h-12 z-30 px-6 pointer-events-none">
          {SLIDES.map((slide, i) => (
            <Link
              key={slide.id}
              to={`/work/${slide.slug}`}
              ref={(el) => { buttonRefs.current[i] = el; }}
              className="button_primary hero absolute text-[10px] sm:text-xs font-mono uppercase tracking-widest bg-[#C8A96E] hover:bg-white text-black font-semibold px-6 py-3 rounded-full opacity-0 pointer-events-none transition-[background-color,transform] duration-200 scale-95"
            >
              Learn more about {slide.title}
            </Link>
          ))}
        </div>

        {/* ── Vertical Scroll Progress Bar (Right Edge) ── */}
        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-36 w-[2px] bg-white/10 rounded-full overflow-hidden hidden sm:block z-30 pointer-events-none">
          <div className="utopai-slider-progress-line w-full bg-accent h-0 transition-[height] duration-100 ease-out rounded-full" />
        </div>

      </div>
    </section>
  );
}

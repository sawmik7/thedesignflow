import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";

interface LottieIconProps {
  url: string;
  trigger?: "scroll" | "hover" | "autoplay";
  className?: string;
  loop?: boolean;
  speed?: number;
}

export default function LottieIcon({
  url,
  trigger = "scroll",
  className = "w-12 h-12",
  loop = false,
  speed = 1.0,
}: LottieIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<any>(null);
  const [activeUrl, setActiveUrl] = useState(url);

  // Sync activeUrl when url changes & test remote availability
  useEffect(() => {
    setActiveUrl(url);

    if (url.startsWith("https://lottie.host/")) {
      fetch(url, { method: "HEAD" })
        .then((res) => {
          if (res.status !== 200) {
            throw new Error("CDN blocked or unavailable");
          }
        })
        .catch(() => {
          // Map to local public fallback paths
          if (url.includes("7Uk8N2Q1aF")) setActiveUrl("/lottie/discovery.json");
          else if (url.includes("Hukmbyxza3")) setActiveUrl("/lottie/proposal.json");
          else if (url.includes("0f2g9zvy4y")) setActiveUrl("/lottie/design.json");
          else if (url.includes("1qJ1y5W201")) setActiveUrl("/lottie/delivery.json");
          else if (url.includes("5W201q2J1y")) setActiveUrl("/lottie/time.json");
          else if (url.includes("8F02g9zvy9")) setActiveUrl("/lottie/projects.json");
          else if (url.includes("3pukmbyxza")) setActiveUrl("/lottie/standard.json");
          else if (url.includes("2g9zvy5w20")) setActiveUrl("/lottie/rating.json");
        });
    }
  }, [url]);

  // lottie is now a static import — no CDN script needed
  // activeUrl fallback logic still applies for remote URLs

  useEffect(() => {
    if (!containerRef.current) return;

    // Use statically-imported lottie instead of window.lottie
    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: loop || trigger === "autoplay",
      autoplay: trigger === "autoplay",
      path: activeUrl,
    });

    animRef.current = anim;
    anim.setSpeed(speed);

    // 3. Setup Triggers
    if (trigger === "scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              anim.goToAndPlay(0, true);
            } else {
              anim.pause();
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(containerRef.current);
      return () => {
        observer.disconnect();
        anim.destroy();
      };
    } else if (trigger === "hover") {
      anim.goToAndStop(0, true);
      const handleMouseEnter = () => {
        anim.goToAndPlay(0, true);
      };
      const handleMouseLeave = () => {
        if (loop) {
          anim.pause();
        } else {
          // Play to end then reset
        }
      };

      const el = containerRef.current;
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
        anim.destroy();
      };
    }

    return () => {
      anim.destroy();
    };
  }, [activeUrl, trigger, loop, speed]);

  return (
    <div
      ref={containerRef}
      className={`${className} flex items-center justify-center pointer-events-none`}
      style={{ overflow: "hidden" }}
    />
  );
}

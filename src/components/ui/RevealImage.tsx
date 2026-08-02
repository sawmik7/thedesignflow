
import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface RevealImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "className"> {
  containerClassName?: string;
  imageClassName?: string;
  overlayColor?: string;
}

export default function RevealImage({
  containerClassName = "",
  imageClassName = "",
  overlayColor = "bg-[#C8A96E]",
  ...props
}: RevealImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !overlayRef.current || !imageRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(overlayRef.current, {
      scaleX: 0,
      transformOrigin: "right center",
      duration: 1.2,
      ease: "power4.inOut",
    });

    tl.fromTo(
      imageRef.current,
      { scale: 1.15 },
      { scale: 1, duration: 1.2, ease: "power4.inOut" },
      "<"
    );

    // Subtle parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      <div 
        ref={overlayRef} 
        className={`absolute inset-0 z-10 w-full h-full origin-left ${overlayColor}`} 
      />
      <div className="relative w-full h-full overflow-hidden">
        <img
          ref={imageRef}
          className={`object-cover w-full h-full ${imageClassName}`}
          {...props}
        />
      </div>
    </div>
  );
}

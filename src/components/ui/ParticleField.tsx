import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  alpha: number;
  baseAlpha: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth > 768);
    if (window.innerWidth <= 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const particleCount = 120;
    
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let lastScrollY = window.scrollY;
    let scrollOffset = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize soft particle stars
    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.4 + 0.1;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX - window.innerWidth / 2) * 0.05;
      mouse.targetY = (e.clientY - window.innerHeight / 2) * 0.05;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      const diff = window.scrollY - lastScrollY;
      scrollOffset += diff * 0.1;
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const animate = () => {
      // Dynamic Loop Pause: Stop rendering if scrolled past top viewport to save 100% CPU/GPU resources!
      if (window.scrollY > window.innerHeight * 1.5) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth mouse dampening
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      scrollOffset *= 0.95; // damp scroll velocity

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Apply coordinates with drift + mouse parallax + scroll displacement
        let drawX = p.x + mouse.x;
        let drawY = p.y + mouse.y - scrollOffset;

        // Wrap particles around borders
        if (drawX < 0) p.x = canvas.width;
        if (drawX > canvas.width) p.x = 0;
        if (drawY < 0) p.y = canvas.height;
        if (drawY > canvas.height) p.y = 0;

        // Update real position
        p.x += p.speedX;
        p.y += p.speedY;

        // Twinkle effect
        p.alpha = p.baseAlpha + Math.sin(Date.now() * 0.001 + i) * 0.1;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 237, 230, ${p.alpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen bg-[#050505]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

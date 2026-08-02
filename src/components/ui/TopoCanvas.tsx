import { useRef, useEffect, useState } from "react";

export default function TopoCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);
  const hudTimeRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Interactive 3D Spring-loaded Parallax Loop
  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Mouse coordinates (target positions)
    let targetX = 0;
    let targetY = 0;

    // Current animated coordinates (interpolated with spring damping)
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates around screen center (-1 to 1)
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      // Max rotational degree bounds
      targetX = normX * 15; // rotate Z angle shift
      targetY = normY * 12; // rotate X angle shift
    };

    // RAF Loop for smooth spring interpolation
    let rafId: number;
    const update = () => {
      // Linear interpolation (lerp) damping parameter: 0.07 creates a premium heavy lag momentum
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;

      // Rotate the 3D Canvas
      // Base rotation: 52deg pitch (tilt back), -22deg yaw (rotated angled)
      const rx = 52 + currentY;
      const rz = -22 + currentX;
      canvas.style.transform = `rotateX(${rx}deg) rotateZ(${rz}deg)`;

      // Apply index-based Z-depth translations to each mountain layer
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const depth = (index + 1) * 22; // Z-axis lift distance per layer
        const moveX = currentX * (index + 1) * 0.65;
        const moveY = currentY * (index + 1) * 0.65;
        layer.style.transform = `translateZ(${depth}px) translate(${moveX}px, ${moveY}px)`;
      });

      rafId = requestAnimationFrame(update);
    };

    // Entrance reveal
    canvas.style.opacity = "0";
    canvas.style.transform = "rotateX(75deg) rotateZ(0deg) scale(0.88)";
    canvas.style.filter = "blur(10px)";
    
    const introTimeout = setTimeout(() => {
      canvas.style.transition = "opacity 2.4s cubic-bezier(0.16, 1, 0.3, 1), transform 2.4s cubic-bezier(0.16, 1, 0.3, 1), filter 2.4s cubic-bezier(0.16, 1, 0.3, 1)";
      canvas.style.opacity = "1";
      canvas.style.filter = "blur(0px)";
      canvas.style.transform = "rotateX(52deg) rotateZ(-22deg) scale(1)";
      
      // Activate loop after transition is underway
      setTimeout(() => {
        if (canvas) {
          canvas.style.transition = "none"; // clear transitions to enable latency-free tracking
        }
        // Enable willChange only while actively animating
        layersRef.current.forEach(layer => {
          if (layer) layer.style.willChange = "transform";
        });
        rafId = requestAnimationFrame(update);
        window.addEventListener("mousemove", handleMouseMove);
      }, 800);
    }, 150);

    // Update HUD clock without React state (avoids re-renders every second)
    const updateHudTime = () => {
      if (hudTimeRef.current) {
        const now = new Date();
        hudTimeRef.current.textContent = now.toISOString().substring(11, 19) + " UTC";
      }
    };
    updateHudTime();
    const clockInterval = setInterval(updateHudTime, 1000);

    return () => {
      clearTimeout(introTimeout);
      cancelAnimationFrame(rafId);
      clearInterval(clockInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      // Clean up willChange to free GPU memory
      layersRef.current.forEach(layer => {
        if (layer) layer.style.willChange = "auto";
      });
    };
  }, [shouldReduceMotion]);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#050505] z-0 overflow-hidden pointer-events-none">
      
      {/* ── Local SVG film-grain turbulence noise filter ── */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="topo-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      {/* Film grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-40 opacity-[0.035]"
        style={{ filter: "url(#topo-grain)" }}
      />

      {/* ── Cinematic overlays & HUD grid lines ── */}
      <div className="absolute inset-0 z-30 pointer-events-none p-6 md:p-12 flex flex-col justify-between select-none">
        {/* HUD Top Bar */}
        <div className="flex items-start justify-between font-mono text-[9px] tracking-[0.25em] text-[#F0EDE6]/35 uppercase">
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
            <span>SYS_RUN // TOPO_RENDER_v4.2</span>
          </div>
          {/* DOM ref update instead of React state — avoids re-render every second */}
          <div ref={hudTimeRef}>00:00:00 UTC</div>
        </div>

        {/* HUD Center Target crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <div className="w-8 h-[1px] bg-[#C8A96E]" />
          <div className="h-8 w-[1px] bg-[#C8A96E] absolute" />
        </div>

        {/* HUD Bottom Bar */}
        <div className="flex items-end justify-between font-mono text-[9px] tracking-[0.25em] text-[#F0EDE6]/35 uppercase">
          <div>
            <p>LATITUDE: 34.0522° N</p>
            <p className="mt-1">FOCAL_DEPTH: 80MM</p>
          </div>
          <div className="text-right">
            <p>GRID: C-144 // GOLDEN_RATIO</p>
            <p className="mt-1 text-[#C8A96E]/50">SURFACE: TENSION_MAX</p>
          </div>
        </div>

        {/* Framing corner markers */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#F0EDE6]/15" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#F0EDE6]/15" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#F0EDE6]/15" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#F0EDE6]/15" />
      </div>

      {/* ── 3D Viewport Perspective Box ── */}
      <div 
        className="absolute inset-0 w-full h-full flex items-center justify-center"
        style={{ perspective: "1800px" }}
      >
        <div
          ref={canvasRef}
          className="relative w-[min(800px,92vw)] h-[min(500px,58vw)] transition-transform duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transformStyle: "preserve-3d", transform: "rotateX(52deg) rotateZ(-22deg)" }}
        >
          {/* Layer 1: Background mountain range — no willChange until animation starts */}
          <div
            ref={(el) => { layersRef.current[0] = el; }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "linear-gradient(rgba(200, 169, 110, 0.05), rgba(5, 5, 5, 0.95)), url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=60&w=800')",
              backgroundBlendMode: "multiply, normal",
              filter: "grayscale(1) contrast(1.3) brightness(0.28)",
            }}
          />

          {/* Layer 2: Midground ridge line range */}
          <div
            ref={(el) => { layersRef.current[1] = el; }}
            className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-[0.55]"
            style={{
              backgroundImage: "linear-gradient(rgba(255, 77, 0, 0.06), rgba(5, 5, 5, 0.95)), url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=800')",
              backgroundBlendMode: "screen, normal",
              filter: "grayscale(1) contrast(1.2) brightness(0.35)",
            }}
          />

          {/* Layer 3: Foreground Contours (Repeating topographical lines + fine grid) */}
          <div
            ref={(el) => { layersRef.current[2] = el; }}
            className="absolute inset-0 pointer-events-none opacity-[0.4] mix-blend-screen"
            style={{
              backgroundImage: "repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 48px, rgba(200, 169, 110, 0.2) 49px, transparent 50px)",
              willChange: "transform",
            }}
          />

          {/* Golden grid floor inside 3D space */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, #C8A96E 1px, transparent 1px),
                                linear-gradient(to bottom, #C8A96E 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
              transform: "translateZ(10px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

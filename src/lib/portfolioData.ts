// Shared portfolio works data — used by PortfolioSlider + category pages

export interface Work {
  id: number;
  title: string;
  cat: string;
  desc: string;
  subtitle: string; // right-column uppercase label for Utopai slider
  img: string;
  video?: string; // high-fidelity autoplay cinematic loops
  color: string;
  year: string;
  tag: string;
  slug: string;
  items?: WorkItem[];
}

export interface WorkItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  client?: string;
  year: string;
  tags: string[];
  link?: string;
}

export const works: Work[] = [
  {
    id: 1,
    title: "Icon Branding",
    subtitle: "Bespoke icon branding showcases",
    cat: "Visual System & Logos",
    desc: "Bespoke icon branding showcases and premium visual identity systems for elite businesses.",
    img: "/images/projects/branding.png",
    video: "/Video/branding.mp4",
    color: "#FF4D00",
    year: "2026",
    tag: "Branding",
    slug: "branding",
    items: [],
  },
  {
    id: 2,
    title: "SaaS UI",
    subtitle: "Product design that converts & retains users",
    cat: "Product Engineering",
    desc: "Dashboard experiences built for clarity, increasing daily active user retention.",
    img: "/images/projects/saas.png",
    video: "/Video/saas.mp4",
    color: "#3B82F6",
    year: "2026",
    tag: "SaaS",
    slug: "saas-ui",
    items: [],
  },
  {
    id: 3,
    title: "Web Design",
    subtitle: "Cinematic sites with buttery-smooth animations",
    cat: "Next.js & GSAP",
    desc: "Cinematic web experiences with buttery-smooth animations and premium aesthetics.",
    img: "/images/projects/web.png",
    video: "/Video/web.mp4",
    color: "#8B5CF6",
    year: "2026",
    tag: "Web",
    slug: "web-design",
    items: [],
  },
  {
    id: 4,
    title: "AI Automation",
    subtitle: "Autonomous agents that eliminate manual work",
    cat: "n8n & OpenAI",
    desc: "Autonomous agents that eliminate repetitive work and scale operations rapidly.",
    img: "/images/blog/ai-automation.png",
    video: "/Video/ai.mp4",
    color: "#10B981",
    year: "2026",
    tag: "AI",
    slug: "ai-automation",
    items: [],
  },
  {
    id: 5,
    title: "Motion Design",
    subtitle: "Fluid micro-interactions that breathe life",
    cat: "GSAP & Framer",
    desc: "Fluid, physics-based micro-interactions that breathe life into digital products.",
    img: "/images/blog/animation-comparison.png",
    video: "/Video/motion.mp4",
    color: "#F59E0B",
    year: "2026",
    tag: "Motion",
    slug: "motion-design",
    items: [],
  },
  {
    id: 6,
    title: "E-commerce",
    subtitle: "High-converting storefronts for modern brands",
    cat: "Headless Architecture",
    desc: "High-converting, blazingly fast storefronts built for modern retail brands.",
    img: "/images/projects/ecommerce.png",
    video: "/Video/ecommerce.mp4",
    color: "#EC4899",
    year: "2026",
    tag: "E-com",
    slug: "e-commerce",
    items: [],
  },
];

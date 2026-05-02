// Shared portfolio works data — used by PortfolioSlider + category pages

export interface Work {
  id: number;
  title: string;
  cat: string;
  desc: string;
  img: string;
  color: string;
  year: string;
  tag: string;
  slug: string; // category page slug
  items?: WorkItem[]; // individual works in this category
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
    title: "Branding",
    cat: "Visual System & Logos",
    desc: "Complete brand architecture and premium visual language for elite businesses.",
    img: "https://placehold.co/800x600/111111/FF4D00/png?text=Nano+Banana+Pro+Aesthetic\\nBranding+Mockup",
    color: "#FF4D00",
    year: "2026",
    tag: "Branding",
    slug: "branding",
    items: [],
  },
  {
    id: 2,
    title: "SaaS UI",
    cat: "Product Engineering",
    desc: "Dashboard experiences built for clarity, increasing daily active user retention.",
    img: "https://placehold.co/800x600/111111/3B82F6/png?text=Nano+Banana+Pro+Aesthetic\\nSaaS+Dashboard+Mockup",
    color: "#3B82F6",
    year: "2026",
    tag: "SaaS",
    slug: "saas-ui",
    items: [],
  },
  {
    id: 3,
    title: "Web Design",
    cat: "Next.js & GSAP",
    desc: "Cinematic web experiences with buttery-smooth animations and premium aesthetics.",
    img: "https://placehold.co/800x600/111111/8B5CF6/png?text=Nano+Banana+Pro+Aesthetic\\nCinematic+Web+Design",
    color: "#8B5CF6",
    year: "2026",
    tag: "Web",
    slug: "web-design",
    items: [],
  },
  {
    id: 4,
    title: "AI Automation",
    cat: "n8n & OpenAI",
    desc: "Autonomous agents that eliminate repetitive work and scale operations rapidly.",
    img: "https://placehold.co/800x600/111111/10B981/png?text=Nano+Banana+Pro+Aesthetic\\nAI+Automation+Systems",
    color: "#10B981",
    year: "2026",
    tag: "AI",
    slug: "ai-automation",
    items: [],
  },
  {
    id: 5,
    title: "Motion Design",
    cat: "GSAP & Framer",
    desc: "Fluid, physics-based micro-interactions that breathe life into digital products.",
    img: "https://placehold.co/800x600/111111/F59E0B/png?text=Nano+Banana+Pro+Aesthetic\\nMotion+Design+Assets",
    color: "#F59E0B",
    year: "2026",
    tag: "Motion",
    slug: "motion-design",
    items: [],
  },
  {
    id: 6,
    title: "E-commerce",
    cat: "Headless Architecture",
    desc: "High-converting, blazingly fast storefronts built for modern retail brands.",
    img: "https://placehold.co/800x600/111111/EC4899/png?text=Nano+Banana+Pro+Aesthetic\\nE-Commerce+Storefront",
    color: "#EC4899",
    year: "2026",
    tag: "E-com",
    slug: "e-commerce",
    items: [],
  },
];

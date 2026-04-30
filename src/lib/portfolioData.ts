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
    title: "Brand Identity",
    cat: "Visual System & Logos",
    desc: "Complete brand architecture — strategy, identity system, and visual language for premium businesses ready to dominate their market.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=85",
    color: "#FF4D00",
    year: "2024",
    tag: "Branding",
    slug: "branding",
    items: [
      { id: 1, title: "Luxe Collective", desc: "Complete visual identity for a premium lifestyle brand — wordmark, palette, and full brand guidelines.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=85", client: "Luxe Co.", year: "2024", tags: ["Branding", "Identity", "Figma"] },
      { id: 2, title: "Apex Finance", desc: "Minimal corporate identity system for a FinTech startup entering institutional markets.", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=85", client: "Apex Ltd.", year: "2024", tags: ["Branding", "Logo", "Brand System"] },
      { id: 3, title: "Nova Wellness", desc: "Organic and approachable brand identity for a D2C wellness brand.", img: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&q=85", client: "Nova Labs", year: "2023", tags: ["Branding", "Packaging"] },
      { id: 4, title: "Stealth Agency", desc: "Dark-mode-first rebrand for a cybersecurity consultancy.", img: "https://images.unsplash.com/photo-1614850523060-8da1d56ae167?w=800&q=85", client: "Stealth Inc.", year: "2024", tags: ["Branding", "Motion"] },
    ],
  },
  {
    id: 2,
    title: "Web Design",
    cat: "Next.js & GSAP",
    desc: "Cinematic web experiences with buttery-smooth animations, pixel-perfect layouts, and conversion-optimised UX.",
    img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=85",
    color: "#3B82F6",
    year: "2024",
    tag: "Web",
    slug: "web-design",
    items: [
      { id: 1, title: "Orbit SaaS", desc: "Marketing site with parallax storytelling and GSAP ScrollTrigger sequences.", img: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=85", client: "Orbit Inc.", year: "2024", tags: ["Next.js", "GSAP", "UI/UX"] },
      { id: 2, title: "Prestige Law", desc: "Premium law firm website with cinematic scroll experience.", img: "https://images.unsplash.com/photo-1555421689-3f034debb7a6?w=800&q=85", client: "Prestige Law", year: "2024", tags: ["Next.js", "Animation"] },
      { id: 3, title: "Pulse Media", desc: "Full-screen editorial design for a digital media publication.", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=85", client: "Pulse Co.", year: "2023", tags: ["Web", "Editorial"] },
    ],
  },
  {
    id: 3,
    title: "AI Automation",
    cat: "n8n & OpenAI",
    desc: "Autonomous agents that eliminate repetitive work, qualify leads, and scale your operations 24/7 without hiring.",
    img: "https://images.unsplash.com/photo-1633511090164-b4421b033878?w=800&q=85",
    color: "#8B5CF6",
    year: "2025",
    tag: "AI",
    slug: "ai-automation",
    items: [
      { id: 1, title: "Lead Qualifier Bot", desc: "Multi-step n8n workflow that qualifies inbound leads and books discovery calls automatically.", img: "https://images.unsplash.com/photo-1633511090164-b4421b033878?w=800&q=85", client: "SalesForce SMB", year: "2025", tags: ["n8n", "OpenAI", "Automation"] },
      { id: 2, title: "Invoice Agent", desc: "AI agent that reads PDFs, extracts data, and posts to accounting software.", img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=85", client: "Acme Accounting", year: "2025", tags: ["AI", "Zapier", "OpenAI"] },
      { id: 3, title: "Social Autopilot", desc: "Content generation and scheduling pipeline for 5 social platforms.", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=85", client: "CreatorOS", year: "2024", tags: ["AI", "n8n", "Social"] },
    ],
  },
  {
    id: 4,
    title: "SaaS UI/UX",
    cat: "Product Engineering",
    desc: "Dashboard experiences built for clarity — reducing onboarding time and increasing daily active user retention.",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=85",
    color: "#10B981",
    year: "2024",
    tag: "SaaS",
    slug: "saas-ui",
    items: [
      { id: 1, title: "DataVault Dashboard", desc: "Complex analytics dashboard designed for data teams — dark mode, dense information architecture.", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=85", client: "DataVault", year: "2024", tags: ["UI/UX", "Dashboard", "Figma"] },
      { id: 2, title: "FlowCRM", desc: "CRM onboarding flow redesign — reduced time-to-value from 14 days to 2 days.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=85", client: "FlowCRM", year: "2024", tags: ["UX", "SaaS", "Product"] },
      { id: 3, title: "Payroll Pro", desc: "Enterprise payroll SaaS — complex role permissions UI with zero learning curve.", img: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?w=800&q=85", client: "PayrollPro", year: "2023", tags: ["UI/UX", "Enterprise"] },
    ],
  },
  {
    id: 5,
    title: "Logo Design",
    cat: "Minimalist Marks",
    desc: "Iconic, timeless logos that define market presence — from wordmarks to abstract symbols engineered for recall.",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=85",
    color: "#F59E0B",
    year: "2025",
    tag: "Logo",
    slug: "logo-design",
    items: [
      { id: 1, title: "Zephyr Mark", desc: "Abstract motion symbol for a logistics startup — conveys speed and reliability.", img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=85", client: "Zephyr Logistics", year: "2025", tags: ["Logo", "Symbol"] },
      { id: 2, title: "Crest Wordmark", desc: "Clean serif wordmark for a premium real estate consultancy.", img: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=85", client: "Crest Realty", year: "2024", tags: ["Logo", "Wordmark"] },
      { id: 3, title: "Monogram Series", desc: "Luxury monogram marks for 3 D2C fashion brands.", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85", client: "Multiple Clients", year: "2025", tags: ["Logo", "Monogram"] },
      { id: 4, title: "TechPulse Icon", desc: "App icon and brandmark system for a B2B tech platform.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=85", client: "TechPulse", year: "2025", tags: ["Logo", "App Icon"] },
    ],
  },
  {
    id: 6,
    title: "AI Chatbots",
    cat: "Conversational AI",
    desc: "Intelligent assistants that qualify leads, answer support queries, and close deals — running 24/7 on autopilot.",
    img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=85",
    color: "#EC4899",
    year: "2025",
    tag: "AI",
    slug: "ai-chatbots",
    items: [
      { id: 1, title: "SupportBot Pro", desc: "GPT-4 powered support agent trained on product documentation — resolves 80% of tickets autonomously.", img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=800&q=85", client: "TechCo", year: "2025", tags: ["ChatGPT", "Support", "Automation"] },
      { id: 2, title: "Sales Qualifier", desc: "WhatsApp + web chatbot that qualifies leads and books demo calls for a SaaS company.", img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=85", client: "GrowthSaaS", year: "2025", tags: ["AI", "WhatsApp", "Sales"] },
      { id: 3, title: "E-com Assistant", desc: "Product recommendation and order-tracking bot for a fashion e-commerce brand.", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85", client: "FashionHub", year: "2024", tags: ["AI", "E-commerce", "Chatbot"] },
    ],
  },
];

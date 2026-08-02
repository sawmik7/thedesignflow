import React from "react";
import {
  Layout,
  Palette,
  Type,
  FileText,
  Monitor,
  Zap,
  Sparkles,
  Search,
  Layers,
  BarChart,
  MessageSquare,
} from "lucide-react";

export interface Package {
  type: string;
  name: string;
  sub: string;
  price: string;
  unit?: string;
  time: string;
  features: { icon: any; text: string }[];
  highlight: boolean;
}

export const packages: Package[] = [
  {
    type: "01",
    name: "Premium Brand Identity",
    sub: "Make them remember you forever.",
    price: "$799",
    unit: "project",
    time: "1–2 weeks",
    features: [
      { icon: Palette, text: "Logo Design (3 concepts)" },
      { icon: FileText, text: "Brand Guidelines PDF" },
      { icon: Palette, text: "Color & Typography System" },
      { icon: Layout, text: "Business Card + Letterhead" },
      { icon: Type, text: "Source Files (AI, SVG, PNG)" },
    ],
    highlight: false,
  },
  {
    type: "02",
    name: "SaaS UI/UX Design",
    sub: "Interfaces that convert and retain.",
    price: "$1,999",
    unit: "project",
    time: "2–4 weeks",
    features: [
      { icon: Search, text: "Full Product UX Audit" },
      { icon: Layout, text: "Figma Design System" },
      { icon: Monitor, text: "Up to 20 Screen Designs" },
      { icon: Zap, text: "Interactive Prototype" },
      { icon: Layout, text: "Developer Handoff" },
    ],
    highlight: false,
  },
  {
    type: "03",
    name: "High-Performance Web Dev",
    sub: "Cinematic Next.js sites that rank.",
    price: "$2,999",
    unit: "project",
    time: "3–6 weeks",
    features: [
      { icon: Monitor, text: "Next.js 16 App Router" },
      { icon: Sparkles, text: "GSAP + Framer Motion" },
      { icon: Search, text: "SEO Optimized (Vitals)" },
      { icon: Layout, text: "Custom 3D / WebGL Effects" },
      { icon: MessageSquare, text: "3 Months Post-Launch Support" },
    ],
    highlight: true,
  },
  {
    type: "04",
    name: "AI Automation Agency",
    sub: "Scale your revenue while you sleep.",
    price: "$1,499",
    unit: "month",
    time: "Ongoing",
    features: [
      { icon: Layers, text: "n8n / Zapier / Make Workflows" },
      { icon: Zap, text: "AI Agent Design & Deployment" },
      { icon: Search, text: "CRM & Sales Automation" },
      { icon: MessageSquare, text: "GPT-4 / Claude Integration" },
      { icon: BarChart, text: "Monthly Optimization Calls" },
    ],
    highlight: false,
  },
];

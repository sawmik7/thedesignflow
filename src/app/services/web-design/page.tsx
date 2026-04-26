import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Monitor, Zap, Sparkles, Layout, FileText, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Premium Web Design & Development Services | thedesignflow",
  description: "Expert web design services using Next.js, GSAP animations, and modern frontend architecture. We build cinematic, high-performance websites that convert visitors into customers. Starting at $6,500.",
  keywords: "web design agency, Next.js developer, GSAP animation web design, premium web design, high-performance website, responsive web design, web development services",
  openGraph: {
    title: "Premium Web Design & Development Services | thedesignflow",
    description: "Cinematic web experiences with buttery-smooth animations built on Next.js.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Premium Web Design & Development",
  provider: {
    "@type": "Organization",
    name: "thedesignflow",
    url: "https://thedesignflow.com",
  },
  description: "Expert web design and development services using Next.js, GSAP, and modern frontend technologies.",
  areaServed: "Worldwide",
  serviceType: "Web Design & Development",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long does a custom web design project take?",
      acceptedAnswer: { "@type": "Answer", text: "A typical custom web design project takes 4-6 weeks from kickoff to launch. This includes discovery, wireframing, design, development, and testing phases. Complex projects with extensive animations or custom functionality may take 8-10 weeks." },
    },
    {
      "@type": "Question",
      name: "What technologies do you use for web development?",
      acceptedAnswer: { "@type": "Answer", text: "We primarily use Next.js 15 with React 19, TypeScript, Tailwind CSS 4, and GSAP for cinematic animations. For hosting, we deploy on Vercel or Netlify for optimal performance and global CDN coverage." },
    },
    {
      "@type": "Question",
      name: "How much does a custom website cost?",
      acceptedAnswer: { "@type": "Answer", text: "Our web design packages start at $6,500 for a high-end marketing website. This includes UI/UX design, GSAP motion design, Next.js development, technical SEO setup, and performance optimization. Enterprise and SaaS projects are quoted individually." },
    },
    {
      "@type": "Question",
      name: "Do you provide SEO optimization with web design?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, every website we build includes technical SEO fundamentals: semantic HTML5, structured data (JSON-LD), meta tags, Open Graph, sitemap generation, Core Web Vitals optimization, and mobile-first responsive design." },
    },
  ],
};

export default function WebDesignServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-5xl">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Service</span>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            Premium Web<br />Design &amp; Development
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            We build cinematic, high-performance websites using Next.js and GSAP that don&apos;t just look stunning — they convert. Every pixel is intentional. Every animation is buttery smooth.
          </p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">What We Deliver</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Layout size={28} />, title: "Custom UI/UX Design", desc: "Pixel-perfect interfaces designed in Figma with complete responsive breakpoints and interaction specifications." },
              { icon: <Sparkles size={28} />, title: "GSAP Motion Design", desc: "Cinematic scroll animations, page transitions, and micro-interactions that make your site feel alive and premium." },
              { icon: <Monitor size={28} />, title: "Next.js Development", desc: "Server-rendered React applications with TypeScript, optimized for Core Web Vitals and search engine performance." },
              { icon: <Zap size={28} />, title: "Performance Tuning", desc: "Lighthouse 95+ scores guaranteed. Image optimization, code splitting, lazy loading, and CDN deployment." },
              { icon: <FileText size={28} />, title: "Technical SEO", desc: "Structured data, semantic HTML, meta tags, Open Graph, sitemap, robots.txt, and Core Web Vitals optimization." },
              { icon: <Globe size={28} />, title: "Global Deployment", desc: "Deploy on Vercel or Netlify with global CDN, automatic SSL, preview environments, and CI/CD pipelines." },
            ].map((item) => (
              <div key={item.title} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[var(--brand-orange)]/30 transition-colors">
                <div className="text-[var(--brand-orange)] mb-4">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">Our Process</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Discovery & Strategy", desc: "We dive deep into your business goals, target audience, and competitive landscape. This phase produces a detailed project brief, sitemap, and content strategy." },
              { step: "02", title: "Wireframing & UX", desc: "Low-fidelity wireframes map the user journey and information architecture. We validate with stakeholders before moving to high-fidelity design." },
              { step: "03", title: "Visual Design & Motion", desc: "High-fidelity mockups in Figma with complete design system, component library, and GSAP animation specifications for every interaction." },
              { step: "04", title: "Development & QA", desc: "Pixel-perfect implementation in Next.js with TypeScript. Comprehensive cross-browser testing, accessibility audit, and performance optimization." },
              { step: "05", title: "Launch & Support", desc: "Production deployment with monitoring setup, analytics integration, and 30 days of post-launch support for bug fixes and adjustments." },
            ].map((item) => (
              <div key={item.step} className="flex gap-8 items-start">
                <span className="font-display text-5xl font-black text-[var(--brand-orange)]/20 shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (AEO Optimized) */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <details key={i} className="group border-b border-white/10 pb-6">
                <summary className="flex justify-between items-center cursor-pointer font-bold text-lg list-none">
                  {faq.name}
                  <span className="text-[var(--brand-orange)] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-neutral-400 mt-4 leading-relaxed">{faq.acceptedAnswer.text}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Build Something Extraordinary?</h2>
          <p className="text-neutral-400 mb-10">Let&apos;s create a web experience that sets you apart from everyone else in your industry.</p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,77,0,0.3)]">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

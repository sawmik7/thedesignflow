import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, PenTool, Type, FileText, Layout, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Identity & Logo Design Services | thedesignflow",
  description: "Expert brand identity design and logo creation services. We craft minimalist logos, comprehensive visual systems, and brand guidelines that define your market position. Starting at $2,500.",
  keywords: "brand identity designer, logo design service, visual identity system, brand guidelines, minimalist logo design, corporate branding, brand strategy",
  openGraph: {
    title: "Brand Identity & Logo Design Services | thedesignflow",
    description: "Strategic brand architecture that transforms businesses into market icons.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Brand Identity & Logo Design",
  provider: { "@type": "Organization", name: "thedesignflow", url: "https://thedesignflow.com" },
  description: "Complete brand identity design including logo, typography, color system, and comprehensive brand guidelines.",
  areaServed: "Worldwide",
  serviceType: "Brand Identity Design",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What's included in a brand identity package?",
      acceptedAnswer: { "@type": "Answer", text: "Our brand identity packages include: primary logo with responsive variants (horizontal, stacked, icon-only), complete color palette with hex/RGB/CMYK values, typography system with primary and secondary fonts, brand guidelines document (40-60 pages), social media templates, business card and stationery design, and all source files in vector formats (AI, SVG, EPS, PDF)." },
    },
    {
      "@type": "Question",
      name: "How many logo concepts do you present?",
      acceptedAnswer: { "@type": "Answer", text: "We present 3-5 distinct logo concepts in the initial presentation, each backed by strategic rationale. After the client selects a direction, we refine the chosen concept through 3-5 revision rounds until it's perfect. We believe in quality exploration over quantity." },
    },
    {
      "@type": "Question",
      name: "How long does a brand identity project take?",
      acceptedAnswer: { "@type": "Answer", text: "A standard brand identity project takes 3-4 weeks: 1 week for discovery and research, 1 week for concept development, 1 week for refinement and revisions, and 1 week for final production and guidelines creation. Rush timelines are available for an additional fee." },
    },
    {
      "@type": "Question",
      name: "Do you work with startups or only established businesses?",
      acceptedAnswer: { "@type": "Answer", text: "We work with both. About 40% of our clients are pre-launch startups needing founding brand identities, and 60% are established businesses undergoing rebrands. Our process adapts to each context — startups need identity creation, while rebrands require careful evolution that preserves existing equity." },
    },
  ],
};

export default function BrandingServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-5xl">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Service</span>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            Brand Identity<br />&amp; Logo Design
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            We don&apos;t just design logos — we engineer trust. Every brand we build is a strategic weapon crafted to dominate your market and transform your business into an undeniable icon.
          </p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">What We Deliver</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <PenTool size={28} />, title: "Logo & Brand Mark", desc: "Primary logo with responsive variants — horizontal, stacked, icon-only, and monochrome versions for every context." },
              { icon: <Palette size={28} />, title: "Color System", desc: "Strategic color palette with primary, secondary, and accent colors. Full specifications in HEX, RGB, CMYK, and Pantone." },
              { icon: <Type size={28} />, title: "Typography Architecture", desc: "Custom font pairings with hierarchy rules, sizing scales, and usage guidelines for both digital and print." },
              { icon: <FileText size={28} />, title: "Brand Guidelines", desc: "Comprehensive 40-60 page document covering logo usage, spacing rules, do/don'ts, tone of voice, and application examples." },
              { icon: <Layout size={28} />, title: "Social Templates", desc: "Ready-to-use social media templates for Instagram, LinkedIn, Twitter, and Facebook in Figma and Canva formats." },
              { icon: <Eye size={28} />, title: "Brand Strategy", desc: "Positioning statement, brand personality definition, competitor analysis, and target audience personas." },
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

      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">Our Process</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Discovery & Brand Audit", desc: "Deep dive into your business, competitors, and target market. We map the visual landscape to identify whitespace opportunities for differentiation." },
              { step: "02", title: "Strategic Direction", desc: "We present 2-3 distinct brand territories with mood boards, each backed by strategic rationale. You choose the direction that resonates." },
              { step: "03", title: "Design Exploration", desc: "3-5 unique logo concepts developed with full color treatment, typography pairing, and mockup applications." },
              { step: "04", title: "Refinement & Production", desc: "Selected concept refined through 3-5 revision rounds. Final production of all assets, guidelines document, and file delivery." },
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

      <section className="py-20 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Build an Iconic Brand?</h2>
          <p className="text-neutral-400 mb-10">Let&apos;s craft a visual identity that makes your competition irrelevant.</p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,77,0,0.3)]">
            Start Your Brand <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

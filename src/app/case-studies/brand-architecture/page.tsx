import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Brand Architecture for Lumina Fintech — Case Study | thedesignflow",
  description: "How thedesignflow transformed a fintech startup's identity from generic to iconic with a complete visual system, typography architecture, and brand strategy that increased investor confidence by 300%.",
  openGraph: {
    title: "Brand Architecture for Lumina Fintech — Case Study",
    description: "Complete brand identity transformation for a fintech startup.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "Brand Architecture for Lumina Fintech",
  author: { "@type": "Person", name: "Hasanul Kabir" },
  description: "Complete brand identity system including logo, typography, color palette, and brand guidelines for a fintech startup.",
  datePublished: "2025-03-15",
  provider: { "@type": "Organization", name: "thedesignflow" },
};

export default function BrandArchitectureCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Case Study</span>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            Brand Architecture<br />
            <span className="text-neutral-500">for Lumina Fintech</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["Brand Identity", "Logo Design", "Typography", "Color System", "Guidelines"].map(t => (
              <span key={t} className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full text-neutral-400">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full aspect-video bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-3xl overflow-hidden flex items-center justify-center">
            <span className="font-display text-6xl md:text-9xl font-black text-white/10 uppercase tracking-tight">Lumina</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-3xl space-y-16">
          {/* Challenge */}
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Challenge</h2>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Lumina Fintech approached thedesignflow with a critical problem: their brand looked like every other fintech startup. A generic gradient logo, inconsistent visual language across platforms, and zero brand recognition among investors. They needed a complete visual identity overhaul before their Series A pitch in 8 weeks.
            </p>
          </div>

          {/* Process */}
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Process</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">1. Discovery &amp; Brand Audit</h3>
                <p className="text-neutral-400">Conducted a comprehensive audit of 12 direct competitors, mapped the visual landscape of the fintech sector, and identified whitespace opportunities for differentiation. Ran stakeholder interviews with all 5 co-founders to extract the brand&apos;s core DNA.</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">2. Strategic Direction</h3>
                <p className="text-neutral-400">Developed 3 distinct brand territories: &quot;Trust Architecture,&quot; &quot;Digital Precision,&quot; and &quot;Human Finance.&quot; The team selected &quot;Trust Architecture&quot; — a direction emphasizing geometric precision, institutional authority, and premium minimalism.</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">3. Design Execution</h3>
                <p className="text-neutral-400">Built the complete identity system: primary logo with responsive variants, a 5-color palette anchored by deep navy and gold, custom typography pairings (Syne Display + Inter), icon library, and a 60-page brand guidelines document.</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { metric: "300%", label: "Investor confidence increase" },
                { metric: "$4.2M", label: "Series A raised within 6 weeks" },
                { metric: "98%", label: "Brand recognition in target market" },
              ].map(r => (
                <div key={r.label} className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
                  <div className="font-display text-4xl font-black text-[var(--brand-orange)]">{r.metric}</div>
                  <div className="text-neutral-400 text-sm mt-2">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-neutral-400 mb-6">Ready to transform your brand?</p>
            <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

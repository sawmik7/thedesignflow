import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SaaS Dashboard UI/UX for Flow Analytics — Case Study | thedesignflow",
  description: "How thedesignflow designed a data-dense SaaS dashboard that reduced user onboarding time by 60% and increased daily active usage by 150% for Flow Analytics.",
  openGraph: {
    title: "SaaS Dashboard UI/UX for Flow Analytics — Case Study",
    description: "Complete SaaS product design and dashboard engineering for an analytics platform.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "SaaS Dashboard UI/UX for Flow Analytics",
  author: { "@type": "Person", name: "Hasanul Kabir" },
  description: "End-to-end SaaS dashboard design including user research, wireframing, high-fidelity UI, design system, and development handoff.",
  datePublished: "2025-06-20",
  provider: { "@type": "Organization", name: "thedesignflow" },
};

export default function SaasDashboardCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Case Study</span>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            SaaS Dashboard<br />
            <span className="text-neutral-500">for Flow Analytics</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["UI/UX Design", "Design System", "Data Viz", "Responsive", "Dark Mode"].map(t => (
              <span key={t} className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full text-neutral-400">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full aspect-video bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] rounded-3xl overflow-hidden flex items-center justify-center">
            <span className="font-display text-6xl md:text-9xl font-black text-white/10 uppercase tracking-tight">Flow</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-3xl space-y-16">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Challenge</h2>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Flow Analytics had powerful backend data processing, but their dashboard was a nightmare. Users were drowning in raw data tables with zero visual hierarchy. Average onboarding time was 45 minutes, and their churn rate was 40% within the first month. They needed a dashboard that could present complex analytics in an intuitive, beautiful interface.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Process</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">1. User Research &amp; Pain Mapping</h3>
                <p className="text-neutral-400">Interviewed 20 power users and 15 churned users. Identified 3 critical pain points: information overload, unclear navigation hierarchy, and missing real-time data visualization.</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">2. Information Architecture</h3>
                <p className="text-neutral-400">Restructured the entire navigation into 4 core modules: Overview, Deep Dive, Alerts, and Reports. Created progressive disclosure patterns so new users see simplified views that expand as they gain proficiency.</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">3. Design System &amp; Implementation</h3>
                <p className="text-neutral-400">Built a comprehensive 120-component design system with dark/light modes, custom chart library, responsive breakpoints, and accessibility (WCAG AA). Delivered pixel-perfect Figma files with complete developer annotations.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { metric: "60%", label: "Reduction in onboarding time" },
                { metric: "150%", label: "Increase in daily active users" },
                { metric: "12%", label: "Churn rate (down from 40%)" },
              ].map(r => (
                <div key={r.label} className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
                  <div className="font-display text-4xl font-black text-[var(--brand-orange)]">{r.metric}</div>
                  <div className="text-neutral-400 text-sm mt-2">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-neutral-400 mb-6">Need a dashboard that users actually love?</p>
            <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

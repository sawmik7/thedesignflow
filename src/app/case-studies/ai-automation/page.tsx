import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation Workflow for Apex Performance — Case Study | thedesignflow",
  description: "How thedesignflow built an autonomous AI agent ecosystem using n8n, OpenAI, and custom workflows that saved Apex Performance 120+ hours per month and generated $50K in recovered revenue.",
  openGraph: {
    title: "AI Automation Workflow for Apex Performance — Case Study",
    description: "Custom AI agent deployment and workflow automation for a performance marketing agency.",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "AI Automation Workflow for Apex Performance",
  author: { "@type": "Person", name: "Hasanul Kabir" },
  description: "End-to-end AI agent development including n8n workflow design, OpenAI fine-tuning, chatbot deployment, and autonomous reporting systems.",
  datePublished: "2025-09-10",
  provider: { "@type": "Organization", name: "thedesignflow" },
};

export default function AIAutomationCaseStudy() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Case Study</span>
          <h1 className="font-display text-4xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            AI Automation<br />
            <span className="text-neutral-500">for Apex Performance</span>
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {["AI Agents", "n8n Workflows", "OpenAI", "Chatbots", "Automation"].map(t => (
              <span key={t} className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full text-neutral-400">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 mb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="w-full aspect-video bg-gradient-to-br from-[#1a0a2e] via-[#2d1b69] to-[#5b21b6] rounded-3xl overflow-hidden flex items-center justify-center">
            <span className="font-display text-6xl md:text-9xl font-black text-white/10 uppercase tracking-tight">Apex</span>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-3xl space-y-16">
          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Challenge</h2>
            <p className="text-neutral-300 text-lg leading-relaxed">
              Apex Performance, a high-growth digital marketing agency, was losing 120+ hours per month on manual client reporting, lead qualification, and repetitive email sequences. Their team of 8 was spending 40% of their time on tasks that could be automated. They needed an AI-powered operational backbone that would free their team to focus on strategy and creative work.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Process</h2>
            <div className="space-y-8">
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">1. Workflow Audit &amp; Opportunity Mapping</h3>
                <p className="text-neutral-400">Mapped every operational process across 6 departments. Identified 23 automation opportunities ranked by impact/effort ratio. Prioritized the top 8 workflows for Phase 1 deployment.</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">2. AI Agent Architecture</h3>
                <p className="text-neutral-400">Designed a multi-agent system using n8n as the orchestration layer. Built 4 specialized AI agents: LeadQualifier (GPT-4 fine-tuned on 3,000 past leads), ReportWriter (automated weekly client reports), InboxManager (email triage and auto-response), and ContentScheduler (social media automation).</p>
              </div>
              <div className="border-l-2 border-[var(--brand-orange)] pl-6">
                <h3 className="font-bold text-lg mb-2">3. Deployment &amp; Training</h3>
                <p className="text-neutral-400">Deployed all agents with human-in-the-loop safeguards. Built a custom monitoring dashboard showing agent activity, accuracy metrics, and escalation triggers. Trained the entire team over 2 weeks with hands-on workshops.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl md:text-4xl font-bold mb-6 text-[var(--brand-orange)]">The Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { metric: "120h", label: "Hours saved per month" },
                { metric: "$50K", label: "Recovered revenue (quarterly)" },
                { metric: "94%", label: "AI agent accuracy rate" },
              ].map(r => (
                <div key={r.label} className="bg-white/5 rounded-2xl p-6 text-center border border-white/5">
                  <div className="font-display text-4xl font-black text-[var(--brand-orange)]">{r.metric}</div>
                  <div className="text-neutral-400 text-sm mt-2">{r.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-neutral-400 mb-6">Ready to automate your operations?</p>
            <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

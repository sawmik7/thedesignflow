import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Zap, Workflow, MessageSquare, BarChart3, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Automation & Agent Development Services | thedesignflow",
  description: "Custom AI automation services including AI chatbots, n8n workflow automation, OpenAI integrations, and autonomous agent development. Save 100+ hours/month with intelligent automation. Starting at $9,500.",
  keywords: "AI automation agency, custom AI agents, n8n workflow automation, OpenAI integration, AI chatbot development, business process automation, autonomous workflows",
  openGraph: {
    title: "AI Automation & Agent Development Services | thedesignflow",
    description: "Build autonomous AI systems that scale your operations and save 100+ hours monthly.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Automation & Agent Development",
  provider: { "@type": "Organization", name: "thedesignflow", url: "https://thedesignflow.com" },
  description: "Custom AI agent development, workflow automation, and intelligent chatbot deployment for businesses.",
  areaServed: "Worldwide",
  serviceType: "AI Automation & Development",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What types of AI automation do you build?",
      acceptedAnswer: { "@type": "Answer", text: "We build four main categories: (1) AI Chatbots using GPT-4/Claude for customer support and lead qualification, (2) Workflow Automations using n8n/Zapier for repetitive business processes, (3) Custom AI Agents for specialized tasks like content generation, data analysis, and reporting, and (4) Full Autonomous Systems that combine multiple agents with human-in-the-loop safeguards." },
    },
    {
      "@type": "Question",
      name: "How much can AI automation save my business?",
      acceptedAnswer: { "@type": "Answer", text: "On average, our clients save 80-150 hours per month in manual work, which translates to $15,000-$40,000 in labor cost savings annually. ROI is typically achieved within the first 2-3 months. We provide detailed ROI projections during the discovery phase." },
    },
    {
      "@type": "Question",
      name: "What platforms and tools do you work with?",
      acceptedAnswer: { "@type": "Answer", text: "Our core stack includes: n8n (primary orchestration), OpenAI GPT-4 and Claude (LLM providers), Pinecone/Weaviate (vector databases), Supabase (data persistence), and custom Node.js/Python services. We integrate with 200+ business tools including Slack, HubSpot, Salesforce, Gmail, Google Sheets, and more." },
    },
    {
      "@type": "Question",
      name: "Is AI automation safe for my business data?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. We implement enterprise-grade security: all data is encrypted in transit and at rest, we use private API endpoints, human-in-the-loop approval for critical actions, comprehensive audit logging, and GDPR/SOC2-compliant data handling. No training data ever leaves your organization's control." },
    },
  ],
};

export default function AIAutomationServicePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="py-24 md:py-40 px-6">
        <div className="container mx-auto max-w-5xl">
          <span className="text-[var(--brand-orange)] text-xs font-bold uppercase tracking-[0.3em] mb-6 block">Service</span>
          <h1 className="font-display text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9] mb-8">
            AI Automation<br />&amp; Agent Development
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
            We build autonomous AI systems that handle your repetitive work, qualify your leads, generate your reports, and scale your operations — while you focus on strategy and growth.
          </p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
            Get a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-white/5">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">What We Build</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Bot size={28} />, title: "Custom AI Agents", desc: "Specialized agents fine-tuned on your data for lead qualification, content creation, customer support, and internal operations." },
              { icon: <Workflow size={28} />, title: "n8n Workflow Automation", desc: "Visual workflow automation connecting 200+ tools. Automate repetitive processes, data syncing, reporting, and multi-step business logic." },
              { icon: <MessageSquare size={28} />, title: "AI Chatbots", desc: "Intelligent conversational agents powered by GPT-4 or Claude. Customer support, appointment booking, lead capture, and onboarding flows." },
              { icon: <BarChart3 size={28} />, title: "Automated Reporting", desc: "AI-generated weekly/monthly reports with data analysis, trend identification, and actionable recommendations delivered to your inbox." },
              { icon: <Zap size={28} />, title: "Process Automation", desc: "End-to-end automation of email sequences, invoice processing, data entry, social media scheduling, and document generation." },
              { icon: <Shield size={28} />, title: "Human-in-the-Loop", desc: "Enterprise safeguards with approval workflows, confidence thresholds, escalation triggers, and comprehensive audit logging." },
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
              { step: "01", title: "Operational Audit", desc: "We map every process across your organization, identify automation opportunities, and rank them by impact-to-effort ratio. You get a detailed automation roadmap." },
              { step: "02", title: "Agent Architecture", desc: "Design the AI agent ecosystem: which models to use, data flow architecture, integration points, security boundaries, and human oversight mechanisms." },
              { step: "03", title: "Build & Fine-Tune", desc: "Develop and train agents on your specific data and business context. Iterative testing with real scenarios until accuracy exceeds 90%." },
              { step: "04", title: "Deploy & Monitor", desc: "Production deployment with monitoring dashboards, performance metrics, error handling, and 60 days of post-launch optimization support." },
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
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Ready to Automate Your Business?</h2>
          <p className="text-neutral-400 mb-10">Let&apos;s build an AI workforce that never sleeps, never makes excuses, and scales infinitely.</p>
          <Link href="/#contact-form" className="inline-flex items-center gap-3 px-10 py-5 bg-[var(--brand-orange)] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,77,0,0.3)]">
            Start Automating <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

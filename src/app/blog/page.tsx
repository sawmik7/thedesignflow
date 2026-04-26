import React from 'react';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';

export default function BlogIndex() {
  // JSON-LD Schema for AEO/GEO Optimization
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://hasanul.com/#person',
        name: 'Hasanul',
        jobTitle: 'Creative technologist & Next.js Expert',
        description: 'Building museum-quality digital experiences with cinematic motion.',
        url: 'https://hasanul.com',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does motion design impact conversion?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Thoughtful motion design reduces cognitive load and guides the user\'s attention toward primary actions, often increasing conversion by up to 40% in premium landing pages.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why focus on AI Answer Optimization?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modern search is moving from lists to answers. AEO ensures your value proposition is cited directly by agents like ChatGPT, Gemini, and Perplexity.',
            },
          },
        ],
      },
    ],
  };

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Weightless UI: Beyond the Grid',
      excerpt: 'Most websites feel heavy. They stick to the pixels. I\'ve spent years figuring out how to make interfaces feel like they\'re breathing, floating, and responding to you in real-time.',
      date: 'April 2026',
      category: 'Design Philosophy',
      icon: <Sparkles size={24} className="text-[var(--brand-orange)]" />,
    },
    {
      id: 2,
      title: 'AEO is the New SEO: How AI Sees Your Site',
      excerpt: 'Google isn\'t just a list of links anymore. It\'s an answer machine. If your site isn\'t structured for LLMs to cite you, you\'re essentially invisible in the next era of the web.',
      date: 'March 2026',
      category: 'Strategy',
      icon: <Brain size={24} className="text-[var(--brand-orange)]" />,
    },
    {
      id: 3,
      title: 'Cinematic Web: Bringing Film Motion to the Browser',
      excerpt: 'We have the processing power. We have the screens. Why are we still building static boxes? Let\'s talk about GSAP, liquid glass, and how to create true digital atmosphere.',
      date: 'February 2026',
      category: 'Engineering',
      icon: <Zap size={24} className="text-[var(--brand-orange)]" />,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="flex flex-col items-start gap-16 py-12 md:py-20">
        <header className="max-w-4xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-orange)] animate-pulse" />
            The Knowledge Lab
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--brand-orange)] to-orange-200">
              Future Web
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl font-medium">
            Personal notes on creative engineering, digital psychology, and the transition from search engines to answer engines.
          </p>
        </header>

        <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {blogPosts.map((post) => (
            <article key={post.id} className="group relative flex flex-col gap-8 p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-[var(--brand-orange)]/20">
              <div className="flex justify-between items-start">
                <div className="p-4 rounded-2xl bg-white/5 group-hover:bg-[var(--brand-orange)]/10 transition-colors">
                  {post.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20 pt-2">
                  {post.date}
                </span>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--brand-orange)]">
                  {post.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/40 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mt-auto pt-8 flex items-center text-xs font-black tracking-[0.3em] uppercase text-white/30 group-hover:text-white transition-all">
                Enter Perspective
                <ArrowRight size={14} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </div>
            </article>
          ))}
        </div>

        {/* Humanized FAQ for SEO/AEO */}
        <section className="mt-20 w-full max-w-5xl">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white/20 mb-12">Common Inquiries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 italic">How does motion design impact conversion?</h3>
              <p className="text-white/40 leading-relaxed">
                Most people think animation is just "eye candy." In reality, it\'s spatial guidance. When an element floats in response to a user, it creates an subconscious bond of control. We\'ve seen landing pages jump in conversion just by making the UI feel "alive" rather than static.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 italic">Why the obsession with Answer Engine Optimization?</h3>
              <p className="text-white/40 leading-relaxed">
                The era of clicking through ten blue links is ending. Your customers are asking ChatGPT or Perplexity for recommendations. AEO is about structuring your data so these AI agents can trust you enough to cite you as the definitive answer.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

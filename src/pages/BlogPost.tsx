import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { posts } from "@/data/posts";
import SEO from "@/components/seo/SEO";
import { pushGTMEvent } from "@/hooks/useGTM";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  let formattedDate = "2026-05-12";
  try {
    formattedDate = new Date(post.date).toISOString().split('T')[0];
  } catch (e) {
    // Keep default fallback
  }

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://thedesignflow.website/blog/${post.slug}/#post`,
    "url": `https://thedesignflow.website/blog/${post.slug}`,
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "inLanguage": "en-US",
    "wordCount": 800,
    "keywords": post.category,
    "datePublished": formattedDate,
    "dateModified": formattedDate,
    "author": {
      "@type": "Person",
      "name": "Hasanul",
      "jobTitle": "Founder & Lead Designer",
      "url": "https://thedesignflow.website/studio",
      "sameAs": "https://www.fiverr.com/thedesignflow"
    },
    "publisher": {
      "@id": "https://thedesignflow.website/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://thedesignflow.website/blog/${post.slug}`
    },
    "isPartOf": {
      "@type": "Blog",
      "name": "The Design Flow — Insights Blog",
      "url": "https://thedesignflow.website/blog"
    }
  };

  // Fire GTM event when article is opened
  useEffect(() => {
    pushGTMEvent('article_read', {
      article_title: post.title,
      article_category: post.category,
      article_slug: post.slug,
    });
  }, [post.slug]);

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.category}
        path={`/blog/${post.slug}`}
        ogImage={post.image}
        ogType="article"
        schema={blogPostSchema}
        author="Hasanul"
        publishedTime={formattedDate}
        articleTags={[post.category, "Design", "The Design Flow"]}
        breadcrumbs={[
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <Navigation />

      <article className="pt-40 pb-32">
        <header className="px-6 md:px-12 max-w-4xl mx-auto text-center mb-16">
          <Link 
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12"
          >
            ← Back to Blog
          </Link>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="bg-accent/10 text-accent border border-accent/20 px-4 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest">
              {post.category}
            </span>
            <span className="font-mono text-[10px] text-white/30 uppercase">{post.date}</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase font-black tracking-tighter leading-[0.9] mb-8">
            {post.title}
          </h1>
          <p className="text-xl text-white/50 italic leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="relative w-full h-[50vh] md:h-[70vh] mb-20 px-6 md:px-12">
          <div className="relative w-full h-full max-w-7xl mx-auto rounded-[2rem] overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        <div className="px-6 md:px-12 max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <p>
              In the rapidly evolving landscape of digital products, the year 2025 marks a definitive turning point. We are no longer just designing interfaces; we are designing experiences that are fundamentally powered by intelligence.
            </p>
            <h3>The Shift to Intent-Based Design</h3>
            <p>
              Traditional SaaS layouts are cluttered with dashboards, sidebars, and endless menus. The future is leaning towards "Intent-Based Design" where the UI morphs based on what the user is trying to achieve in that specific moment.
            </p>
            <blockquote>
              "Design is not just what it looks like and feels like. Design is how it works." — This has never been truer than in the age of AI.
            </blockquote>
            <p>
              At The Design Flow, we've already started implementing these patterns for our SaaS clients, resulting in significant increases in user retention and satisfaction.
            </p>
            <h3>Conclusion</h3>
            <p>
              The product of tomorrow is one that anticipates needs, simplifies complexity, and speaks the language of the user. If you're building in this space, now is the time to rethink your UX strategy.
            </p>
          </div>
          
          <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=200"
                  alt="Hasanul"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="block font-display text-sm uppercase">Hasanul</span>
                <span className="block font-mono text-[9px] text-white/30 uppercase">Founder & Lead Designer</span>
              </div>
            </div>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Share"].map(s => (
                <button key={s} className="font-mono text-[10px] uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <section className="py-32 bg-white/5 px-6 md:px-12 border-y border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl uppercase font-black tracking-tighter mb-8 leading-none">
            Have a project in mind? <br /><span className="text-white/20">Let's talk.</span>
          </h2>
          <Link 
            to="/contact"
            className="inline-block bg-accent text-[#0a0a0a] px-10 py-5 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white transition-all"
          >
            Start a Project →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

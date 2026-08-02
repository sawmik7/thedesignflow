import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { posts } from "@/data/posts";
import SEO from "@/components/seo/SEO";

export default function BlogIndex() {
  const blogIndexSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://thedesignflow.website/blog/#webpage",
    "url": "https://thedesignflow.website/blog",
    "name": "Insights Blog | The Design Flow",
    "description": "Read the latest insights on SaaS UI/UX design, AI automation, and startup branding from The Design Flow.",
    "publisher": {
      "@id": "https://thedesignflow.website/#organization"
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Blog - Insights on Design & Automation"
        description="Read the latest insights on SaaS UI/UX design, AI automation, and startup branding from The Design Flow."
        path="/blog"
        schema={blogIndexSchema}
      />
      <Navigation />

      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">— Insights</span>
          <h1 className="font-display text-[12vw] md:text-[6vw] leading-none uppercase tracking-[-0.04em]">
            Studio Blog
          </h1>
        </motion.div>
      </section>

      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 bg-[#0a0a0a] border border-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest text-white/80">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <span className="font-mono text-[10px] text-white/30 uppercase mb-3 block">{post.date}</span>
                <h2 className="font-display text-2xl uppercase mb-4 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-accent font-mono text-[10px] uppercase tracking-widest">
                  Read Article <span>↗</span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

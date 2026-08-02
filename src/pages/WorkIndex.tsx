import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { projects } from "@/data/projects";
import { slugify } from "@/utils/slugify";
import SEO from "@/components/seo/SEO";

const PLACEHOLDER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1400";

export default function WorkIndex() {
  const workIndexSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://thedesignflow.website/work/#webpage",
    "url": "https://thedesignflow.website/work",
    "name": "Selected Case Studies & Design Portfolio",
    "description": "Explore our portfolio of brand identity design, SaaS UI/UX design, and AI automation systems delivered to high-growth startups.",
    "publisher": {
      "@id": "https://thedesignflow.website/#organization"
    }
  };

  return (
    <main className="min-h-screen bg-[#050505]">
      <SEO 
        title="Portfolio - Selected Design & AI Work"
        description="Explore our portfolio of brand identity design, SaaS UI/UX design, and AI automation systems delivered to high-growth startups."
        path="/work"
        schema={workIndexSchema}
      />
      <Navigation />
      
      {/* Header */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-4">— Portfolio</span>
          <h1 className="font-display text-[12vw] md:text-[6vw] leading-none uppercase tracking-[-0.04em] text-white">
            Selected Work
          </h1>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="group relative"
            >
              <Link to={`/work/${project.id}-${slugify(project.title)}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0D0D0D] rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full font-mono text-[9px] tracking-widest uppercase text-white/80">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-6 border-b border-white/5 pb-6">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl text-white uppercase tracking-[-0.02em] group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-2">
                      {project.tags.slice(0, 2).join(" · ")}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-2xl text-white/20 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">↗</span>
                    <span className="font-mono text-[10px] text-white/20 mt-1">{project.year}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

import React, { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { projects } from "@/data/projects";
import { slugify } from "@/utils/slugify";
import SEO from "@/components/seo/SEO";
import { pushGTMEvent } from "@/hooks/useGTM";

const clients = [
  { name: "Streaming", logo: "/images/clients/streaming.svg" },
  { name: "Beazy", logo: "/images/clients/beazy.svg" },
  { name: "Ai4Testers", logo: "/images/clients/ai4testers.svg" },
  { name: "Nexus Hotel", logo: "/images/clients/nexushotel.svg" },
  { name: "Kompress", logo: "/images/clients/kompress.png" },
  { name: "GymFlow", logo: "/images/clients/gymflow.png" },
  { name: "Diary Entry", logo: "/images/clients/diaryentry.png" },
  { name: "Masterly", logo: "/images/clients/masterly.svg" },
];

export default function WorkPost() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/work" replace />;

  const id = slug.split("-")[0];
  const project = (projects as any[]).find((p) => p.id === id);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const nextSlug = `${nextProject.id}-${slugify(nextProject.title)}`;

  const workPostSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://thedesignflow.website/work/${slug}/#work`,
    "url": `https://thedesignflow.website/work/${slug}`,
    "name": project.title,
    "description": project.description,
    "image": project.image,
    "genre": project.category,
    "keywords": project.tags?.join(", "),
    "about": {
      "@type": "Service",
      "name": project.category,
      "provider": {
        "@id": "https://thedesignflow.website/#organization"
      }
    },
    "dateCreated": project.year,
    "creator": {
      "@id": "https://thedesignflow.website/#organization"
    },
    "publisher": {
      "@id": "https://thedesignflow.website/#organization"
    }
  };

  // Fire GTM event when portfolio project is viewed
  useEffect(() => {
    pushGTMEvent('portfolio_view', {
      project_name: project.title,
      project_category: project.category,
      project_slug: slug,
    });
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <SEO 
        title={`${project.title} - ${project.category}`}
        description={`${project.description} Outcome: ${project.outcome}`}
        keywords={project.tags?.join(", ")}
        path={`/work/${slug}`}
        ogImage={project.image}
        schema={workPostSchema}
        breadcrumbs={[
          { name: "Work", url: "/work" },
          { name: project.title, url: `/work/${slug}` },
        ]}
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[90vh] flex flex-col justify-end px-6 md:px-12 pb-20">
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link 
            to="/work"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors mb-12"
          >
            ← All Work
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent block mb-4">
                {project.category}
              </span>
              <h1 className="font-display text-[10vw] md:text-[7vw] leading-none uppercase tracking-[-0.04em]">
                {project.title}
              </h1>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl flex items-center gap-8">
              <div className="text-center">
                <span className="block font-mono text-[10px] text-white/30 uppercase mb-1">Year</span>
                <span className="font-display text-xl">{project.year}</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div className="text-center">
                <span className="block font-mono text-[10px] text-white/30 uppercase mb-1">Role</span>
                <span className="font-display text-xl">Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-7">
            <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-8">— Overview</h2>
            <p className="text-xl md:text-2xl font-light text-white/80 leading-relaxed">
              {project.description}
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-6">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span key={tag} className="border border-white/10 px-3 py-1 rounded-full font-mono text-[10px] uppercase text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-12 md:mt-0 p-8 rounded-2xl bg-white/5 border border-white/10">
              <span className="block font-mono text-[10px] text-accent uppercase mb-4 tracking-widest">The Outcome</span>
              <p className="text-lg font-medium text-white italic">
                "{project.outcome}"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge & Solution */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24">
        <div>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-8">— The Challenge</h2>
          <p className="text-lg text-white/60 leading-relaxed">
            The client approached us with a significant challenge: their existing digital presence was failing to convert high-value leads and didn't reflect the premium nature of their services. We needed to rethink the entire experience from the ground up, focusing on clarity, trust, and cinematic storytelling.
          </p>
        </div>
        <div>
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-8">— The Solution</h2>
          <ul className="space-y-6">
            {[
              "Immersive cinematic visual language built for conversion.",
              "Custom-engineered Next.js architecture with zero-latency motion.",
              "Strategic brand positioning that commands authority in the market."
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4 text-white/80">
                <span className="text-accent mt-1.5">✦</span>
                <span className="text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Visuals Gallery */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-16">— Visuals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery?.map((img: string, i: number) => (
            <div key={i} className={`relative aspect-[16/9] rounded-[2rem] overflow-hidden border border-white/10 group ${i === 0 ? "md:col-span-2 aspect-[21/9]" : ""}`}>
              <img
                src={img}
                alt={`${project.title} Visual ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Icon Branding Showcases Grid - Only for Brand Design Category */}
      {project.category === "Brand Design" && (
        <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-16">— Icon Branding Showcases</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div 
                key={index}
                className="aspect-square bg-white/[0.01] border border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-8 group hover:bg-white hover:border-white/10 transition-all duration-500 cursor-pointer"
              >
                <div className="h-20 w-20 flex items-center justify-center mb-6">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale brightness-[2.0] group-hover:filter-none group-hover:brightness-100 opacity-40 group-hover:opacity-100 transition-all duration-700 select-none pointer-events-none"
                  />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/30 group-hover:text-[#111111] transition-colors">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-32 bg-white/5 px-6 md:px-12 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-16 text-center">— Key Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { val: "38%", lab: "Increase in Retention" },
              { val: "2M+", lab: "Funding Secured" },
              { val: "3.2x", lab: "Avg. Session Length" }
            ].map((result, i) => (
              <div key={i} className="text-center p-12 border border-white/5 rounded-[2rem] bg-black/40">
                <span className="block font-display text-6xl md:text-7xl text-white mb-4">{result.val}</span>
                <span className="block font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">{result.lab}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="py-40 px-6 md:px-12 text-center max-w-7xl mx-auto">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 mb-8 block">Next Project</span>
        <Link to={`/work/${nextSlug}`} className="group">
          <h2 className="font-display text-[8vw] md:text-[5vw] uppercase tracking-[-0.04em] text-white/20 group-hover:text-white transition-all duration-500">
            {nextProject.title}
          </h2>
          <div className="mt-8 flex items-center justify-center gap-4 text-accent group-hover:gap-6 transition-all">
            <span className="font-mono text-xs uppercase tracking-widest">View Case Study</span>
            <span className="text-2xl">↗</span>
          </div>
        </Link>
      </section>

      {/* CTA */}
      <section className="py-32 bg-accent px-6 md:px-12 text-[#0a0a0a] text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl uppercase font-black tracking-tighter leading-none mb-8">
            Ready to build something great?
          </h2>
          <Link 
            to="/contact"
            className="inline-block bg-[#0a0a0a] text-white px-10 py-5 rounded-full font-mono text-sm uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Start a Project →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

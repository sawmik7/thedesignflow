import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Award, Star, Package, Globe } from "lucide-react";
import SEO from "@/components/seo/SEO";

const expertise = [
  "Brand Identity", "SaaS UI/UX", "AI Workflows", "n8n", "Zapier", 
  "GPT-4 Integration", "Webflow", "Figma", "Next.js", "Motion Design", 
  "Design Systems", "Pitch Decks"
];

const credentials = [
  { icon: Award, title: "Level 2 Fiverr Seller", color: "text-accent" },
  { icon: Star, title: "4.9★ Rating — 280+ Reviews", color: "text-accent" },
  { icon: Package, title: "280+ Projects Delivered", color: "text-accent" },
  { icon: Globe, title: "Clients in 30+ Countries", color: "text-accent" }
];

const values = [
  {
    title: "Design with Intent",
    desc: "Every pixel has a purpose. We don't decorate; we communicate.",
    icon: "✏️"
  },
  {
    title: "Speed Without Compromise",
    desc: "Fast delivery doesn't mean cutting corners. It means systems, craft, and experience working together.",
    icon: "⚡"
  },
  {
    title: "Partners, Not Vendors",
    desc: "We embed in your vision and treat every project like it's our own product launch.",
    icon: "🤝"
  }
];

export default function StudioPage() {
  const studioSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://thedesignflow.website/studio/#webpage",
        "url": "https://thedesignflow.website/studio",
        "name": "About Our Design Studio | The Design Flow",
        "description": "Learn about The Design Flow design studio and founder Hasanul. Delivering high-performing brand design, SaaS UX, and AI automation.",
        "breadcrumb": {
          "@id": "https://thedesignflow.website/studio/#breadcrumb"
        }
      },
      {
        "@type": "Person",
        "@id": "https://thedesignflow.website/#founder",
        "name": "Hasanul",
        "jobTitle": "Founder & Lead Designer",
        "image": "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=800",
        "description": "Founder & Lead Designer at The Design Flow with 8+ years of experience in brand design, SaaS UI/UX, AI automation, and web design. Level 2 Fiverr Seller with 4.9★ rating across 280+ projects.",
        "sameAs": [
          "https://www.fiverr.com/thedesignflow"
        ],
        "knowsAbout": [
          "Brand Identity Design",
          "SaaS UI/UX Design",
          "AI Workflow Automation",
          "n8n Automation",
          "Zapier Automation",
          "Figma Design",
          "Webflow Development",
          "Design Systems",
          "Motion Design",
          "Pitch Deck Design",
          "GPT-4 API Integration",
          "Next.js Development"
        ],
        "hasCredential": {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Professional Credential",
          "name": "Fiverr Level 2 Seller",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Fiverr",
            "url": "https://www.fiverr.com/thedesignflow"
          }
        },
        "worksFor": {
          "@id": "https://thedesignflow.website/#organization"
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Studio - Elite Design & AI Automation Studio"
        description="About The Design Flow design studio and founder Hasanul. Specializing in brand identity design, SaaS UI/UX design, and AI automations. Level 2 Fiverr Seller with 4.9★ rating."
        keywords="design studio, brand identity designer, SaaS UX designer, AI automation expert, Hasanul, Fiverr Level 2 Seller"
        path="/studio"
        schema={studioSchema}
        breadcrumbs={[{ name: "Studio", url: "/studio" }]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-6">— The Studio</span>
          <h1 className="font-display text-[10vw] md:text-[6vw] leading-none uppercase tracking-[-0.04em] mb-8">
            We Are The <span className="text-accent italic font-light">Design Flow</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            An elite design & AI automation studio built for founders, startups, and brands who refuse to be ordinary.
          </p>
        </motion.div>
      </section>

      {/* Founder Bio */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-md mx-auto md:ml-0"
          >
            <div className="absolute inset-0 rounded-full border-2 border-accent/20 border-dashed animate-spin-slow" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-[#0a0a0a] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&q=80&w=800"
                alt="Founder"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-6">
              Hasanul <span className="text-white/30">— Founder & Lead</span>
            </h2>
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                With 8+ years in brand design, SaaS UI/UX, AI automation, and web design, I've helped 100+ clients across 30+ countries turn their visions into high-performing digital products.
              </p>
              <p>
                As a Level 2 Seller on Fiverr with a 4.9★ rating and 280+ projects delivered, I've built a reputation for delivering studio-quality work with agency speed.
              </p>
              <p>
                I specialize in the intersection of great design and intelligent automation — helping businesses not just look good, but operate smarter.
              </p>
            </div>
            
            {/* Expertise Pills */}
            <div className="mt-12 flex flex-wrap gap-2">
              {expertise.map((item) => (
                <span key={item} className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest text-white/60">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credentials Grid */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {credentials.map((cred, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-8 rounded-2xl bg-white/[0.03] border border-white/5"
            >
              <cred.icon className={`w-8 h-8 mx-auto mb-4 ${cred.color}`} />
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/80 leading-tight">
                {cred.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 text-center mb-20">— Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-accent transition-all duration-500"
            >
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 origin-left">{value.icon}</div>
              <h3 className="font-display text-2xl uppercase mb-4">{value.title}</h3>
              <p className="text-white/50 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fiverr CTA */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent to-[#E5B800] opacity-90 transition-transform duration-700 group-hover:scale-105" />
          <div className="relative z-10 px-8 py-20 text-center text-[#0a0a0a]">
            <h2 className="font-display text-5xl md:text-7xl uppercase font-black tracking-tighter mb-6">Find us on Fiverr</h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80">
              Browse packages, read reviews, and order directly.
            </p>
            <a 
              href="https://www.fiverr.com/thedesignflow" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#0a0a0a] text-white px-12 py-5 rounded-full font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-[#0a0a0a] transition-all"
            >
              View Fiverr Profile →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

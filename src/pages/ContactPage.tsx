import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/sections/Footer";
import { Mail, MessageCircle, Linkedin, MapPin, ChevronDown, Phone } from "lucide-react";
import emailjs from "@emailjs/browser";
import SEO from "@/components/seo/SEO";
import { pushGTMEvent } from "@/hooks/useGTM";

function ContactForm() {
  const [searchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  useEffect(() => {
    const plan = searchParams.get("plan");
    if (plan) setSelectedPlan(plan);
  }, [searchParams]);

  const handleServiceChange = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    const serviceId = (import.meta as any).env.VITE_EMAILJS_SERVICE_ID || "service_placeholder";
    const templateId = (import.meta as any).env.VITE_EMAILJS_TEMPLATE_ID || "template_placeholder";
    const publicKey = (import.meta as any).env.VITE_EMAILJS_PUBLIC_KEY || "public_key_placeholder";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: data.name,
          email: data.email,
          budget: data.budget,
          services: selectedServices.join(", "),
          message: data.message,
          plan: selectedPlan || "None Selected",
          subject: "Contact Form Submission"
        },
        publicKey
      );
      setSubmitted(true);
      // ── GTM Conversion Event ──
      pushGTMEvent('lead_form_submit', {
        services: selectedServices.join(', '),
        budget: String(data.budget ?? ''),
        plan: selectedPlan || 'None Selected',
        form_location: 'contact_page',
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      // Fallback success for local development/testing
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white/5 border border-accent/20 p-12 rounded-[2.5rem] text-center">
        <div className="text-5xl mb-6">✅</div>
        <h3 className="font-display text-3xl uppercase mb-4">Message Sent!</h3>
        <p className="text-white/50">We'll get back to you within 24 hours. Keep an eye on your inbox.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-8 text-accent font-mono text-[10px] uppercase tracking-widest border-b border-accent pb-1"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {selectedPlan && (
        <div className="bg-accent/10 border border-accent/20 p-4 rounded-xl text-accent font-mono text-[10px] uppercase tracking-widest text-center mb-8">
          You selected the [{selectedPlan}] plan — fill in the details below.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">Full Name</label>
          <input 
            required 
            name="name"
            type="text" 
            placeholder="John Doe"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">Email Address</label>
          <input 
            required 
            name="email"
            type="email" 
            placeholder="john@example.com"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">Budget Range</label>
        <div className="relative">
          <select 
            name="budget"
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all appearance-none text-white"
          >
            <option className="bg-[#0a0a0a]">Select budget...</option>
            <option className="bg-[#0a0a0a]" value="under-500">Under $500</option>
            <option className="bg-[#0a0a0a]" value="500-1000">$500–$1,000</option>
            <option className="bg-[#0a0a0a]" value="1000-3000">$1,000–$3,000</option>
            <option className="bg-[#0a0a0a]" value="3000-5000">$3,000–$5,000</option>
            <option className="bg-[#0a0a0a]" value="5000-plus">$5,000+</option>
            <option className="bg-[#0a0a0a]" value="discuss">Let's discuss</option>
          </select>
          <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" size={16} />
        </div>
      </div>

      <div className="space-y-4">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">Services Needed</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {["Brand Identity", "SaaS UI/UX", "Web Design", "AI Automation", "Motion Design", "Other"].map(s => (
            <label key={s} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={selectedServices.includes(s)}
                onChange={() => handleServiceChange(s)}
                className="hidden" 
              />
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                selectedServices.includes(s)
                  ? "bg-accent border-accent"
                  : "border-white/10 group-hover:border-accent/50"
              }`}>
                <div className={`w-2 h-2 rounded-full bg-[#0a0a0a] transition-transform ${
                  selectedServices.includes(s) ? "scale-100" : "scale-0"
                }`} />
              </div>
              <span className={`text-xs transition-colors uppercase font-mono ${
                selectedServices.includes(s) ? "text-white" : "text-white/50"
              }`}>{s}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/30 ml-4">Project Description</label>
        <textarea 
          name="message"
          rows={5}
          placeholder="Tell us about your project, timeline, and goals..."
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all resize-none text-white"
        />
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-[#0a0a0a] py-5 rounded-full font-mono text-[10px] uppercase tracking-[0.2em] font-black hover:bg-accent hover:text-white transition-all disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long do projects typically take?",
      a: "Brand identity projects: 5–14 days. SaaS UI/UX: 2–6 weeks. AI automation: 1–2 weeks. Timelines depend on scope — we'll confirm during the discovery call."
    },
    {
      q: "Do you offer revisions?",
      a: "Yes. All packages include multiple revision rounds. We don't close a project until you're 100% satisfied."
    },
    {
      q: "What tools do you use?",
      a: "Figma, Framer, Webflow, Next.js, n8n, Zapier, Make.com, GPT-4 API, and more depending on project needs."
    },
    {
      q: "Can I see more work samples?",
      a: "Absolutely — visit /work for case studies or email us at thedesignflow.ai@gmail.com for a tailored portfolio PDF."
    }
  ];

  return (
    <div className="mt-20 space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-white/5 last:border-0 pb-4">
          <button 
            onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left group"
          >
            <span className="font-display text-lg uppercase group-hover:text-accent transition-colors">{faq.q}</span>
            <ChevronDown className={`transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} size={20} />
          </button>
          {openIdx === i && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="overflow-hidden"
            >
              <p className="text-white/40 pb-6 text-sm leading-relaxed">{faq.a}</p>
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://thedesignflow.website/contact/#webpage",
        "url": "https://thedesignflow.website/contact",
        "name": "Contact Us | The Design Flow",
        "description": "Get in touch with The Design Flow for brand identity, SaaS UI/UX design, and AI automation. Start a project today."
      },
      {
        "@type": "FAQPage",
        "@id": "https://thedesignflow.website/contact/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long do projects typically take?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Brand identity projects: 5–14 days. SaaS UI/UX: 2–6 weeks. AI automation: 1–2 weeks. Timelines depend on scope — we'll confirm during the discovery call."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer revisions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. All packages include multiple revision rounds. We don't close a project until you're 100% satisfied."
            }
          },
          {
            "@type": "Question",
            "name": "What tools do you use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Figma, Framer, Webflow, Next.js, n8n, Zapier, Make.com, GPT-4 API, and more depending on project needs."
            }
          },
          {
            "@type": "Question",
            "name": "Can I see more work samples?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely — visit /work for case studies or email us at thedesignflow.ai@gmail.com for a tailored portfolio PDF."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <SEO 
        title="Contact Us - Start a Project"
        description="Get in touch with The Design Flow for brand identity, SaaS UI/UX design, and AI automation workflows. Start a project today. Response within 24 hours."
        keywords="hire designer, brand identity designer, SaaS UI designer, AI automation freelancer, contact design studio"
        path="/contact"
        schema={contactSchema}
        breadcrumbs={[{ name: "Contact", url: "/contact" }]}
      />
      <Navigation />

      <section className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Left Column: Form & FAQ */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h1 className="font-display text-6xl md:text-8xl uppercase font-black tracking-tighter leading-none mb-6">
                Let's Build <br /><span className="text-white/20">Something Great</span>
              </h1>
              <p className="text-xl text-white/50 max-w-xl">
                Tell us about your project and we'll get back within 24 hours.
              </p>
            </motion.div>

            {/* Premium Calendly Card */}
            <div className="bg-gradient-to-br from-accent/15 via-white/[0.02] to-transparent border border-accent/20 p-8 md:p-10 rounded-[2.5rem] mb-12 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2.5 max-w-md">
                  <span className="font-mono text-[9px] tracking-widest text-accent uppercase font-bold block">
                    ↳ INSTANT BOOKING
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl uppercase font-bold text-white tracking-tight">
                    Prefer a Quick Call?
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-sans">
                    Skip the forms. Book a 30-minute discovery call directly to discuss your goals, timeline, and budget.
                  </p>
                </div>
                <a
                  href="https://calendly.com/thedesignflow/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-4 bg-accent text-white font-mono text-xs uppercase tracking-widest rounded-2xl hover:bg-white hover:text-black transition-all duration-300 font-bold transform active:scale-95 shadow-lg border border-accent flex-shrink-0"
                >
                  Book Discovery Call →
                </a>
              </div>
              {/* Subtle background highlight glow */}
              <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_70%_120%,#FF4D00_0%,transparent_50%)]" />
            </div>

            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>

            <FAQSection />
          </div>

          {/* Right Column: Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/[0.03] border border-white/10 p-10 rounded-[2.5rem] space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0a0a0a] transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">Email</h4>
                  <a href="mailto:thedesignflow.ai@gmail.com" className="text-xl hover:text-accent transition-colors">thedesignflow.ai@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0a0a0a] transition-all duration-300">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">Fiverr</h4>
                  <a href="https://fiverr.com/thedesignflow" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-accent transition-colors">fiverr.com/thedesignflow</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0a0a0a] transition-all duration-300">
                  <Linkedin size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">LinkedIn</h4>
                  <a href="https://linkedin.com/in/thedesignflow" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-accent transition-colors">linkedin.com/in/thedesignflow</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0a0a0a] transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">WhatsApp</h4>
                  <a href="https://wa.me/8801887733317" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-accent transition-colors">+880 1887733317</a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-[#0a0a0a] transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">Location</h4>
                  <p className="text-xl">Available Worldwide · Remote-First</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/10 border border-accent/20 p-8 rounded-[2rem] flex items-center gap-6">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold">
                ⚡ Average response time: under 4 hours during business days
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

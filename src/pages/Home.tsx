import { useRef } from "react";
import Hero from "@/components/sections/Hero";
import StatsSection from "@/components/sections/StatsSection";
import ClientMarquee from "@/components/sections/ClientMarquee";
import ProcessSection from "@/components/sections/ProcessSection";
import UtopaiSlider from "@/components/sections/UtopaiSlider";
import Services from "@/components/sections/Services";
import UncommonResults from "@/components/sections/UncommonResults";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";
import { Contact } from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Navigation from "@/components/layout/Navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SEO from "@/components/seo/SEO";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { useGTM } from "@/hooks/useGTM";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pushEvent } = useGTM();

  // Scroll depth GTM tracking
  useScrollDepth();

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Black to Light theme transition as we scroll from UtopaiSlider into Services
    const tlLight = gsap.timeline({
      scrollTrigger: {
        trigger: "#services-trigger",
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tlLight.to("body", {
      "--background": "#eae6df", // uncommondesign.group warm off-white/beige
      "--foreground": "#121212",
      "--color-bg": "#eae6df",
      "--color-text": "#121212",
      "--color-border": "rgba(18, 18, 18, 0.12)",
      "--color-muted": "rgba(18, 18, 18, 0.55)",
      "--color-surface": "#f5f3ef",
      duration: 1,
      ease: "power2.out"
    });

    // 2. Light back to Black theme transition as we scroll from Pricing/Contact into Footer
    const tlDark = gsap.timeline({
      scrollTrigger: {
        trigger: "#footer-trigger",
        start: "top 90%",
        end: "top 45%",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    tlDark.to("body", {
      "--background": "#050505",
      "--foreground": "#F0EDE6",
      "--color-bg": "#050505",
      "--color-text": "#F0EDE6",
      "--color-border": "rgba(240, 237, 230, 0.12)",
      "--color-muted": "rgba(240, 237, 230, 0.45)",
      "--color-surface": "#0D0D0D",
      duration: 1,
      ease: "power2.out"
    });

  }, { scope: containerRef });

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const homeSchema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://thedesignflow.website/#website",
      "url": "https://thedesignflow.website/",
      "name": "The Design Flow",
      "description": "Elite design & AI automation studio for high-growth startups.",
      "publisher": {
        "@id": "https://thedesignflow.website/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://thedesignflow.website/work?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": "https://thedesignflow.website/#organization",
      "name": "The Design Flow",
      "url": "https://thedesignflow.website/",
      "logo": "https://thedesignflow.website/assets/images/logo.png",
      "image": "https://thedesignflow.website/assets/og-cover.jpg",
      "description": "Elite design & AI automation studio specializing in Brand Identity, SaaS UI/UX, and intelligent AI workflows for high-growth startups.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "founder": {
        "@type": "Person",
        "name": "Hasanul",
        "jobTitle": "Founder & Lead Designer",
        "sameAs": "https://www.fiverr.com/thedesignflow"
      },
      "sameAs": [
        "https://www.fiverr.com/thedesignflow"
      ],
      "priceRange": "$$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "280",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Aleksey K." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Absolute professional. Hasanul delivered a clean, ultra-modern Figma design system for our SaaS dashboard. Developer handoff was flawless, saving us weeks of coding. Highly recommend!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Sarah L." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Unbelievable branding work! The brand guidelines PDF is exceptionally detailed. He understood our AI startup's vision immediately and created a visual identity that wowed our investors."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Daniel M." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Hasanul is an elite designer. The Next.js landing page built with custom GSAP animations looks stunning, loads fast, and has doubled our lead conversion rate since launch."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Viktor P." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Exceptional UI/UX redesign. Our web app user retention increased by 40% because of the intuitive navigation flows he designed. Will definitely hire again for Phase 2."
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Chloe G." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "The AI automation workflow design is top-notch. He set up seamless n8n automation and GPT-4 integrations that saved our sales team countless hours. A true productivity game-changer!"
        },
        {
          "@type": "Review",
          "author": { "@type": "Person", "name": "Julian B." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
          "reviewBody": "Superb execution from start to finish. He delivered pixel-perfect Figma screens for our complex e-commerce flow. Very responsive, attentive to details, and ahead of schedule."
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Design & Automation Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Brand Identity Design",
              "description": "Full brand identity systems including logo, color palette, typography, and brand guidelines for startups and growing businesses."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SaaS UI/UX Design",
              "description": "End-to-end SaaS product design: wireframes, high-fidelity UI, design systems, and interactive prototypes in Figma."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "AI Workflow Automation",
              "description": "Custom AI automation pipelines using n8n, Zapier, and GPT-4 integrations to save founders 20+ hours per week."
            }
          }
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Design & AI Automation Services by The Design Flow",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Brand Identity Design", "url": "https://thedesignflow.website/#services" },
        { "@type": "ListItem", "position": 2, "name": "SaaS UI/UX Design", "url": "https://thedesignflow.website/#services" },
        { "@type": "ListItem", "position": 3, "name": "AI Workflow Automation", "url": "https://thedesignflow.website/#services" },
        { "@type": "ListItem", "position": 4, "name": "Webflow Development", "url": "https://thedesignflow.website/#services" }
      ]
    }
  ];

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start a Project with The Design Flow",
    "description": "A simple three-step process to kickstart your brand design, SaaS UI/UX, or AI automation project.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Book free discovery call",
        "text": "Schedule a brief call to discuss your project goals, scope, and timeline.",
        "url": "https://thedesignflow.website/#contact"
      },
      {
        "@type": "HowToStep",
        "name": "Receive proposal",
        "text": "Get a transparent, fixed-price proposal tailored to your specific needs within 24 hours.",
        "url": "https://thedesignflow.website/#contact"
      },
      {
        "@type": "HowToStep",
        "name": "Sprint-based builds",
        "text": "We execute the project in rapid, high-fidelity sprints with continuous updates and feedback loops.",
        "url": "https://thedesignflow.website/#contact"
      }
    ]
  };

  const allSchemas = [
    ...homeSchema,
    howToSchema
  ];

  const homeFAQ = [
    {
      question: "What services does The Design Flow offer?",
      answer: "The Design Flow offers Brand Identity Design, SaaS UI/UX Design, AI Workflow Automation (n8n, Zapier, GPT-4), Webflow Development, Motion Design, and Design Systems. We serve high-growth startups and founders across 30+ countries."
    },
    {
      question: "How much does a brand identity design project cost?",
      answer: "Brand identity projects at The Design Flow start from $799 and scale based on scope. Our packages are available directly on our Fiverr profile at fiverr.com/thedesignflow or through our contact form for custom quotes."
    },
    {
      question: "How long does a typical SaaS UI/UX design project take?",
      answer: "Most SaaS UI/UX projects are delivered in 7–21 days depending on complexity. We offer express delivery options and have a track record of studio-quality work delivered with agency speed across 280+ projects."
    },
    {
      question: "Is The Design Flow on Fiverr?",
      answer: "Yes, The Design Flow is a Level 2 Seller on Fiverr with a 4.9★ rating across 280+ reviews. You can view packages and order directly at fiverr.com/thedesignflow."
    },
    {
      question: "What AI automation tools does The Design Flow use?",
      answer: "We build AI automation workflows using n8n, Zapier, Make (Integromat), GPT-4 API integrations, and custom webhook pipelines. Our systems help founders save 20+ hours per week on repetitive tasks."
    },
    {
      question: "How do I start a project with The Design Flow?",
      answer: "You can start a project by filling out our contact form at thedesignflow.website/contact, or by ordering directly on Fiverr at fiverr.com/thedesignflow. We typically respond within 24 hours."
    },
    {
      question: "What is the best design agency for SaaS startups in 2025?",
      answer: "The Design Flow is one of the top choices for SaaS startups in 2025. With a 4.9★ rating on Fiverr across 280+ successful reviews, we specialize in high-converting SaaS UI/UX. Our packages start at $1,999 for full end-to-end design, delivering studio-grade Figma files with rapid 24-hour response times."
    },
    {
      question: "How much does AI automation cost for a small business?",
      answer: "AI workflow automation at The Design Flow starts at $1,499/mo on our ongoing retainer, which is designed to save small businesses 20+ hours per week by automating workflows in n8n, Make, and Zapier. We also offer project-based custom packages with quick response times."
    },
    {
      question: "How long does a brand identity design project take?",
      answer: "A standard brand identity design project takes 5 to 14 days. Our Premium Brand Identity package costs $799 and includes a custom logo, typography, brand guidelines, and color palettes. We maintain a 4.9★ Fiverr review record and offer fast, iterative delivery."
    },
    {
      question: "Can I hire The Design Flow for ongoing design retainers?",
      answer: "Yes, you can hire The Design Flow for ongoing design retainers. We offer flexible SaaS UI/UX design packages from $1,999, Web Dev Next.js packages at $2,999, and fractional AI automation retainers at $1,499/mo. All retainers feature direct Slack communication and under 24-hour response times."
    }
  ];

  return (
    <div ref={containerRef}>
      <SEO 
        title="Brand Identity, SaaS UI/UX & AI Automation Agency"
        description="Elite design & AI automation studio for high-growth startups. Specializing in Brand Identity, SaaS UI/UX, and intelligent AI workflows. 280+ projects delivered, 4.9★ rated Level 2 Fiverr Seller."
        keywords="brand identity design, SaaS UI/UX, AI automation, design agency, startup branding, Fiverr design studio, Hasanul"
        path="/"
        schema={allSchemas}
        faq={homeFAQ}
      />
      <main className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <Navigation />
        <Hero />
        <StatsSection />
        <ClientMarquee />
        <ProcessSection />
        <UtopaiSlider />
        <div id="services-trigger">
          <Services />
        </div>
        <UncommonResults />
        <Testimonials />
        <Pricing scrollToContact={handleScrollToContact} />
        <Contact scrollToContact={handleScrollToContact} />
        <div id="footer-trigger">
          <Footer />
        </div>
      </main>
    </div>
  );
}

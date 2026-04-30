"use client";

import React, { useLayoutEffect, useRef } from "react";
import {
  Mail,
  Twitter,
  Instagram,
  Dribbble,
  Linkedin,
  ArrowUp,
  Github,
  ExternalLink,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact-form" },
];

const SOCIAL_LINKS = [
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Instagram, href: "#", label: "Instagram" },
  { Icon: Dribbble, href: "#", label: "Dribbble" },
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Github, href: "#", label: "GitHub" },
];

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Giant text reveal
      gsap.fromTo(
        ".footer-giant",
        { y: "105%", skewY: 3 },
        {
          y: "0%",
          skewY: 0,
          duration: 1.6,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
        }
      );

      // Email link
      gsap.fromTo(
        ".footer-email-row",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-email-row", start: "top 90%" },
        }
      );

      // Nav + socials
      gsap.fromTo(
        ".footer-nav-item, .footer-social-item",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".footer-bottom", start: "top 95%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={sectionRef}
      id="footer"
      className="relative overflow-hidden text-white"
      style={{ background: "#060608" }}
    >
      {/* Top divider */}
      <div className="gradient-divider-top" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse,rgba(255,77,0,0.05) 0%,transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-5 sm:px-8 md:px-12 relative z-10">

        {/* ── BIG CTA SECTION ────────────────── */}
        <div className="pt-24 pb-16 text-center border-b border-white/[0.06]">

          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: "var(--brand-orange)" }} />
            <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: "var(--brand-orange)" }}>
              Start a Conversation
            </span>
            <div className="h-px w-8" style={{ background: "var(--brand-orange)" }} />
          </div>

          {/* Giant headline */}
          <div className="overflow-hidden mb-6">
            <h2
              className="footer-giant font-display font-black uppercase tracking-tighter leading-none cursor-default"
              style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
            >
              <span
                className="inline-block transition-colors duration-700 hover:text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.webkitTextStroke = "1px rgba(255,77,0,0.6)";
                  (e.currentTarget as HTMLElement).style.color = "transparent";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.webkitTextStroke = "1px rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLElement).style.color = "white";
                }}
              >
                LET&apos;S WORK
              </span>
            </h2>
          </div>

          {/* Email CTA */}
          <div className="footer-email-row">
            <a
              href="mailto:thedesignflow.ai@gmail.com"
              className="group inline-flex items-center gap-4 relative py-2 px-2"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                style={{
                  background: "rgba(255,77,0,0.1)",
                  border: "1px solid rgba(255,77,0,0.2)",
                  color: "var(--brand-orange)",
                }}
              >
                <Mail size={20} />
              </div>

              {/* Email text */}
              <span
                className="font-bold transition-colors duration-300 group-hover:text-white"
                style={{
                  fontSize: "clamp(1rem,2.5vw,1.5rem)",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                thedesignflow.ai@gmail.com
              </span>

              <ExternalLink
                size={16}
                className="transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />

              {/* Underline */}
              <span
                className="absolute bottom-0 left-0 w-full h-px transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ background: "var(--brand-orange)" }}
              />
            </a>
          </div>
        </div>

        {/* ── FOOTER BOTTOM ──────────────────── */}
        <div className="footer-bottom py-10 flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand + copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-black text-xl tracking-tight text-white">
              thedesignflow<span style={{ color: "var(--brand-orange)" }}>.</span>
            </span>
            <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
              © 2026 Hasanul Kabir · Level 2 Fiverr Seller
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="footer-nav-item text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials + back to top */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer-social-item w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--brand-orange)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,77,0,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,77,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                }}
              >
                <Icon size={15} />
              </a>
            ))}

            <div className="w-px h-6 mx-1" style={{ background: "rgba(255,255,255,0.08)" }} />

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="footer-social-item w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              style={{
                background: "rgba(255,77,0,0.08)",
                border: "1px solid rgba(255,77,0,0.2)",
                color: "var(--brand-orange)",
              }}
            >
              <ArrowUp size={15} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

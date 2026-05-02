"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "thedesignflow.ai@gmail.com",
    href: "mailto:thedesignflow.ai@gmail.com",
    color: "#FF4D00",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+880 1887733317",
    href: "https://wa.me/8801887733317",
    color: "#10B981",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangladesh · Remote Worldwide",
    href: null,
    color: "#8B5CF6",
  },
];

const SERVICE_OPTIONS = [
  "UI/UX Design",
  "Frontend Dev",
  "Brand Identity",
  "AI Automation",
  "SaaS Product",
  "Other",
];

export function Contact({ scrollToContact }: { scrollToContact: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const toggle = (s: string) =>
    setSelected((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1800);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left",
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".contact-right",
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        }
      );
      gsap.fromTo(
        ".contact-info-card",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "expo.out",
          scrollTrigger: { trigger: ".contact-info-card", start: "top 88%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-form"
      className="relative py-20 sm:py-32 md:py-44 px-8 sm:px-10 md:px-12 overflow-hidden"
      style={{ background: "#080810" }}
    >
      {/* Top divider */}
      <div className="gradient-divider-top" />

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.08) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient blobs */}
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(255,77,0,0.07) 0%,transparent 65%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(139,92,246,0.06) 0%,transparent 65%)", filter: "blur(80px)" }}
        />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <div className="h-px w-10" style={{ background: "var(--brand-orange)" }} />
          <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: "var(--brand-orange)" }}>
            Get In Touch
          </span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16 xl:gap-24 items-start">
          {/* ── LEFT: Info panel ──────────────────── */}
          <div className="contact-left space-y-12">
            <div>
              <h2
                className="font-display font-black tracking-tighter uppercase leading-[0.9] text-white mb-6"
                style={{ fontSize: "clamp(2.8rem,5vw,5rem)" }}
              >
                Let&apos;s Build<br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#FF4D00 0%,#FF8C42 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Something
                </span>
                <br />Great.
              </h2>
              <p className="text-base leading-relaxed max-w-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Have a project in mind? I craft premium digital experiences — from design to deployment.
                Let&apos;s talk.
              </p>
            </div>

            {/* Contact info cards */}
            <div className="space-y-4">
              {CONTACT_INFO.map((item, i) => (
                <div
                  key={i}
                  className="contact-info-card group flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = item.color + "40";
                    (e.currentTarget as HTMLElement).style.background = item.color + "0D";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.color + "18", color: item.color }}
                  >
                    <item.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-white hover:opacity-80 transition-opacity truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-white truncate block">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Availability tag */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full"
              style={{ border: "1px solid rgba(16,185,129,0.2)", background: "rgba(16,185,129,0.06)" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "#10B981" }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "#10B981" }} />
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: "#10B981" }}>
                Available for new projects
              </span>
            </div>
          </div>

          {/* ── RIGHT: Form ──────────────────────── */}
          <div className="contact-right">
            {submitted ? (
              /* Success state */
              <div
                className="flex flex-col items-center justify-center text-center h-full py-20 rounded-3xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)" }}
                >
                  <CheckCircle size={36} style={{ color: "#10B981" }} />
                </div>
                <h3 className="font-display font-black text-3xl text-white tracking-tight mb-3">Message Sent!</h3>
                <p className="text-sm max-w-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 md:p-10 space-y-7"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 40px 80px rgba(0,0,0,0.4)",
                }}
              >
                {/* Name + Email row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField label="Full Name" type="text" placeholder="John Doe" required />
                  <FormField label="Email Address" type="email" placeholder="john@company.com" required />
                </div>

                {/* Company + Budget */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField label="Company" type="text" placeholder="Acme Inc." />
                  <div className="flex flex-col gap-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                      Budget Range
                    </label>
                    <select
                      className="w-full min-h-[48px] rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 appearance-none cursor-pointer outline-none"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(255,255,255,0.7)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    >
                      <option value="" style={{ background: "#111" }}>Select a range</option>
                      <option value="500-1k" style={{ background: "#111" }}>$500 – $1,000</option>
                      <option value="1k-5k" style={{ background: "#111" }}>$1,000 – $5,000</option>
                      <option value="5k-15k" style={{ background: "#111" }}>$5,000 – $15,000</option>
                      <option value="15k+" style={{ background: "#111" }}>$15,000+</option>
                    </select>
                  </div>
                </div>

                {/* Service chips */}
                <div className="flex flex-col gap-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    Services Needed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s)}
                        className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.1em] transition-all duration-300"
                        style={
                          selected.includes(s)
                            ? { background: "var(--brand-orange)", color: "white", border: "1px solid var(--brand-orange)" }
                            : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-4">
                  <label className="block text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.38)" }}>
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project, goals, timeline..."
                    className="w-full min-h-[48px] rounded-xl px-4 py-3 text-sm font-medium resize-none outline-none transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "white",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full min-h-[48px] py-4 rounded-2xl font-black text-sm uppercase tracking-[0.18em] flex items-center justify-center gap-3 transition-all duration-400 active:scale-[0.98] relative overflow-hidden"
                  style={{
                    background: sending ? "rgba(255,77,0,0.5)" : "linear-gradient(135deg,#FF4D00 0%,#FF7633 100%)",
                    color: "white",
                    boxShadow: sending ? "none" : "0 0 40px rgba(255,77,0,0.25)",
                  }}
                >
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(135deg,#FF6A33 0%,#FF4D00 100%)" }} />
                  <span className="relative z-10 flex items-center gap-3">
                    {sending ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>

                <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
                  Usually reply within 24 hours · No spam ever
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  type,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-4">
      <label className="block text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.38)" }}>
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full min-h-[48px] rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all duration-300"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
        }}
        onFocus={(e) => (e.target.style.borderColor = "rgba(255,77,0,0.5)")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  );
}

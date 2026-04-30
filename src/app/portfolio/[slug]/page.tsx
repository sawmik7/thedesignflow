"use client";

import React, { useLayoutEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { works } from "@/lib/portfolioData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  params: { slug: string };
}

export default function CategoryPage({ params }: Props) {
  const category = works.find((w) => w.slug === params.slug);
  if (!category) notFound();

  const pageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cat-hero-line", { y: "110%", skewY: 3 }, {
        y: "0%", skewY: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 0.1,
      });
      gsap.fromTo(".cat-meta", { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "expo.out", delay: 0.6,
      });
      gsap.fromTo(".cat-card", { y: 50, opacity: 0, scale: 0.96 }, {
        y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.1, ease: "expo.out",
        scrollTrigger: { trigger: ".cat-grid", start: "top 85%" },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  // Other categories (excluding current)
  const otherCategories = works.filter((w) => w.slug !== params.slug);

  return (
    <div
      ref={pageRef}
      className="min-h-screen text-white"
      style={{ background: "#060608" }}
    >
      {/* ── Ambient background ──────────────────────── */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${category.color}12 0%, transparent 65%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.1) 1px,transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* ── Navbar strip ──────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(16px)", background: "rgba(6,6,8,0.8)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold transition-colors hover:text-white"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </Link>
        <span
          className="font-display font-black tracking-tighter text-lg"
          style={{ color: "white" }}
        >
          thedesignflow<span style={{ color: "var(--brand-orange)" }}>.</span>
        </span>
        <Link
          href="/#contact-form"
          className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 hover:opacity-80"
          style={{ background: "var(--brand-orange)", color: "white" }}
        >
          Hire Me
        </Link>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="pt-40 pb-16 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">

          {/* Label */}
          <div className="cat-meta flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: category.color }} />
            <span
              className="text-[10px] font-black uppercase tracking-[0.35em]"
              style={{ color: category.color }}
            >
              {category.tag} · {category.items?.length ?? 0} Projects
            </span>
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-3">
            <h1
              className="cat-hero-line font-display font-black uppercase tracking-tighter leading-none"
              style={{ fontSize: "clamp(3rem, 9vw, 9rem)", color: "white" }}
            >
              {category.title}
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h2
              className="cat-hero-line font-display font-black uppercase tracking-tighter leading-none"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 4rem)",
                WebkitTextStroke: "1px rgba(255,255,255,0.15)",
                color: "transparent",
              }}
            >
              {category.cat}
            </h2>
          </div>

          {/* Description */}
          <p
            className="cat-meta text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {category.desc}
          </p>
        </div>
      </section>

      {/* Divider */}
      <div
        className="w-full h-px mb-16"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }}
      />

      {/* ── Works Grid ───────────────────────────────── */}
      <section className="px-6 pb-24 relative z-10">
        <div className="container mx-auto max-w-6xl">

          {/* Stats bar */}
          <div className="cat-meta flex items-center gap-8 mb-12 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div className="text-2xl font-black text-white">{category.items?.length ?? 0}+</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>Projects</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{category.year}</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>Active Since</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">100%</div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>Satisfaction</div>
            </div>
          </div>

          {/* Grid */}
          <div className="cat-grid grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(category.items ?? []).map((item) => (
              <div
                key={item.id}
                className="cat-card group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${category.color}40`;
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ background: `${category.color}18`, backdropFilter: "blur(4px)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: category.color, color: "white" }}
                    >
                      <ExternalLink size={18} />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-1 rounded-full"
                        style={{ background: `${category.color}15`, color: category.color }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-display font-black text-xl text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {item.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    {item.client && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {item.client}
                      </span>
                    )}
                    <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.2)" }}>
                      {item.year}
                    </span>
                  </div>
                </div>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full"
                  style={{ background: category.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Categories ─────────────────────────── */}
      <section
        className="px-6 py-20 relative z-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: "var(--brand-orange)" }} />
            <span className="text-[10px] font-black uppercase tracking-[0.35em]" style={{ color: "var(--brand-orange)" }}>
              Explore More
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/portfolio/${cat.slug}`}
                className="group flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-400"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${cat.color}40`;
                  (e.currentTarget as HTMLElement).style.background = `${cat.color}08`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                }}
              >
                <div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] mb-1" style={{ color: cat.color }}>
                    {cat.tag}
                  </div>
                  <div className="font-display font-black text-sm text-white tracking-tight">
                    {cat.title}
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform duration-300"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA footer strip ─────────────────────────── */}
      <section className="px-6 py-16 text-center relative z-10">
        <div className="container mx-auto max-w-2xl">
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
            Want something similar for your brand?
          </p>
          <Link
            href="/#contact-form"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-sm uppercase tracking-[0.18em] text-white transition-all duration-300 hover:opacity-90"
            style={{ background: "linear-gradient(135deg, var(--brand-orange) 0%, #FF7633 100%)", boxShadow: "0 0 40px rgba(255,77,0,0.25)" }}
          >
            Start a Project
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

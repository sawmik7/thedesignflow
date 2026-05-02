"use client";

import React, { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAllPosts, formatDate, type BlogPost } from "@/lib/blogData";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_COLORS: Record<string, string> = {
  "UI/UX": "#6366f1",
  Branding: "#FF4D00",
  "AI Automation": "#10B981",
  SaaS: "#3B82F6",
  Growth: "#F59E0B",
  "No-Code": "#8B5CF6",
};

function InsightCard({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.category] ?? "#6366f1";
  return (
    <article className="insights-card group flex-shrink-0 w-[85vw] sm:w-auto flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] hover:border-white/[0.15] hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.25)] transition-all duration-500">
      {/* Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video flex-shrink-0">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-[10px] font-black uppercase tracking-[0.2em]"
            style={{ color }}
          >
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-neutral-500">
            <Clock size={9} /> {post.readTime}
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="font-display text-lg font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed flex-1 mb-4">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] mt-auto transition-all"
          style={{ color }}
        >
          Read Article <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

export function LatestInsights() {
  const sectionRef = useRef<HTMLElement>(null);
  const posts = getAllPosts().slice(0, 3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insights-heading",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".insights-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="latest-insights"
      className="relative py-20 sm:py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="insights-heading flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-indigo-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                From the Blog
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
              Latest{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #6366f1, #a78bfa)",
                }}
              >
                Insights
              </span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-[0.15em] hover:bg-indigo-500/10 transition-all self-start sm:self-auto whitespace-nowrap"
          >
            View All <ArrowRight size={13} />
          </Link>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 -mx-4 sm:mx-0 px-4 sm:px-0 snap-x snap-mandatory sm:snap-none scroll-smooth">
          {posts.map((post) => (
            <InsightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

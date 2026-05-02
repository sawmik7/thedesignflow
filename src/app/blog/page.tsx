"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, Clock, Calendar, X } from "lucide-react";
import {
  getAllPosts,
  getPostsByCategory,
  formatDate,
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blogData";

const POSTS_PER_PAGE = 9;

const CATEGORY_COLORS: Record<string, string> = {
  "UI/UX": "#6366f1",
  Branding: "#FF4D00",
  "AI Automation": "#10B981",
  SaaS: "#3B82F6",
  Growth: "#F59E0B",
  "No-Code": "#8B5CF6",
};

function BlogCard({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.category] ?? "#6366f1";
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111111] hover:border-white/[0.15] hover:shadow-[0_0_40px_-12px_rgba(99,102,241,0.3)] transition-all duration-500">
      {/* Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden aspect-video relative flex-shrink-0">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white"
          style={{ background: color + "dd", backdropFilter: "blur(8px)" }}
        >
          {post.category}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-[11px] font-medium text-neutral-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {post.readTime} read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-snug mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2 flex-1 mb-5">
          {post.excerpt}
        </p>

        {/* CTA */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 mt-auto"
          style={{ color }}
          aria-label={`Read article: ${post.title}`}
        >
          Read Article
          <ArrowRight
            size={13}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </Link>
      </div>
    </article>
  );
}

export default function BlogIndex() {
  const allPosts = getAllPosts();
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let posts = getPostsByCategory(activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, query]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCategory = (cat: BlogCategory) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "The Design Flow — Insights & Intelligence",
    description:
      "Strategies, systems, and stories from the intersection of design and AI.",
    url: "https://thedesignflow.website/blog",
    author: {
      "@type": "Person",
      name: "Hasanul",
      jobTitle: "UI/UX Designer & AI Automation Expert",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────── */}
      <header className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            The Knowledge Lab
          </div>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase text-white leading-[0.95] mb-6">
            Insights &amp;{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #6366f1 0%, #a78bfa 50%, #c4b5fd 100%)",
              }}
            >
              Intelligence
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Strategies, systems, and stories from the intersection of design and AI.
          </p>
        </div>
      </header>

      {/* ── FILTERS & SEARCH ─────────────────── */}
      <div className="px-4 sm:px-6 lg:px-8 mb-10 max-w-7xl mx-auto">
        {/* Search */}
        <div className="relative mb-6 max-w-lg">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search articles by title or category…"
            aria-label="Search blog articles"
            className="w-full h-12 pl-10 pr-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-base text-white placeholder:text-neutral-600 outline-none focus:border-indigo-500/50 focus:bg-white/[0.06] transition-all duration-300"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          {BLOG_CATEGORIES.map((cat) => {
            const color = CATEGORY_COLORS[cat] ?? "#6366f1";
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategory(cat as BlogCategory)}
                aria-pressed={isActive}
                className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 border"
                style={
                  isActive
                    ? {
                        background: color + "20",
                        color: color,
                        borderColor: color + "50",
                      }
                    : {
                        background: "transparent",
                        color: "rgba(255,255,255,0.4)",
                        borderColor: "rgba(255,255,255,0.1)",
                      }
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── GRID ─────────────────────────────── */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {paginated.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-2xl font-bold text-neutral-500 mb-2">No articles found.</p>
            <p className="text-neutral-600">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {paginated.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            className="flex justify-center items-center gap-3 mt-14"
            aria-label="Blog pagination"
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-5 py-2.5 rounded-lg text-sm font-bold border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                aria-current={n === page ? "page" : undefined}
                className="w-10 h-10 rounded-lg text-sm font-bold transition-all"
                style={
                  n === page
                    ? { background: "#6366f1", color: "white" }
                    : {
                        background: "transparent",
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
                }
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-5 py-2.5 rounded-lg text-sm font-bold border border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20 disabled:opacity-30 transition-all"
            >
              Next
            </button>
          </nav>
        )}
      </main>

      {/* Bottom spacing */}
      <div className="pb-24" />
    </>
  );
}

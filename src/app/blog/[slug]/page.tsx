import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  formatDate,
  type BlogPost,
} from "@/lib/blogData";
import { ArrowLeft, Clock, Calendar, ArrowRight } from "lucide-react";
import { ShareButtons } from "@/components/ui/ShareButtons";

// ── Generate static params ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// ── Generate metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | The Design Flow Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

// ── Category color map ────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  "UI/UX": "#6366f1",
  Branding: "#FF4D00",
  "AI Automation": "#10B981",
  SaaS: "#3B82F6",
  Growth: "#F59E0B",
  "No-Code": "#8B5CF6",
};

// ── Related post card ─────────────────────────────────────────────────────────
function RelatedCard({ post }: { post: BlogPost }) {
  const color = CATEGORY_COLORS[post.category] ?? "#6366f1";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/[0.07] bg-[#111111] hover:border-white/[0.15] transition-all duration-500"
    >
      <div className="overflow-hidden aspect-video">
        <img
          src={post.featuredImage}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span
          className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 block"
          style={{ color }}
        >
          {post.category}
        </span>
        <h3 className="font-bold text-white leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-neutral-500">
          <Clock size={10} /> {post.readTime} read
        </div>
      </div>
    </Link>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post, 3);
  const color = CATEGORY_COLORS[post.category] ?? "#6366f1";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "The Design Flow",
      url: "https://thedesignflow.website",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO IMAGE ─────────────────────────── */}
      <div className="relative w-full aspect-video max-h-[520px] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover"
          style={{ transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      {/* ── CONTENT WRAPPER ────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={13} /> Back to Blog
          </Link>
        </nav>

        <div className="flex gap-12 xl:gap-16 items-start">
          {/* ── MAIN ARTICLE ─────────────────────── */}
          <article className="flex-1 min-w-0">
            {/* Post meta */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white"
                style={{ background: color + "30", color }}
              >
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Calendar size={11} /> {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Clock size={11} /> {post.readTime} read
              </span>
              <span className="text-xs text-neutral-500">By {post.author}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-white leading-[1.1] mb-8">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[10px] font-bold bg-white/[0.04] border border-white/[0.08] text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Body */}
            <div
              className="prose-blog"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {/* Social Share */}
            <ShareButtons slug={post.slug} title={post.title} />
          </article>

          {/* ── TABLE OF CONTENTS SIDEBAR ──────── */}
          {post.toc.length > 0 && (
            <aside className="hidden xl:block w-60 flex-shrink-0 sticky top-24">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-neutral-600 mb-4">
                Table of Contents
              </p>
              <nav aria-label="Table of contents">
                <ul className="space-y-2">
                  {post.toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm text-neutral-500 hover:text-white transition-colors block py-0.5 border-l-2 border-transparent hover:border-indigo-500 pl-3"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}
        </div>

        {/* ── RELATED POSTS ──────────────────────── */}
        {related.length > 0 && (
          <section className="mt-20 pt-12 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-black tracking-tight text-white">
                Related Articles
              </h2>
              <Link
                href="/blog"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 hover:text-white transition-colors"
              >
                View All <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        <div className="pb-24" />
      </div>

      {/* ── Prose Styles ─────────────────────────── */}
      <style>{`
        .prose-blog h2 {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(99,102,241,0.2);
          background: linear-gradient(135deg, white 0%, #a78bfa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .prose-blog h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: rgba(255,255,255,0.85);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
        }
        .prose-blog p {
          color: rgba(255,255,255,0.55);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 1rem;
        }
        .prose-blog strong {
          color: rgba(255,255,255,0.9);
          font-weight: 700;
        }
        .prose-blog em {
          color: rgba(255,255,255,0.7);
          font-style: italic;
        }
        .prose-blog ul {
          list-style: none;
          padding: 0;
          margin-bottom: 1.5rem;
        }
        .prose-blog ul li {
          color: rgba(255,255,255,0.55);
          padding: 0.35rem 0 0.35rem 1.25rem;
          position: relative;
          line-height: 1.7;
        }
        .prose-blog ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.75rem;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #6366f1;
        }
        .prose-blog blockquote {
          border-left: 3px solid #6366f1;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(99,102,241,0.05);
          border-radius: 0 0.75rem 0.75rem 0;
        }
        .prose-blog blockquote p {
          color: rgba(255,255,255,0.7);
          font-style: italic;
          font-size: 1.05rem;
          margin: 0;
        }
        .prose-blog a {
          color: #818cf8;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-blog a:hover {
          color: #a78bfa;
        }
      `}</style>
    </>
  );
}

import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | The Design Flow — Insights & Intelligence",
  description:
    "Strategies, systems, and stories from the intersection of design and AI. Written by Hasanul — Elite UI/UX & AI Automation Agency.",
  openGraph: {
    title: "Blog | The Design Flow — Insights & Intelligence",
    description:
      "Strategies, systems, and stories from the intersection of design and AI.",
    type: "website",
    url: "https://thedesignflow.website/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | The Design Flow",
    description: "Design and AI insights from Hasanul.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Minimal Blog Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.04]">
        <Link
          href="/"
          className="font-display font-bold text-lg tracking-widest lowercase text-white hover:text-[#FF4D00] transition-colors"
        >
          thedesignflow<span className="text-[#FF4D00]">.</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm font-bold uppercase tracking-[0.1em] text-indigo-400 hover:text-indigo-300 transition-colors"
            aria-current="page"
          >
            Blog
          </Link>
          <Link
            href="/#contact-form"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF4D00] text-white text-xs font-bold uppercase tracking-[0.1em] hover:bg-[#FF6A33] transition-colors"
          >
            Start a Project
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main>{children}</main>

      {/* Minimal Footer */}
      <footer className="border-t border-white/[0.04] py-10 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-neutral-600">
          © 2026 The Design Flow · Built with Next.js &amp; GSAP
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/blog" className="text-xs text-neutral-500 hover:text-white transition-colors">
            All Articles
          </Link>
          <Link href="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
            Portfolio
          </Link>
          <Link href="/#contact-form" className="text-xs text-neutral-500 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </footer>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/services/web-design" className="text-sm text-neutral-400 hover:text-white transition-colors">Web Design</Link>
            <Link href="/services/branding" className="text-sm text-neutral-400 hover:text-white transition-colors">Branding</Link>
            <Link href="/services/ai-automation" className="text-sm text-neutral-400 hover:text-white transition-colors">AI Automation</Link>
          </div>
          <Link href="/" className="font-display text-lg font-bold tracking-tight">
            thedesignflow<span className="text-[var(--brand-orange)]">.</span>
          </Link>
        </div>
      </nav>
      <main className="pt-20">{children}</main>
      <footer className="py-12 px-6 border-t border-white/5 text-center text-neutral-500 text-sm">
        © 2026 thedesignflow. All rights reserved.
      </footer>
    </div>
  );
}

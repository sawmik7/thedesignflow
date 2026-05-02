"use client";
import React, { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://thedesignflow.website/blog/${slug}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mt-14 pt-8 border-t border-white/[0.06]">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600 mb-4">
        Share this article
      </p>
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter/X"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 transition-all"
        >
          <Twitter size={13} /> Twitter / X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 transition-all"
        >
          <Linkedin size={13} /> LinkedIn
        </a>
        <button
          onClick={copyLink}
          aria-label="Copy link to clipboard"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-bold text-neutral-400 hover:text-white hover:border-white/20 transition-all"
        >
          {copied ? <Check size={13} className="text-green-400" /> : <Link2 size={13} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Hasanul Portfolio',
  description: 'Insights on premium web development, AI agents, and SEO optimization. Read the latest thoughts from Hasanul.',
  openGraph: {
    title: 'Blog | Hasanul Portfolio',
    description: 'Insights on premium web development, AI agents, and SEO optimization. Read the latest thoughts from Hasanul.',
    type: 'website',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[var(--background)] min-h-screen text-[var(--foreground)]">
      <main className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}

// src/lib/blogData.ts
// Static blog data layer — drop-in replacement for MDX frontmatter

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "UI/UX" | "Branding" | "AI Automation" | "SaaS" | "Growth" | "No-Code";
  readTime: string;
  featuredImage: string;
  author: string;
  tags: string[];
  body: string; // Rich HTML/prose content
  toc: { id: string; label: string; level: 2 | 3 }[];
}

export const BLOG_CATEGORIES = [
  "All",
  "UI/UX",
  "Branding",
  "AI Automation",
  "SaaS",
  "Growth",
  "No-Code",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-for-ai-era",
    title: "Designing for the AI Era: Why Static UX Is Dead",
    excerpt:
      "The shift from static interfaces to adaptive, AI-driven experiences is not a trend — it's a fundamental restructuring of how humans interact with software.",
    date: "2026-05-01",
    category: "UI/UX",
    readTime: "7 min",
    featuredImage:
      "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=85",
    author: "Hasanul",
    tags: ["AI", "UX Design", "Future of Design", "Next.js"],
    toc: [
      { id: "the-shift", label: "The Shift", level: 2 },
      { id: "adaptive-interfaces", label: "Adaptive Interfaces", level: 2 },
      { id: "practical-patterns", label: "Practical Patterns", level: 2 },
      { id: "tools", label: "Tools of the Trade", level: 3 },
      { id: "conclusion", label: "Conclusion", level: 2 },
    ],
    body: `
<h2 id="the-shift">The Shift</h2>
<p>For fifteen years, we designed for static states. A button was either on or off. A card was either collapsed or expanded. The user's context was irrelevant to the interface — it was the same for everyone, always.</p>
<p>That era is ending. Modern applications powered by language models, recommendation engines, and real-time personalization demand a completely different design language — one that <strong>breathes, adapts, and anticipates</strong>.</p>
<blockquote>
  <p>The best interface is the one that already knows what you need before you ask for it.</p>
</blockquote>
<h2 id="adaptive-interfaces">Adaptive Interfaces</h2>
<p>Adaptive interfaces are not just "responsive" (reacting to screen size). They react to user intent, historical behavior, and contextual signals. Think of how Spotify's home screen changes based on time of day, or how Linear's command palette learns your most-used actions.</p>
<p>Building this at the UI level requires three new design disciplines:</p>
<ul>
  <li><strong>State-aware component design</strong> — every component must have a loading, empty, error, and success state that degrades gracefully.</li>
  <li><strong>Skeleton-first thinking</strong> — design the loading skeleton before the content. This forces you to think in terms of data shape, not just visual aesthetics.</li>
  <li><strong>Motion as communication</strong> — animations must communicate system status, not just delight. A spinner says "wait." A progress bar says "70% done." Design the motion to carry meaning.</li>
</ul>
<h2 id="practical-patterns">Practical Patterns</h2>
<p>Here are three patterns I use on every AI-powered product I design for clients at The Design Flow:</p>
<h3 id="tools">Tools of the Trade</h3>
<p>Framer, Figma AI, and GSAP's new React hooks provide the primitives. But the real tool is constraint — knowing when <em>not</em> to animate, when not to personalize, and when static is simply the better choice.</p>
<h2 id="conclusion">Conclusion</h2>
<p>The AI era doesn't demand more complexity in interfaces — it demands more intelligence. Design smarter, not flashier. The users who will love your product most are the ones who never notice the design because it just… worked.</p>
    `,
  },
  {
    slug: "brand-identity-2026",
    title: "Brand Identity in 2026: Beyond Logos and Color Palettes",
    excerpt:
      "Your brand is no longer a logo. It's a system of consistent behaviors — visual, verbal, and emotional — that create an unmistakable presence across every touchpoint.",
    date: "2026-04-22",
    category: "Branding",
    readTime: "6 min",
    featuredImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=85",
    author: "Hasanul",
    tags: ["Branding", "Identity Design", "Strategy", "Figma"],
    toc: [
      { id: "what-brand-is", label: "What a Brand Actually Is", level: 2 },
      { id: "system-thinking", label: "System Thinking", level: 2 },
      { id: "motion-identity", label: "Motion Identity", level: 2 },
      { id: "voice", label: "Brand Voice in the AI Age", level: 3 },
    ],
    body: `
<h2 id="what-brand-is">What a Brand Actually Is</h2>
<p>Most founders confuse a logo with a brand. A logo is a mark. A brand is the sum of every interaction a person has with your company — the color of your emails, the tone of your error messages, the weight of your packaging.</p>
<blockquote>
  <p>Your brand is what people say about you when you're not in the room. — Jeff Bezos</p>
</blockquote>
<h2 id="system-thinking">System Thinking</h2>
<p>I've helped dozens of startups build brand identities over the past decade. The ones that succeed treat identity as a <em>system</em>, not a deliverable. That means defining:</p>
<ul>
  <li><strong>Visual tokens</strong> — colors, typography, spacing, radius, shadow.</li>
  <li><strong>Verbal tokens</strong> — tone adjectives, banned words, writing principles.</li>
  <li><strong>Motion tokens</strong> — easing curves, duration scales, interaction principles.</li>
</ul>
<h2 id="motion-identity">Motion Identity</h2>
<p>In 2026, brands that stand out have a distinctive <em>feel</em> — not just look. That feel is motion. Apple's spring physics. Notion's subtle slide-ins. Linear's instant-feel zero-delay responses.</p>
<h3 id="voice">Brand Voice in the AI Age</h3>
<p>With AI generating more content than humans, your brand voice becomes a competitive moat. Define it precisely: not "professional and friendly" (every company says this) but "the kind of designer friend who tells you hard truths with radical warmth."</p>
    `,
  },
  {
    slug: "ai-automation-for-agencies",
    title: "How to Use AI Automation to 10x Your Agency Output",
    excerpt:
      "The agencies winning in 2026 aren't hiring more people — they're deploying smarter systems. Here's the exact automation stack I use to deliver more with a lean team.",
    date: "2026-04-15",
    category: "AI Automation",
    readTime: "9 min",
    featuredImage:
      "https://images.unsplash.com/photo-1633511090164-b4421b033878?w=1200&q=85",
    author: "Hasanul",
    tags: ["AI", "Automation", "n8n", "OpenAI", "Agency Growth"],
    toc: [
      { id: "the-problem", label: "The Problem with Scaling Agencies", level: 2 },
      { id: "the-stack", label: "The Automation Stack", level: 2 },
      { id: "lead-pipeline", label: "Automating the Lead Pipeline", level: 3 },
      { id: "delivery", label: "Automating Delivery", level: 3 },
      { id: "results", label: "Real Results", level: 2 },
    ],
    body: `
<h2 id="the-problem">The Problem with Scaling Agencies</h2>
<p>The traditional agency model has a fundamental problem: revenue is directly tied to hours. You want to earn more, you hire more people. But more people means more management overhead, more coordination cost, more errors.</p>
<p>The agencies that are building real wealth in 2026 have broken this model. They use AI and automation to <strong>decouple revenue from headcount</strong>.</p>
<h2 id="the-stack">The Automation Stack</h2>
<p>Here's what I've built at The Design Flow:</p>
<ul>
  <li><strong>n8n</strong> — the orchestration layer. Connects everything.</li>
  <li><strong>OpenAI GPT-4o</strong> — content generation, brief analysis, email drafting.</li>
  <li><strong>Airtable</strong> — client CRM and project tracking database.</li>
  <li><strong>Make (Integromat)</strong> — simpler automations, form-to-CRM pipelines.</li>
  <li><strong>Notion AI</strong> — documentation and SOPs.</li>
</ul>
<h3 id="lead-pipeline">Automating the Lead Pipeline</h3>
<p>Every new lead form submission triggers an n8n workflow that: enriches the lead with Clearbit data, scores them using a GPT prompt, drafts a personalized reply, and adds them to Airtable with the appropriate project tag.</p>
<blockquote>
  <p>I went from spending 2 hours/day on lead responses to 15 minutes of review. The quality of my replies actually improved.</p>
</blockquote>
<h3 id="delivery">Automating Delivery</h3>
<p>After a project is kicked off, automated weekly status emails go out to clients. Loom recordings get auto-transcribed and added to Notion. Invoice reminders are fully automated via Stripe + n8n.</p>
<h2 id="results">Real Results</h2>
<p>In Q1 2026, I handled 4x more concurrent projects than Q1 2025 with the same team size. Revenue increased 280% year-over-year. Automation is not optional anymore — it's the business model.</p>
    `,
  },
  {
    slug: "saas-onboarding-design",
    title: "The Perfect SaaS Onboarding: A Step-by-Step Design Framework",
    excerpt:
      "70% of users who churn do so within the first week. Onboarding isn't a feature — it's your most critical retention mechanism. Here's how to design it right.",
    date: "2026-04-08",
    category: "SaaS",
    readTime: "8 min",
    featuredImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=85",
    author: "Hasanul",
    tags: ["SaaS", "UX Design", "Onboarding", "Retention", "Product Design"],
    toc: [
      { id: "why-it-matters", label: "Why Onboarding Matters Most", level: 2 },
      { id: "the-aha-moment", label: "Engineering the Aha Moment", level: 2 },
      { id: "progressive-disclosure", label: "Progressive Disclosure", level: 3 },
      { id: "checklist", label: "The Onboarding Checklist", level: 2 },
    ],
    body: `
<h2 id="why-it-matters">Why Onboarding Matters Most</h2>
<p>Every SaaS company obsesses over acquisition — CAC, conversion rates, ad spend. But the dirty secret is that <strong>retention is where the money is made</strong>. A 5% increase in retention can increase profits by 25–95% (Bain & Company).</p>
<p>And retention begins at onboarding.</p>
<h2 id="the-aha-moment">Engineering the Aha Moment</h2>
<p>Every great SaaS product has an "aha moment" — the first time the user experiences the core value. For Slack, it's sending and receiving the first message. For Figma, it's seeing your teammate's cursor move in real-time.</p>
<p>Your job as a product designer is to engineer the path to that moment to be as <strong>short, clear, and memorable</strong> as possible.</p>
<blockquote>
  <p>The best onboarding doesn't feel like onboarding. It feels like play.</p>
</blockquote>
<h3 id="progressive-disclosure">Progressive Disclosure</h3>
<p>Don't show everything at once. The #1 mistake in onboarding flows is overwhelming users with every feature on day one. Use progressive disclosure: show the right feature at the right moment, contextually, as the user is ready for it.</p>
<h2 id="checklist">The Onboarding Checklist</h2>
<ul>
  <li>✅ Single clear CTA on first screen</li>
  <li>✅ Profile/setup step takes under 2 minutes</li>
  <li>✅ First value delivered within 5 minutes of signup</li>
  <li>✅ In-app tooltips are contextual, not sequential</li>
  <li>✅ Empty states are instructional, not blank</li>
  <li>✅ Day 1 email is celebratory, not tutorial-heavy</li>
</ul>
    `,
  },
  {
    slug: "seo-to-aeo-strategy",
    title: "From SEO to AEO: Ranking in the Age of AI Search",
    excerpt:
      "ChatGPT, Gemini, and Perplexity are answering your customers' questions — and they're not citing your blog. Here's how to get cited as the authoritative source.",
    date: "2026-04-01",
    category: "Growth",
    readTime: "10 min",
    featuredImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=85",
    author: "Hasanul",
    tags: ["SEO", "AEO", "GEO", "AI", "Growth", "Content Strategy"],
    toc: [
      { id: "seo-is-changing", label: "SEO Is Changing Fundamentally", level: 2 },
      { id: "what-aeo-is", label: "What AEO Actually Means", level: 2 },
      { id: "structured-data", label: "Structured Data and Schema", level: 3 },
      { id: "e-e-a-t", label: "E-E-A-T in the LLM Age", level: 3 },
      { id: "action-plan", label: "Your 30-Day AEO Action Plan", level: 2 },
    ],
    body: `
<h2 id="seo-is-changing">SEO Is Changing Fundamentally</h2>
<p>For two decades, SEO meant ranking on the first page of Google for target keywords. That's still important. But something bigger is happening: <strong>the first page is being replaced by a single AI-generated answer</strong>.</p>
<p>If you search "best UI/UX agency for SaaS" on Google in 2026, the top result is often an AI Overview — a summary that cites three or four sources. If you're not one of those sources, you're invisible.</p>
<h2 id="what-aeo-is">What AEO Actually Means</h2>
<p>Answer Engine Optimization (AEO) is the practice of structuring your content so that AI systems — not just search crawlers — can understand, trust, and cite your content as authoritative.</p>
<p>GEO (Generative Engine Optimization) is the same concept applied specifically to LLM-generated responses. The goal is to be the source that ChatGPT quotes when someone asks a question in your domain.</p>
<blockquote>
  <p>The next trillion-dollar opportunity on the internet is being the authoritative answer to every question in your niche.</p>
</blockquote>
<h3 id="structured-data">Structured Data and Schema</h3>
<p>Implement JSON-LD schema on every page: Article, FAQ, HowTo, Product, and Person schemas all help LLMs understand the context of your content. Google's Rich Results test is your friend.</p>
<h3 id="e-e-a-t">E-E-A-T in the LLM Age</h3>
<p>Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) was designed for human raters. But LLMs have internalized it. Write with genuine expertise, cite your sources, show your work, and your content will rank in both search and AI responses.</p>
<h2 id="action-plan">Your 30-Day AEO Action Plan</h2>
<ul>
  <li><strong>Week 1:</strong> Audit your top 20 pages for FAQ schema opportunities.</li>
  <li><strong>Week 2:</strong> Add JSON-LD structured data to all key pages.</li>
  <li><strong>Week 3:</strong> Rewrite introductions to directly answer the target question in the first paragraph.</li>
  <li><strong>Week 4:</strong> Build topical authority — publish 3 deep-dive articles in your core niche.</li>
</ul>
    `,
  },
  {
    slug: "no-code-tools-2026",
    title: "The No-Code Stack That Launches Products in 72 Hours",
    excerpt:
      "Framer, Webflow, Supabase, and Zapier have changed what's possible without writing a single line of code. Here's how I validate ideas and ship MVPs at startup speed.",
    date: "2026-03-25",
    category: "No-Code",
    readTime: "5 min",
    featuredImage:
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=1200&q=85",
    author: "Hasanul",
    tags: ["No-Code", "Framer", "Webflow", "Supabase", "MVP", "Startup"],
    toc: [
      { id: "the-stack", label: "The Stack", level: 2 },
      { id: "framer-vs-webflow", label: "Framer vs Webflow", level: 3 },
      { id: "backend-options", label: "Backend Without Code", level: 2 },
      { id: "real-world", label: "Real-World Example", level: 2 },
    ],
    body: `
<h2 id="the-stack">The Stack</h2>
<p>No-code has matured dramatically. The tools available in 2026 can handle 90% of what you'd previously need a full engineering team to build. For most digital agencies and solo founders, <strong>no-code is not a compromise — it's the smart choice</strong>.</p>
<p>Here's my go-to stack:</p>
<ul>
  <li><strong>Framer</strong> — for marketing sites and landing pages with cinematic design</li>
  <li><strong>Webflow</strong> — for content-heavy sites with CMS requirements</li>
  <li><strong>Supabase</strong> — for backend: database, auth, realtime, storage</li>
  <li><strong>Zapier / Make</strong> — for automation and integration</li>
  <li><strong>Stripe</strong> — for payments</li>
</ul>
<h3 id="framer-vs-webflow">Framer vs Webflow</h3>
<p>Framer wins for design-forward projects with complex animations and interactions. Webflow wins for editorial content, blogs, and e-commerce with its Finsweet attributes ecosystem. Both are excellent — pick based on the project type, not brand loyalty.</p>
<h2 id="backend-options">Backend Without Code</h2>
<p>Supabase gives you a full Postgres database, row-level security, realtime subscriptions, and an auto-generated REST/GraphQL API — all from a dashboard. For 90% of MVPs, this is more than enough backend.</p>
<h2 id="real-world">Real-World Example</h2>
<p>I recently built a client's B2B lead generation tool — landing page, lead capture form, CRM integration, and automated email sequence — in 68 hours using Framer + Supabase + Make. The client was generating qualified leads within 72 hours of kickoff.</p>
<blockquote>
  <p>Speed is a feature. Ship, learn, iterate. No-code makes that possible.</p>
</blockquote>
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(current: BlogPost, count = 3): BlogPost[] {
  return blogPosts
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .slice(0, count);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  if (category === "All") return getAllPosts();
  return getAllPosts().filter((p) => p.category === category);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

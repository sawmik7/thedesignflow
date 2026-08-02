import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, any> | Record<string, any>[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  articleTags?: string[];
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  faq?: FAQItem[];
}

const DEFAULT_DOMAIN = "https://thedesignflow.website";
const DEFAULT_IMAGE = "https://thedesignflow.website/assets/og-cover.jpg";
const TWITTER_HANDLE = "@thedesignflow";
const SITE_NAME = "The Design Flow";

export default function SEO({
  title,
  description,
  path = "",
  keywords,
  ogImage = DEFAULT_IMAGE,
  ogType = "website",
  schema,
  author,
  publishedTime,
  modifiedTime,
  articleTags,
  noIndex = false,
  breadcrumbs,
  faq,
}: SEOProps) {
  // Consistent brand suffix
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;

  // Canonical URL
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${DEFAULT_DOMAIN}${cleanPath === "/" ? "" : cleanPath}`;

  // Absolute OG image
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${DEFAULT_DOMAIN}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  // Build BreadcrumbList JSON-LD
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": DEFAULT_DOMAIN,
          },
          ...breadcrumbs.map((crumb, idx) => ({
            "@type": "ListItem",
            "position": idx + 2,
            "name": crumb.name,
            "item": crumb.url.startsWith("http") ? crumb.url : `${DEFAULT_DOMAIN}${crumb.url}`,
          })),
        ],
      }
    : null;

  // Build FAQPage JSON-LD
  const faqSchema = faq && faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      }
    : null;

  // Merge all schema blocks into a single array
  const allSchemas = [
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    ...(faqSchema ? [faqSchema] : []),
  ];

  return (
    <Helmet>
      {/* ── Basic Metadata ── */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author || "Hasanul — The Design Flow"} />
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, nofollow"
            : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        }
      />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${fullTitle} — The Design Flow`} />

      {/* ── Twitter / X Cards ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      {/* ── Article-specific ── */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {ogType === "article" && articleTags && articleTags.map((tag) => (
        <meta property="article:tag" content={tag} key={tag} />
      ))}

      {/* ── JSON-LD Schema Injection ── */}
      {allSchemas.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(allSchemas.length === 1 ? allSchemas[0] : allSchemas)}
        </script>
      )}
    </Helmet>
  );
}

/**
 * SchemaOrg — Standalone JSON-LD injector (no Helmet dependency)
 *
 * Use this when you need to inject additional structured data blocks
 * outside of the main SEO component, e.g. inline within a section.
 *
 * Usage:
 *   <SchemaOrg schema={{ "@context": "https://schema.org", "@type": "FAQPage", ... }} />
 */

interface SchemaOrgProps {
  schema: Record<string, unknown> | Record<string, unknown>[];
}

export default function SchemaOrg({ schema }: SchemaOrgProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

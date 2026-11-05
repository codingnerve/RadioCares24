import type { Metadata } from "next";
import { site } from "./site";

/** Page-level openGraph replaces the layout's, so the share image is declared explicitly every time. */
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "RadioCares24: friendly help for your car's satellite radio",
};

type PageMeta = {
  /** Page title without the site suffix (the root layout template adds it). */
  title: string;
  description: string;
  /** Path beginning with "/". */
  path: string;
  noindex?: boolean;
};

export const defaultOgImage = ogImage;

/** Metadata with canonical URL and Open Graph / Twitter tags for a public page. */
export function pageMetadata({ title, description, path, noindex }: PageMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
      locale: "en_US",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage.url],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

/** Serialise JSON-LD safely for embedding in a <script> tag. */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  description:
    "Independent assistance and customer support for in-car satellite radio activation, signal, channel and subscription questions.",
  ...(site.address ? { address: { "@type": "PostalAddress", streetAddress: site.address } } : {}),
  ...(site.phone || site.email
    ? {
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          ...(site.phone ? { telephone: site.phone } : {}),
          ...(site.email ? { email: site.email } : {}),
        },
      }
    : {}),
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: `${site.url}${item.path}`,
  })),
});

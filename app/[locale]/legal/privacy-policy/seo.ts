// app/[locale]/legal/_shared/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function buildLegalMetadata({
  locale,
  canonicalPath,
  titleKey,
  descriptionKey,
  fallbackTitle,
  fallbackDescription,
  ogImagePath,
}: {
  locale: string;
  canonicalPath: string;
  titleKey: string;
  descriptionKey: string;
  fallbackTitle: string;
  fallbackDescription: string;
  ogImagePath?: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t(titleKey, { default: fallbackTitle });
  const description = t(descriptionKey, { default: fallbackDescription });

  const ogImage = absoluteUrl(ogImagePath ?? `/og/legal-${locale}.jpg`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr${canonicalPath.replace(`/${locale}`, "")}`),
        en: absoluteUrl(`/en${canonicalPath.replace(`/${locale}`, "")}`),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: absoluteUrl(canonicalPath),
      siteName: g("siteName", { default: "WellWithWaves" }),
      title,
      description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildLegalJsonLd({
  locale,
  canonicalPath,
  name,
}: {
  locale: string;
  canonicalPath: string;
  name: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name,
      url: absoluteUrl(canonicalPath),
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WellWithWaves",
      url: absoluteUrl(`/${locale}`),
      address: {
        "@type": "PostalAddress",
        streetAddress: "110 Rue du Smetz PePSO",
        postalCode: "62120",
        addressLocality: "Campagne-lès-Wardrecques",
        addressCountry: "FR",
      },
      email: "cdhersin@wellwithwaves.com",
      telephone: "+33 6 52 71 03 09",
    },
  ];
}

// app/[locale]/contact/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function buildContactMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "contact" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t("seo.title", { default: "Contact – WellWithWaves" });
  const description = t("seo.description", {
    default:
      "Contactez WellWithWaves : devis, informations produits, services (vente, location, contrôles qualité, nettoyage). Réponse rapide.",
  });

  const canonicalPath = `/${locale}/contact`;
  const ogImage = absoluteUrl(`/og/contact-${locale}.jpg`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/contact`),
        en: absoluteUrl(`/en/contact`),
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

export function buildContactJsonLd(locale: string) {
  const canonicalPath = `/${locale}/contact`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "WellWithWaves",
      url: absoluteUrl(`/${locale}`),
      email: "cdhersin@wellwithwaves.com",
      telephone: "+33 6 52 71 03 09",
      address: {
        "@type": "PostalAddress",
        streetAddress: "110 Rue du Smetz PePSO",
        postalCode: "62120",
        addressLocality: "Campagne-lès-Wardrecques",
        addressCountry: "FR",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      url: absoluteUrl(canonicalPath),
      name: "Contact",
    },
  ];
}

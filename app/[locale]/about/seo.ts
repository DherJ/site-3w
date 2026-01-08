// app/[locale]/about/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type Props = { params: { locale: string } };

export async function getAboutSeo({ params }: Props): Promise<{
  metadata: Metadata;
  jsonLd: object[];
}> {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "about" });
  const g = await getTranslations({ locale, namespace: "global" });

  const canonicalPath = `/${locale}/about`;
  const title = t("seo.title", { defaultValue: "À propos – Well With Waves" });
  const description = t("seo.description", {
    defaultValue:
      "Découvrez Well With Waves (3W) : atelier au siège, engagements qualité, distinctions (HIIT 2025, Fonds IMT Numérique, FHF…), et label Deeptech Bpifrance.",
  });

  const ogImage = absoluteUrl(`/og/about-${locale}.jpg`);

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl("/fr/about"),
        en: absoluteUrl("/en/about"),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: absoluteUrl(canonicalPath),
      siteName: g("siteName", { defaultValue: "WellWithWaves" }),
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

  // JSON-LD (Organization) : simple, propre, et safe
  const jsonLd: object[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: g("siteName", { defaultValue: "WellWithWaves" }),
      alternateName: "3W",
      url: absoluteUrl(`/${locale}`),
      address: {
        "@type": "PostalAddress",
        streetAddress: "110 Rue du Smetz PePSO",
        postalCode: "62120",
        addressLocality: "Campagne-lès-Wardrecques",
        addressCountry: "FR",
      },
      award: [
        "Lauréat programme HIIT 2025",
        "Lauréat du Fonds IMT Numérique de la Fondation Mines-Télécom",
        "Finalistes du concours Mission Entreprendre 2025 – Coup de cœur du jury",
        "Finale au Palmarès des Entreprises Innovantes",
        "Lauréats des Trophées de l’innovation (FHF) – Amélioration de l’expérience soignant",
        "3W labellisée Deeptech par Bpifrance",
      ],
    },
  ];

  return { metadata, jsonLd };
}

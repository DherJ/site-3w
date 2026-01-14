import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";

type Props = { params: { locale: string } };

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "quote" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t("seo.title", { default: t("title", { default: "Demander un devis" }) });
  const description = t("seo.description", {
    default: "Demandez un devis en quelques étapes. Réponse rapide et adaptée à vos besoins.",
  });

  const canonicalPath = `/${locale}/quote`;
  const ogImage = absoluteUrl(`/og/quote-${locale}.jpg`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/quote`),
        en: absoluteUrl(`/en/quote`),
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

export async function getQuoteJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "quote" });

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("seo.title", { default: t("title", { default: "Demander un devis" }) }),
    description: t("seo.description", {
      default: "Demandez un devis en quelques étapes. Réponse rapide et adaptée à vos besoins.",
    }),
    url: absoluteUrl(`/${locale}/quote`),
  };
}

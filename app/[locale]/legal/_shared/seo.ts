import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { absoluteUrl, getSiteUrlForLocale } from "@/components/seo/builders/url";
import { buildOrganizationJsonLd } from "@/components/seo/builders/organization";
import { buildWebsiteJsonLd } from "@/components/seo/builders/website";
import { SEO_COMPANY } from "@/components/seo/constants";

type BuildLegalMetadataArgs = {
  locale: string;
  canonicalPath: string; // ex: `/${locale}/legal/privacy-policy`
  titleKey: string;      // ex: "privacy.title"
  descriptionKey: string;// ex: "privacy.description"
  fallbackTitle: string;
  fallbackDescription: string;
  ogImagePath?: string;  // ex: `/og/legal-${locale}.jpg`
};

export async function buildLegalMetadata({
  locale,
  canonicalPath,
  titleKey,
  descriptionKey,
  fallbackTitle,
  fallbackDescription,
  ogImagePath,
}: BuildLegalMetadataArgs): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "legal" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t(titleKey, { default: fallbackTitle });
  const description = t(descriptionKey, { default: fallbackDescription });

  const canonicalUrl = absoluteUrl(canonicalPath);
  const ogImage = absoluteUrl(ogImagePath ?? `/og/legal-${locale}.jpg`);

  // ✅ robuste: remplace /fr/xxx par /en/xxx etc
  const pathWithoutLocale = canonicalPath.replace(/^\/(fr|en)\//, "/");

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: absoluteUrl(`/fr${pathWithoutLocale}`),
        en: absoluteUrl(`/en${pathWithoutLocale}`),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: canonicalUrl,
      siteName: g("siteName", { default: SEO_COMPANY.brandName }),
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

export async function buildLegalJsonLd({
  locale,
  canonicalPath,
  name,
}: {
  locale: string;
  canonicalPath: string;
  name: string;
}) {
  const g = await getTranslations({ locale, namespace: "global" });

  const siteName = g("siteName", { default: SEO_COMPANY.brandName });
  const siteUrl = getSiteUrlForLocale(locale);      // ex: https://domain.com/fr
  const canonicalUrl = absoluteUrl(canonicalPath);  // ex: https://domain.com/fr/legal/...

  const org = buildOrganizationJsonLd({
    locale,
    siteName,
    siteUrl,
    email: SEO_COMPANY.email,
    phone: SEO_COMPANY.phone,
    address: SEO_COMPANY.address,
  });

  const website = buildWebsiteJsonLd({ siteName, siteUrl });

  const page = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name,
    inLanguage: locale,
    isPartOf: { "@id": `${siteUrl}#website` },
    about: { "@id": `${siteUrl}#organization` },
  } as const;

  return [org, website, page];
}

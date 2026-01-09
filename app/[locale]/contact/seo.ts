import { getSiteUrlForLocale } from "@/components/seo/builders/url";
import { buildOrganizationJsonLd } from "@/components/seo/builders/organization";
import { buildWebsiteJsonLd } from "@/components/seo/builders/website";
import { SEO_COMPANY } from "@/components/seo/constants";

type ContactJsonLdArgs = {
  locale: string;
  canonicalUrl: string; // absoluteUrl(`/${locale}/contact`)
  siteName: string;
};

export function buildContactJsonLd({
  locale,
  canonicalUrl,
  siteName,
}: ContactJsonLdArgs) {
  const siteUrl = getSiteUrlForLocale(locale);

  const org = buildOrganizationJsonLd({
    locale,
    siteName,
    siteUrl,
    email: SEO_COMPANY.email,
    phone: SEO_COMPANY.phone,
    address: SEO_COMPANY.address,
  });

  const website = buildWebsiteJsonLd({ siteName, siteUrl });

  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${canonicalUrl}#contactpage`,
    url: canonicalUrl,
    name: "Contact",
    isPartOf: { "@id": `${siteUrl}#website` },
    about: { "@id": `${siteUrl}#organization` },
  } as const;

  return [org, website, contactPage];
}

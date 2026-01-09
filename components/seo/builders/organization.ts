// components/seo/builders/organization.ts

export type OrganizationJsonLdArgs = {
  locale: string;
  siteName: string;
  siteUrl: string; // base URL du site (ex: https://wellwithwaves.com)
  email: string;
  phone: string;
  address?: {
    streetAddress: string;
    postalCode: string;
    addressLocality: string;
    addressCountry: string;
  };
  contactType?: string; // default: "customer support"
  availableLanguages?: string[]; // optionnel
};

export function buildOrganizationJsonLd({
  locale,
  siteName,
  siteUrl,
  email,
  phone,
  address = {
    streetAddress: "110 Rue du Smetz PePSO",
    postalCode: "62120",
    addressLocality: "Campagne-lès-Wardrecques",
    addressCountry: "FR",
  },
  contactType = "customer support",
  availableLanguages,
}: OrganizationJsonLdArgs) {
  const langs =
    availableLanguages ??
    (locale === "fr" ? ["fr", "en"] : ["en", "fr"]);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: siteName,
    url: siteUrl,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType,
        email,
        telephone: phone,
        availableLanguage: langs,
      },
    ],
  } as const;
}

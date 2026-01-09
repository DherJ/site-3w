type ContactJsonLdArgs = {
  locale: string;
  canonicalUrl: string;
  siteName: string;
  email: string;
  phone: string;
};

export function buildContactJsonLd({
  locale,
  canonicalUrl,
  siteName,
  email,
  phone,
}: ContactJsonLdArgs) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${canonicalUrl}#organization`,
      name: siteName,
      url: canonicalUrl.replace(/\/contact\/?$/, ""),
      email,
      telephone: phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "110 Rue du Smetz PePSO",
        postalCode: "62120",
        addressLocality: "Campagne-lès-Wardrecques",
        addressCountry: "FR",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email,
          telephone: phone,
          availableLanguage: locale === "fr" ? ["fr", "en"] : ["en", "fr"],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${canonicalUrl}#contactpage`,
      url: canonicalUrl,
      name: locale === "fr" ? "Contact" : "Contact",
      isPartOf: {
        "@type": "WebSite",
        "@id": `${canonicalUrl.replace(/\/contact\/?$/, "")}#website`,
        name: siteName,
        url: canonicalUrl.replace(/\/contact\/?$/, ""),
      },
      about: {
        "@type": "Organization",
        "@id": `${canonicalUrl}#organization`,
      },
    },
  ];
}

type WebsiteArgs = {
  siteName: string;
  siteUrl: string; // ex: https://wellwithwaves.com/fr
};

export function buildWebsiteJsonLd({ siteName, siteUrl }: WebsiteArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: siteName,
    url: siteUrl,
  } as const;
}

import type { MetadataRoute } from "next";

const SITE_URL = "https://wellwithwaves.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/fr",
    "/fr/products",
    "/fr/services/sales",
    "/fr/services/rental",
    "/fr/services/quality",
    "/fr/services/cleaning",
    "/fr/partners",
    "/fr/contact",
    "/fr/quote",
    "/en",
    "/en/products",
    "/en/services/sales",
    "/en/services/rental",
    "/en/services/quality",
    "/en/services/cleaning",
    "/en/partners",
    "/en/contact",
    "/en/quote",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "/fr" || route === "/en" ? 1 : 0.7,
  }));
}

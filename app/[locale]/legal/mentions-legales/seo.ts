// app/[locale]/legal/mentions-legales/seo.ts
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const abs = (p: string) => `${SITE_URL}${p.startsWith("/") ? p : `/${p}`}`;

export async function getLegalMentionsSEO(locale: string): Promise<Metadata> {
  const g = await getTranslations({ locale, namespace: "global" });

  const title =
    locale === "fr" ? "Mentions légales – Well With Waves" : "Legal notice – Well With Waves";
  const description =
    locale === "fr"
      ? "Mentions légales et informations éditoriales de Well With Waves."
      : "Legal notice and publisher information for Well With Waves.";

  return {
    title,
    description,
    alternates: {
      canonical: abs(`/${locale}/legal/mentions-legales`),
      languages: {
        fr: abs(`/fr/legal/mentions-legales`),
        en: abs(`/en/legal/mentions-legales`),
      },
    },
    openGraph: {
      type: "website",
      locale,
      url: abs(`/${locale}/legal/mentions-legales`),
      siteName: g("siteName", { default: "WellWithWaves" }),
      title,
      description,
    },
  };
}

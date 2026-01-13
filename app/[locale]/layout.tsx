import type { Metadata } from "next";
import "../globals.css";

import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { SiteHeader } from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = "https://wellwithwaves.com";
const locales = ["fr", "en"] as const;

/* --------------------------------
   Metadata dynamique par langue
--------------------------------- */
export async function generateMetadata({
  params,
}: {
  params: { locale: "fr" | "en" };
}): Promise<Metadata> {
  const { locale } = params;
  const isFr = locale === "fr";

  const title = isFr
    ? "Well With Waves — Équipements premium de radioprotection"
    : "Well With Waves — Premium Radiation Protection Equipment";

  const description = isFr
    ? "Équipements de radioprotection premium. Confection en France, vente, location, contrôles qualité, nettoyage et maintenance."
    : "Premium radiation protection equipment. Made in France, sales, rental, quality checks, cleaning and maintenance.";
  const keywords = [
    "Well With Waves",
    "Well with waves",
    "Well-With-Waves",
    "Well-with-waves",
    "www",
    "3W",
    "3w",
    "radioprotection",
    "équipement de radioprotection",
    "équipements de radioprotection",
    "protection contre les radiations",
    "vêtements de radioprotection",
    "confection française",
    "fabrication française",
    "vente de matériel de radioprotection",
    "location de matériel de radioprotection",
    "contrôles qualité radioprotection",
    "nettoyage matériel de radioprotection",
    "maintenance matériel de radioprotection",
    "radiation protection",
    "radiation protection equipment",
    "radiation protection clothing",
    "French manufacturing",
    "radiation protection equipment sales",
    "radiation protection equipment rental",
    "radiation protection quality checks",
    "radiation protection equipment cleaning",
    "radiation protection equipment maintenance",
    "Amray", // concurrent
    "Mavig", // concurrent
    "Burlington medical", // concurrent
    "Promega", // concurrent
    "Edm imaging", // concurrent
    "MDT", // concurrent
    "Barrier technologies", // concurrent
    "Infab", // concurrent
    "Lemer Pax" // concurrent
  ];

  const url = `${SITE_URL}/${locale}`;

  return {
    title: {
      default: title,
      template: "%s — Well With Waves",
    },
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr`,
        en: `${SITE_URL}/en`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Well With Waves",
      locale: isFr ? "fr_FR" : "en_US",
      images: [
        {
          url: "/og.jpg",
          width: 1200,
          height: 630,
          alt: "Well With Waves — Radioprotection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/* --------------------------------
   JSON-LD Organization
--------------------------------- */
function getOrganizationJsonLd(locale: "fr" | "en") {
  const isFr = locale === "fr";

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Well With Waves",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    slogan: isFr
      ? "Équipements premium de radioprotection — confection en France"
      : "Premium radiation protection equipment — manufactured in France",
    email: "cdhersin@wellwithwaves.com",
    sameAs: [
      "https://www.linkedin.com/company/well-with-waves/",
    ],
  };
}

/* --------------------------------
   Layout
--------------------------------- */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* SEO JSON-LD */}
      <JsonLd data={getOrganizationJsonLd(locale as "fr" | "en")} />

      <div className="relative z-10">
        <SiteHeader />
        <main className="min-h-[70vh] py-24">{children}</main>
        <SiteFooter locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}

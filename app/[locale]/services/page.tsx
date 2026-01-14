import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import SignatureLine from "@/components/ui/SignatureLine";
import { SERVICES } from "@/data/services";
import ServicesClient from "./ServicesClient";
import { getServicesJsonLd } from "./seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/lib/utils";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "services" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t("seo.title", { default: "Services – Protection & Blindage Radiologique" });
  const description = t("seo.description", {
    default:
      "Découvrez nos services : audit, blindage, contrôle & conformité, maintenance. Solutions sur mesure et devis rapide.",
  });

  const canonicalPath = `/${locale}/services`;
  const ogImage = absoluteUrl(`/og/services-${locale}.jpg`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/services`),
        en: absoluteUrl(`/en/services`),
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

export default async function ServicesPage({ params }: Props) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "services" });
  const g = await getTranslations({ locale, namespace: "global" });

  const quoteHref = `/${locale}/quote`;

  const jsonLd = await getServicesJsonLd(locale);

  return (
    <div className="relative">

      <JsonLd data={jsonLd} />

      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-14">

        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            {g("home", { default: "Accueil" })}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{t("title", { default: "Services" })}</span>
        </nav>

        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {t("kicker", { default: "SERVICES" })}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
            {t("title", { default: "Nos services" })}
          </h1>

          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4">
            <SignatureLine align="left" />
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brandMuted md:text-base">
            {t("subtitle", {
              default:
                "Audit, blindage, contrôle et maintenance : un accompagnement complet, orienté terrain.",
            })}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={quoteHref}
              className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
            >
              {g("requestQuote", { default: "Demander un devis" })}
            </Link>

            <a
              href="#list"
              className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
            >
              {t("seeServices", { default: "Voir les services" })}
            </a>
          </div>
        </section>

        <ServicesClient
          services={SERVICES}
        />
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import SignatureLine from "@/components/ui/SignatureLine";
import AboutClient from "./AboutClient";
import { buildAboutJsonLd } from "./seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/components/seo/builders/url";
type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "contact" });

  const title = t("seo.title", { default: "Contact – WellWithWaves" });
  const description = t("seo.description", {
    default:
      "Contactez WellWithWaves pour vos besoins en radioprotection : vente, location, contrôle qualité et maintenance.",
  });

  const canonicalPath = `/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/about`),
        en: absoluteUrl(`/en/about`),
      },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonicalPath),
      title,
      description,
      locale,
      images: [{ url: absoluteUrl(`/og/about-${locale}.jpg`) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(`/og/about-${locale}.jpg`)],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "about" });
  const g = await getTranslations({ locale, namespace: "global" });

  const servicesHref = `/${locale}/services`;
  const quoteHref = `/${locale}/quote`;

  // Data pour le client (micro-animations + mapping)
  const awards = t.raw("recognition.items") as string[];

  const features = t.raw("company.features") as string[];

    const canonicalPath = `/${locale}/about`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  
    const jsonLd = buildAboutJsonLd({
      locale,
      canonicalUrl,
      siteName: g("siteName", { default: "WellWithWaves" }),
    });

  return (
    <div className="relative">
      {/* JSON-LD */}
      <JsonLd data={jsonLd} />

      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            {g("home", { defaultValue: "Accueil" })}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{t("title", { defaultValue: "À propos" })}</span>
        </nav>

        {/* HERO */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {t("kicker", { defaultValue: "À PROPOS" })}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
            {t("hero.h1", { defaultValue: "À propos" })}
          </h1>

          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4">
            <SignatureLine align="left" />
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brandMuted md:text-base">
            {t("hero.p")}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={quoteHref}
              className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
            >
              {g("requestQuote", { defaultValue: "Demander un devis" })}
            </Link>

            <Link
              href={servicesHref}
              className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
            >
              {t("hero.cta2", { defaultValue: "Découvrir nos services" })}
            </Link>
          </div>
        </section>

        {/* SECTIONS (client reveal) */}
        <AboutClient
          locale={locale}
          company={{
            kicker: t("company.kicker", { defaultValue: "L’ENTREPRISE" }),
            title: t("company.h2"),
            p1: t("company.p1"),
            p2: t("company.p2"),
            addressLabel: t("company.addressLabel"),
            address: t("company.address"),
            features,
          }}
          recognition={{
            kicker: t("recognition.kicker", { defaultValue: "RECONNAISSANCE" }),
            title: t("recognition.h2"),
            intro: t("recognition.intro"),
            items: awards,
          }}
          team={{
            kicker: t("team.kicker", { defaultValue: "L’ÉQUIPE" }),
            title: t("team.h2"),
            intro: t("team.intro"),
            ctaTitle: t("team.ctaTitle"),
            ctaDesc: t("team.ctaDesc"),
            quoteHref,
          }}
        />
      </div>
    </div>
  );
}

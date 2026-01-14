import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import SignatureLine from "@/components/ui/SignatureLine";
import ContactClient from "./ContactClient";
import { buildContactJsonLd } from "./seo";
import { getLegalCommon } from "../legal/_shared/legalCommon";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000";

type Props = { params: { locale: string } };

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

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
        fr: absoluteUrl(`/fr/contact`),
        en: absoluteUrl(`/en/contact`),
      },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl(canonicalPath),
      title,
      description,
      locale,
      images: [{ url: absoluteUrl(`/og/contact-${locale}.jpg`) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(`/og/contact-${locale}.jpg`)],
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "contact" });
  const g = await getTranslations({ locale, namespace: "global" });

  const canonicalPath = `/${locale}/contact`;
  const canonicalUrl = absoluteUrl(canonicalPath);

  const common = await getLegalCommon(locale);

  const jsonLd = buildContactJsonLd({
    locale,
    canonicalUrl,
    siteName: g("siteName", { default: "WellWithWaves" }),
  });

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />

      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            {g("home", { default: "Accueil" })}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{t("title", { default: "Contact" })}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {t("kicker", { default: "CONTACT" })}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
            {t("title", { default: "Contact" })}
          </h1>

          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4">
            <SignatureLine align="left" />
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brandMuted md:text-base">
            {t("subtitle", {
              default:
                "Une question, un besoin spécifique ou une demande de devis ? Écrivez-nous, on revient vers vous rapidement.",
            })}
          </p>

          {/* Client form + infos */}
          <ContactClient locale={locale} legalCommon={common} />
        </section>
      </div>
    </div>
  );
}

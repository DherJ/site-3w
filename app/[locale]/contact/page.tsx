// app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import SignatureLine from "@/components/ui/SignatureLine";
import { JsonLd } from "@/components/seo/JsonLd";
import ContactClient from "./ContactClient";
import { buildContactJsonLd, buildContactMetadata } from "./seo";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return buildContactMetadata(params.locale);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = params;
  const g = await getTranslations({ locale, namespace: "global" });
  const t = await getTranslations({ locale, namespace: "contact" });

  const jsonLd = buildContactJsonLd(locale);

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

        {/* HERO */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {t("kicker", { default: "CONTACT" })}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
            {t("h1", { default: "Parlons de votre besoin" })}
          </h1>

          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4">
            <SignatureLine align="left" />
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brandMuted md:text-base">
            {t("subtitle", {
              default:
                "Devis, informations produits, services (vente, location, contrôles qualité, nettoyage) — on vous répond rapidement.",
            })}
          </p>

          <ContactClient locale={locale} />
        </section>
      </div>
    </div>
  );
}

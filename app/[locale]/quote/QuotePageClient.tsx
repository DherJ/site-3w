"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { JsonLd } from "@/components/seo/JsonLd";
import SignatureLine from "@/components/ui/SignatureLine";
import { QuoteWizard } from "@/components/QuoteWizard";

export default function QuotePageClient({
  locale,
  copy,
  jsonLd,
}: {
  locale: string;
  copy: any;
  jsonLd: any;
}) {
  const tGlobal = useTranslations("global");
  const t = useTranslations("quote");

  return (
    <div className="relative">
      <JsonLd data={jsonLd} />

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-14">
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            {tGlobal("home", { default: "Accueil" })}
          </Link>

          <span className="text-brandMuted/40">/</span>

          <span className="text-brandNavy">
            {t("title", { default: "Demander un devis" })}
          </span>
        </nav>

        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
              {copy.heroKicker}
            </div>
            <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-brandNavy">
              {copy.heroTitle}
            </h2>
            <div className="mt-3">
              <SignatureLine align="left" />
            </div>
          </div>

          <div className="mt-8">
            <QuoteWizard locale={locale} copy={copy} />
          </div>
        </section>
      </div>
    </div>
  );
}

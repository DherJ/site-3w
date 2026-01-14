// app/[locale]/services/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import SignatureLine from "@/components/ui/SignatureLine";
import { JsonLd } from "@/components/seo/JsonLd";
import ProcessWow, { type ProcessStep } from "@/components/ui/ProcessWow";

import { SERVICES } from "@/data/services";
import { withBasePath } from "@/lib/withBasePath";
import { absoluteUrl } from "@/lib/utils";

type Props = {
  params: { locale: string; slug: string };
};

function getHeroImage(slug: string) {
  return SERVICES.find((s) => s.slug === slug)?.imageSrc ?? "/services/default.png";
}

function isKnownSlug(slug: string) {
  return SERVICES.some((s) => s.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;

  if (!isKnownSlug(slug)) return {};

  const g = await getTranslations({ locale, namespace: "global" });
  const t = await getTranslations({ locale, namespace: "serviceDetail" });

  const title = t(`${slug}.seo.title`);
  const description = t(`${slug}.seo.description`);

  const canonicalPath = `/${locale}/services/${slug}`;
  const ogImage = absoluteUrl(`/og/services-${slug}-${locale}.jpg`);

  return {
    title: `${title} – ${g("siteName", { default: "WellWithWaves" })}`,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/services/${slug}`),
        en: absoluteUrl(`/en/services/${slug}`),
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

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = params;

  if (!isKnownSlug(slug)) notFound();

  const g = await getTranslations({ locale, namespace: "global" });
  const t = await getTranslations({ locale, namespace: "serviceDetail" });

  // Common
  const kicker = t("common.kicker");
  const seeProcess = t("common.seeProcess");
  const includedTitle = t("common.includedTitle");
  const prosTitle = t("common.prosTitle");
  const consTitle = t("common.consTitle");
  const processTitle = t("common.processTitle");
  const qualityTitle = t("common.qualityTitle");
  const faqTitle = t("common.faqTitle");
  const ctaTitle = t("common.ctaTitle");
  const ctaText = t("common.ctaText");
  const ctaButton = t("common.ctaButton");

  const title = t(`${slug}.title`);
  const subtitle = t(`${slug}.subtitle`);
  const whyTitle = t(`${slug}.why.title`);

  const whyBullets = t.raw(`${slug}.why.bullets`) as string[];
  const includedBullets = t.raw(`${slug}.included.bullets`) as string[];
  const pros = t.raw(`${slug}.pros`) as string[];
  const cons = t.raw(`${slug}.cons`) as string[];
  const steps = t.raw(`${slug}.process.steps`) as ProcessStep[];
  const qualityText = t(`${slug}.quality.text`);
  const qualityBullets = t.raw(`${slug}.quality.bullets`) as string[];
  const faq = t.raw(`${slug}.faq`) as { q: string; a: string }[];

  const heroImage = getHeroImage(slug);

  const quoteHref = `/${locale}/quote`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: subtitle,
    provider: {
      "@type": "Organization",
      name: g("siteName", { default: "WellWithWaves" }),
      url: absoluteUrl(`/${locale}`),
    },
    areaServed: "FR",
    url: absoluteUrl(`/${locale}/services/${slug}`),
  };

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
          <Link href={`/${locale}/services`} className="hover:text-brandNavy">
            {g("services", { default: "Services" })}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                {kicker}
              </div>

              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
                {title}
              </h1>

              <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

              <div className="mt-4">
                <SignatureLine align="left" />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brandMuted md:text-base">
                {subtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={quoteHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
                >
                  {g("requestQuote", { default: "Demander un devis" })}
                </Link>

                <a
                  href="#process"
                  className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
                >
                  {seeProcess}
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-brandLine bg-white/60">
              <div className="relative h-52 w-full md:h-64">
                <Image
                  src={withBasePath(heroImage)}
                  alt=""
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 768px) 320px, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Top grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {/* Why */}
          <section className="md:col-span-2 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur">
            <h2 className="text-lg font-extrabold text-brandNavy">{whyTitle}</h2>

            <ul className="mt-4 space-y-2 text-sm text-brandMuted">
              {whyBullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Included */}
          <aside className="rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft">
            <h3 className="text-base font-extrabold">{includedTitle}</h3>

            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {includedBullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Pros / Cons */}
        <section className="mt-8 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
          <h2 className="text-lg font-extrabold text-brandNavy">
            {prosTitle} & {consTitle}
          </h2>

          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
              <h3 className="font-extrabold text-brandNavy">{prosTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-brandMuted">
                {pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
              <h3 className="font-extrabold text-brandNavy">{consTitle}</h3>
              <ul className="mt-3 space-y-2 text-sm text-brandMuted">
                {cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandNavy/35" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <div id="process" className="mt-8">
          <ProcessWow
            title={processTitle}
            steps={steps}
            subtitle={t(`${slug}.process.subtitle`, { default: "" })}
          />
        </div>

        {/* Quality */}
        <section className="mt-8 rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft md:p-8">
          <h2 className="text-lg font-extrabold">{qualityTitle}</h2>

          <p className="mt-3 text-sm text-white/90">{qualityText}</p>

          <ul className="mt-5 space-y-2 text-sm text-white/90">
            {qualityBullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
          <h2 className="text-lg font-extrabold text-brandNavy">{faqTitle}</h2>

          <div className="mt-6 space-y-4">
            {faq.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
                <summary className="cursor-pointer font-extrabold text-brandNavy">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brandMuted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-brandNavy">{ctaTitle}</h2>
              <p className="mt-2 text-sm text-brandMuted">{ctaText}</p>
            </div>

            <Link
              href={quoteHref}
              className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
            >
              {ctaButton}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

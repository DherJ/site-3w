import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import SignatureLine from "@/components/ui/SignatureLine";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICE_PAGES } from "@/data/servicePages";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type Props = { params: { locale: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const g = await getTranslations({ locale, namespace: "global" });

  const content = SERVICE_PAGES[slug];
  if (!content) return {};

  const canonicalPath = `/${locale}/services/${slug}`;
  const ogImage = absoluteUrl(`/og/services-${slug}-${locale}.jpg`);

  return {
    title: `${content.title} – ${g("siteName", { default: "WellWithWaves" })}`,
    description: content.subtitle,
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
      title: content.title,
      description: content.subtitle,
      images: [{ url: ogImage }],
    },
    twitter: { card: "summary_large_image", title: content.title, description: content.subtitle, images: [ogImage] },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = params;
  const g = await getTranslations({ locale, namespace: "global" });

  const content = SERVICE_PAGES[slug];
  if (!content) notFound();

  const quoteHref = `/${locale}/quote`;

  // JSON-LD simple (Service)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.title,
    description: content.subtitle,
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
            Services
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{content.title}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                SERVICE
              </div>

              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
                {content.title}
              </h1>

              <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

              <div className="mt-4">
                <SignatureLine align="left" />
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-brandMuted md:text-base">
                {content.subtitle}
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
                  Voir le processus
                </a>
              </div>
            </div>

            {/* Illustration */}
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-brandLine bg-white/60">
              <div className="relative h-52 w-full md:h-64">
                <Image
                  src={content.heroImage}
                  alt=""
                  fill
                  className="object-contain p-6"
                  sizes="(min-width: 768px) 320px, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {/* Pourquoi */}
          <section className="md:col-span-2 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur">
            <h2 className="text-lg font-extrabold text-brandNavy">{content.why.title}</h2>
            <ul className="mt-4 space-y-2 text-sm text-brandMuted">
              {content.why.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Inclus */}
          <aside className="rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft">
            <h3 className="text-base font-extrabold">{content.included.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {content.included.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Avantages / Inconvénients */}
        <section className="mt-8 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
          <h2 className="text-lg font-extrabold text-brandNavy">Avantages & limites</h2>
          <div className="mt-5 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
              <h3 className="font-extrabold text-brandNavy">Avantages</h3>
              <ul className="mt-3 space-y-2 text-sm text-brandMuted">
                {content.pros.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
              <h3 className="font-extrabold text-brandNavy">Points d’attention</h3>
              <ul className="mt-3 space-y-2 text-sm text-brandMuted">
                {content.cons.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandNavy/40" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="mt-8 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
          <h2 className="text-lg font-extrabold text-brandNavy">{content.process.title}</h2>

          <ol className="mt-6 space-y-4">
            {content.process.steps.map((s) => (
              <li key={s.title} className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
                <div className="font-extrabold text-brandNavy">{s.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-brandMuted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Qualité */}
        <section className="mt-8 rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft md:p-8">
          <h2 className="text-lg font-extrabold">{content.quality.title}</h2>
          <p className="mt-3 text-sm text-white/90">{content.quality.text}</p>
          <ul className="mt-5 space-y-2 text-sm text-white/90">
            {content.quality.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section className="mt-8 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
          <h2 className="text-lg font-extrabold text-brandNavy">FAQ</h2>
          <div className="mt-6 space-y-4">
            {content.faq.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white p-5 ring-1 ring-brandLine">
                <summary className="cursor-pointer font-extrabold text-brandNavy">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brandMuted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-10 rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-lg font-extrabold text-brandNavy">Parlons de votre besoin</h2>
              <p className="mt-2 text-sm text-brandMuted">
                Décrivez votre contexte (durée, quantités, contraintes), on vous propose une solution adaptée.
              </p>
            </div>
            <Link
              href={quoteHref}
              className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
            >
              {g("requestQuote", { default: "Demander un devis" })}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { PRODUCTS } from "@/data/products";
import { PRODUCT_CATEGORIES } from "@/data/productCategories";
import type { LeadEquivalent, ProductSize } from "@/data/products";

import ProductCard from "@/components/ui/ProductCard";
import SignatureLine from "@/components/ui/SignatureLine";
import ProductGallery from "@/components/products/ProductGallery";
import ProductSpecsTable from "@/components/products/ProductSpecsTable";
import ProductHighlights from "@/components/products/ProductHighlights";
import ProductVariantsSelector from "@/components/products/ProductVariantsSelector";

import {
  getDefaultLead,
  getVariantForLead,
  isSizeValidForLead,
} from "@/components/products/hooks/getSelectedVariant";

type PageProps = { params: { locale: string; slug: string } };

export default function ProductPageClient({ params }: PageProps) {
  const t = useTranslations("products");
  const tradGlobal = useTranslations("global");

  const { locale, slug } = params;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return notFound();

  const productsHref = `/${locale}/products`;
  const quoteBaseHref = `/${locale}/quote`;

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  const categoryLabel =
    PRODUCT_CATEGORIES?.[product.category]?.fallback ?? product.category;

  const galleryImages = product.images?.length
    ? product.images
    : [{ src: "/placeholder.jpg", alt: product.title }];

  // ✅ Variantes (state)
  const [selectedLead, setSelectedLead] = useState<LeadEquivalent>(() =>
    getDefaultLead(product)
  );
  const [selectedSize, setSelectedSize] = useState<ProductSize | undefined>(
    undefined
  );

  // Keep size valid when lead changes (sécurité)
  const safeSize = useMemo(() => {
    return isSizeValidForLead(product, selectedLead, selectedSize)
      ? selectedSize
      : undefined;
  }, [product, selectedLead, selectedSize]);

  const variant = useMemo(
    () => getVariantForLead(product, selectedLead),
    [product, selectedLead]
  );

  // ✅ Devis link avec paramètres
  const quoteHref = useMemo(() => {
    const qs = new URLSearchParams();
    qs.set("product", product.slug);
    qs.set("pb", selectedLead);
    if (safeSize) qs.set("size", safeSize);
    return `${quoteBaseHref}?${qs.toString()}`;
  }, [quoteBaseHref, product.slug, selectedLead, safeSize]);

  const specs = variant?.specs ?? product.specs;
  const datasheetPdf = variant?.datasheetPdf ?? product.datasheetPdf;


  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            {tradGlobal("home")}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <Link href={productsHref} className="hover:text-brandNavy">
            {tradGlobal("products")}
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{product.title}</span>
        </nav>

        {/* HERO */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            {/* Gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                title={product.title}
                images={galleryImages}
                enableHoverSplit={false}
              />
            </div>

            {/* Content */}
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                {categoryLabel.toUpperCase()}
              </div>

              <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
                {product.title}
              </h1>
              <div className="mt-1 h-[2px] w-8 rounded-full bg-brandChampagne/60" />

              <div className="mt-4">
                <SignatureLine align="left" />
              </div>

              <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
                {product.meta}
              </p>

              {/* Tags */}
              {product.tags?.length ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/70 px-3 py-1.5 text-[11px] font-extrabold tracking-[0.14em] text-brandNavy ring-1 ring-brandLine"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              ) : null}

              {/* Variants selector */}
              <ProductVariantsSelector
                variants={product.variants}
                selectedLead={selectedLead}
                selectedSize={safeSize}
                onChangeLead={setSelectedLead}
                onChangeSize={setSelectedSize}
              />

              {/* CTA */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href={quoteHref}
                  className="inline-flex items-center justify-center rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandChampagne/90"
                >
                  {tradGlobal("requestQuote")}
                </Link>

                <Link
                  href={productsHref}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
                >
                  {t("backCatalogue")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Highlights */}
              {product.highlights?.length ? (
                <ProductHighlights items={product.highlights} />
              ) : null}

              {/* Specs */}
              {specs?.length ? <ProductSpecsTable specs={specs} /> : null}

              {/* Datasheet PDF */}
              {datasheetPdf ? (
                <div className="mt-8 rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine">
                  <div>
                    <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                      {t("technicalFile")}
                    </div>

                    <p className="mt-2 text-sm text-brandMuted">
                      {t("technicalTitle")}
                    </p>

                    <div className="mt-4 flex justify-end">
                      <div className="w-[220px]">
                        <SignatureLine align="center" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href={datasheetPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
                    >
                      {t("openPdf")}
                    </a>

                    <a
                      href={datasheetPdf}
                      download
                      className="inline-flex items-center justify-center rounded-2xl bg-brandNavy px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandNavy/90"
                    >
                      {tradGlobal("download")}
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* RELATED */}
        {related.length ? (
          <section className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                  {t("relatedProducts.title")}
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy">
                  {t("relatedProducts.subtitle")}
                </h2>
              </div>
              <div className="hidden md:block w-[240px]">
                <SignatureLine align="center" />
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard
                  key={p.slug}
                  hrefQuote={quoteHref}
                  hrefProduct={`/${locale}/products/${p.slug}`}
                  title={p.title}
                  meta={p.meta}
                  imageSrc={p.images?.[0]?.src ?? "/placeholder.jpg"}
                  hoverImageSrc={p.images?.[0]?.hoverSrc}
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LeadEquivalent, Product, ProductSize } from "@/data/products";
import ProductVariantPicker from "@/components/products/ProductVariantPicker";

export default function ProductQuoteCTA({
  locale,
  product,
  quoteBaseHref,
}: {
  locale: string;
  product: Product;
  quoteBaseHref: string; // `/${locale}/quote`
}) {
  const [pb, setPb] = useState<LeadEquivalent | undefined>(() => {
    const uniques = Array.from(new Set(product.variants.map((v) => v.leadEquivalent)));
    return uniques.length === 1 ? uniques[0] : product.variants[0]?.leadEquivalent;
  });

  const [size, setSize] = useState<ProductSize | undefined>(() => product.size);

  const quoteHref = useMemo(() => {
    const params = new URLSearchParams();
    params.set("product", product.slug);
    if (pb) params.set("pb", pb);
    if (size) params.set("size", size);
    return `${quoteBaseHref}?${params.toString()}`;
  }, [quoteBaseHref, product.slug, pb, size]);

  const canQuote =
    !!product.slug &&
    !!pb &&
    !!size; // tu peux rendre plus permissif si tu veux

  return (
    <div className="mt-8">
      <ProductVariantPicker
        product={product}
        defaultPb={pb}
        defaultSize={size}
        onChange={(v) => {
          setPb(v.pb);
          setSize(v.size);
        }}
      />

      <div className="mt-5">
        <Link
          href={quoteHref}
          aria-disabled={!canQuote}
          className={[
            "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-extrabold transition-all duration-300",
            canQuote
              ? "bg-brandChampagne text-brandNavy shadow-sm hover:-translate-y-0.5 hover:bg-brandChampagne/90"
              : "bg-white/60 text-brandMuted ring-1 ring-brandLine cursor-not-allowed",
          ].join(" ")}
        >
          {canQuote ? "Demander un devis (avec variantes)" : "Sélectionnez Pb + taille"}
        </Link>

        {/* micro info */}
        <p className="mt-2 text-xs text-brandMuted">
          Lien généré :{" "}
          <span className="font-mono text-[11px] text-brandNavy/80">
            {quoteHref}
          </span>
        </p>
      </div>
    </div>
  );
}

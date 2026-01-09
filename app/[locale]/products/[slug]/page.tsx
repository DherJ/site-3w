import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PRODUCTS } from "@/data/products";
import ProductPageClient from "./ProductPageClient";
import { getProductJsonLd, getProductMetadata } from "./seo";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return getProductMetadata({ locale: params.locale, slug: params.slug });
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  // Ici, on met une URL de devis "générique" (sans variantes),
  // le choix final (pb/size) reste géré dans le client.
  const quotePath = `/${params.locale}/quote?product=${product.slug}`;

  const jsonLd = getProductJsonLd({
    locale: params.locale,
    slug: params.slug,
    quotePath,
  });

  return (
    <>
      {jsonLd ? <JsonLd data={jsonLd} /> : null}
      <ProductPageClient params={params} />
    </>
  );
}

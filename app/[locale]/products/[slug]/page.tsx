// app/[locale]/products/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PRODUCTS } from "@/data/products";
import ProductPageClient from "./ProductPage.client";

type Props = {
  params: { locale: string; slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return {};

  const title = `${product.title} – Protection & Blindage Radiologique`;
  const description =
    product.meta ??
    `Découvrez ${product.title}. Caractéristiques techniques, variantes, et demande de devis en ligne.`;

  // ⚠️ idéalement URL absolue (si tes src sont relatives)
  const image = product.images?.[0]?.src ?? "/og-default.jpg";

  const canonical = `https://wellwithwaves.com/${params.locale}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      images: [{ url: image }],
      locale: params.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);
  if (!product) return notFound();

  // Server component wrapper → on délègue l'UI au client component
  return <ProductPageClient params={params} />;
}

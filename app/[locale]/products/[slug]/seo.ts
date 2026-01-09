import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_CATEGORIES } from "@/data/productCategories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoArgs = {
  locale: string;
  slug: string;
};

export async function getProductMetadata({ locale, slug }: SeoArgs): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const t = await getTranslations({ locale, namespace: "products" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = `${product.title} – ${t("seo.suffix", { default: "Protection & Blindage Radiologique" })}`;
  const description =
    product.meta ??
    t("seo.fallbackDescription", {
      default: `Découvrez ${product.title}. Caractéristiques techniques, variantes, et demande de devis en ligne.`,
    });

  const canonicalPath = `/${locale}/products/${product.slug}`;
  const image = product.images?.[0]?.src ? absoluteUrl(product.images[0].src) : absoluteUrl("/og-default.jpg");

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/products/${product.slug}`),
        en: absoluteUrl(`/en/products/${product.slug}`),
      },
    },
    openGraph: {
      type: "website", // ✅ "product" n'est pas accepté par Next OG validator
      locale,
      url: absoluteUrl(canonicalPath),
      siteName: g("siteName", { default: "WellWithWaves" }),
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function getProductJsonLd({ locale, slug, quotePath }: SeoArgs & { quotePath?: string }) {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return null;

  const categoryLabel = PRODUCT_CATEGORIES?.[product.category]?.fallback ?? product.category;

  const canonical = absoluteUrl(`/${locale}/products/${product.slug}`);

  const images =
    product.images?.map((i) => i?.src).filter(Boolean).map((src) => absoluteUrl(src!)) ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.meta ??
      `Découvrez ${product.title}. Caractéristiques techniques, variantes, et demande de devis en ligne.`,
    image: images.length ? images : undefined,
    sku: product.slug,
    category: categoryLabel,
    brand: {
      "@type": "Brand",
      name: "WellWithWaves",
    },
    offers: {
      "@type": "Offer",
      url: quotePath ? absoluteUrl(quotePath) : canonical,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
    url: canonical,
  };
}

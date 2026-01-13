import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PRODUCTS } from "@/data/products";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_CATEGORY_KEYS,
  type ProductCategory,
} from "@/data/productCategories";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

type SeoParams = { locale: string };

/* ------------------------------------------------------------------ */
/* Metadata */
/* ------------------------------------------------------------------ */

export async function getProductsMetadata({ locale }: SeoParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "products" });
  const g = await getTranslations({ locale, namespace: "global" });

  const title = t("seo.title", {
    default: "Catalogue produits – Radioprotection",
  });

  const description = t("seo.description", {
    default:
      "Découvrez notre catalogue d’équipements de radioprotection : tabliers, protège-thyroïde, vestes, jupes. Solutions professionnelles, devis rapide.",
  });

  const canonicalPath = `/${locale}/products`;
  const ogImage = absoluteUrl(`/og/products-${locale}.jpg`);

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
      languages: {
        fr: absoluteUrl(`/fr/products`),
        en: absoluteUrl(`/en/products`),
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

/* ------------------------------------------------------------------ */
/* Helpers */
/* ------------------------------------------------------------------ */

function productCategoryLabel(category: ProductCategory) {
  return PRODUCT_CATEGORIES[category].fallback;
}

function leadEquivalents(product: (typeof PRODUCTS)[number]) {
  return Array.from(new Set(product.variants.map((v) => v.leadEquivalent)));
}

function sizeRange(product: (typeof PRODUCTS)[number]) {
  const all = new Set<string>();
  product.variants.forEach((v) => v.sizes.forEach((s) => all.add(s)));
  return Array.from(all);
}

/* ------------------------------------------------------------------ */
/* JSON-LD */
/* ------------------------------------------------------------------ */

export function getProductsJsonLd(locale: string) {
  const baseUrl = absoluteUrl(`/${locale}`);
  const catalogueUrl = absoluteUrl(`/${locale}/products`);

  /* Breadcrumbs */
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Catalogue produits" : "Product catalog",
        item: catalogueUrl,
      },
    ],
  };

  /* Collection page (catégories) */
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "fr" ? "Catalogue produits" : "Product catalog",
    url: catalogueUrl,
    hasPart: PRODUCT_CATEGORY_KEYS.map((key) => ({
      "@type": "CollectionPage",
      name: productCategoryLabel(key),
      url: absoluteUrl(`/${locale}/products?cat=${encodeURIComponent(key)}`),
    })),
  };

  /* ItemList (liste du catalogue) */
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: PRODUCTS.length,
    itemListElement: PRODUCTS.map((p, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/${locale}/products/${p.slug}`),
      name: p.title,
      image: p.images?.[0]?.src ? absoluteUrl(p.images[0].src) : undefined,
    })),
  };

  /* Product schemas */
  const productSchemas = PRODUCTS.map((p) => {
    const url = absoluteUrl(`/${locale}/products/${p.slug}`);
    const images = p.images.map((img) => absoluteUrl(img.src));

    const lead = leadEquivalents(p);
    const sizes = sizeRange(p);

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.title,
      description: p.meta,
      category: productCategoryLabel(p.category),
      url,
      image: images.length ? images : undefined,

      brand: {
        "@type": "Brand",
        name: "WellWithWaves",
      },

      keywords: p.tags?.join(", "),

      additionalProperty: [
        ...(p.specs ?? []).map((s) => ({
          "@type": "PropertyValue",
          name: s.label,
          value: s.value,
        })),
        ...(lead.length
          ? [
              {
                "@type": "PropertyValue",
                name:
                  locale === "fr"
                    ? "Équivalence plomb disponible"
                    : "Available lead equivalence",
                value: lead.join(" | "),
              },
            ]
          : []),
        ...(sizes.length
          ? [
              {
                "@type": "PropertyValue",
                name:
                  locale === "fr"
                    ? "Tailles disponibles"
                    : "Available sizes",
                value: sizes.join(", "),
              },
            ]
          : []),
      ],

      subjectOf: p.datasheetPdf
        ? {
            "@type": "CreativeWork",
            name:
              locale === "fr"
                ? "Fiche technique (PDF)"
                : "Datasheet (PDF)",
            url: absoluteUrl(p.datasheetPdf),
          }
        : undefined,
    };
  });

  return [breadcrumbs, collectionPage, itemList, ...productSchemas];
}

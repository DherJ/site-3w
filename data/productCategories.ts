export const PRODUCT_CATEGORIES = {
  tabliers: {
    key: "tabliers",
    i18nKey: "categories.tabliers",
    fallback: "Tabliers",
  },
  chasubles: {
    key: "chasubles",
    i18nKey: "categories.chasubles",
    fallback: "Chasubles",
  },
  "protege-thyroide": {
    key: "protege-thyroide",
    i18nKey: "categories.protegeThyroide",
    fallback: "Protège-thyroïde",
  },
  vestes: {
    key: "vestes",
    i18nKey: "categories.vestes",
    fallback: "Vestes",
  },
  jupes: {
    key: "jupes",
    i18nKey: "categories.jupes",
    fallback: "Jupes",
  },
  pediatrique: {
    key: "pediatrique",
    i18nKey: "categories.pediatrique",
    fallback: "Pediatrique",
  },
  autres: {
    key: "autres",
    i18nKey: "categories.autres",
    fallback: "Autres",
  },
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORIES;

export const PRODUCT_CATEGORY_KEYS = Object.keys(
  PRODUCT_CATEGORIES
) as ProductCategory[];

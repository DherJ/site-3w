import { PRODUCT_CATEGORY_KEYS, PRODUCT_CATEGORIES, ProductCategory } from "@/data/productCategories";

export type CategoryMenuItem = {
  key: ProductCategory;
  href: (locale: string) => string;
  imageSrc: string;
  fallback: string;
  i18nKey: string;
};

export const PRODUCT_CATEGORY_MENU: CategoryMenuItem[] = PRODUCT_CATEGORY_KEYS.map((key) => ({
  key,
  href: (locale) => `/${locale}/products?cat=${encodeURIComponent(key)}`,
  imageSrc: `/categories/${key}.jpg`,
  fallback: PRODUCT_CATEGORIES[key].fallback,
  i18nKey: PRODUCT_CATEGORIES[key].i18nKey,
}));

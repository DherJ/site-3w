import type { LeadEquivalent, Product, ProductSize, ProductVariant } from "@/data/products";

export function getDefaultLead(product: Product): LeadEquivalent {
  return product.variants[0]?.leadEquivalent ?? "0,35 mm Pb";
}

export function getVariantForLead(product: Product, lead: LeadEquivalent): ProductVariant | undefined {
  return product.variants.find((v) => v.leadEquivalent === lead);
}

export function isSizeValidForLead(product: Product, lead: LeadEquivalent, size?: ProductSize) {
  if (!size) return true;
  const v = getVariantForLead(product, lead);
  return !!v?.sizes.includes(size);
}

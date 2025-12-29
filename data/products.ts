export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";
export type LeadEquivalent = "0,25 mm Pb" | "0,35 mm Pb" | "0,50 mm Pb";

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductHighlightKey = "finish" | "comfort" | "care" | "options";

export type ProductHighlight = {
  key: ProductHighlightKey;
  value: string;
};

export type ProductCategory =
  | "tabliers"
  | "protege-thyroide"
  | "vestes"
  | "jupes"
  | "autres";

export type ProductImage = {
  src: string;
  alt: string;
  /** Optionnel : split hover sur l’image active */
  hoverSrc?: string;
};

export type ProductVariant = {
  id: string;

  /** ✅ variante sélectionnable */
  leadEquivalent: LeadEquivalent;

  /** tailles dispo pour cette variante Pb */
  sizes: ProductSize[];

  /** optionnel (évolutif) */
  sku?: string;
  datasheetPdf?: string; // si la fiche dépend de la variante
  specs?: ProductSpec[]; // si specs changent selon variante
};

export type Product = {
  slug: string;
  title: string;
  meta: string;

  /** ✅ vraie galerie */
  images: ProductImage[];

  /** ✅ PDF fiche technique (par défaut produit) */
  datasheetPdf?: string;

  category: ProductCategory;
  tags?: string[];

  /** ✅ 1 taille par produit (sélection utilisateur) */
  size?: ProductSize;

  /** ✅ specs table (par défaut produit) */
  specs?: ProductSpec[];

  /** ✅ 4 cards iconées */
  highlights?: ProductHighlight[];

  /** ✅ variantes Pb */
  variants: ProductVariant[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "tablier-plombe-premium",
    title: "Tablier plombé premium",
    meta: "Confort longue durée · Tailles S → XXL · Personnalisable",
    category: "tabliers",
    tags: ["Best-seller", "Personnalisable"],

    // ✅ taille choisie (par défaut) si tu veux une pré-sélection
    size: "XL",

    datasheetPdf: "/pdf/tablier-plombe-premium.pdf",
    highlights: [
      { key: "finish", value: "Premium, durable" },
      { key: "comfort", value: "Usage prolongé" },
      { key: "care", value: "Nettoyage facile" },
      { key: "options", value: "Personnalisation" },
    ],
    specs: [
      { label: "Norme", value: "CE / ISO 61331-1" },
      { label: "Usage", value: "Bloc opératoire, imagerie" },
      { label: "Entretien", value: "Désinfection douce, chiffon humide" },
    ],
    images: [
      {
        src: "/products/tablier/tablier-1.jpg",
        alt: "Tablier plombé premium",
        hoverSrc: "/products/tablier/tablier-1-detail.jpg",
      },
      { src: "/products/tablier/tablier-2.jpg", alt: "Tablier plombé premium — vue dos" },
      { src: "/products/tablier/tablier-3.jpg", alt: "Tablier plombé premium — finition" },
    ],
    variants: [
      {
        id: "pb035",
        leadEquivalent: "0,35 mm Pb",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "pb050",
        leadEquivalent: "0,50 mm Pb",
        sizes: ["M", "L", "XL", "XXL"],
        // datasheetPdf: "/pdf/tablier-premium-050.pdf",
      },
    ],
  },

  {
    slug: "protege-thyroide-pro",
    title: "Protège-thyroïde Pro",
    meta: "Maintien ergonomique · Nettoyage facile · Usage intensif",
    category: "protege-thyroide",
    tags: ["Confort"],

    size: "L",

    datasheetPdf: "/pdf/protege-thyroide-pro.pdf",
    highlights: [
      { key: "finish", value: "Premium, durable" },
      { key: "comfort", value: "Usage prolongé" },
      { key: "care", value: "Nettoyage facile" },
      { key: "options", value: "Personnalisation" },
    ],
    specs: [
      { label: "Norme", value: "CE / ISO 61331-1" },
      { label: "Usage", value: "Bloc opératoire, imagerie" },
      { label: "Entretien", value: "Désinfection douce, chiffon humide" },
    ],
    images: [
      {
        src: "/products/thyroide/thyroide-1.jpg",
        alt: "Protège-thyroïde Pro",
        hoverSrc: "/products/thyroide/thyroide-1-detail.jpg",
      },
      { src: "/products/thyroide/thyroide-2.jpg", alt: "Protège-thyroïde Pro — détail fermeture" },
    ],
    variants: [
      {
        id: "pb035",
        leadEquivalent: "0,35 mm Pb",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
      {
        id: "pb050",
        leadEquivalent: "0,50 mm Pb",
        sizes: ["M", "L", "XL", "XXL"],
      },
    ],
  },

  {
    slug: "jupe-radioprotection",
    title: "Jupe de radioprotection",
    meta: "Ajustement précis · Confort · Personnalisable",
    category: "jupes",
    tags: ["Best-seller", "Personnalisable"],

    size: "M",

    datasheetPdf: "/pdf/jupe-radioprotection.pdf",
    highlights: [
      { key: "finish", value: "Premium, durable" },
      { key: "comfort", value: "Usage prolongé" },
      { key: "care", value: "Nettoyage facile" },
      { key: "options", value: "Personnalisation" },
    ],
    specs: [
      { label: "Norme", value: "CE / ISO 61331-1" },
      { label: "Usage", value: "Bloc opératoire, imagerie" },
      { label: "Entretien", value: "Désinfection douce, chiffon humide" },
    ],
    images: [
      {
        src: "/products/jupe/jupe-1.jpg",
        alt: "Jupe de radioprotection",
        hoverSrc: "/products/jupe/jupe-1-detail.jpg",
      },
      { src: "/products/jupe/jupe-2.jpg", alt: "Jupe — vue matière" },
    ],
    variants: [
      {
        id: "pb035",
        leadEquivalent: "0,35 mm Pb",
        sizes: ["S", "M", "L", "XL", "XXL"],
      },
    ],
  },

  {
    slug: "veste-protection",
    title: "Veste de protection",
    meta: "Mobilité · Coupe premium · Usage clinique",
    category: "vestes",
    tags: ["Best-seller"],

    size: "XL",

    datasheetPdf: "/pdf/veste-protection.pdf",
    highlights: [
      { key: "finish", value: "Premium, durable" },
      { key: "comfort", value: "Usage prolongé" },
      { key: "care", value: "Nettoyage facile" },
      { key: "options", value: "Personnalisation" },
    ],
    specs: [
      { label: "Norme", value: "CE / ISO 61331-1" },
      { label: "Usage", value: "Bloc opératoire, imagerie" },
      { label: "Entretien", value: "Désinfection douce, chiffon humide" },
    ],
    images: [
      {
        src: "/products/veste/veste-1.jpg",
        alt: "Veste de protection",
        hoverSrc: "/products/veste/veste-1-detail.jpg",
      },
      { src: "/products/veste/veste-2.jpg", alt: "Veste — détail couture" },
    ],
    variants: [
      {
        id: "pb050",
        leadEquivalent: "0,50 mm Pb",
        sizes: ["M", "L", "XL", "XXL"],
      },
    ],
  },
];

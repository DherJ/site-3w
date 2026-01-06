export type Service = {
  slug: string;
  i18nKey: "sales" | "rental" | "qualityChecks" | "cleaning";
  imageSrc: string;
};

export const SERVICES: Service[] = [
  { slug: "sales", i18nKey: "sales", imageSrc: "/services/sales.png" },
  { slug: "rental", i18nKey: "rental", imageSrc: "/services/rental.png" },
  { slug: "quality", i18nKey: "qualityChecks", imageSrc: "/services/quality.png" },
  { slug: "cleaning", i18nKey: "cleaning", imageSrc: "/services/cleaning.png" },
];

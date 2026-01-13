export type Service = {
  slug: string;
  key: string;
  fallback: string;
  i18nKey: "sales" | "rental" | "qualityChecks" | "cleaning";
  imageSrc: string;
};

export const SERVICES: Service[] = [
  { slug: "rental", key: "rental", fallback: "Location d’équipements", i18nKey: "rental", imageSrc: "/services/rental.png" },
  { slug: "quality", key: "qualityChecks", fallback: "Contrôles qualité", i18nKey: "qualityChecks", imageSrc: "/services/quality.png" },
  { slug: "cleaning", key: "cleaning", fallback: "Nettoyage spécialisé", i18nKey: "cleaning", imageSrc: "/services/cleaning.png" }
];
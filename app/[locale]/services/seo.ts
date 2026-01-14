import { getTranslations } from "next-intl/server";
import { absoluteUrl } from "@/lib/utils";

export async function getServicesJsonLd(locale: string) {
  const t = await getTranslations({ locale, namespace: "services" });
  const g = await getTranslations({ locale, namespace: "global" });

  const canonicalPath = `/${locale}/services`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: g("siteName", { default: "WellWithWaves" }),
      url: absoluteUrl(`/${locale}`),
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: t("seo.serviceName", {
        default: "Services de protection & blindage radiologique",
      }),
      description: t("seo.description", {
        default:
          "Audit, blindage, contrôle & conformité, maintenance. Solutions sur mesure et devis rapide.",
      }),
      provider: {
        "@type": "Organization",
        name: g("siteName", { default: "WellWithWaves" }),
        url: absoluteUrl(`/${locale}`),
      },
      url: absoluteUrl(canonicalPath),
      areaServed: "FR",
    },
  ];
}

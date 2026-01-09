// app/[locale]/legal/terms/page.tsx
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { JsonLd } from "@/components/seo/JsonLd";
import LegalShell from "../_shared/LegalShell";
import LegalSection from "../_shared/LegalSection";
import { buildLegalJsonLd, buildLegalMetadata } from "../_shared/seo";
import { getLegalCommon } from "../_shared/legalCommon";

type Props = { params: { locale: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return buildLegalMetadata({
    locale,
    canonicalPath: `/${locale}/legal/terms`,
    titleKey: "terms.title",
    descriptionKey: "terms.description",
    fallbackTitle: "Conditions d’utilisation – WellWithWaves",
    fallbackDescription:
      "Conditions d’utilisation : accès au site, responsabilités, propriété intellectuelle, liens et contact.",
    ogImagePath: `/og/legal-${locale}.jpg`,
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "legal" });

  const canonicalPath = `/${locale}/legal/terms`;

  const jsonLd = await buildLegalJsonLd({
    locale,
    canonicalPath,
    name: t("terms.pageTitle", { default: "Conditions d’utilisation" })
  });

  const toc = [
    { id: "purpose", label: t("terms.toc.purpose") },
    { id: "access", label: t("terms.toc.access") },
    { id: "ip", label: t("terms.toc.ip") },
    { id: "liability", label: t("terms.toc.liability") },
    { id: "links", label: t("terms.toc.links") },
    { id: "changes", label: t("terms.toc.changes") },
    { id: "contact", label: t("terms.toc.contact") },
  ];

  const common = await getLegalCommon(locale);
  
  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel={t("terms.breadcrumb", { default: "Conditions d’utilisation" })}
        kicker={t("terms.kicker", { default: "CONDITIONS" })}
        title={t("terms.pageTitle", { default: "Conditions d’utilisation" })}
        subtitle={t("terms.pageSubtitle", { default: "Règles d’accès et d’usage du site." })}
        toc={toc}
      >
        <LegalSection id="purpose" title={t("terms.sections.purpose.title")}>
          <p>{t("terms.sections.purpose.p1")}</p>
        </LegalSection>

        <LegalSection id="access" title={t("terms.sections.access.title")}>
          <p>{t("terms.sections.access.p1")}</p>
        </LegalSection>

        <LegalSection id="ip" title={t("terms.sections.ip.title")}>
          <p>{t("terms.sections.ip.p1")}</p>
        </LegalSection>

        <LegalSection id="liability" title={t("terms.sections.liability.title")}>
          <p>{t("terms.sections.liability.p1")}</p>
        </LegalSection>

        <LegalSection id="links" title={t("terms.sections.links.title")}>
          <p>{t("terms.sections.links.p1")}</p>
        </LegalSection>

        <LegalSection id="changes" title={t("terms.sections.changes.title")}>
          <p>{t("terms.sections.changes.p1")}</p>
        </LegalSection>

        <LegalSection id="contact" title={t("terms.sections.contact.title")}>
          <p>
            {t("terms.sections.contact.p1")}{" "}
            <strong>{common.email}</strong>.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
}

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
    canonicalPath: `/${locale}/legal/privacy-policy`,
    titleKey: "privacy.title",
    descriptionKey: "privacy.description",
    fallbackTitle: "Politique de confidentialité – WellWithWaves",
    fallbackDescription:
      "Politique de confidentialité : données collectées, finalités, conservation, droits RGPD et contact.",
    ogImagePath: `/og/legal-${locale}.jpg`,
  });
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "legal" });

  const canonicalPath = `/${locale}/legal/privacy-policy`;

  const jsonLd = await buildLegalJsonLd({
    locale,
    canonicalPath,
    name: t("privacy.pageTitle", { default: "Politique de confidentialité" })
  });

  const toc = [
    { id: "data", label: t("privacy.toc.data") },
    { id: "purposes", label: t("privacy.toc.purposes") },
    { id: "lawful", label: t("privacy.toc.lawful") },
    { id: "retention", label: t("privacy.toc.retention") },
    { id: "processors", label: t("privacy.toc.processors") },
    { id: "rights", label: t("privacy.toc.rights") },
    { id: "cookies", label: t("privacy.toc.cookies") },
  ];

  const common = await getLegalCommon(locale);

  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel={t("privacy.breadcrumb", { default: "Politique de confidentialité" })}
        kicker={t("privacy.kicker", { default: "CONFIDENTIALITÉ" })}
        title={t("privacy.pageTitle", { default: "Politique de confidentialité" })}
        subtitle={t("privacy.pageSubtitle", { default: "Comment nous traitons vos données (RGPD)." })}
        toc={toc}
      >
        <LegalSection id="data" title={t("privacy.sections.data.title")}>
          <p>{t("privacy.sections.data.p1")}</p>
        </LegalSection>

        <LegalSection id="purposes" title={t("privacy.sections.purposes.title")}>
          <ul>
            <li>{t("privacy.sections.purposes.li1")}</li>
            <li>{t("privacy.sections.purposes.li2")}</li>
            <li>{t("privacy.sections.purposes.li3")}</li>
          </ul>
        </LegalSection>

        <LegalSection id="lawful" title={t("privacy.sections.lawful.title")}>
          <p>{t("privacy.sections.lawful.p1")}</p>
        </LegalSection>

        <LegalSection id="retention" title={t("privacy.sections.retention.title")}>
          <p>{t("privacy.sections.retention.p1")}</p>
        </LegalSection>

        <LegalSection id="processors" title={t("privacy.sections.processors.title")}>
          <p>{t("privacy.sections.processors.p1")}</p>
        </LegalSection>

        <LegalSection id="rights" title={t("privacy.sections.rights.title")}>
          <p>
            {t("privacy.sections.rights.p1")}{" "}
            <strong>{common.email}</strong>.
          </p>
        </LegalSection>

        <LegalSection id="cookies" title={t("privacy.sections.cookies.title")}>
          <p>{t("privacy.sections.cookies.p1")}</p>
        </LegalSection>
      </LegalShell>
    </>
  );
}

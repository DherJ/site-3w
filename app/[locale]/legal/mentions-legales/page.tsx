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
    canonicalPath: `/${locale}/legal/mentions-legales`,
    titleKey: "mentions.title",
    descriptionKey: "mentions.description",
    fallbackTitle: "Mentions légales – WellWithWaves",
    fallbackDescription:
      "Mentions légales de WellWithWaves : éditeur, hébergeur, contact, propriété intellectuelle.",
    ogImagePath: `/og/legal-${locale}.jpg`,
  });
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "legal" });
  const common = await getLegalCommon(locale);

  const canonicalPath = `/${locale}/legal/mentions-legales`;

  const jsonLd = await buildLegalJsonLd({
    locale,
    canonicalPath,
    name: t("mentions.pageTitle", { default: "Mentions légales" })
  });

  const toc = [
    { id: "publisher", label: common.publisherTitle },
    { id: "hosting", label: common.hostingTitle },
    { id: "ip", label: common.ipTitle },
    { id: "liability", label: common.liabilityTitle },
    { id: "contact", label: common.contactTitle },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel={t("mentions.breadcrumb", { default: "Mentions légales" })}
        kicker={t("mentions.kicker", { default: "INFORMATIONS" })}
        title={t("mentions.pageTitle", { default: "Mentions légales" })}
        subtitle={t("mentions.pageSubtitle", {
          default: "Informations légales relatives au site WellWithWaves.",
        })}
        toc={toc}
      >
        <LegalSection id="publisher" title={common.publisherTitle}>
          <ul>
            <li><strong>{t("mentions.fields.company", { default: "Société" })} :</strong> {common.publisherCompanyName}</li>
            <li><strong>{common.addressLabel} :</strong> {common.publisherCompanyAddress}</li>
            <li><strong>{common.emailLabel} :</strong> {common.publisherCompanyMail}</li>
            <li><strong>{common.phoneLabel} :</strong> {common.publisherCompanyPhone}</li>
          </ul>
        </LegalSection>

        <LegalSection id="hosting" title={common.hostingTitle}>
          <p>{common.hostingPlaceholder}</p>
        </LegalSection>

        <LegalSection id="ip" title={common.ipTitle}>
          <p>{common.ipText}</p>
        </LegalSection>

        <LegalSection id="liability" title={common.liabilityTitle}>
          <p>{common.liabilityText}</p>
        </LegalSection>

        <LegalSection id="contact" title={common.contactTitle}>
          <p>
            {common.contactTextPrefix} 
            <a href={`mailto:${common.email}`}>
                <strong> {common.email} </strong>
            </a>.
          </p>
        </LegalSection>
      </LegalShell>
    </>
  );
}

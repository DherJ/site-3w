// app/[locale]/legal/privacy-policy/page.tsx
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import LegalShell from "../_shared/LegalShell";
import { buildLegalJsonLd, buildLegalMetadata } from "../_shared/seo";

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
  });
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = params;
  const canonicalPath = `/${locale}/legal/privacy-policy`;

  const jsonLd = buildLegalJsonLd({
    locale,
    canonicalPath,
    name: "Politique de confidentialité",
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel="Politique de confidentialité"
        kicker="CONFIDENTIALITÉ"
        title="Politique de confidentialité"
        subtitle="Comment nous traitons vos données (RGPD)."
      >
        <h2>Données collectées</h2>
        <p>
          Nous collectons les informations que vous nous transmettez via les formulaires (ex : nom,
          email, établissement, message) et, éventuellement, des données techniques (logs).
        </p>

        <h2>Finalités</h2>
        <ul>
          <li>Répondre à vos demandes (contact, devis, informations).</li>
          <li>Assurer le fonctionnement et la sécurité du site.</li>
          <li>Mesure d’audience (si activée) – à préciser.</li>
        </ul>

        <h2>Base légale</h2>
        <p>
          Intérêt légitime (réponse aux demandes), exécution de mesures précontractuelles (devis),
          obligations légales si applicable.
        </p>

        <h2>Durée de conservation</h2>
        <p>
          Les données sont conservées le temps nécessaire au traitement de votre demande puis
          archivées/supprimées selon nos obligations légales.
        </p>

        <h2>Partage & sous-traitants</h2>
        <p>
          Vos données peuvent être traitées par des prestataires (hébergement, emailing, etc.)
          strictement pour fournir le service. À préciser selon ta stack.
        </p>

        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD : accès, rectification, effacement, opposition, limitation, portabilité.
          Vous pouvez exercer vos droits à <strong>cdhersin@wellwithwaves.com</strong>.
        </p>

        <h2>Cookies</h2>
        <p>
          À compléter : cookies nécessaires / analytics / consentement (si applicable).
        </p>
      </LegalShell>
    </>
  );
}

// app/[locale]/legal/terms/page.tsx
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import LegalShell from "../_shared/LegalShell";
import { buildLegalJsonLd, buildLegalMetadata } from "../_shared/seo";

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
      "Conditions d’utilisation : accès au site, responsabilités, propriété intellectuelle, liens externes.",
  });
}

export default async function TermsPage({ params }: Props) {
  const { locale } = params;
  const canonicalPath = `/${locale}/legal/terms`;

  const jsonLd = buildLegalJsonLd({
    locale,
    canonicalPath,
    name: "Conditions d’utilisation",
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel="Conditions d’utilisation"
        kicker="CONDITIONS"
        title="Conditions d’utilisation"
        subtitle="Règles d’usage du site et responsabilités."
      >
        <h2>Accès au site</h2>
        <p>
          L’accès au site est fourni “en l’état”. Nous pouvons faire évoluer ou suspendre des
          fonctionnalités sans préavis.
        </p>

        <h2>Responsabilité</h2>
        <p>
          WellWithWaves ne saurait être tenu responsable des dommages indirects liés à l’usage du site.
        </p>

        <h2>Liens externes</h2>
        <p>
          Le site peut contenir des liens vers des sites tiers. Nous ne contrôlons pas leur contenu.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Tous les contenus sont protégés. Toute reproduction non autorisée est interdite.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question : <strong>cdhersin@wellwithwaves.com</strong>.
        </p>
      </LegalShell>
    </>
  );
}

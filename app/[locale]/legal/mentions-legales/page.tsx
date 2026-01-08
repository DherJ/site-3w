// app/[locale]/legal/mentions-legales/page.tsx
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import LegalShell from "../_shared/LegalShell";
import { buildLegalJsonLd, buildLegalMetadata } from "../_shared/seo";

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
  });
}

export default async function MentionsLegalesPage({ params }: Props) {
  const { locale } = params;
  const canonicalPath = `/${locale}/legal/mentions-legales`;

  const jsonLd = buildLegalJsonLd({
    locale,
    canonicalPath,
    name: "Mentions légales",
  });

  return (
    <>
      <JsonLd data={jsonLd} />

      <LegalShell
        locale={locale}
        breadcrumbLabel="Mentions légales"
        kicker="INFORMATIONS"
        title="Mentions légales"
        subtitle="Informations légales relatives au site WellWithWaves."
      >
        <h2>Éditeur du site</h2>
        <ul>
          <li><strong>Société :</strong> 3W – Well With Waves</li>
          <li><strong>Adresse :</strong> 110 Rue du Smetz PePSO, 62120 Campagne-lès-Wardrecques, France</li>
          <li><strong>Email :</strong> cdhersin@wellwithwaves.com</li>
          <li><strong>Téléphone :</strong> +33 6 52 71 03 09</li>
        </ul>

        <h2>Hébergement</h2>
        <p>
          À compléter : nom de l’hébergeur, adresse, téléphone (obligatoire en France).
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L’ensemble des contenus (textes, images, marques, logos) est protégé. Toute reproduction
          est interdite sans autorisation écrite préalable.
        </p>

        <h2>Responsabilité</h2>
        <p>
          Nous nous efforçons d’assurer l’exactitude des informations, sans garantie d’exhaustivité.
          L’utilisation du site se fait sous la responsabilité de l’utilisateur.
        </p>

        <h2>Contact</h2>
        <p>
          Pour toute question, écrivez-nous à <strong>cdhersin@wellwithwaves.com</strong>.
        </p>
      </LegalShell>
    </>
  );
}

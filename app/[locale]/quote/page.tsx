import { getTranslations } from "next-intl/server";
import QuotePageClient from "./QuotePageClient";
import { getQuoteJsonLd } from "./seo";

type Props = { params: { locale: string } };

export { generateMetadata } from "./seo";

export default async function QuotePage({ params }: Props) {
  const { locale } = params;

  const t = await getTranslations({ locale, namespace: "quote" });
  const g = await getTranslations({ locale, namespace: "global" });
  const jsonLd = await getQuoteJsonLd(locale);

  const copy = {
    pageTitle: t("title", { default: "Demande de devis" }),

    heroKicker: t("wizard.kicker", { default: "DEVIS EN LIGNE" }),
    heroTitle: t("wizard.heading", { default: "Demande rapide" }),

    stepper: [
      { key: "need", label: t("steps.need", { default: "1 Besoin" }) },
      { key: "details", label: t("steps.details", { default: "2 Détails" }) },
      { key: "logistics", label: t("steps.logistics", { default: "3 Logistique" }) },
      { key: "company", label: t("steps.company", { default: "4 Entreprise" }) },
      { key: "review", label: t("steps.review", { default: "5 Récap" }) },
    ],

    needs: [
      {
        val: "purchase",
        label: t("needs.purchase.label", { default: "Achat" }),
        desc: t("needs.purchase.desc", { default: "Demande de prix & disponibilité." }),
      },
      {
        val: "rental",
        label: t("needs.rental.label", { default: "Location" }),
        desc: t("needs.rental.desc", { default: "Besoin ponctuel / événement." }),
      },
      {
        val: "quality",
        label: t("needs.quality.label", { default: "Contrôle & blindage" }),
        desc: t("needs.quality.desc", { default: "Conformité, protections, options." }),
      },
      {
        val: "cleaning",
        label: t("needs.cleaning.label", { default: "Nettoyage" }),
        desc: t("needs.cleaning.desc", { default: "Procédure & fréquence." }),
      },
      {
        val: "mix",
        label: t("needs.mix.label", { default: "Mix" }),
        desc: t("needs.mix.desc", { default: "Plusieurs besoins à la fois." }),
      },
    ] as const,

    section: {
      needTitle: t("sections.need.title", { default: "Type de demande" }),
      needSubtitle: t("sections.need.subtitle", { default: "Choisis un ou plusieurs besoins." }),

      detailsTitle: t("sections.details.title", { default: "Détails" }),
      logisticsTitle: t("sections.logistics.title", { default: "Logistique" }),
      companyTitle: t("sections.company.title", { default: "Entreprise" }),
      reviewTitle: t("sections.review.title", { default: "Récapitulatif" }),
      reviewSubtitle: t("sections.review.subtitle", { default: "Vérifie tes infos avant l’envoi." }),
    },

    fields: {
      quantityLabel: t("fields.quantity.label", { default: "QUANTITÉ (OPTIONNEL)" }),
      deadlineLabel: t("fields.deadline.label", { default: "DÉLAI (OPTIONNEL)" }),
      deadlinePlaceholder: t("fields.deadline.placeholder", { default: "ex: 2 semaines" }),
      notesLabel: t("fields.notes.label", { default: "COMMENTAIRE" }),

      addressLabel: t("fields.address.label", { default: "ADRESSE (OPTIONNEL)" }),

      companyLabel: t("fields.company.label", { default: "ÉTABLISSEMENT" }),
      contactLabel: t("fields.contact.label", { default: "CONTACT" }),
      emailLabel: t("fields.email.label", { default: "EMAIL" }),
      phoneLabel: t("fields.phone.label", { default: "TÉLÉPHONE (OPTIONNEL)" }),
    },

    buttons: {
      back: t("buttons.back", { default: "← Retour" }),
      next: t("buttons.next", { default: "Continuer →" }),
      submit: t("buttons.submit", { default: "Envoyer le devis" }),
      submitting: t("buttons.submitting", { default: "Envoi..." }),
    },

    progress: {
      title: t("progress.title", { default: "PROGRESSION" }),
      selection: t("progress.selection", { default: "SÉLECTION" }),
      todoTitle: t("progress.todoTitle", { default: "À faire" }),
      todo: [
        t("progress.todo.0", { default: "Choisis ton type de demande, puis continue." }),
        t("progress.todo.1", { default: "Ajoute les détails (quantité / délai) si nécessaire." }),
        t("progress.todo.2", { default: "Renseigne l’adresse si tu as une contrainte logistique." }),
        t("progress.todo.3", { default: "Indique tes coordonnées pour qu’on te recontacte." }),
        t("progress.todo.4", { default: "Vérifie une dernière fois avant l’envoi." }),
      ],
      eta: t("progress.eta", { default: "Temps estimé : ~2 min" }),
      stepLabel: t("progress.stepLabel", { default: "Étape" }),
      finalCheckTitle: t("progress.finalCheckTitle", { default: "Vérification finale" }),
      finalCheckText: t("progress.finalCheckText", {
        default: "Après validation, nous vous recontacterons rapidement avec une proposition adaptée à vos besoins.",
      }),
    },

    alerts: {
      sent: t("alerts.sent", { default: "Devis envoyé ✅" }),
      error: t("alerts.error", { default: "Erreur envoi devis" }),
      needsMin: t("validation.needsMin", { default: "Choisis au moins un besoin" }),

      companyRequired: t("validation.companyRequired", { default: "Nom établissement requis" }),
      contactRequired: t("validation.contactRequired", { default: "Nom contact requis" }),
      emailInvalid: t("validation.emailInvalid", { default: "Email invalide" }),
    },
    privatePolicy: {
      notice: g("privatePolicy.notice", {
        default:
          "Les informations transmises via ce formulaire sont utilisées uniquement pour répondre à votre demande. Merci de ne pas transmettre de données médicales. Pour en savoir plus :",
      }),
      linkText: g("privatePolicy.link", { default: "Politique de confidentialité" }),
    }
  };

  return <QuotePageClient locale={locale} copy={copy} jsonLd={jsonLd} />;
}

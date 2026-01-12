export type ServicePageContent = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;

  why: { title: string; bullets: string[] };
  included: { title: string; bullets: string[] };

  pros: string[];
  cons: string[];

  process: { title: string; steps: { title: string; desc: string }[] };

  quality: { title: string; text: string; bullets: string[] };

  faq: { q: string; a: string }[];
};

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  // -------------------------
  // VENTE
  // -------------------------
  sales: {
    slug: "sales",
    title: "Vente d’équipements de radioprotection",
    subtitle:
      "Un parc durable, sélectionné selon vos contraintes terrain, avec accompagnement, mise en service et recommandations d’usage.",
    heroImage: "/services/sales.png",

    why: {
      title: "Pourquoi acheter plutôt que louer ?",
      bullets: [
        "Stabiliser un besoin récurrent (activité continue, parc permanent).",
        "Maîtriser votre matériel (disponibilité immédiate, personnalisation).",
        "Optimiser les coûts sur le long terme (TCO) lorsque l’usage est régulier.",
      ],
    },

    included: {
      title: "Ce qui est inclus",
      bullets: [
        "Conseil de choix : niveaux de protection, confort, tailles, usages.",
        "Aide à la définition du parc : quantités, rotation, stockage.",
        "Recommandations d’entretien et bonnes pratiques d’utilisation.",
        "Option : plan de suivi (inspection / contrôles périodiques).",
      ],
    },

    pros: [
      "Rentable si usage fréquent et long terme.",
      "Disponibilité immédiate (pas de réservation).",
      "Parc homogène et adapté à vos équipes.",
      "Possibilité de standardiser les pratiques (stockage, entretien).",
    ],
    cons: [
      "Investissement initial plus important.",
      "Gestion interne : stockage, suivi d’état, rotation.",
      "Nécessite un plan d’entretien/contrôle pour rester conforme.",
    ],

    process: {
      title: "Le processus d’achat (simple et cadré)",
      steps: [
        {
          title: "1) Qualification",
          desc: "Contexte d’usage, contraintes (durée, gestes, environnement), tailles, confort attendu, fréquence d’utilisation.",
        },
        {
          title: "2) Recommandation",
          desc: "Proposition d’équipements adaptés + options (accessoires, stockage, rotation).",
        },
        {
          title: "3) Devis & validation",
          desc: "Budget, délais, modalités de livraison, éventuelles personnalisations.",
        },
        {
          title: "4) Livraison & mise en service",
          desc: "Remise / expédition, vérification, conseils d’utilisation et de stockage.",
        },
        {
          title: "5) Suivi",
          desc: "Option : plan de contrôles périodiques, maintenance, renouvellement parc si besoin.",
        },
      ],
    },

    quality: {
      title: "Qualité & conformité",
      text:
        "L’objectif : un parc cohérent, confortable et conforme, avec des recommandations claires pour prolonger la durée de vie et réduire les risques d’usure.",
      bullets: [
        "Choix guidé par l’usage réel (et pas uniquement par “la fiche produit”).",
        "Bonnes pratiques : pliage, stockage, manipulation, transport.",
        "Plan de contrôle recommandé (périodicité selon usage).",
        "Aide à la traçabilité (parc, identifiants, rotation).",
      ],
    },

    faq: [
      {
        q: "Comment choisir le bon équipement ?",
        a: "On part de votre usage : durée, mouvements, contraintes terrain, tailles et confort. Ensuite on recommande un parc cohérent (pas juste un modèle isolé).",
      },
      {
        q: "Peut-on mixer plusieurs tailles / modèles ?",
        a: "Oui, c’est même souvent recommandé : une base standard + quelques tailles/variantes pour couvrir toutes les morphologies et usages.",
      },
      {
        q: "Y a-t-il un accompagnement sur l’entretien ?",
        a: "Oui : consignes de stockage/manipulation et possibilité de mettre en place un plan de contrôle périodique.",
      },
      {
        q: "Quel est le délai typique ?",
        a: "Il dépend des quantités et des tailles/modèles. Le devis inclut toujours une estimation de délai réaliste.",
      },
      {
        q: "Achat ou location : comment trancher ?",
        a: "En général : usage régulier/continu → achat. Besoin ponctuel/pics d’activité/remplacement → location. On peut aussi faire un mix.",
      },
    ],
  },

  // -------------------------
  // CONTRÔLES QUALITÉ
  // -------------------------
  quality: {
    slug: "quality",
    title: "Contrôles qualité & conformité",
    subtitle:
      "Contrôler l’état, l’intégrité et la traçabilité du parc pour garantir la conformité et réduire les risques terrain.",
    heroImage: "/services/quality.png",

    why: {
      title: "Pourquoi mettre en place un contrôle qualité ?",
      bullets: [
        "Détecter l’usure invisible (zones de pliure, coutures, sangles).",
        "Assurer la conformité et la sécurité des équipes.",
        "Mettre en place une traçabilité simple et exploitable (parc, historique, actions).",
      ],
    },

    included: {
      title: "Ce qui est inclus",
      bullets: [
        "Inspection visuelle : couture, fermeture, sangles, zones sollicitées.",
        "Contrôle de l’intégrité du blindage (selon niveau requis).",
        "Rapport / synthèse d’état (conforme / à surveiller / à retirer).",
        "Recommandations : stockage, manipulation, rotation du parc.",
      ],
    },

    pros: [
      "Réduction du risque d’utilisation d’un équipement dégradé.",
      "Traçabilité claire : parc, état, historique.",
      "Optimisation du parc : retrait/réparation ciblés, meilleure rotation.",
      "Renforce votre démarche conformité / qualité.",
    ],
    cons: [
      "Demande une organisation (immobilisation temporaire du matériel).",
      "Fréquence à définir selon usage (plus fréquent si usage intensif).",
      "Peut révéler un besoin de renouvellement (budget à anticiper).",
    ],

    process: {
      title: "Le processus de contrôle",
      steps: [
        {
          title: "1) Cadrage",
          desc: "Inventaire parc, niveau de contrôle attendu, fréquence, contraintes d’immobilisation.",
        },
        {
          title: "2) Collecte / réception",
          desc: "Réception du matériel (ou plan de collecte), vérification des identifiants / lots.",
        },
        {
          title: "3) Inspection & tests",
          desc: "Inspection visuelle + contrôle de l’intégrité du blindage selon le protocole défini.",
        },
        {
          title: "4) Synthèse & décisions",
          desc: "Conforme / à surveiller / à réparer / à retirer. Recommandations d’action et priorisation.",
        },
        {
          title: "5) Traçabilité",
          desc: "Mise à jour de l’historique : état, actions réalisées, date du prochain contrôle recommandé.",
        },
      ],
    },

    quality: {
      title: "Traçabilité et conformité",
      text:
        "Un contrôle qualité n’a de valeur que s’il est exploitable : résultats clairs, historique, et actions recommandées.",
      bullets: [
        "Critères lisibles : conforme / à surveiller / non conforme.",
        "Historique des cycles : dates, constats, actions.",
        "Recommandations de rotation pour limiter l’usure prématurée.",
        "Aide à la standardisation : pliage, stockage, transport.",
      ],
    },

    faq: [
      {
        q: "À quelle fréquence faut-il contrôler ?",
        a: "Ça dépend de l’intensité d’usage. Un parc très sollicité doit être contrôlé plus souvent. On définit une périodicité réaliste au cadrage.",
      },
      {
        q: "Que contient le rapport ?",
        a: "Une synthèse par équipement (état, constat, décision) + recommandations : réparation, retrait, rotation, bonnes pratiques.",
      },
      {
        q: "Le contrôle immobilise combien de temps le matériel ?",
        a: "Cela dépend du volume et du protocole. On peut organiser des rotations pour éviter de bloquer tout le parc en même temps.",
      },
      {
        q: "Peut-on coupler contrôle et nettoyage ?",
        a: "Oui, c’est même idéal : nettoyage + inspection + contrôle intégrité dans un même cycle.",
      },
      {
        q: "Que se passe-t-il en cas de non-conformité ?",
        a: "On recommande une action (réparation/remplacement/retrait) et on priorise selon le niveau de risque et l’usage.",
      },
    ],
  },

  // -------------------------
  // NETTOYAGE SPÉCIALISÉ
  // -------------------------
  cleaning: {
    slug: "cleaning",
    title: "Nettoyage spécialisé & remise en état",
    subtitle:
      "Nettoyage, désinfection et inspection pour prolonger la durée de vie du parc et garantir des conditions d’usage sûres.",
    heroImage: "/services/cleaning.png",

    why: {
      title: "Pourquoi un nettoyage spécialisé ?",
      bullets: [
        "Assurer l’hygiène et la sécurité entre utilisations / rotations.",
        "Réduire l’usure liée à de mauvaises pratiques de nettoyage.",
        "Remettre en état le matériel et détecter tôt les dégradations.",
      ],
    },

    included: {
      title: "Ce qui est inclus",
      bullets: [
        "Nettoyage / désinfection selon protocole adapté.",
        "Inspection visuelle post-nettoyage (coutures, sangles, zones de pliure).",
        "Traitement des points d’attention : salissures, odeurs, zones fragiles.",
        "Option : cycle complet nettoyage + contrôle qualité du blindage.",
      ],
    },

    pros: [
      "Hygiène maîtrisée et répétable (process clair).",
      "Prolonge la durée de vie du parc.",
      "Détection précoce des défauts (avant incident).",
      "Améliore le confort d’usage pour les équipes.",
    ],
    cons: [
      "Organisation logistique (collecte/retour, planification).",
      "Immobilisation temporaire du matériel.",
      "Nécessite une discipline de rotation si parc limité.",
    ],

    process: {
      title: "Le cycle nettoyage (terrain → remise en circulation)",
      steps: [
        {
          title: "1) Réception & tri",
          desc: "Identification, état initial, tri par niveau de traitement et points d’attention.",
        },
        {
          title: "2) Nettoyage / désinfection",
          desc: "Procédé adapté (matériau, zones sensibles) pour éviter d’endommager le blindage ou les coutures.",
        },
        {
          title: "3) Inspection",
          desc: "Contrôle visuel : sangles, coutures, zones de pliure, déformations, fermetures.",
        },
        {
          title: "4) Remise en état (si possible)",
          desc: "Actions simples de remise en forme / correction, et recommandations si réparation/renouvellement nécessaire.",
        },
        {
          title: "5) Traçabilité & retour",
          desc: "Mise à jour du cycle (date, actions) et retour / remise en circulation.",
        },
      ],
    },

    quality: {
      title: "Bonnes pratiques & prévention",
      text:
        "Un nettoyage efficace, c’est aussi un nettoyage qui respecte le matériel. On vise l’hygiène sans dégrader l’intégrité ni accélérer l’usure.",
      bullets: [
        "Protocoles adaptés aux matériaux et zones sensibles.",
        "Recommandations de stockage (éviter plis agressifs, compression).",
        "Rotation du parc pour limiter l’usure localisée.",
        "Couplage possible avec un contrôle qualité d’intégrité du blindage.",
      ],
    },

    faq: [
      {
        q: "Peut-on nettoyer tous les équipements de la même façon ?",
        a: "Non : certains matériaux et zones sensibles demandent un protocole adapté. Le but est de nettoyer sans détériorer.",
      },
      {
        q: "Le nettoyage inclut-il une inspection ?",
        a: "Oui : après nettoyage on inspecte les zones d’usure fréquente (coutures, sangles, pliures).",
      },
      {
        q: "Peut-on planifier un cycle régulier ?",
        a: "Oui, c’est souvent la meilleure approche : un calendrier de rotation (mensuel/trimestriel selon usage).",
      },
      {
        q: "Et si vous détectez une anomalie ?",
        a: "On la signale et on recommande l’action : surveiller, réparer, retirer, ou remplacer selon l’état.",
      },
      {
        q: "Nettoyage + contrôle blindage : c’est possible ?",
        a: "Oui, on peut faire un cycle complet : nettoyage/désinfection + inspection + contrôle qualité.",
      },
    ],
  },
};

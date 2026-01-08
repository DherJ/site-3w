export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
  tags?: string[];
};

export const TEAM: TeamMember[] = [
  {
    name: "Charline Dhersin",
    role: "CEO & Fondatrice",
    bio: "Vision, qualité et suivi des établissements.",
    imageSrc: "/team/charline-dhersin.jpg",
  },
  {
    name: "Florence Gania",
    role: "Responsable production",
    bio: "Conseil, sélection des équipements, organisation logistique.",
    imageSrc: "/team/florence-gania.jpg",
  },
];
type Member = {
  name: string;
  role: string;
  imageSrc: string;
  tags?: string[];
};

export const TEAMS: Member[] = [
  {
    name: "Charline Dhersin",
    role: "CEO & Fondatrice",
    imageSrc: "/team/charline-dhersin.jpg",
  },
  {
    name: "Florence Gania",
    role: "Responsable production",
    imageSrc: "/team/florence-gania.jpg",
  },
];
export type Society = {
  name: string;
  adress: string;
  mail: string;
  phone: string;
};

export type Herbergement = {
  name: string;
  adress: string;
};

export const SOCIETY: Society = {
    name: "Jérôme Dhersin - jd-pixel-works",
    adress: "154 rue du violon d'or - 59190 Hazebrouck, France",
    mail: "j.dhersin@hotmail.fr",
    phone: "+33 6 47 65 64 33",
};

export const HEBERGEMENT: Herbergement = {
    name: "OVH",
    adress: "2 rue Kellerman - 59100 Roubaix, France"
};
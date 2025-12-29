type Service = {
    slug: string;
    title?: string;
    desc?: string;
    imageSrc: string;
};

export const SERVICES: Service[] = [
    {
        slug: "sales",
        title: "sales.title",
        desc: "sales.desc",
        imageSrc: "/services/sales.png"
    },
    {
        slug: "rental",
        title: "rental.title",
        desc: "rental.desc",
        imageSrc: "/services/rental.png"
    },
    {
        slug: "quality",
        title: "qualityChecks.title",
        desc: "qualityChecks.desc",
        imageSrc: "/services/quality.png"
    },
    {
        slug: "cleaning",
        title: "cleaning.title",
        desc: "cleaning.desc",
        imageSrc: "/services/cleaning.png"
    },
];
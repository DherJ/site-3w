import { getTranslations } from "next-intl/server";

export type LegalCommon = {
    companyName: string;
    brandName: string;
    addressLabel: string;
    address: string;
    emailLabel: string;
    email: string;
    phoneLabel: string;
    phone: string;

    publisherTitle: string;
    publisherCompanyName: string;
    publisherCompanyAddress: string;
    publisherCompanyMail: string;
    publisherCompanyPhone: string;
    hostingTitle: string;
    hostingPlaceholder: string;

    ipTitle: string;
    ipText: string;

    liabilityTitle: string;
    liabilityText: string;

    contactTitle: string;
    contactTextPrefix: string;
};

export async function getLegalCommon(locale: string): Promise<LegalCommon> {
    const t = await getTranslations({ locale, namespace: "legal" });

    return {
        companyName: t("common.companyName"),
        brandName: t("common.brandName"),
        addressLabel: t("common.addressLabel"),
        address: t("common.address"),
        emailLabel: t("common.emailLabel"),
        email: t("common.email"),
        phoneLabel: t("common.phoneLabel"),
        phone: t("common.phone"),

        publisherTitle: t("common.publisherTitle"),
        publisherCompanyName: t("common.publisherCompanyName"),
        publisherCompanyAddress: t("common.publisherCompanyAddress"),
        publisherCompanyMail: t("common.publisherCompanyMail"),
        publisherCompanyPhone: t("common.publisherCompanyPhone"),
        hostingTitle: t("common.hostingTitle"),
        hostingPlaceholder: t("common.hostingPlaceholder"),

        ipTitle: t("common.ipTitle"),
        ipText: t("common.ipText"),

        liabilityTitle: t("common.liabilityTitle"),
        liabilityText: t("common.liabilityText"),

        contactTitle: t("common.contactTitle"),
        contactTextPrefix: t("common.contactTextPrefix"),
    };
}

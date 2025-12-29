import { BadgeCheck, Factory, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import ProofItem from "./ProofItem";

export default function ProofListItems() {

    const t = useTranslations("proof");
    return (
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-4 py-10">
            <ProofItem
                icon={BadgeCheck}
                title={t("checkBadge.title")}
                desc={t("checkBadge.desc")}
            />
            <ProofItem
                icon={ShieldCheck}
                title={t("shieldBadge.title")}
                desc={t("shieldBadge.desc")}
            />
            <ProofItem
                icon={Sparkles}
                title={t("sparkleBadge.title")}
                desc={t("sparkleBadge.desc")}
            />
            <ProofItem
                icon={Factory}
                title={t("factoryBadge.title")}
                desc={t("factoryBadge.desc")}
            />
        </div>
    );
}
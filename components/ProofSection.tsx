"use client";

import { useTranslations } from "next-intl";
import ProofListItems from "./ui/ProofListItems";

export default function ProofSection() {

    const t = useTranslations("proof");

    return (
        <div>
            {/* 2) PROOFS */}
            <section className="bg-brandOffWhite py-10">
                <ProofListItems />
            </section>
        </div>
    )
}
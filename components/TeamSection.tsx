"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import SecondaryButton from "./ui/SecondaryButton";
import { ArrowRight } from "lucide-react";

import { TEAMS } from "@/data/team";

export default function TeamSection() {

    const t = useTranslations("team");
    const locale = useLocale();
    
    return (
        <div>
            {/* 6) ÉQUIPE */}
            <section className="bg-white py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <SectionTitle
                        kicker="ÉQUIPE"
                        title={t("title")}
                        subtitle={t("subtitle")}
                    />

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {/* placeholders */}
                        {TEAMS.map((m) => (
                            <div key={m.role} className="card-premium overflow-hidden">
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={m.imageSrc}
                                        alt={m.name}
                                        fill
                                        className="object-cover"
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="font-serif text-lg font-semibold text-brandNavy">
                                        {m.name}
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-brandMuted">
                                        {m.role}
                                    </div>
                                    <div className="mt-4 text-sm text-brandMuted">
                                        Courte description (1 ligne) orientée expertise & accompagnement.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <SecondaryButton href={`/${locale}/about`}>
                            {t("meetTheTeam")} <ArrowRight className="h-4 w-4" />
                        </SecondaryButton>
                    </div>
                </div>
            </section>
        </div>
    )
}
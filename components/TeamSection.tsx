"use client";

import { useLocale, useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import SecondaryButton from "./ui/SecondaryButton";
import { ArrowRight } from "lucide-react";

import { TEAM } from "@/data/team";
import { withBasePath } from "@/lib/withBasePath";

export default function TeamSection() {
    const toWebp = (imageSrc: string) => imageSrc.replace(/\.(png|jpe?g)$/i, ".webp");

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
                        {TEAM.map((m) => (
                            <div key={m.role} className="card-premium overflow-hidden">
                                <div className="relative aspect-[4/3]">
                                    <picture className="absolute inset-0 h-full w-full">
                                        <source
                                            srcSet={withBasePath(`/team/webp/${toWebp(m.imageSrc.split("/").pop() || "")}`)}
                                            type="image/webp"
                                        />
                                        <img
                                            src={withBasePath(m.imageSrc)}
                                            alt={m.name}
                                            className="h-full w-full object-cover"
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                            loading="lazy"
                                        />
                                    </picture>
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

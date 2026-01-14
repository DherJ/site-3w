"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { useLocale, useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";

export default function ManufactureAndQualitySection() {

    const t = useTranslations("manufactureAndQuality");
    const locale = useLocale();
    const features = t.raw("features") as string[];

    return (
        <div>
            {/* 4) FABRICATION & QUALITÉ */}
            <section className="bg-white py-20 md:py-28">
                <div className="mx-auto max-w-6xl px-4 grid gap-12 md:grid-cols-2 items-center">

                    {/* Image atelier */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-brandLine">
                        <Image
                            src="/manufactureAndQuality/workshop.jpg"
                            alt="Atelier de fabrication Well With Waves"
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>

                    {/* Texte */}
                    <div>
                        <SectionTitle
                            align="left"
                            kicker={t("label")}
                            title={t("title")}
                            subtitle={t("description")}
                        />

                        <ul className="mt-8 space-y-3 text-sm text-brandMuted">
                            {features.map((item, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10">
                            <Button asChild>
                                <Link href={`/${locale}/about`}>
                                    {t("discover")} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
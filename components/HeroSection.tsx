"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";
import { withBasePath } from "@/lib/withBasePath";

export default function ProofSection() {

    const t = useTranslations("home");
    const tradGlobal = useTranslations("global");
    const locale = useLocale();

    return (
        <div>
            {/* 1) HERO FULLSCREEN */}
            <section className="relative z-0 h-[100svh] w-full overflow-hidden">
                <Image
                    src={withBasePath("/hero/hero-full.png")}
                    alt="Well With Waves – Radioprotection"
                    fill
                    priority
                    className="object-cover object-[50%_5%] md:object-[50%_3%]"
                    sizes="100vw"
                    unoptimized
                />
                {/* overlay premium */}
                <div className="absolute inset-0 bg-brandNavy/35" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                {/* contenu haut-gauche */}
                <div className="relative mx-auto flex h-full max-w-6xl px-4 py-20">
                    <div className="mt-[18vh] md:mt-[22vh]">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold tracking-[0.2em] text-white/90 ring-1 ring-white/15 backdrop-blur">
                            {t("heroMadeInenFrance")}
                        </div>

                        <h1 className="mt-6 max-w-2xl font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
                            {t("heroTitle")}
                        </h1>

                        <p className="mt-5 max-w-xl text-base text-white/85 md:text-lg">
                            {t("heroSubtitle")}
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Button asChild>
                                <Link href={`/${locale}/quote`}>
                                    {tradGlobal("requestQuote")} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href={`/${locale}/products`}>
                                    {tradGlobal("discoverCatalog")} <ArrowRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}
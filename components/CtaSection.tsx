"use client";

import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
    const t = useTranslations("ctaFinal");
    const tradGlobal = useTranslations("global");
    const locale = useLocale();

    return (
        <div>
            {/* 8) CTA FINAL */}
            <section className="bg-brandNavy py-14">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:text-left">
                    <div>
                        <div className="text-xs font-bold tracking-[0.2em] text-white/70">
                            {t("title")}
                        </div>
                        <div className="mt-3 font-serif text-2xl font-semibold text-white md:text-3xl">
                            {t("desc")}
                        </div>
                        <div className="mt-2 text-sm text-white/80">
                            {tradGlobal("contactUs")}
                        </div>
                    </div>

                    <Button asChild className="bg-brandChampagne">
                        <Link href={`/${locale}/quote`}>
                            {tradGlobal("requestQuote")} <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}

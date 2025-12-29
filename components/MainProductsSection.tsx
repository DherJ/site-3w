"use client";

import { useLocale, useTranslations } from "next-intl";
import ProductCard from "./ui/ProductCard";
import { ArrowRight } from "lucide-react";
import SecondaryButton from "./ui/SecondaryButton";
import SectionTitle from "./ui/SectionTitle";

export default function MainProductsSection() {

    const t = useTranslations("mainProducts");
    const tradGlobal = useTranslations("global");
    const locale = useLocale();

    return (
        <div>
            {/* 5) PRODUITS PHARES */}
            <section className="py-16 md:py-24">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

                        <SectionTitle
                            align="left"
                            kicker={t("label")}
                            title={t("title")}
                            subtitle={t("subtitle")}
                        />

                        <SecondaryButton href={`/${locale}/products`}>
                            {tradGlobal("discoverCatalog")} <ArrowRight className="h-4 w-4" />
                        </SecondaryButton>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        <ProductCard
                            hrefQuote={`/${locale}/quote`}
                            hrefProduct={`/${locale}/products`}
                            title="Tablier de radioprotection"
                            meta="Confort, durabilité, options sur-mesure."
                            imageSrc="/products/tablier/tablier-1.jpg"
                            hoverImageSrc="/products/tablier/tablier-1-detail.jpg"
                        />
                        <ProductCard
                            hrefQuote={`/${locale}/quote`}
                            hrefProduct={`/${locale}/products`}
                            title="Protection thyroïdienne"
                            meta="Ergonomie premium, entretien simplifié."
                            imageSrc="/products/thyroide/thyroide-1.jpg"
                            hoverImageSrc="/products/thyroide/thyroide-1-detail.jpg"
                        />
                        <ProductCard
                            hrefQuote={`/${locale}/quote`}
                            hrefProduct={`/${locale}/products`}
                            title="Chasuble radiologiques"
                            meta="Protection & confort pour usage intensif."
                            imageSrc="/products/chasuble/chasuble-1.jpg"
                            hoverImageSrc="/products/chasuble/chasuble-1-detail.jpg"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
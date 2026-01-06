"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import ProofListItems from "@/components/ui/ProofListItems";

import { PRODUCTS } from "@/data/products";
import {
    PRODUCT_CATEGORIES,
    PRODUCT_CATEGORY_KEYS,
    ProductCategory,
} from "@/data/productCategories";
import UnderlineReveal from "../ui/UnderlineReveal";

type SortKey = "featured" | "name" | "category";

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
type SizeKey = (typeof ALL_SIZES)[number];

export default function ProductsCatalogue({ locale }: { locale: string }) {
    const t = useTranslations("products");
    const tGlobal = useTranslations("global");

    const [activeCategory, setActiveCategory] = useState<ProductCategory | "all">("all");
    const [selectedSizes, setSelectedSizes] = useState<SizeKey[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sort, setSort] = useState<SortKey>("featured");

    const quoteHref = `/${locale}/quote`;
    const productHref = (slug: string) => `/${locale}/products/${slug}`;

    // Tags disponibles depuis les produits
    const allTags = useMemo(() => {
        const set = new Set<string>();
        PRODUCTS.forEach((p) => (p.tags ?? []).forEach((x) => set.add(x)));
        return Array.from(set);
    }, []);

    const filteredProducts = useMemo(() => {
        let list = [...PRODUCTS];

        // category
        if (activeCategory !== "all") {
            list = list.filter((p) => p.category === activeCategory);
        }

        // sizes (si le produit n’a pas sizes -> on le garde seulement si aucune taille sélectionnée)
        if (selectedSizes.length > 0) {
            list = list.filter((p: any) => {
                const sizes = p.sizes as SizeKey[] | undefined;
                if (!sizes) return false;
                return selectedSizes.some((s) => sizes.includes(s));
            });
        }

        // tags
        if (selectedTags.length > 0) {
            list = list.filter((p) => {
                const tags = p.tags ?? [];
                return selectedTags.every((tag) => tags.includes(tag));
            });
        }

        // sort
        if (sort === "name") {
            list.sort((a, b) => a.title.localeCompare(b.title, "fr"));
        } else if (sort === "category") {
            list.sort((a, b) => a.category.localeCompare(b.category, "fr"));
        } else {
            // featured: best-seller d’abord si tag existe
            list.sort((a, b) => {
                const aScore = (a.tags ?? []).includes("Best-seller") ? 1 : 0;
                const bScore = (b.tags ?? []).includes("Best-seller") ? 1 : 0;
                return bScore - aScore;
            });
        }

        return list;
    }, [activeCategory, selectedSizes, selectedTags, sort]);

    const total = PRODUCTS.length;
    const shown = filteredProducts.length;

    const resetFilters = () => {
        setActiveCategory("all");
        setSelectedSizes([]);
        setSelectedTags([]);
        setSort("featured");
    };

    const toggleSize = (s: SizeKey) => {
        setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
    };

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((x) => x !== tag) : [...prev, tag]));
    };

    return (
        <div className="relative py-12">
            {/* fond premium */}
            <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

            <div className="relative">
                {/* HERO */}
                <section className="pt-10 md:pt-14">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="rounded-3xl bg-white/70 p-8 ring-1 ring-brandLine shadow-soft backdrop-blur sm:p-12">
                            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                <div className="max-w-2xl">
                                    <SectionTitle align="left" kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={quoteHref}
                                        className="inline-flex rounded-2xl bg-brandChampagne px-6 py-3 text-sm font-extrabold text-brandNavy transition hover:-translate-y-0.5 hover:bg-brandChampagne/90"
                                    >
                                        {tGlobal("quote")}
                                    </Link>

                                    <Link
                                        href="#products-grid"
                                        className="inline-flex rounded-2xl bg-brandNavy px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brandNavy/90"
                                    >
                                        {tGlobal("discoverCatalog")}
                                    </Link>
                                </div>
                            </div>

                            <ProofListItems />
                        </div>
                    </div>
                </section>

                {/* LAYOUT: sidebar + grid */}
                <section id="products-grid" className="mt-10 pb-16 md:mt-14 md:pb-24">
                    <div className="mx-auto max-w-6xl px-4">
                        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
                            {/* SIDEBAR */}
                            <aside className="md:sticky md:top-28 md:self-start">
                                <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-softer backdrop-blur">
                                    {/* header */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                                            {t("filters.kicker", { defaultValue: "FILTRES" })}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="text-xs font-bold text-brandMuted hover:text-brandNavy transition"
                                        >
                                            {t("filters.reset", { defaultValue: "Réinitialiser" })}
                                        </button>
                                    </div>

                                    <div className="mt-3 text-sm text-brandMuted">
                                        <span className="font-semibold text-brandNavy">{shown}</span>{" "}
                                        {t("filters.results", { defaultValue: "produits affichés" })}{" "}
                                        <span className="text-brandMuted/70">/ {total}</span>
                                    </div>

                                    <div className="mt-5 space-y-8">
                                        {/* Category */}
                                        <FilterGroup title={t("filters.category", { defaultValue: "Catégories" })}>
                                            <div className="flex flex-col gap-2">
                                                <SidebarRadio
                                                    checked={activeCategory === "all"}
                                                    label={t("filters.all")}
                                                    onClick={() => setActiveCategory("all")}
                                                />
                                                {PRODUCT_CATEGORY_KEYS.map((key) => (
                                                    <SidebarRadio
                                                        key={key}
                                                        checked={activeCategory === key}
                                                        label={t(PRODUCT_CATEGORIES[key].i18nKey, {
                                                            defaultValue: PRODUCT_CATEGORIES[key].fallback,
                                                        })}
                                                        onClick={() => setActiveCategory(key)}
                                                    />
                                                ))}
                                            </div>
                                        </FilterGroup>

                                        {/* Sizes */}
                                        <FilterGroup title={t("filters.size", { defaultValue: "Tailles" })}>
                                            <div className="flex flex-wrap gap-2">
                                                {ALL_SIZES.map((s) => (
                                                    <Chip
                                                        key={s}
                                                        active={selectedSizes.includes(s)}
                                                        onClick={() => toggleSize(s)}
                                                        label={s}
                                                    />
                                                ))}
                                            </div>
                                        </FilterGroup>

                                        {/* Tags */}
                                        {allTags.length > 0 ? (
                                            <FilterGroup title={t("filters.tags", { defaultValue: "Tags" })}>
                                                <div className="flex flex-wrap gap-2">
                                                    {allTags.map((tag) => (
                                                        <Chip
                                                            key={tag}
                                                            active={selectedTags.includes(tag)}
                                                            onClick={() => toggleTag(tag)}
                                                            label={tag}
                                                        />
                                                    ))}
                                                </div>
                                            </FilterGroup>
                                        ) : null}
                                    </div>
                                </div>
                            </aside>

                            {/* CONTENT */}
                            <div>
                                {/* TOOLBAR (sans cadre, underline champagne à droite) */}
                                {/* TOOLBAR (sans cadre, underline à droite) */}
                                <div className="mb-6">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="text-sm text-brandMuted">
                                            <span className="font-semibold text-brandNavy">{shown}</span>{" "}
                                            {t("filters.results", { defaultValue: "produits affichés" })}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <label className="text-xs font-bold tracking-[0.16em] text-brandNavy/60">
                                                {t("filters.sort", { defaultValue: "TRI" })}
                                            </label>

                                            <select
                                                value={sort}
                                                onChange={(e) => setSort(e.target.value as SortKey)}
                                                className={[
                                                    "rounded-2xl bg-white/60 backdrop-blur",
                                                    "px-4 py-2.5 text-sm font-semibold text-brandNavy",
                                                    "ring-1 ring-brandLine outline-none",
                                                    "focus:ring-brandChampagne/45",
                                                ].join(" ")}
                                            >
                                                <option value="featured">{t("sort.featured", { defaultValue: "Sélection" })}</option>
                                                <option value="name">{t("sort.name", { defaultValue: "Nom" })}</option>
                                                <option value="category">{t("sort.category", { defaultValue: "Catégorie" })}</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* ✅ underline animée, collée à droite, droite -> gauche, relance au scroll */}
                                    <UnderlineReveal
                                        align="right"
                                        from="right"
                                        width="short"
                                        className="mt-3"
                                        triggerKey={`${sort}-${activeCategory}-${selectedSizes.join(",")}-${selectedTags.join(",")}-${shown}`}
                                    />
                                </div>

                                {/* GRID */}
                                <div
                                    className={[
                                        "grid gap-6",
                                        "sm:grid-cols-2",
                                        "lg:grid-cols-3",
                                        "items-stretch",
                                    ].join(" ")}
                                >
                                    {filteredProducts.map((p) => (
                                        <ProductCard
                                            key={p.slug}
                                            hrefQuote={quoteHref}
                                            hrefProduct={productHref(p.slug)}
                                            title={p.title}
                                            meta={p.meta}
                                            imageSrc={p.images?.[0]?.src ?? "/placeholder.jpg"}
                                            hoverImageSrc={p.images?.[0]?.hoverSrc}
                                        />
                                    ))}
                                </div>

                                {/* EMPTY */}
                                {shown === 0 ? (
                                    <div className="mt-10 rounded-3xl bg-white/70 p-8 ring-1 ring-brandLine shadow-softer backdrop-blur">
                                        <p className="text-center text-sm text-brandMuted">{t("empty")}</p>
                                        <div className="mt-5 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={resetFilters}
                                                className="rounded-2xl bg-brandNavy px-6 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brandNavy/90"
                                            >
                                                {t("filters.reset", { defaultValue: "Réinitialiser" })}
                                            </button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

/* -------------------------------- UI small components -------------------------------- */

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div>
            <div className="text-xs font-extrabold tracking-[0.16em] text-brandNavy/70">{title.toUpperCase()}</div>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function SidebarRadio({
    checked,
    label,
    onClick,
}: {
    checked: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "flex items-center justify-between rounded-2xl px-4 py-2.5 text-left",
                "ring-1 transition-all duration-300",
                checked
                    ? "bg-brandNavy text-white ring-brandNavy/25"
                    : "bg-white/80 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40",
            ].join(" ")}
        >
            <span className="text-sm font-semibold">{label}</span>
            <span
                aria-hidden
                className={[
                    "h-2.5 w-2.5 rounded-full",
                    checked ? "bg-brandChampagne" : "bg-brandMuted/25",
                ].join(" ")}
            />
        </button>
    );
}

function Chip({
    label,
    active,
    onClick,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "rounded-full px-3 py-2 text-xs font-extrabold tracking-[0.14em]",
                "ring-1 transition-all duration-300",
                active
                    ? "bg-brandChampagne text-brandNavy ring-brandChampagne/35"
                    : "bg-white/80 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40",
            ].join(" ")}
        >
            {label.toUpperCase()}
        </button>
    );
}

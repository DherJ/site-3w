"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PRODUCT_CATEGORY_MENU } from "@/data/productCategoryMenu";
import { useDragScroll } from "@/components/hooks/useDragScroll";

export default function HeaderProductsDropdown({
    locale,
    onNavigate,
}: {
    locale: string;
    onNavigate?: () => void;
}) {
    const t = useTranslations("products");
    const scrollerRef = useDragScroll<HTMLDivElement>();

    return (
        <div className="fixed inset-x-0 top-[96px] z-[200]">
            <div className="bg-white ring-1 ring-brandLine shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
                {/* header */}
                <div className="mx-auto max-w-6xl px-4 py-5">
                    <div className="flex items-center justify-between gap-6">
                        <div>
                            <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/55">
                                {t("kicker", { defaultValue: "CATALOGUE" })}
                            </div>
                            <div className="mt-2 font-serif text-xl font-semibold text-brandNavy">
                                {t("filters.category", { defaultValue: "Catégories" })}
                            </div>
                        </div>

                        <Link
                            href={`/${locale}/products`}
                            onClick={onNavigate}
                            className="hidden sm:inline-flex text-xs font-extrabold tracking-[0.18em] text-brandNavy/70 hover:text-brandNavy"
                        >
                            {t("seeCatalogue", { defaultValue: "Voir le catalogue" })} →
                        </Link>
                    </div>
                </div>

                <div className="h-px bg-brandLine" />

                {/* horizontal scroller */}
                <div className="mx-auto max-w-6xl px-4 pb-5">
                    <div
                        ref={scrollerRef}
                        className={[
                            "w-full overflow-x-auto overflow-y-hidden",
                            "cursor-grab active:cursor-grabbing select-none",
                            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                        ].join(" ")}
                    >
                        <div className="mx-auto flex w-max gap-4 px-4 py-5 md:px-6">
                            {PRODUCT_CATEGORY_MENU.map((c) => (
                                <Link
                                    data-no-drag
                                    key={c.key}
                                    href={`/${locale}/products?cat=${encodeURIComponent(c.key)}`}
                                    onClick={onNavigate}
                                    className={[
                                        "group",
                                        "w-[180px] md:w-[200px]",
                                        "rounded-3xl bg-white",
                                        "ring-1 ring-brandLine",
                                        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
                                        "overflow-hidden",
                                        "transition-all duration-300",
                                        "hover:-translate-y-[2px] hover:ring-brandChampagne/40",
                                    ].join(" ")}
                                >
                                    {/* image top */}
                                    <div className="relative aspect-[4/3] w-full bg-white">
                                        <Image
                                            src={c.imageSrc}
                                            alt={c.fallback}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                            sizes="220px"
                                            priority={false}
                                            unoptimized
                                        />
                                        {/* subtle top gradient like ecommerce */}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                                    </div>

                                    {/* content */}
                                    <div className="p-4">
                                        <div className="text-[13px] font-extrabold text-brandNavy leading-snug">
                                            {t(c.i18nKey as any, { defaultValue: c.fallback })}
                                        </div>

                                        {/* underline accent */}
                                        <div className="mt-3 h-[2px] w-10 rounded-full bg-brandChampagne/70 transition-all duration-300 group-hover:w-14" />

                                        {/* footer action row */}
                                        <div className="mt-3 flex items-center justify-between">
                                            <span className="text-xs font-extrabold tracking-[0.16em] text-brandNavy/70">
                                                {t("seeCategory", { defaultValue: "Voir la catégorie" })}
                                            </span>
                                            <span className="text-brandNavy/35 transition-colors group-hover:text-brandNavy/70">
                                                →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-1 text-xs text-brandMuted">
                            {t('tips.horizontalScroll', { defaultValue: "Astuce : scrolle horizontalement." })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

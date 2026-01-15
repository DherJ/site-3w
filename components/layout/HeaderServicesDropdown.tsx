"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SERVICES } from "@/data/services";
import { useDragScroll } from "../hooks/useDragScroll";
import { withBasePath } from "@/lib/withBasePath";

const toWebp = (src: string) => src.replace(/\.(png|jpe?g)$/i, ".webp");

export default function HeaderServicesDropdown({
  locale,
  onNavigate,
}: {
  locale: string;
  onNavigate?: () => void;
}) {

  const t = useTranslations("services");

  const scrollerRef = useDragScroll<HTMLDivElement>();
  const serviceHref = (slug: string) => `/${locale}/services/${slug}`;

  return (
    <div className="fixed inset-x-0 top-[96px] z-[200]">
      <div className="w-full bg-white ring-1 ring-brandLine shadow-[0_18px_60px_rgba(0,0,0,0.18)]">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/55">
                {t("kicker", { defaultValue: "SERVICES" })}
              </div>
              <div className="mt-2 font-serif text-xl font-semibold text-brandNavy">
                {t("ourServices", { defaultValue: "Nos prestations" })}
              </div>
            </div>
            <Link
              href={`/${locale}/services`}
              onClick={onNavigate}
              className="hidden sm:inline-flex text-xs font-extrabold tracking-[0.18em] text-brandNavy/70 hover:text-brandNavy"
            >
              {t("seeServices", { defaultValue: "Voir les services" })} →
            </Link>
          </div>
        </div>

        <div className="h-px bg-brandLine/70" />

        {/* horizontal scroll */}
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
              {SERVICES.map((s) => (
                <Link
                  key={s.key}
                  href={serviceHref(s.slug)}
                  onClick={onNavigate}
                  className={[
                    "group flex items-center gap-3",
                    "min-w-[260px] rounded-2xl bg-white",
                    "ring-1 ring-brandLine px-3 py-2.5",
                    "transition-all duration-300 hover:-translate-y-[1px] hover:ring-brandChampagne/40",
                  ].join(" ")}
                >
                  <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-brandLine">
                    <picture className="absolute inset-0 h-full w-full">
                      <source
                        srcSet={withBasePath(`/services/webp/${toWebp(s.imageSrc.split("/").pop() || "")}`)}
                        type="image/webp"
                      />
                      <img
                        src={withBasePath(s.imageSrc)}
                        alt={s.fallback}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="48px"
                        loading="lazy"
                      />
                    </picture>
                  </div>

                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-extrabold text-brandNavy">
                      {t(`${s.i18nKey}.title` as any, { defaultValue: s.fallback })}
                    </div>
                    <div className="mt-0.5 text-[11px] text-brandMuted">
                      {t("seeService", { defaultValue: "Voir le service" })}
                    </div>
                  </div>

                  <div className="ml-auto text-brandNavy/35 group-hover:text-brandNavy/70">
                    →
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-1 text-xs text-brandMuted">
            {t("tips.horizontalScroll", { defaultValue: "Astuce : scrolle horizontalement." })}
          </div>
        </div>
      </div>
    </div>
  );
}

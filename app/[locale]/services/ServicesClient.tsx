"use client";

import Image from "next/image";
import SignatureLine from "@/components/ui/SignatureLine";
import { useRevealOnScroll } from "@/components/hooks/useRevealOnScroll";
import { useTranslations } from "next-intl";
import { Service } from "@/data/services";

type Item = {
  slug: string;
  title: string;
  desc: string;
  imageSrc: string;
};

function ServiceRow({
  title,
  desc,
  imageSrc,
  reverse,
  index,
  processTitle,
  processSteps,
}: {
  title: string;
  desc: string;
  imageSrc: string;
  reverse?: boolean;
  index: number;
  processTitle: string;
  processSteps: string[];
}) {
  return (
    <section
      data-reveal
      style={{ transitionDelay: `${index * 80}ms` }}
      className={[
        "rounded-3xl bg-white/70 ring-1 ring-brandLine shadow-soft backdrop-blur",
        "overflow-hidden",
      ].join(" ")}
    >
      <div
        className={[
          "grid gap-0 lg:grid-cols-2",
          reverse ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full bg-white">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain p-8"
            sizes="(min-width: 1024px) 520px, 100vw"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            SERVICE
          </div>

          <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy md:text-3xl">
            {title}
          </h2>

          {/* ligne champagne */}
          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4 w-[220px]">
            <SignatureLine align="left" />
          </div>

          <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
            {desc}
          </p>

          {/* Process (premium) */}
          <div className="mt-6 rounded-3xl bg-white/60 ring-1 ring-brandLine p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                {processTitle.toUpperCase()}
              </div>
              <div className="hidden sm:block h-[2px] w-16 rounded-full bg-brandChampagne/60" />
            </div>

            <div className="mt-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {processSteps.slice(0, 3).map((step, i) => (
                  <div key={`${title}-step-${i}`} className="group relative">
                    {/* connector (desktop) */}
                    {i < 2 && (
                      <div className="hidden sm:block pointer-events-none absolute top-[18px] left-[calc(100%_-_6px)] w-[calc(100%_-_12px)]">
                        <div className="h-[2px] w-full bg-brandLine" />
                        <div className="absolute left-0 top-0 h-[2px] w-0 bg-brandChampagne/70 transition-all duration-300 group-hover:w-full" />
                      </div>
                    )}

                    <div
                      className={[
                        "relative overflow-hidden rounded-2xl bg-white/70 ring-1 ring-brandLine",
                        "px-4 py-4",
                        "transition-all duration-300",
                        "group-hover:-translate-y-0.5 group-hover:ring-brandChampagne/40",
                      ].join(" ")}
                    >
                      {/* glow */}
                      <div className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-[0.10] bg-brandChampagne" />

                      <div className="flex items-start gap-3">
                        <span
                          className={[
                            "inline-flex h-9 w-9 items-center justify-center rounded-2xl",
                            "bg-brandChampagne/25 text-sm font-extrabold text-brandNavy",
                            "ring-1 ring-brandChampagne/30",
                            "transition-transform duration-300 group-hover:scale-[1.03]",
                          ].join(" ")}
                        >
                          {i + 1}
                        </span>

                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-brandNavy leading-snug">
                            {step}
                          </div>
                          {/* mini hint */}
                          <div className="mt-1 text-xs text-brandMuted">
                            {i === 0 ? "Cadrage" : i === 1 ? "Mise en œuvre" : "Validation"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesClient({ services }: { services: Service[] }) {

  const t = useTranslations("services");
  useRevealOnScroll();

  return (
    <div id="list" className="mt-10 space-y-6 md:space-y-10">
      {services.map((s, idx) => {
        const title = t(`${s.i18nKey}.title`);
        const desc = t(`${s.i18nKey}.desc`);
        const processTitle = t(`${s.i18nKey}.process.title`);
        // const processSteps = t.raw(`${s.i18nKey}.process.steps`) as string[];
        const processSteps = [t(`${s.i18nKey}.process.step1`), t(`${s.i18nKey}.process.step2`), t(`${s.i18nKey}.process.step3`)]
        
        return (
          <ServiceRow
            key={s.slug}
            index={idx}
            reverse={idx % 2 === 1}
            title={title}
            desc={desc}
            imageSrc={s.imageSrc}
            processTitle={processTitle}
            processSteps={processSteps}
          />
        );
      })}
    </div>
  );
}

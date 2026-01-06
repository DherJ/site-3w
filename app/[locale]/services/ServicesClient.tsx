"use client";

import Image from "next/image";
import SignatureLine from "@/components/ui/SignatureLine";
import { useRevealOnScroll } from "@/components/hooks/useRevealOnScroll";
import { useTranslations } from "next-intl";

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

          {/* Process */}
          <div className="mt-6 rounded-2xl bg-white/60 ring-1 ring-brandLine p-5">
            <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
              {processTitle.toUpperCase()}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {processSteps.slice(0, 3).map((step, i) => (
                <div
                  key={`${title}-step-${i}`}
                  className="rounded-2xl bg-white/70 ring-1 ring-brandLine px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-brandChampagne/25 text-xs font-extrabold text-brandNavy ring-1 ring-brandChampagne/30">
                      {i + 1}
                    </span>
                    <div className="text-sm font-semibold text-brandNavy leading-snug">
                      {step}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicesClient({ services }: { services: Item[] }) {
  
  const t = useTranslations("services");
  useRevealOnScroll();

  return (
    <div id="list" className="mt-10 space-y-6 md:space-y-10">
      {services.map((s, idx) => (
        <ServiceRow
          key={s.slug}
          index={idx}
          reverse={idx % 2 === 1}
          title={t(s.title!)}
          desc={t(s.desc!)}
          imageSrc={s.imageSrc}
          processTitle={t(`${s.slug}.process.title`)}
          processSteps={t.raw(`${s.slug}.process.steps`) as string[]}
        />
      ))}
    </div>
  );
}

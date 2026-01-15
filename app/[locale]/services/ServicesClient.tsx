"use client";

import SignatureLine from "@/components/ui/SignatureLine";
import { useRevealOnScroll } from "@/components/hooks/useRevealOnScroll";
import { useTranslations } from "next-intl";
import { Service } from "@/data/services";
import { withBasePath } from "@/lib/withBasePath";

function ServiceRow({
  slug,
  kicker,
  title,
  desc,
  imageSrc,
  reverse,
  index,
  processTitle,
  processSteps,
}: {
  slug: string;
  kicker: string;
  title: string;
  desc: string;
  imageSrc: string;
  reverse?: boolean;
  index: number;
  processTitle: string;
  processSteps: string[];
}) {
  const toWebp = (imageSrc: string) => imageSrc.replace(/\.(png|jpe?g)$/i, ".webp");

  return (
    <section
      id={slug}
      data-reveal
      style={{ transitionDelay: `${index * 80}ms` }}
      className={[
        "rounded-3xl bg-white/70 ring-1 ring-brandLine shadow-soft backdrop-blur",
        "overflow-hidden scroll-mt-28",
      ].join(" ")}
    >
      <div
        className={[
          "grid gap-0",
          reverse
            ? "lg:grid-cols-[1.25fr_0.75fr]" // âœ… image Ã  droite => plus Ã©troite
            : "lg:grid-cols-[0.85fr_1.15fr]", // image Ã  gauche => normal
          reverse ? "lg:[&>*:first-child]:order-2" : "",
        ].join(" ")}
      >
        {/* IMAGE â€” Frame constant pour uniformiser */}
        <div className="bg-white">
          <div
            className={[
              "relative w-full",
              "h-[360px] md:h-[420px] lg:h-[460px]",
              "overflow-hidden",
              "flex items-center justify-center",
            ].join(" ")}
          >
            {/* âœ… â€œframeâ€ intÃ©rieur pour calmer les images trop grandes */}
            <div className="relative h-full w-full p-8 md:p-10 lg:p-12">
              <div className="relative h-full w-full">
                <picture className="absolute inset-0 h-full w-full">
                  <source
                    srcSet={withBasePath(`/services/webp/${toWebp(imageSrc.split("/").pop() || "")}`)}
                    type="image/webp"
                  />
                  <img
                    src={withBasePath(imageSrc)}
                    alt={title}
                    className="h-full w-full object-contain [transform:scale(0.92)]"
                    sizes="(min-width: 1024px) 520px, 100vw"
                    loading="lazy"
                  />
                </picture>
              </div>
            </div>

            {/* voile discret */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
              {kicker}
            </div>

            <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy md:text-3xl">
              {title}
            </h2>

            <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

            <div className="mt-4 w-[220px]">
              <SignatureLine align="left" />
            </div>

            <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
              {desc}
            </p>
          </div>

          {/* PROCESS */}
          <div className="mt-6 rounded-3xl bg-white/60 ring-1 ring-brandLine p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                {processTitle.toUpperCase()}
              </div>
              <div className="hidden sm:block h-[2px] w-16 rounded-full bg-brandChampagne/60" />
            </div>

            <div className="mt-5 space-y-4">
              {processSteps.slice(0, 3).map((step, i) => (
                <div
                  key={`${title}-step-${i}`}
                  className="flex items-start gap-4"
                >
                  {/* Badge */}
                  <span className="mt-[2px] inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brandChampagne/25 text-sm font-extrabold text-brandNavy ring-1 ring-brandChampagne/30">
                    {i + 1}
                  </span>

                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-brandNavy leading-snug break-words">
                      {step}
                    </div>
                    <div className="mt-1 text-xs text-brandMuted">
                      {i === 0 ? "Cadrage" : i === 1 ? "Mise en Å“uvre" : "Validation"}
                    </div>

                    {/* sÃ©parateur fin sauf dernier */}
                    {i < 2 ? (
                      <div className="mt-4 h-px w-full bg-brandLine/60" />
                    ) : null}
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

export default function ServicesClient({ services }: { services: Service[] }) {

  const t = useTranslations("services");
  useRevealOnScroll();

  return (
    <div id="list" className="mt-10 space-y-6 md:space-y-10">
      {services.map((s, idx) => {
        const title = t(`${s.i18nKey}.title`);
        const desc = t(`${s.i18nKey}.desc`);
        const processTitle = t(`${s.i18nKey}.process.title`);
        const processSteps = [t(`${s.i18nKey}.process.step1`), t(`${s.i18nKey}.process.step2`), t(`${s.i18nKey}.process.step3`)]

        return (
          <ServiceRow
            key={s.slug}
            slug={s.slug}
            index={idx}
            reverse={idx % 2 === 1}
            kicker={t(`${s.i18nKey}.kicker`)}
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


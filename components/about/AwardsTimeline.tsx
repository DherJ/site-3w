// components/about/AwardsTimeline.tsx
"use client";

import SignatureLine from "@/components/ui/SignatureLine";

export default function AwardsTimeline({
  kicker = "DISTINCTIONS",
  title,
  intro,
  items,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  items: string[];
}) {
  if (!items?.length) return null;

  return (
    <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
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

      {intro ? (
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brandMuted md:text-base">
          {intro}
        </p>
      ) : null}

      {/* Timeline */}
      <div className="mt-8">
        {/* Scroll container */}
        <div className="relative -mx-6 px-6 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="min-w-max">
            {/* Track */}
            <div className="relative">
              <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-brandLine" />
              <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-brandChampagne/60 opacity-0 transition-opacity duration-300 hover:opacity-100" />
            </div>

            {/* Items */}
            <div className="relative flex gap-4 pr-2">
              {items.map((label, i) => (
                <div key={`${label}-${i}`} className="relative pt-8">
                  {/* node */}
                  <div className="absolute left-6 top-[12px] h-3 w-3 rounded-full bg-brandChampagne ring-2 ring-white shadow-sm" />

                  <div
                    className={[
                      "w-[280px] md:w-[320px]",
                      "rounded-3xl bg-white/60 p-5 ring-1 ring-brandLine",
                      "transition-all duration-300",
                      "hover:-translate-y-0.5 hover:ring-brandChampagne/40",
                    ].join(" ")}
                  >
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                      DISTINCTION
                    </div>

                    <div className="mt-2 text-sm font-semibold text-brandNavy leading-snug">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hint mobile */}
        <div className="mt-3 text-xs text-brandMuted md:hidden">
          Glisse horizontalement pour voir toutes les distinctions.
        </div>
      </div>
    </section>
  );
}

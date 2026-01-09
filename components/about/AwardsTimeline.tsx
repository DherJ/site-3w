// components/about/AwardsTimeline.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import SignatureLine from "@/components/ui/SignatureLine";
import { useDragScroll } from "@/components/hooks/useDragScroll";

type AwardItem = { label: string; year?: string };

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

  const awards: AwardItem[] = useMemo(
    () => items.map((label) => ({ label, year: "2025" })),
    [items]
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useDragScroll<HTMLDivElement>();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) el.classList.add("is-in");
          else el.classList.remove("is-in");
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        {/* ✅ SCROLLER */}
        <div
          ref={scrollerRef}
          className={[
            "w-full overflow-x-auto overflow-y-hidden pb-3",
            "cursor-grab active:cursor-grabbing",
            "select-none",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // petit confort : scroll plus doux au trackpad
            "scroll-smooth",
          ].join(" ")}
        >
          {/* ✅ CONTENT (w-max) + ✅ RIGHT PADDING so last card is fully visible */}
          <div className="relative flex w-max gap-5 pr-14">
            {/* Track behind items, spans full content width */}
            <div className="absolute left-0 right-0 top-[18px] h-[2px] bg-brandLine" />
            <div
              ref={trackRef}
              className="timeline-track absolute left-0 right-0 top-[18px] h-[2px]"
            />

            {awards.map((item, i) => (
              <div key={`${item.label}-${i}`} className="relative pt-8">

                {/* node */}
                <div className="absolute left-6 top-[18px] -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full bg-white" />
                  <div className="absolute inset-1 rounded-full bg-brandChampagne shadow-sm ring-2 ring-white" />
                </div>

                <div
                  className={[
                    "relative w-[300px] md:w-[360px]",
                    "rounded-3xl bg-white/60 p-5 ring-1 ring-brandLine",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:ring-brandChampagne/40",
                  ].join(" ")}
                >
                  {/* Year badge */}
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center rounded-full bg-brandChampagne/25 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-brandNavy ring-1 ring-brandChampagne/40">
                      {item.year}
                    </span>
                  </div>

                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                    DISTINCTION
                  </div>

                  <div className="mt-3 pr-12 text-sm font-semibold text-brandNavy leading-snug">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-xs text-brandMuted md:hidden">
          Glisse horizontalement pour voir toutes les distinctions.
        </div>

        <div className="mt-2 hidden md:block text-xs text-brandMuted">
          Astuce : maintiens et glisse à la souris pour parcourir la timeline.
        </div>
      </div>
    </section>
  );
}

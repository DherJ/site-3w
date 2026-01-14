"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import HoverRevealImage from "@/components/ui/HoverRevealImage";
import CursorZoomImage from "@/components/ui/CursorZoomImage";

export type GalleryImage = {
  src: string;
  alt: string;
  hoverSrc?: string;
};

export default function ProductGallery({
  title,
  images,
  enableHoverSplit = true,
}: {
  title: string;
  images: GalleryImage[];
  enableHoverSplit?: boolean;
}) {
  const list = useMemo(() => images.filter(Boolean), [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile carousel refs
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const active = list[activeIndex] ?? list[0];
  if (!active) return null;

  // Mobile: update active index when user scrolls (scroll-snap)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      let bestIdx = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      children.forEach((c, idx) => {
        const r = c.getBoundingClientRect();
        const cCenter = r.left + r.width / 2;
        const d = Math.abs(centerX - cCenter);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (idx: number) => {
    setActiveIndex(idx);

    // Mobile: scroll to slide
    const el = scrollerRef.current;
    if (!el) return;
    const child = el.children[idx] as HTMLElement | undefined;
    if (!child) return;
    child.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[88px_1fr]">
      {/* Thumbnails (desktop left) */}
      <div className="hidden lg:flex flex-col gap-3">
        {list.map((img, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={`${img.src}-${idx}`}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={[
                "relative overflow-hidden rounded-2xl",
                "ring-1 transition-all duration-300",
                isActive
                  ? "ring-brandChampagne/60"
                  : "ring-brandLine hover:ring-brandChampagne/35",
                "bg-white",
              ].join(" ")}
              aria-label={`Voir image ${idx + 1}`}
            >
              <div className="relative aspect-square w-[88px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className={[
                    "object-cover transition-transform duration-500",
                    isActive ? "scale-[1.02]" : "hover:scale-[1.04]",
                  ].join(" ")}
                  sizes="88px"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main / Mobile carousel */}
      <div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-brandLine">
        {/* Mobile: scroll-snap carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollerRef}
            className={[
              "flex w-full overflow-x-auto",
              "snap-x snap-mandatory",
              "scroll-px-4",
              "gap-4 px-4 pt-4 pb-3",
              "[-ms-overflow-style:none] [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
            ].join(" ")}
          >
            {list.map((img, idx) => (
              <div
                key={`${img.src}-slide-${idx}`}
                className="relative aspect-square w-[86%] shrink-0 snap-center overflow-hidden rounded-3xl bg-white ring-1 ring-black/5"
              >
                {/* Sur mobile: pas de split (trop “gadget”), on affiche base */}
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 pb-4">
            {list.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => goTo(idx)}
                aria-label={`Aller à l’image ${idx + 1}`}
                className={[
                  "h-2 w-2 rounded-full transition-all duration-300",
                  idx === activeIndex ? "bg-brandChampagne w-6" : "bg-brandLine",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* Desktop: big image with optional split */}
        <div className="hidden lg:block">
          <div className="relative aspect-square w-full overflow-hidden">
            {enableHoverSplit && active.hoverSrc ? (
              <HoverRevealImage
                baseSrc={active.src}
                alt={active.alt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
              />

            ) : (
              <CursorZoomImage
                src={active.src}
                alt={active.alt}
                zoom={1.9}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-full w-full"
              />
            )}
            {/* Glow brand */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -inset-24 opacity-[0.06] blur-3xl bg-brandChampagne" />
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <div className="text-xs font-bold tracking-[0.18em] text-brandNavy/55">
              {title.toUpperCase()}
            </div>
            <div className="text-xs text-brandMuted">
              {activeIndex + 1} / {list.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

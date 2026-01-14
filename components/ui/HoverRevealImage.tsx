"use client";

import { withBasePath } from "@/lib/withBasePath";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  baseSrc: string;
  hoverSrc?: string;
  alt: string;
  sizes?: string;
  className?: string;

  /** zone morte (en %) */
  deadZoneMinPct?: number; // ex: 10
  deadZoneMaxPct?: number; // ex: 90

  /** Mobile */
  autoRotateOnMobile?: boolean;
  rotateIntervalMs?: number; // durée d’un “état” (base ou hover)
  hoverHoldMs?: number;       // durée d’affichage hover (plein) sur mobile
};

export default function HoverRevealImage({
  baseSrc,
  hoverSrc,
  alt,
  sizes = "100vw",
  className = "",
  deadZoneMinPct = 10,
  deadZoneMaxPct = 90,
  autoRotateOnMobile = true,
  rotateIntervalMs = 2200,
  hoverHoldMs = 900,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  // Mobile: 3 temps (base -> hover -> base)
  const [mobilePhase, setMobilePhase] = useState<"base" | "hover">("base");

  const hasHoverImage = !!hoverSrc;

  const isCoarsePointer = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches ?? false;
  }, []);

  // Mobile storytelling: base -> hover (plein) -> base (repeat)
  useEffect(() => {
    if (!hasHoverImage || !autoRotateOnMobile) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const noHover = window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
    if (reduce || !noHover) return;

    let baseTimer: number | null = null;
    let hoverTimer: number | null = null;

    const loop = () => {
      setMobilePhase("base");
      baseTimer = window.setTimeout(() => {
        setMobilePhase("hover");
        hoverTimer = window.setTimeout(() => {
          loop();
        }, hoverHoldMs);
      }, rotateIntervalMs);
    };

    loop();

    return () => {
      if (baseTimer) window.clearTimeout(baseTimer);
      if (hoverTimer) window.clearTimeout(hoverTimer);
    };
  }, [hasHoverImage, autoRotateOnMobile, rotateIntervalMs, hoverHoldMs]);

  // Desktop: split follow cursor
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !hasHoverImage) return;
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const noHover = window.matchMedia?.("(hover: none), (pointer: coarse)")?.matches;
    if (reduce || noHover) return;

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const setVars = (clientX: number) => {
      const node = wrapRef.current;
      if (!node) return;

      const r = node.getBoundingClientRect();
      const x = clamp(clientX - r.left, 0, r.width);
      let pct = (x / r.width) * 100;

      // 🎯 Zone morte (10–90%)
      pct = clamp(pct, deadZoneMinPct, deadZoneMaxPct);

      node.style.setProperty("--mx", `${pct}%`);
    };

    const onMove = (e: PointerEvent) => setVars(e.clientX);

    const onEnter = () => {
      el.classList.add("is-hovering");
      // 🎬 petit décalage “Apple-like” (split d’abord, reveal ensuite)
      window.setTimeout(() => el.classList.add("is-reveal"), 40);
    };

    const onLeave = () => {
      el.classList.remove("is-reveal");
      el.classList.remove("is-hovering");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [hasHoverImage, deadZoneMinPct, deadZoneMaxPct]);

  return (
    <div
      ref={wrapRef}
      className={[
        "relative aspect-square w-full overflow-hidden bg-white",
        "reveal-wrap",
        className,
      ].join(" ")}
      data-mobile={isCoarsePointer ? "true" : "false"}
      data-phase={mobilePhase}
    >
      {/* Base */}
      <Image
        src={withBasePath(baseSrc)}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={sizes}
        unoptimized
      />

      {/* Hover (split) */}
      {hoverSrc ? (
        <Image
          src={withBasePath(hoverSrc)}
          alt={`${alt} — détail`}
          fill
          className="reveal-hover object-cover pointer-events-none"
          sizes={sizes}
          unoptimized
        />
      ) : null}

      {/* ✨ Micro-highlight 1px sur le split */}
      {hoverSrc ? <div aria-hidden className="reveal-splitline" /> : null}

      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
    </div>
  );
}

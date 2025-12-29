"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  /** alignement horizontal de la ligne */
  align?: "left" | "right" | "center";
  /** sens de l’animation */
  from?: "left" | "right";
  /** largeur “signature” */
  width?: "signature" | "short";
  /** relance l’anim quand ça change (tri, filtres, etc.) */
  triggerKey?: string | number;
};

export default function UnderlineReveal({
  className = "",
  align = "right",
  from = "right",
  width = "short",
  triggerKey,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  // Observe l'entrée à l'écran
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(false); // reset
            requestAnimationFrame(() => setInView(true)); // replay
          }
        });
      },
      { threshold: 0.6 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Re-trigger propre quand triggerKey change (tri, filtres…)
  useEffect(() => {
    if (!ref.current) return;
    setInView(false);
    const id = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(id);
  }, [triggerKey]);

  const widthClass =
    width === "signature"
      ? "w-[min(520px,100%)]"
      : "w-[clamp(140px,18vw,240px)]";

  const alignClass =
    align === "left" ? "" : align === "center" ? "mx-auto" : "ml-auto";

  const originClass = from === "right" ? "origin-right" : "origin-left";

  return (
  <span
    ref={ref}
    aria-hidden
    className={[
      "block h-[2px]",
      width === "signature" ? "w-[min(520px,100%)]" : "w-[clamp(140px,18vw,240px)]",
      align === "left" ? "" : align === "center" ? "mx-auto" : "ml-auto",

      // ✅ tes classes CSS existantes
      "signature-underline",
      from === "right" ? "from-right" : "from-left",
      inView ? "is-inview" : "",

      className,
    ].join(" ")}
  />
);
}

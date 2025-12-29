"use client";

import { useEffect, useRef, useState } from "react";

type SignatureLineProps = {
  align?: "left" | "center";
  className?: string;
  /** Si true: l’animation ne se fait qu’une seule fois */
  once?: boolean;
};

export default function SignatureLine({
  align = "center",
  className = "",
  once = false,
}: SignatureLineProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          // ✅ déclenche
          setInView(false); // reset rapide pour rejouer
          requestAnimationFrame(() => setInView(true));
          if (once) io.disconnect();
        } else if (!once) {
          // ✅ permet de rejouer à la prochaine entrée
          setInView(false);
        }
      },
      {
        threshold: 0.6, // l’anim part quand 60% visible (ajuste si tu veux)
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={[
        "signature-line block",
        // largeur signature identique partout
        "w-[220px] max-w-full",
        align === "center" ? "mx-auto" : "",
        inView ? "is-inview" : "",
        className,
      ].join(" ")}
    />
  );
}

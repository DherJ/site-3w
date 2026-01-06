"use client";
import { useEffect } from "react";

export function useRevealOnScroll(selector = "[data-reveal]") {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selector]);
}

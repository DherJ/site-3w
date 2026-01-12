// components/hooks/useDragScroll.ts
"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a,button,input,textarea,select,label,[role='button'],[data-no-drag]";

export function useDragScroll<T extends HTMLElement>(threshold = 10) {
  const ref = useRef<T | null>(null);

  const state = useRef({
    isDown: false,
    didDrag: false,
    startX: 0,
    startScrollLeft: 0,
    pointerId: -1,
    suppressClickOnce: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      // ✅ si click sur un lien/bouton/etc -> on ne démarre PAS le drag
      const target = e.target as HTMLElement | null;
      if (target?.closest(INTERACTIVE_SELECTOR)) return;

      // souris / trackpad only
      if (e.pointerType === "touch") return;

      state.current.isDown = true;
      state.current.didDrag = false;
      state.current.startX = e.clientX;
      state.current.startScrollLeft = el.scrollLeft;
      state.current.pointerId = e.pointerId;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!state.current.isDown) return;

      const dx = e.clientX - state.current.startX;

      if (!state.current.didDrag && Math.abs(dx) > threshold) {
        state.current.didDrag = true;

        // capture uniquement si on drag vraiment
        try {
          el.setPointerCapture(state.current.pointerId);
        } catch {}
      }

      if (state.current.didDrag) {
        e.preventDefault();
        el.scrollLeft = state.current.startScrollLeft - dx;
      }
    };

    const onPointerUpOrCancel = () => {
      if (state.current.didDrag) {
        // ✅ on bloque uniquement LE prochain click (celui généré après le drag)
        state.current.suppressClickOnce = true;
      }
      state.current.isDown = false;
      state.current.didDrag = false;
    };

    const onClickCapture = (e: MouseEvent) => {
      if (state.current.suppressClickOnce) {
        state.current.suppressClickOnce = false;
        e.preventDefault();
        e.stopPropagation();
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerUpOrCancel);
    window.addEventListener("pointercancel", onPointerUpOrCancel);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUpOrCancel);
      window.removeEventListener("pointercancel", onPointerUpOrCancel);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [threshold]);

  return ref;
}

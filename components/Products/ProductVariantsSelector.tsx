"use client";

import { useMemo } from "react";
import type { LeadEquivalent, ProductSize, ProductVariant } from "@/data/products";

export default function ProductVariantsSelector({
  variants,
  selectedLead,
  selectedSize,
  onChangeLead,
  onChangeSize,
}: {
  variants: ProductVariant[];

  selectedLead: LeadEquivalent;
  selectedSize?: ProductSize;

  onChangeLead: (lead: LeadEquivalent) => void;
  onChangeSize: (size?: ProductSize) => void;
}) {
  const leadOptions = useMemo(() => {
    // unique leadEquivalent (dans l'ordre déclaré)
    const out: LeadEquivalent[] = [];
    for (const v of variants) {
      if (!out.includes(v.leadEquivalent)) out.push(v.leadEquivalent);
    }
    return out;
  }, [variants]);

  const sizesForLead = useMemo(() => {
    const v = variants.find((x) => x.leadEquivalent === selectedLead);
    return v?.sizes ?? [];
  }, [variants, selectedLead]);

  return (
    <div className="mt-8 space-y-7">
      {/* Lead */}
      <div>
        <div className="flex items-end justify-between gap-3">
          <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
            ÉQUIVALENCE PLOMB
          </div>

          <div className="text-xs text-brandMuted">
            <span>
              Sélection :{" "}
              <span className="font-semibold text-brandNavy">{selectedLead}</span>
            </span>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {leadOptions.map((lead) => {
            const active = lead === selectedLead;
            return (
              <button
                key={lead}
                type="button"
                onClick={() => {
                  onChangeLead(lead);
                  onChangeSize(undefined); // reset size quand Pb change
                }}
                className={[
                  "rounded-2xl p-4 text-left",
                  "ring-1 transition-all duration-300",
                  active
                    ? "bg-brandNavy text-white ring-brandNavy/30"
                    : "bg-white/60 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40",
                ].join(" ")}
              >
                <div className="text-xs font-extrabold tracking-[0.14em]">
                  {lead.toUpperCase()}
                </div>
                <div className={["mt-1 text-xs", active ? "text-white/80" : "text-brandMuted"].join(" ")}>
                  Protection recommandée
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex items-end justify-between gap-3">
          <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
            TAILLE
          </div>
          <div className="text-xs text-brandMuted">
            {selectedSize ? (
              <span>
                Sélection : <span className="font-semibold text-brandNavy">{selectedSize}</span>
              </span>
            ) : (
              "Choisir une taille"
            )}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {sizesForLead.map((s) => {
            const active = s === selectedSize;
            return (
              <button
                key={s}
                type="button"
                onClick={() => onChangeSize(active ? undefined : s)}
                className={[
                  "rounded-full px-3 py-2 text-xs font-extrabold tracking-[0.14em]",
                  "ring-1 transition-all duration-300",
                  active
                    ? "bg-brandChampagne text-brandNavy ring-brandChampagne/35"
                    : "bg-white/60 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40",
                ].join(" ")}
              >
                {s}
              </button>
            );
          })}
        </div>

        <p className="mt-3 text-xs text-brandMuted/80">
          Tailles disponibles selon l’équivalence plomb sélectionnée.
        </p>
      </div>
    </div >
  );
}

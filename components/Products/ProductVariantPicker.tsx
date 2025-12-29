"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductSize, LeadEquivalent } from "@/data/products";

function cn(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  product: Product;

  // optionnel : si tu veux pré-remplir depuis URL plus tard
  defaultPb?: LeadEquivalent;
  defaultSize?: ProductSize;

  // callback si tu veux l’exploiter ailleurs
  onChange?: (v: { pb?: LeadEquivalent; size?: ProductSize }) => void;
};

export default function ProductVariantPicker({
  product,
  defaultPb,
  defaultSize,
  onChange,
}: Props) {
  const hasVariants = (product.variants?.length ?? 0) > 0;

  const pbOptions = useMemo(() => {
    if (!hasVariants) return [];
    // unique leadEquivalent
    const set = new Set<LeadEquivalent>();
    product.variants.forEach((v) => set.add(v.leadEquivalent));
    return Array.from(set);
  }, [product, hasVariants]);

  // Pb sélectionné
  const [pb, setPb] = useState<LeadEquivalent | undefined>(() => {
    if (!hasVariants) return undefined;
    if (defaultPb && pbOptions.includes(defaultPb)) return defaultPb;
    // si une seule option -> auto
    if (pbOptions.length === 1) return pbOptions[0];
    return undefined;
  });

  // tailles dispo selon Pb
  const sizeOptions = useMemo(() => {
    if (!hasVariants || !pb) return [];
    const variant = product.variants.find((v) => v.leadEquivalent === pb);
    return (variant?.sizes ?? []) as ProductSize[];
  }, [product, hasVariants, pb]);

  // Taille sélectionnée
  const [size, setSize] = useState<ProductSize | undefined>(() => {
    // si tu as mis product.size par défaut
    const fallback = product.size;
    return defaultSize ?? fallback;
  });

  // Quand Pb change, on “réconcilie” la taille
  useEffect(() => {
    if (!pb) return;

    // si la taille actuelle n’est pas compatible -> on prend la 1ère dispo
    if (size && sizeOptions.includes(size)) return;

    const next = sizeOptions[0];
    setSize(next);
  }, [pb, sizeOptions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    onChange?.({ pb, size });
  }, [pb, size, onChange]);

  // UI helpers
  const pbLabel = pb ?? "—";
  const sizeLabel = size ?? "—";

  const pbRequired = pbOptions.length > 1;
  const sizeRequired = pbOptions.length > 0; // car size dépend du Pb

  return (
    <div className="mt-7 rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            VARIANTES
          </div>
          <p className="mt-2 text-sm text-brandMuted">
            Sélectionnez l’équivalence plomb et la taille pour préparer le devis.
          </p>
        </div>

        <div className="hidden sm:block w-[220px]">
          <span
            aria-hidden
            className="block h-[2px] w-[min(220px,100%)] rounded-full bg-brandChampagne/70 ml-auto"
          />
        </div>
      </div>

      {/* Pb */}
      <div className="mt-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="text-xs font-extrabold tracking-[0.16em] text-brandNavy/70">
            ÉQUIVALENCE PLOMB
          </div>
          <div className="text-xs text-brandMuted">
            Sélection :{" "}
            <span className="font-semibold text-brandNavy">{pbLabel}</span>
            {pbRequired ? <span className="text-brandMuted/70"> (requis)</span> : null}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {pbOptions.map((opt) => (
            <Chip
              key={opt}
              label={opt}
              active={pb === opt}
              onClick={() => setPb(opt)}
            />
          ))}
          {!pbOptions.length ? (
            <span className="text-sm text-brandMuted">—</span>
          ) : null}
        </div>
      </div>

      {/* Taille */}
      <div className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="text-xs font-extrabold tracking-[0.16em] text-brandNavy/70">
            TAILLE
          </div>
          <div className="text-xs text-brandMuted">
            Sélection :{" "}
            <span className="font-semibold text-brandNavy">{sizeLabel}</span>
            {sizeRequired ? <span className="text-brandMuted/70"> (requis)</span> : null}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {sizeOptions.length ? (
            sizeOptions.map((s) => (
              <Chip
                key={s}
                label={s}
                active={size === s}
                onClick={() => setSize(s)}
              />
            ))
          ) : (
            <span className="text-sm text-brandMuted">
              {pb ? "Aucune taille disponible pour cette équivalence." : "Sélectionnez d’abord une équivalence Pb."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-2 text-xs font-extrabold tracking-[0.14em]",
        "ring-1 transition-all duration-300",
        active
          ? "bg-brandChampagne text-brandNavy ring-brandChampagne/35"
          : "bg-white/80 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40"
      )}
    >
      {label.toUpperCase()}
    </button>
  );
}

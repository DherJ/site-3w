"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRODUCTS } from "@/data/products";
import SignatureLine from "@/components/ui/SignatureLine";

import {
  ShoppingCart,
  Repeat2,
  Shield,
  SprayCan,
  Layers,
  Check,
} from "lucide-react";

const schema = z.object({
  product: z.string().optional(),
  pb: z.string().optional(),
  size: z.string().optional(),

  needs: z.array(z.enum(["purchase", "rental", "quality", "cleaning", "mix"])).min(1, "Choisis au moins un besoin"),
  quantity: z.coerce.number().int().min(1).optional(),
  notes: z.string().max(2000).optional(),
  address: z.string().optional(),
  deadline: z.string().optional(),
  company: z.string().min(1, "Nom établissement requis"),
  contact: z.string().min(1, "Nom contact requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const steps = [
  { key: "need", label: "1 Besoin" },
  { key: "details", label: "2 Détails" },
  { key: "logistics", label: "3 Logistique" },
  { key: "company", label: "4 Entreprise" },
  { key: "review", label: "5 Récap" },
] as const;

const NEEDS: Array<{
  val: FormValues["needs"][number];
  label: string;
  icon: React.ReactNode;
  desc: string;
}> = [
  { val: "purchase", label: "Achat", icon: <ShoppingCart className="h-4 w-4" />, desc: "Demande de prix & disponibilité." },
  { val: "rental", label: "Location", icon: <Repeat2 className="h-4 w-4" />, desc: "Besoin ponctuel / événement." },
  { val: "quality", label: "Contrôle & blindage", icon: <Shield className="h-4 w-4" />, desc: "Conformité, protections, options." },
  { val: "cleaning", label: "Nettoyage", icon: <SprayCan className="h-4 w-4" />, desc: "Procédure & fréquence." },
  { val: "mix", label: "Mix", icon: <Layers className="h-4 w-4" />, desc: "Plusieurs besoins à la fois." },
];

function Stepper({ active }: { active: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.key}
            className={[
              "rounded-full px-3.5 py-2 text-xs font-extrabold tracking-[0.12em]",
              "ring-1 transition-all",
              isActive
                ? "bg-brandNavy text-white ring-brandNavy/20 shadow-sm"
                : "bg-white/70 text-brandNavy ring-brandLine hover:ring-brandChampagne/40",
            ].join(" ")}
          >
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="text-[11px] font-extrabold tracking-[0.14em] text-brandNavy/60">
          {label.toUpperCase()}
        </div>
        <div className="text-sm font-semibold text-brandNavy text-right">
          {value}
        </div>
      </div>

      {/* séparateur champagne (75% width) */}
      <div className="mt-2 flex justify-end">
        <div className="h-px w-3/4 bg-brandChampagne/50" />
      </div>
    </div>
  );
}

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);

  const urlProduct = searchParams.get("product") ?? undefined;
  const urlPb = searchParams.get("pb") ?? undefined;
  const urlSize = searchParams.get("size") ?? undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      needs: [],
      product: urlProduct,
      pb: urlPb,
      size: urlSize,
    },
    mode: "onTouched",
  });

  const values = form.watch();

  useEffect(() => {
    if (urlProduct) form.setValue("product", urlProduct);
    if (urlPb) form.setValue("pb", urlPb);
    if (urlSize) form.setValue("size", urlSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlProduct, urlPb, urlSize]);

  const summary = useMemo(() => {
    const map: Record<string, string> = {
      purchase: "Achat",
      rental: "Location",
      quality: "Contrôle",
      cleaning: "Nettoyage",
      mix: "Mix",
    };

    const productSlug = values.product ?? urlProduct;
    const pb = values.pb ?? urlPb;
    const size = values.size ?? urlSize;

    const pickedProduct = productSlug
      ? PRODUCTS.find((p) => p.slug === productSlug)
      : undefined;

    return {
      product: pickedProduct?.title || "—",
      pb: pb || "—",
      size: size || "—",
      needs: values.needs?.map((n) => map[n]).join(", ") || "—",
      quantity: values.quantity ? String(values.quantity) : "—",
      deadline: values.deadline || "—",
      company: values.company || "—",
    };
  }, [values, urlProduct, urlPb, urlSize]);

  async function onSubmit(v: FormValues) {
    alert("Devis envoyé (mock). À brancher sur l’API.");
    console.log(v);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* LEFT */}
      <div className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur">
        {/* Title */}
        <div>
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            DEVIS EN LIGNE
          </div>
          <h2 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-brandNavy">
            Demande rapide
          </h2>
          <div className="mt-3">
            <SignatureLine align="left" />
          </div>
        </div>

        <div className="mt-6">
          <Stepper active={active} />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          {active === 0 && (
            <div>
              <h3 className="text-lg font-extrabold text-brandNavy">Type de demande</h3>
              <p className="mt-1 text-sm text-brandMuted">
                Choisis un ou plusieurs besoins.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {NEEDS.map((it) => {
                  const checked = values.needs?.includes(it.val);
                  return (
                    <button
                      type="button"
                      key={it.val}
                      onClick={() => {
                        const current = new Set(values.needs || []);
                        if (current.has(it.val)) current.delete(it.val);
                        else current.add(it.val);
                        form.setValue("needs", Array.from(current) as any, { shouldValidate: true });
                      }}
                      className={[
                        "group rounded-2xl px-4 py-3 text-left",
                        "ring-1 transition-all duration-300",
                        "hover:-translate-y-0.5",
                        checked
                          ? "bg-brandChampagne/25 ring-brandChampagne/45 shadow-sm"
                          : "bg-white/70 ring-brandLine hover:ring-brandChampagne/35",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={[
                            "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl",
                            "ring-1 transition-all",
                            checked
                              ? "bg-brandNavy text-white ring-brandNavy/20"
                              : "bg-white text-brandNavy ring-brandLine group-hover:ring-brandChampagne/35",
                          ].join(" ")}
                        >
                          {checked ? <Check className="h-4 w-4" /> : it.icon}
                        </div>

                        <div className="min-w-0">
                          <div className="text-sm font-extrabold text-brandNavy">
                            {it.label}
                          </div>
                          <div className="mt-0.5 text-xs text-brandMuted">
                            {it.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {form.formState.errors.needs ? (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {form.formState.errors.needs.message as any}
                </p>
              ) : null}
            </div>
          )}

          {active === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-brandNavy">Détails</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    QUANTITÉ (OPTIONNEL)
                  </label>
                  <input
                    type="number"
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    {...form.register("quantity")}
                  />
                </div>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    DÉLAI (OPTIONNEL)
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    placeholder="ex: 2 semaines"
                    {...form.register("deadline")}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                  COMMENTAIRE
                </label>
                <textarea
                  className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                  rows={4}
                  {...form.register("notes")}
                />
              </div>
            </div>
          )}

          {active === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-brandNavy">Logistique</h3>

              <div>
                <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                  ADRESSE (OPTIONNEL)
                </label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                  {...form.register("address")}
                />
              </div>
            </div>
          )}

          {active === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-extrabold text-brandNavy">Entreprise</h3>

              <div>
                <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                  ÉTABLISSEMENT
                </label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                  {...form.register("company")}
                />
                {form.formState.errors.company ? (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {form.formState.errors.company.message}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                  CONTACT
                </label>
                <input
                  className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                  {...form.register("contact")}
                />
                {form.formState.errors.contact ? (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {form.formState.errors.contact.message}
                  </p>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    EMAIL
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email ? (
                    <p className="mt-2 text-sm font-semibold text-red-600">
                      {form.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    TÉLÉPHONE (OPTIONNEL)
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    {...form.register("phone")}
                  />
                </div>
              </div>
            </div>
          )}

          {active === 4 && (
            <div className="space-y-3">
              <h3 className="text-lg font-extrabold text-brandNavy">Récapitulatif</h3>

              <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                <div className="text-sm text-brandMuted">
                  Vérifie tes infos avant l’envoi.
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div><span className="font-extrabold text-brandNavy">Produit :</span> <span className="font-semibold text-brandMuted">{summary.product}</span></div>
                  <div><span className="font-extrabold text-brandNavy">Équivalence Pb :</span> <span className="font-semibold text-brandMuted">{summary.pb}</span></div>
                  <div><span className="font-extrabold text-brandNavy">Taille :</span> <span className="font-semibold text-brandMuted">{summary.size}</span></div>
                </div>
              </div>

              <p className="text-sm text-brandMuted">
                En prod : envoi vers API + email confirmation + création en base.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => setActive((s) => Math.max(0, s - 1))}
              className="rounded-2xl bg-white/70 px-4 py-2 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition hover:-translate-y-0.5 hover:ring-brandChampagne/40 disabled:opacity-40"
            >
              ← Retour
            </button>

            {active < 4 ? (
              <button
                type="button"
                onClick={async () => {
                  if (active === 0) {
                    const ok = await form.trigger(["needs"]);
                    if (!ok) return;
                  }
                  if (active === 3) {
                    const ok = await form.trigger(["company", "contact", "email"]);
                    if (!ok) return;
                  }
                  setActive((s) => Math.min(4, s + 1));
                }}
                className="rounded-2xl bg-brandNavy px-5 py-2 text-sm font-extrabold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brandNavy/90"
              >
                Continuer →
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-2xl bg-brandChampagne px-5 py-2 text-sm font-extrabold text-brandNavy shadow-sm transition hover:-translate-y-0.5 hover:bg-brandChampagne/90"
              >
                Envoyer le devis
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT */}
      <aside className="rounded-3xl bg-white/55 p-6 ring-1 ring-brandLine shadow-softer backdrop-blur">
        <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
          RÉSUMÉ
        </div>
        <div className="mt-2 font-serif text-xl font-semibold text-brandNavy">
          Votre demande
        </div>

        <div className="mt-4">
          <SignatureLine align="left" />
        </div>

        <div className="mt-4">
          <SummaryRow label="Produit" value={summary.product} />
          <SummaryRow label="Équivalence Pb" value={summary.pb} />
          <SummaryRow label="Taille" value={summary.size} />
          <SummaryRow label="Besoin" value={summary.needs} />
          <SummaryRow label="Quantité" value={summary.quantity} />
          <SummaryRow label="Délai" value={summary.deadline} />
          <SummaryRow label="Établissement" value={summary.company} />
        </div>

        <div className="mt-5 rounded-2xl bg-brandChampagne/15 p-4 ring-1 ring-brandChampagne/25">
          <div className="text-sm font-extrabold text-brandNavy">
            Tip
          </div>
          <div className="mt-1 text-sm text-brandMuted">
            Tu peux compléter le devis maintenant, même si certains champs sont optionnels.
          </div>
        </div>
      </aside>
    </div>
  );
}

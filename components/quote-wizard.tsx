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
  Check,
  Package,
  CalendarClock,
  MapPin,
  Building2,
  User,
  Mail,
  Phone,
  Layers,
  ListChecks,
  Eye
} from "lucide-react";

import RadiationLoader from "@/components/ui/RadiationLoader";
import { SummaryPillRow } from "./ui/SummaryPillRow";

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
  { key: "need", icon: <Layers className="h-4 w-4" />, label: "1 Besoin" },
  { key: "details", icon: <Eye className="h-4 w-4" />, label: "2 Détails" },
  { key: "logistics", icon: <MapPin className="h-4 w-4" />, label: "3 Logistique" },
  { key: "company", icon: <Building2 className="h-4 w-4" />, label: "4 Entreprise" },
  { key: "review", icon: <ListChecks className="h-4 w-4" />, label: "5 Récap" },
] as const;

const TOTAL_STEPS = steps.length;
const percentForStep = (active: number) =>
  Math.round(((active + 1) / TOTAL_STEPS) * 100);

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
              "rounded-full px-8 py-2 text-xs font-extrabold tracking-[0.12em]",
              "ring-1 transition-all",
              isActive
                ? "bg-brandNavy text-white ring-brandNavy/20 shadow-sm"
                : "bg-white/70 text-brandNavy ring-brandLine hover:ring-brandChampagne/40",
            ].join(" ")}
          >
            {s.icon}
            {s.label}
          </div>
        );
      })}
    </div>
  );
}


function ChampagneDivider() {
  return (
    <div className="mt-2 flex justify-end">
      <div className="h-px w-3/4 bg-brandChampagne/45" />
    </div>
  );
}

function StepTransition({
  stepKey,
  direction,
  children,
}: {
  stepKey: string;
  direction: "next" | "prev";
  children: React.ReactNode;
}) {
  return (
    <div
      key={stepKey}
      className={
        direction === "next"
          ? "animate-step-in-next"
          : "animate-step-in-prev"
      }
    >
      {children}
    </div>
  );
}

export function QuoteWizard() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefillDone, setPrefillDone] = useState(false);


  const [direction, setDirection] = useState<"next" | "prev">("next");

  const urlProduct = searchParams.get("product") ?? undefined;
  const urlPb = searchParams.get("pb") ?? undefined;
  const urlSize = searchParams.get("size") ?? undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      needs: [],
      product: undefined,
      pb: undefined,
      size: undefined,
    },
    mode: "onTouched",
  });

  const product = form.watch("product");
  const pb = form.watch("pb");
  const size = form.watch("size");
  const needs = form.watch("needs");
  const quantity = form.watch("quantity");
  const deadline = form.watch("deadline");
  const company = form.watch("company");
  const address = form.watch("address");
  const contact = form.watch("contact");
  const email = form.watch("email");
  const phone = form.watch("phone");

  const [initialParams] = useState(() => ({
    product: urlProduct,
    pb: urlPb,
    size: urlSize,
  }));

  useEffect(() => {
    if (prefillDone) return;

    if (urlProduct) form.setValue("product", urlProduct);
    if (urlPb) form.setValue("pb", urlPb);
    if (urlSize) form.setValue("size", urlSize);

    if (urlProduct) {
      const current = new Set(form.getValues("needs") || []);
      if (!current.size) current.add("purchase");
      form.setValue("needs", Array.from(current) as any, { shouldValidate: true });
    }

    setPrefillDone(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlProduct, urlPb, urlSize, prefillDone]);

  const summary = useMemo(() => {
    const map: Record<string, string> = {
      purchase: "Achat",
      rental: "Location",
      quality: "Contrôle",
      cleaning: "Nettoyage",
      mix: "Mix",
    };

    const pickedProduct = product
      ? PRODUCTS.find((p) => p.slug === product)
      : undefined;

    return {
      product: pickedProduct?.title || "—",
      pb: pb || "—",
      size: size || "—",
      needs: needs?.length ? needs.map((n) => map[n]).join(", ") : "—",
      quantity: quantity ? String(quantity) : "—",
      deadline: deadline || "—",
      company: company || "—",
    };
  }, [product, pb, size, needs, quantity, deadline, company]);


  async function onSubmit(v: FormValues) {
    const payload = {
      ...v,
      productTitle: v.product ? PRODUCTS.find(p => p.slug === v.product)?.title : undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        alert(json.error || "Erreur envoi devis");
        return;
      }

      alert("Devis envoyé ✅");
    } finally {
      setIsSubmitting(false);
    }
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
          <StepTransition stepKey={`step-${active}`} direction={direction}>
            {active === 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-brandNavy">Type de demande</h3>
                <p className="mt-1 text-sm text-brandMuted">
                  Choisis un ou plusieurs besoins.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {NEEDS.map((it) => {
                    const checked = needs?.includes(it.val);
                    return (
                      <button
                        type="button"
                        key={it.val}
                        onClick={() => {
                          const current = new Set(needs || []);
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
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-brandNavy">Récapitulatif</h3>
                <p className="text-sm text-brandMuted">
                  Vérifie tes infos avant l’envoi.
                </p>

                <div className="grid gap-4">
                  {/* Produit */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        PRODUIT
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/60">Produit</div>
                        <div className="mt-2 inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                          {summary.product}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end sm:items-end">
                        {summary.pb !== "—" && (
                          <span className="...">Pb : {summary.pb}</span>
                        )}
                        {summary.size !== "—" && (
                          <span className="...">Taille : {summary.size}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Besoin */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        BESOIN
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        {summary.needs}
                      </div>
                    </div>
                  </div>

                  {/* Détails / Logistique */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                          <CalendarClock className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                          DÉTAILS
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                          Quantité : {summary.quantity}
                        </span>
                        <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                          Délai : {summary.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                          LOGISTIQUE
                        </div>
                      </div>

                      <div className="mt-4 inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        {address || "—"}
                      </div>
                    </div>
                  </div>

                  {/* Entreprise */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        ENTREPRISE
                      </div>
                    </div>

                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        <User className="h-4 w-4 text-brandNavy/70" />
                        {contact || "—"}
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        <Building2 className="h-4 w-4 text-brandNavy/70" />
                        {company || "—"}
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        <Mail className="h-4 w-4 text-brandNavy/70" />
                        {email || "—"}
                      </div>

                      <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        <Phone className="h-4 w-4 text-brandNavy/70" />
                        {phone || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-brandChampagne/15 p-4 ring-1 ring-brandChampagne/25">
                  <div className="text-sm font-extrabold text-brandNavy">Dernière vérification</div>
                  <div className="mt-1 text-sm text-brandMuted">
                    Une fois envoyé, on te recontacte rapidement avec une proposition adaptée.
                  </div>
                </div>
              </div>
            )}
          </StepTransition>

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => {
                setDirection("prev");
                setActive((s) => Math.max(0, s - 1));
              }}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-2 font-bold text-brand-text disabled:opacity-40"
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
                  setDirection("next");
                  setActive((s) => Math.min(4, s + 1));
                }}
                className="rounded-2xl bg-brandNavy px-5 py-2 text-sm font-extrabold text-white px-5 py-2 font-extrabold shadow-soft hover:opacity-95"
              >
                Continuer →
              </button>
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={form.handleSubmit(onSubmit)}
                className={[
                  "rounded-2xl px-5 py-2 text-sm font-extrabold shadow-sm transition",
                  "bg-brandChampagne text-brandNavy hover:-translate-y-0.5 hover:bg-brandChampagne/90",
                  "disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed",
                ].join(" ")}
              >
                {isSubmitting ? <RadiationLoader /> : "Envoyer le devis"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RIGHT — Progress Card */}
      <aside className="rounded-3xl bg-white/55 p-6 ring-1 ring-brandLine shadow-softer backdrop-blur">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
              PROGRESSION
            </div>
            <div className="mt-2 font-serif text-xl font-semibold text-brandNavy">
              {steps[active]?.label}
            </div>
          </div>

          {/* mini loader + % */}
          <div className="flex flex-col items-end gap-2">
            <div className="scale-90 origin-top-right">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-brandLine">
                <RadiationLoader
                  size={18}
                  variant={active === 4 ? "champagne" : "navy"}
                />
              </span>
            </div>

            <div className="text-sm font-extrabold text-brandNavy">
              {percentForStep(active)}%
            </div>
          </div>
        </div>

        <div className="mt-4">
          <SignatureLine align="left" />
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-white/70 ring-1 ring-brandLine overflow-hidden">
            <div
              className="h-full rounded-full bg-brandChampagne"
              style={{ width: `${percentForStep(active)}%` }}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-brandMuted">
            <span>Étape {active + 1} / {TOTAL_STEPS}</span>
            <span>Temps estimé : ~2 min</span>
          </div>
        </div>

        {/* Chips (super lisible, pas de lignes) */}
        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-brandLine">
            <div className="text-[11px] font-extrabold tracking-[0.18em] text-brandNavy/60">
              SÉLECTION
            </div>

            <SummaryPillRow
  label="Produit"
  value={summary.product}
  onClear={() => {
    form.setValue("product", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    form.setValue("pb", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    form.setValue("size", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

    setDirection("prev");
    setActive(0);
  }}
/>

<SummaryPillRow
  label="Équivalence Pb"
  value={summary.pb}
  onClear={() => {
    form.setValue("pb", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
    form.setValue("size", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

    setDirection("prev");
    setActive(0);
  }}
/>

<SummaryPillRow
  label="Taille"
  value={summary.size}
  onClear={() => {
    form.setValue("size", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });

    setDirection("prev");
    setActive(0);
  }}
/>

          </div>

          {/* “Prochaine action” contextuelle */}
          <div className="rounded-2xl bg-brandChampagne/15 p-4 ring-1 ring-brandChampagne/25">
            <div className="text-sm font-extrabold text-brandNavy">À faire</div>
            <div className="mt-1 text-sm text-brandMuted">
              {active === 0 && "Choisis ton type de demande, puis continue."}
              {active === 1 && "Ajoute les détails (quantité / délai) si nécessaire."}
              {active === 2 && "Renseigne l’adresse si tu as une contrainte logistique."}
              {active === 3 && "Indique tes coordonnées pour qu’on te recontacte."}
              {active === 4 && "Vérifie une dernière fois avant l’envoi."}
            </div>
          </div>
        </div>
      </aside>

    </div>
  );
}

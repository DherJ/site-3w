"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { PRODUCTS } from "@/data/products";
import SignatureLine from "@/components/ui/SignatureLine";
import RadiationLoader from "@/components/ui/RadiationLoader";
import { SummaryPillRow } from "./ui/SummaryPillRow";

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
  Eye,
} from "lucide-react";

type NeedKey = "purchase" | "rental" | "quality" | "cleaning" | "mix";

type Copy = {
  heroKicker: string;
  heroTitle: string;

  stepper: Array<{ key: "need" | "details" | "logistics" | "company" | "review"; label: string }>;

  needs: Array<{ val: NeedKey; label: string; desc: string }>;

  section: {
    needTitle: string;
    needSubtitle: string;
    detailsTitle: string;
    logisticsTitle: string;
    companyTitle: string;
    reviewTitle: string;
    reviewSubtitle: string;
  };

  fields: {
    quantityLabel: string;
    deadlineLabel: string;
    deadlinePlaceholder: string;
    notesLabel: string;

    addressLabel: string;

    companyLabel: string;
    contactLabel: string;
    emailLabel: string;
    phoneLabel: string;
  };

  buttons: {
    back: string;
    next: string;
    submit: string;
    submitting: string;
  };

  progress: {
    title: string;
    selection: string;
    todoTitle: string;
    todo: string[]; // 5 items
    eta: string;
    stepLabel: string;
  };

  alerts: {
    sent: string;
    error: string;
    needsMin: string;
    companyRequired?: string;
    contactRequired?: string;
    emailInvalid?: string;
  };
};

function makeSchema(copy: Copy) {
  return z.object({
    product: z.string().optional(),
    pb: z.string().optional(),
    size: z.string().optional(),

    needs: z
      .array(z.enum(["purchase", "rental", "quality", "cleaning", "mix"]))
      .min(1, copy.alerts.needsMin),

    quantity: z.coerce.number().int().min(1).optional(),
    notes: z.string().max(2000).optional(),
    address: z.string().optional(),
    deadline: z.string().optional(),

    company: z.string().min(1, copy.alerts.companyRequired ?? "Company is required"),
    contact: z.string().min(1, copy.alerts.contactRequired ?? "Contact is required"),
    email: z.string().email(copy.alerts.emailInvalid ?? "Invalid email"),
    phone: z.string().optional(),
  });
}

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

const STEP_ICONS: Record<string, React.ReactNode> = {
  need: <Layers className="h-4 w-4" />,
  details: <Eye className="h-4 w-4" />,
  logistics: <MapPin className="h-4 w-4" />,
  company: <Building2 className="h-4 w-4" />,
  review: <ListChecks className="h-4 w-4" />,
};

const NEED_ICONS: Record<NeedKey, React.ReactNode> = {
  purchase: <ShoppingCart className="h-4 w-4" />,
  rental: <Repeat2 className="h-4 w-4" />,
  quality: <Shield className="h-4 w-4" />,
  cleaning: <SprayCan className="h-4 w-4" />,
  mix: <Layers className="h-4 w-4" />,
};

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
      className={direction === "next" ? "animate-step-in-next" : "animate-step-in-prev"}
    >
      {children}
    </div>
  );
}

function Stepper({ active, steps }: { active: number; steps: Copy["stepper"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {steps.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.key}
            className={[
              "inline-flex items-center gap-2",
              "rounded-full px-6 py-2 text-xs font-extrabold tracking-[0.12em]",
              "ring-1 transition-all",
              isActive
                ? "bg-brandNavy text-white ring-brandNavy/20 shadow-sm"
                : "bg-white/70 text-brandNavy ring-brandLine hover:ring-brandChampagne/40",
            ].join(" ")}
          >
            {STEP_ICONS[s.key]}
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

export function QuoteWizard({ locale, copy }: { locale: string; copy: Copy }) {
  const searchParams = useSearchParams();

  const steps = copy.stepper;
  const TOTAL_STEPS = steps.length;
  const percentForStep = (active: number) => Math.round(((active + 1) / TOTAL_STEPS) * 100);

  const schema = useMemo(() => makeSchema(copy), [copy]);

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefillDone, setPrefillDone] = useState(false);

  const urlProduct = searchParams.get("product") ?? undefined;
  const urlPb = searchParams.get("pb") ?? undefined;
  const urlSize = searchParams.get("size") ?? undefined;

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { needs: [], product: undefined, pb: undefined, size: undefined },
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

  const needsLabelMap = useMemo(() => {
    const m = new Map<NeedKey, string>();
    copy.needs.forEach((n) => m.set(n.val, n.label));
    return m;
  }, [copy.needs]);

  const summary = useMemo(() => {
    const pickedProduct = product ? PRODUCTS.find((p) => p.slug === product) : undefined;

    return {
      product: pickedProduct?.title || "—",
      pb: pb || "—",
      size: size || "—",
      needs: needs?.length ? needs.map((n) => needsLabelMap.get(n as NeedKey) ?? String(n)).join(", ") : "—",
      quantity: quantity ? String(quantity) : "—",
      deadline: deadline || "—",
      company: company || "—",
    };
  }, [product, pb, size, needs, quantity, deadline, company, needsLabelMap]);

  async function onSubmit(v: FormValues) {
    const payload = {
      ...v,
      locale,
      productTitle: v.product ? PRODUCTS.find((p) => p.slug === v.product)?.title : undefined,
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
        alert(json.error || copy.alerts.error);
        return;
      }

      alert(copy.alerts.sent);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* LEFT */}
      <div>
        <div className="mt-6">
          <Stepper active={active} steps={steps} />
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <StepTransition stepKey={`step-${active}`} direction={direction}>
            {active === 0 && (
              <div>
                <h3 className="text-lg font-extrabold text-brandNavy">{copy.section.needTitle}</h3>
                <p className="mt-1 text-sm text-brandMuted">{copy.section.needSubtitle}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {copy.needs.map((it) => {
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
                            {checked ? <Check className="h-4 w-4" /> : NEED_ICONS[it.val]}
                          </div>

                          <div className="min-w-0">
                            <div className="text-sm font-extrabold text-brandNavy">{it.label}</div>
                            <div className="mt-0.5 text-xs text-brandMuted">{it.desc}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {form.formState.errors.needs ? (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {String(form.formState.errors.needs.message)}
                  </p>
                ) : null}
              </div>
            )}

            {active === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-brandNavy">{copy.section.detailsTitle}</h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                      {copy.fields.quantityLabel}
                    </label>
                    <input
                      type="number"
                      className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                      {...form.register("quantity")}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                      {copy.fields.deadlineLabel}
                    </label>
                    <input
                      className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                      placeholder={copy.fields.deadlinePlaceholder}
                      {...form.register("deadline")}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    {copy.fields.notesLabel}
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
                <h3 className="text-lg font-extrabold text-brandNavy">{copy.section.logisticsTitle}</h3>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    {copy.fields.addressLabel}
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
                <h3 className="text-lg font-extrabold text-brandNavy">{copy.section.companyTitle}</h3>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    {copy.fields.companyLabel}
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    {...form.register("company")}
                  />
                  {form.formState.errors.company ? (
                    <p className="mt-2 text-sm font-semibold text-red-600">
                      {String(form.formState.errors.company.message)}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                    {copy.fields.contactLabel}
                  </label>
                  <input
                    className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                    {...form.register("contact")}
                  />
                  {form.formState.errors.contact ? (
                    <p className="mt-2 text-sm font-semibold text-red-600">
                      {String(form.formState.errors.contact.message)}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                      {copy.fields.emailLabel}
                    </label>
                    <input
                      className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
                      {...form.register("email")}
                    />
                    {form.formState.errors.email ? (
                      <p className="mt-2 text-sm font-semibold text-red-600">
                        {String(form.formState.errors.email.message)}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
                      {copy.fields.phoneLabel}
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
                <h3 className="text-lg font-extrabold text-brandNavy">{copy.section.reviewTitle}</h3>
                <p className="text-sm text-brandMuted">{copy.section.reviewSubtitle}</p>

                <div className="grid gap-4">
                  {/* Product */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Package className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        {copy.progress.selection}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <div className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/60">
                          {copy.progress.selection}
                        </div>
                        <div className="mt-2 inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                          {summary.product}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end sm:items-end">
                        {summary.pb !== "—" && (
                          <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                            Pb: {summary.pb}
                          </span>
                        )}
                        {summary.size !== "—" && (
                          <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                            Size: {summary.size}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Need */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Layers className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        NEED
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        {summary.needs}
                      </div>
                    </div>
                  </div>

                  {/* Details / Logistics */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                          <CalendarClock className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                          DETAILS
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                          Qty: {summary.quantity}
                        </span>
                        <span className="inline-flex rounded-full bg-white/70 px-3 py-1.5 text-xs font-extrabold text-brandNavy ring-1 ring-brandLine">
                          ETA: {summary.deadline}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                          LOGISTICS
                        </div>
                      </div>

                      <div className="mt-4 inline-flex rounded-2xl bg-white/70 px-4 py-2 text-sm font-semibold text-brandNavy ring-1 ring-brandLine">
                        {address || "—"}
                      </div>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="rounded-2xl bg-white/60 p-5 ring-1 ring-brandLine">
                    <div className="flex items-center gap-3">
                      <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brandChampagne/15 text-brandNavy ring-1 ring-brandChampagne/25">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div className="text-sm font-extrabold tracking-[0.14em] text-brandNavy/70">
                        COMPANY
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
                  <div className="text-sm font-extrabold text-brandNavy">Final check</div>
                  <div className="mt-1 text-sm text-brandMuted">
                    Once submitted, we’ll get back to you quickly with a tailored proposal.
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
              {copy.buttons.back}
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
                className="rounded-2xl bg-brandNavy px-5 py-2 text-sm font-extrabold text-white shadow-soft hover:opacity-95"
              >
                {copy.buttons.next}
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
                {isSubmitting ? <RadiationLoader /> : copy.buttons.submit}
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
              {copy.progress.title}
            </div>
            <div className="mt-2 font-serif text-xl font-semibold text-brandNavy">
              {steps[active]?.label}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="scale-90 origin-top-right">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/70 ring-1 ring-brandLine">
                <RadiationLoader size={18} variant={active === 4 ? "champagne" : "navy"} />
              </span>
            </div>
            <div className="text-sm font-extrabold text-brandNavy">{percentForStep(active)}%</div>
          </div>
        </div>

        <div className="mt-4">
          <SignatureLine align="left" />
        </div>

        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-white/70 ring-1 ring-brandLine overflow-hidden">
            <div className="h-full rounded-full bg-brandChampagne" style={{ width: `${percentForStep(active)}%` }} />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs font-semibold text-brandMuted">
            <span>
              {copy.progress.stepLabel} {active + 1} / {TOTAL_STEPS}
            </span>
            <span>{copy.progress.eta}</span>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="rounded-2xl bg-white/60 p-4 ring-1 ring-brandLine">
            <div className="text-[11px] font-extrabold tracking-[0.18em] text-brandNavy/60">
              {copy.progress.selection}
            </div>

            <SummaryPillRow
              label="Product"
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
              label="Lead eq."
              value={summary.pb}
              onClear={() => {
                form.setValue("pb", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                form.setValue("size", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                setDirection("prev");
                setActive(0);
              }}
            />

            <SummaryPillRow
              label="Size"
              value={summary.size}
              onClear={() => {
                form.setValue("size", undefined, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
                setDirection("prev");
                setActive(0);
              }}
            />
          </div>

          <div className="rounded-2xl bg-brandChampagne/15 p-4 ring-1 ring-brandChampagne/25">
            <div className="text-sm font-extrabold text-brandNavy">{copy.progress.todoTitle}</div>
            <div className="mt-1 text-sm text-brandMuted">{copy.progress.todo[active] ?? ""}</div>
          </div>
        </div>
      </aside>
    </div>
  );
}

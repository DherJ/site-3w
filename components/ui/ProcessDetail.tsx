"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList,
  Inbox,
  Package,
  PackageCheck,
  ScanSearch,
  Search,
  ShieldCheck,
  SprayCan,
  Truck,
  Wrench,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";

type IconKey =
  | "inbox"
  | "package"
  | "truck"
  | "spray"
  | "search"
  | "scan"
  | "shield"
  | "wrench"
  | "clipboard"
  | "packageCheck"
  | "sparkles";

export type ProcessStep = {
  title: string;
  desc: string;
  icon?: IconKey;
};

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  inbox: Inbox,
  package: Package,
  truck: Truck,
  spray: SprayCan,
  search: Search,
  scan: ScanSearch,
  shield: ShieldCheck,
  wrench: Wrench,
  clipboard: ClipboardList,
  packageCheck: PackageCheck,
  sparkles: Sparkles,
};

function getIcon(icon?: IconKey) {
  if (!icon) return ArrowRight;
  return ICONS[icon] ?? ArrowRight;
}

export default function ProcessDetail({
  title,
  steps,
  subtitle,
  proofTitle = "Ce que garantit le cycle",
  proofBullets = [
    "Hygiène maîtrisée entre rotations",
    "Inspection systématique des zones sensibles",
    "Traçabilité : historique et actions réalisées",
  ],
  badgeLabel = "Hygiène & conformité",
}: {
  title: string;
  steps: ProcessStep[];
  subtitle?: string;

  proofTitle?: string;
  proofBullets?: string[];
  badgeLabel?: string;
}) {


  const t = useTranslations("serviceDetail");
  const [active, setActive] = useState(0);

  const items = useMemo(
    () =>
      steps.map((s, i) => ({
        ...s,
        i,
        Icon: getIcon(s.icon),
      })),
    [steps]
  );

  const n = Math.min(items.length, 6);

  return (
    <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-brandNavy">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-brandMuted">
            {subtitle ?? "Un cycle “terrain → remise en circulation” pensé pour l’hygiène, la sécurité et la conformité."}
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-2xl bg-brandNavy/95 px-3 py-2 text-xs font-extrabold text-white ring-1 ring-white/10">
          <ShieldCheck className="h-4 w-4" />
          <span>{badgeLabel}</span>
        </div>
      </div>

      {/* Desktop pipeline aligné */}
      <div className="relative mt-8 hidden md:block">
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] bg-gradient-to-br from-brandChampagne/12 via-white/0 to-brandNavy/10 blur-2xl" />

        {/* Ligne */}
        <div className="absolute left-6 right-6 top-6 h-[3px] rounded-full bg-brandNavy/15" />

        {/* Ligne animée */}
        <motion.div
          className="absolute left-6 top-6 h-[3px] rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(203,169,90,0.0) 0%, rgba(203,169,90,0.75) 35%, rgba(255,255,255,0.35) 70%, rgba(203,169,90,0.0) 100%)",
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "calc(100% - 48px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Row 1: points + badges */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {items.slice(0, n).map((s) => (
            <button
              key={s.title}
              type="button"
              onMouseEnter={() => setActive(s.i)}
              onFocus={() => setActive(s.i)}
              className="group relative h-14 text-left"
            >
              <div className="absolute left-1/2 top-[18px] -translate-x-1/2">
                <div
                  className={[
                    "h-7 w-7 rounded-full bg-white ring-1 ring-brandLine grid place-items-center",
                    active === s.i ? "ring-brandChampagne/70" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      active === s.i ? "bg-brandChampagne" : "bg-brandNavy/70",
                    ].join(" ")}
                  />
                </div>
              </div>

              <div className="absolute left-1/2 top-10 -translate-x-1/2">
                <div
                  className={[
                    "inline-flex items-center gap-2 rounded-2xl px-3 py-1.5 text-xs font-extrabold ring-1",
                    active === s.i
                      ? "bg-brandNavy/95 text-white ring-white/10"
                      : "bg-white text-brandNavy ring-brandLine",
                  ].join(" ")}
                >
                  <span className="opacity-90">{t('step')}</span>
                  <span>{s.i + 1}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Row 2 */}
        <div
          className="mt-6 grid gap-4 items-stretch"
          style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
        >
          {items.slice(0, n).map((s) => (
            <motion.button
              key={s.title}
              type="button"
              onMouseEnter={() => setActive(s.i)}
              onFocus={() => setActive(s.i)}
              className={[
                "group relative text-left h-full",
                "rounded-3xl bg-white p-5 ring-1 ring-brandLine",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
                active === s.i ? "ring-brandChampagne/60" : "",
              ].join(" ")}
            >
              <div className="flex h-full flex-col">
                {/* header fixe */}
                <div className="flex items-start justify-between gap-3">
                  <div className="font-extrabold text-brandNavy leading-snug line-clamp-2">
                    {s.title}
                  </div>
                  <s.Icon className="mt-0.5 h-5 w-5 shrink-0 text-brandNavy/70 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* desc clamp pour uniformiser */}
                <p className="mt-2 text-sm leading-relaxed text-brandMuted line-clamp-4">
                  {s.desc}
                </p>

                {/* spacer pour aligner le bas */}
                <div className="mt-auto pt-4" />

                {/* micro footer discret */}
                <div className="text-xs font-semibold text-brandMuted/70">
                  {active === s.i ? "Sélectionné" : "Survolez pour explorer"}
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-1 rounded-3xl bg-brandChampagne/10 blur-xl" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Proof panel */}
        <div className="mt-6 rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div>
              <div className="text-xs font-extrabold tracking-[0.28em] text-white/70">
                {items[active]?.title}
              </div>
              <div className="mt-2 text-lg font-extrabold">{items[active]?.desc}</div>
              <p className="mt-2 text-sm text-white/85">{items[active]?.desc}</p>
            </div>

            <div className="rounded-3xl bg-white/10 p-4 ring-1 ring-white/10">
              <div className="flex items-center gap-2 text-xs font-extrabold text-white/90">
                <ClipboardList className="h-4 w-4" />
                <span>{proofTitle}</span>
              </div>

              <ul className="mt-3 space-y-2 text-sm text-white/85">
                {proofBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brandChampagne" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="mt-8 md:hidden">
        <ol className="relative space-y-4">
          <div className="absolute left-[14px] top-2 bottom-2 w-[2px] rounded-full bg-brandNavy/15" />
          {items.map((s) => (
            <li key={s.title} className="relative rounded-3xl bg-white p-5 ring-1 ring-brandLine">
              <div className="absolute left-[6px] top-6 h-4 w-4 rounded-full bg-brandChampagne ring-4 ring-white" />

              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-brandNavy/95 px-3 py-1.5 text-xs font-extrabold text-white ring-1 ring-white/10">
                  {t('step')} {s.i + 1}
                </div>
                <s.Icon className="h-5 w-5 text-brandNavy/70" />
              </div>

              <div className="mt-3 font-extrabold text-brandNavy">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-brandMuted">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

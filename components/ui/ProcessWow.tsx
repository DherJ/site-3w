"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardCheck,
  Package,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Step = { title: string; desc: string };

function getIcon(i: number) {
  // Tu peux ajuster selon tes services
  const icons = [ClipboardCheck, Package, Truck, Sparkles, ShieldCheck];
  return icons[i] ?? ArrowRight;
}

export default function ProcessWow({
  title,
  steps,
}: {
  title: string;
  steps: Step[];
}) {
  const [active, setActive] = useState<number>(0);

  const items = useMemo(
    () =>
      steps.map((s, i) => ({
        ...s,
        i,
        Icon: getIcon(i),
      })),
    [steps]
  );

  return (
    <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-brandNavy">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm text-brandMuted">
            Un cycle clair, traçable et maîtrisé — pensé pour le terrain.
          </p>
        </div>

        {/* Petit indicateur “wow” */}
        <div className="hidden md:flex items-center gap-2 rounded-2xl bg-brandNavy/95 px-3 py-2 text-xs font-extrabold text-white ring-1 ring-white/10">
          <Sparkles className="h-4 w-4" />
          <span>Cycle premium</span>
        </div>
      </div>

      {/* Desktop pipeline */}
      <div className="relative mt-8 hidden md:block">
        {/* Ligne “glow” */}
        <div className="absolute left-6 right-6 top-[36px] h-[3px] rounded-full bg-brandNavy/15" />
        <motion.div
          className="absolute left-6 top-[36px] h-[3px] rounded-full"
          style={{
            // on évite des couleurs “hardcodées” ; on se base sur tes tokens via classes plus bas
            background:
              "linear-gradient(90deg, rgba(203,169,90,0.0) 0%, rgba(203,169,90,0.65) 35%, rgba(255,255,255,0.45) 70%, rgba(203,169,90,0.0) 100%)",
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "calc(100% - 48px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* “halo” */}
        <motion.div
          className="absolute left-6 top-[28px] h-6 rounded-full blur-xl opacity-60"
          style={{
            background:
              "linear-gradient(90deg, rgba(203,169,90,0.0) 0%, rgba(203,169,90,0.35) 40%, rgba(255,255,255,0.22) 70%, rgba(203,169,90,0.0) 100%)",
          }}
          initial={{ width: "0%" }}
          whileInView={{ width: "calc(100% - 48px)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="grid grid-cols-5 gap-4">
          {items.slice(0, 5).map((s) => (
            <motion.button
              key={s.title}
              type="button"
              onMouseEnter={() => setActive(s.i)}
              onFocus={() => setActive(s.i)}
              className={[
                "group relative text-left",
                "rounded-3xl bg-white p-5 ring-1 ring-brandLine",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
                active === s.i ? "ring-brandChampagne/50" : "",
              ].join(" ")}
            >
              {/* Point sur la ligne */}
              <div className="absolute left-1/2 top-[24px] -translate-x-1/2">
                <div
                  className={[
                    "h-6 w-6 rounded-full ring-1 ring-brandLine bg-white",
                    "grid place-items-center",
                    active === s.i ? "ring-brandChampagne/60" : "",
                  ].join(" ")}
                >
                  <div
                    className={[
                      "h-2.5 w-2.5 rounded-full",
                      "bg-brandNavy/70",
                      active === s.i ? "bg-brandChampagne" : "",
                    ].join(" ")}
                  />
                </div>
              </div>

              {/* Badge numéro */}
              <div className="mt-6 flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-brandNavy/95 px-3 py-1.5 text-xs font-extrabold text-white ring-1 ring-white/10">
                  <span className="opacity-90">Étape</span>
                  <span className="text-white">{s.i + 1}</span>
                </div>

                <s.Icon className="h-5 w-5 text-brandNavy/70 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div className="mt-3 font-extrabold text-brandNavy">{s.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-brandMuted">{s.desc}</p>

              {/* Glow au hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-1 rounded-3xl bg-brandChampagne/10 blur-xl" />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Détail “active step” */}
        <div className="mt-6 rounded-3xl bg-brandNavy/95 p-6 text-white ring-1 ring-white/10 shadow-soft">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-xs font-extrabold tracking-[0.28em] text-white/70">
                POINT CLÉ
              </div>
              <div className="mt-2 text-lg font-extrabold">
                {items[active]?.title}
              </div>
              <p className="mt-2 text-sm text-white/85">
                {items[active]?.desc}
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <ShieldCheck className="h-5 w-5 text-white/90" />
              <div className="text-xs font-extrabold text-white/90">
                Traçabilité & conformité
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile : timeline verticale */}
      <div className="mt-8 md:hidden">
        <ol className="relative space-y-4">
          <div className="absolute left-[14px] top-2 bottom-2 w-[2px] rounded-full bg-brandNavy/15" />
          {items.map((s) => (
            <li
              key={s.title}
              className="relative rounded-3xl bg-white p-5 ring-1 ring-brandLine"
            >
              <div className="absolute left-[6px] top-6 h-4 w-4 rounded-full bg-brandChampagne ring-4 ring-white" />
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-2xl bg-brandNavy/95 px-3 py-1.5 text-xs font-extrabold text-white ring-1 ring-white/10">
                  Étape {s.i + 1}
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

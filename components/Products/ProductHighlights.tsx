import {
  ShieldCheck,
  Sparkles,
  Hand,
  SlidersHorizontal,
} from "lucide-react";

type HighlightKey = "finish" | "comfort" | "care" | "options";

type Highlight = {
  key: HighlightKey;
  value: string;
};

const ICONS: Record<HighlightKey, React.ReactNode> = {
  finish: <Sparkles className="h-4 w-4" />,
  comfort: <Hand className="h-4 w-4" />,
  care: <ShieldCheck className="h-4 w-4" />,
  options: <SlidersHorizontal className="h-4 w-4" />,
};

const LABELS: Record<HighlightKey, string> = {
  finish: "Finition",
  comfort: "Confort",
  care: "Entretien",
  options: "Options",
};

export default function ProductHighlights({
  items,
}: {
  items: Highlight[];
}) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {items.map((it) => (
        <div
          key={it.key}
          className="
            rounded-3xl bg-white/60
            px-5 py-4
            ring-1 ring-brandLine
          "
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-extrabold tracking-[0.18em] text-brandNavy/60">
                <span className="text-brandChampagne">{ICONS[it.key]}</span>
                {LABELS[it.key].toUpperCase()}
              </div>
              <div className="mt-2 text-sm font-semibold text-brandNavy">
                {it.value}
              </div>
            </div>

            {/* micro accent */}
            <span
              aria-hidden
              className="mt-1 h-8 w-8 rounded-2xl bg-brandChampagne/10 ring-1 ring-brandChampagne/20"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

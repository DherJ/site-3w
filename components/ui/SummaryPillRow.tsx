import { X } from "lucide-react";

export function SummaryPillRow({
    label,
    value,
    onClear,
    disabled,
}: {
    label: string;
    value: string;
    onClear: () => void;
    disabled?: boolean;
}) {
    const isEmpty = !value || value === "—";
    return (
        <div className="py-1">
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/60 px-4 py-3 ring-1 ring-brandLine">
                <div className="min-w-0">
                    <div className="text-[10px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                        {label.toUpperCase()}
                    </div>
                    <div className="mt-1 truncate text-sm font-semibold text-brandNavy">
                        {value}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onClear}
                    disabled={disabled || isEmpty}
                    className={[
                        "inline-flex h-9 w-9 items-center justify-center rounded-xl",
                        "ring-1 transition",
                        isEmpty || disabled
                            ? "cursor-not-allowed bg-white/40 text-brandMuted/50 ring-brandLine/60"
                            : "bg-white/70 text-brandNavy ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/45",
                    ].join(" ")}
                    aria-label={`Retirer ${label}`}
                    title={`Retirer ${label}`}
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

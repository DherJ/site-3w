import { ReactNode } from "react";

export function InfoCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div
      className="
        flex items-start gap-3
        rounded-2xl
        bg-white/60
        px-4 py-4
        ring-1 ring-brandLine
        backdrop-blur
      "
    >
      {/* Icon */}
      <div
        className="
          mt-0.5
          flex h-8 w-8 items-center justify-center
          rounded-full
          bg-brandChampagne/15
          text-brandChampagne
        "
      >
        {icon}
      </div>

      {/* Content */}
      <div>
        <div className="text-[11px] font-extrabold tracking-[0.18em] text-brandNavy/60">
          {title.toUpperCase()}
        </div>
        <div className="mt-1 text-sm font-semibold text-brandNavy">
          {value}
        </div>
      </div>
    </div>
  );
}

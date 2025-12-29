import { useTranslations } from "next-intl";

type ProductSpec = {
  label: string;
  value: string;
};

export default function ProductSpecsTable({ specs }: { specs: ProductSpec[] }) {

  const t = useTranslations("products");

  if (!specs?.length) return null;

  return (
    <div className="mt-10 rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine backdrop-blur">
      <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
        {t('specification')}
      </div>

      <div className="mt-3 flex justify-end">
        <div className="h-[2px] w-24 rounded-full bg-brandChampagne" />
      </div>

      <div className="mt-6 divide-y divide-brandLine/60">
        {specs.map((s) => (
          <div key={s.label} className="grid gap-2 py-4 sm:grid-cols-[1fr_1.5fr]">
            <div className="text-xs font-extrabold tracking-[0.16em] text-brandNavy/60">
              {s.label.toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-brandNavy">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

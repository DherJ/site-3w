// app/[locale]/legal/_shared/LegalShell.tsx
import Link from "next/link";
import SignatureLine from "@/components/ui/SignatureLine";

export default function LegalShell({
  locale,
  breadcrumbLabel,
  kicker,
  title,
  subtitle,
  children,
}: {
  locale: string;
  breadcrumbLabel: string;
  kicker: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-brandMuted">
          <Link href={`/${locale}`} className="hover:text-brandNavy">
            Accueil
          </Link>
          <span className="text-brandMuted/40">/</span>
          <span className="text-brandNavy">{breadcrumbLabel}</span>
        </nav>

        {/* Hero */}
        <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10">
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {kicker}
          </div>

          <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-brandNavy md:text-4xl">
            {title}
          </h1>

          <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

          <div className="mt-4">
            <SignatureLine align="left" />
          </div>

          {subtitle ? (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brandMuted md:text-base">
              {subtitle}
            </p>
          ) : null}

          {/* Content */}
          <div className="mt-8 rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine md:p-8">
            <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-brandNavy prose-p:text-brandMuted prose-li:text-brandMuted">
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

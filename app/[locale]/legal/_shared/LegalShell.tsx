// app/[locale]/legal/_shared/LegalShell.tsx
import Link from "next/link";
import SignatureLine from "@/components/ui/SignatureLine";

type TocItem = { id: string; label: string };

export default function LegalShell({
  locale,
  breadcrumbLabel,
  kicker,
  title,
  subtitle,
  toc,
  children,
}: {
  locale: string;
  breadcrumbLabel: string;
  kicker: string;
  title: string;
  subtitle?: string;
  toc?: TocItem[];
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

          {/* Content layout */}
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px] lg:items-start">
            {/* Main */}
            <div className="prose prose-sm max-w-none
              prose-headings:font-serif prose-headings:text-brandNavy
              prose-p:text-brandMuted prose-p:leading-relaxed
              prose-li:text-brandMuted prose-li:my-1
              prose-strong:text-brandNavy
              prose-a:text-brandNavy prose-a:underline prose-a:underline-offset-4 space-y-6"
              >
                {children}
            </div>

            {/* TOC (optional) */}
            {toc?.length ? (
              <aside className="lg:sticky lg:top-28">
                <div className="rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-brandNavy/60">
                    SOMMAIRE
                  </div>
                  <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/60" />

                  <ul className="mt-4 space-y-2 text-sm">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-brandMuted hover:text-brandNavy transition-colors"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}

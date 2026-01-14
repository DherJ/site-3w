import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import HoverRevealImage from "@/components/ui/HoverRevealImage";
import SignatureLine from "@/components/ui/SignatureLine";

export default function ProductCard({
  hrefQuote,
  hrefProduct,
  title,
  meta,
  imageSrc,
  hoverImageSrc,
}: {
  hrefQuote: string;
  hrefProduct: string;
  title: string;
  meta: string;
  imageSrc: string;
  hoverImageSrc?: string;
}) {
  const t = useTranslations("global");

  return (
    <article
      className={[
        "group overflow-hidden rounded-3xl",
        "bg-white",
        "ring-1 ring-brandLine",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:ring-brandChampagne/40",
      ].join(" ")}
    >
      {/* IMAGE */}
      <Link href={hrefProduct} className="block">
        <HoverRevealImage
          baseSrc={imageSrc}
          hoverSrc={hoverImageSrc}
          alt={title}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 100vw"
          autoRotateOnMobile={true}
          rotateIntervalMs={2200}
        />
      </Link>

      {/* CONTENT */}
      <div className="p-6">
        <SignatureLine align="left" className="mb-3" />

        <h3 className="font-serif text-lg font-semibold text-brandNavy">{title}</h3>
        <p className="mt-2 text-sm text-brandMuted">{meta}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <Link
            href={hrefProduct}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-brandNavy transition-colors hover:text-brandChampagne"
          >
            {t("viewProduct")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <Link
            href={hrefQuote}
            className="rounded-full bg-brandNavy px-4 py-1.5 text-xs font-extrabold text-white shadow-sm transition hover:bg-brandNavy/90"
          >
            {t("quote")}
          </Link>
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { withBasePath } from "@/lib/withBasePath";

export default function ServiceCard({
  href,
  title,
  desc,
  imageSrc,
}: {
  href: string;
  title: string;
  desc: string;
  imageSrc: string;
}) {
  return (
    <Link
      href={href}
      className={[
        "group card-premium overflow-hidden",
        "transition hover:-translate-y-0.5 hover:shadow-[0_22px_70px_rgba(17,45,77,0.10)]",
      ].join(" ")}
    >
      <div className="relative aspect-[3/2] w-full sm:aspect-[16/10]">
        <Image
          src={withBasePath(imageSrc)}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          unoptimized
        />
        <div className="absolute inset-0 bg-brandNavy/10" />
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="font-serif text-lg font-semibold text-brandNavy sm:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-brandMuted sm:mt-3 sm:text-sm">{desc}</p>

        <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-brandNavy sm:mt-5 sm:text-sm">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

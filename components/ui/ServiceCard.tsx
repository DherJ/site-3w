import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-brandNavy/10" />
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl font-semibold text-brandNavy">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brandMuted">{desc}</p>

        <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brandNavy">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

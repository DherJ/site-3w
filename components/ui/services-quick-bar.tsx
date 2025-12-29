"use client";

import Link from "next/link";
import Image from "next/image";

export function ServicesQuickBar({
  items,
}: {
  items: { key: string; label: string; href: string; iconSrc: string }[];
}) {
  return (
    <div className="mx-auto -mt-8 max-w-6xl px-4">
      <div className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((it, idx) => (
            <Link
              key={it.key}
              href={it.href}
              className={[
                "group relative flex flex-col items-center justify-center gap-2",
                "rounded-2xl px-3 py-4 text-center transition",
                "hover:bg-brand-grayLight hover:-translate-y-[1px]",
                idx !== items.length - 1
                  ? "lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:h-10 lg:after:w-px lg:after:-translate-y-1/2 lg:after:bg-gray-200"
                  : "",
              ].join(" ")}
            >
              <Image
                src={it.iconSrc}
                alt={it.label}
                width={44}
                height={44}
                className="h-11 w-11 transition-transform group-hover:scale-[1.06]"
              />
              <div className="text-sm font-bold text-brand-text">{it.label}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

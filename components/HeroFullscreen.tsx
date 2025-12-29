"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroFullscreen() {
  return (
    <section className="relative min-h-[calc(100vh-96px)] w-full overflow-hidden">

      {/* Image full screen */}
      <Image
        src="/hero/hero-full.png"
        alt="Well With Waves – Radioprotection"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay léger (optionnel mais recommandé) */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Bouton bas gauche */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12">
        <Link
          href="#discover"
          className="
            inline-flex items-center gap-2
            rounded-full
            bg-white/90 backdrop-blur
            px-6 py-3
            text-sm font-extrabold
            text-brandNavy
            shadow-lg
            transition
            hover:bg-white
            hover:translate-y-[-1px]
          "
        >
          Découvrir
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}

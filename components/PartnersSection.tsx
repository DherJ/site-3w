"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import { withBasePath } from "@/lib/withBasePath";

type Partner = {
  name: string;
  logo: string;
};

function PartnersMarquee({
  items,
  speed = 28,
}: {
  items: Partner[];
  speed?: number;
}) {
  const track = items.concat(items);

  return (
    <div
      className="
        relative overflow-hidden
        bg-brandNavy
        py-6
      "
    >
      {/* fades gauche / droite */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brandNavy to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brandNavy to-transparent z-10" />

      <div
        className="group flex w-max items-center gap-12 will-change-transform"
        style={{
          animation: `partners-marquee ${speed}s linear infinite`,
        }}
      >
        {track.map((p, idx) => (
          <div
            key={`${p.name}-${idx}`}
            className="
              flex items-center justify-center
              h-16 sm:h-20
              px-8
              rounded-xl
              transition-all duration-300
              hover:bg-white/5
              hover:ring-1 hover:ring-brandChampagne/30
            "
          >
            <Image
              src={withBasePath(p.logo)}
              alt={p.name}
              width={220}
              height={80}
              className="
                h-18 sm:h-16 w-auto object-contain
                opacity-90 transition-opacity duration-300
                hover:opacity-100
              "
              unoptimized
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        div:hover > .group {
          animation-play-state: paused;
        }

        @keyframes partners-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .group {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function PartnersBlock({
  kicker,
  title,
  subtitle,
  items,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  items: Partner[];
}) {
  return (
    <div
      className={[
        "mt-14 rounded-3xl p-8 sm:p-12",
        "bg-white/70 backdrop-blur",
        "ring-1 ring-brandLine",
        "shadow-[0_16px_50px_rgba(17,45,77,0.06)]",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
            {kicker}
          </div>

          <h3 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy sm:text-3xl">
            {title}
          </h3>

          {subtitle ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brandMuted">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* détail graphique */}
        <div className="hidden sm:block">
          <div className="h-[2px] w-28 rounded-full bg-brandChampagne/70" />
          <div className="mt-2 h-[2px] w-16 rounded-full bg-brandChampagne/35" />
        </div>
      </div>

      <div className="mt-8">
  <PartnersMarquee items={items} />
</div>
    </div>
  );
}

export default function PartnersSection() {
  const t = useTranslations("partners");

  const supportPartners: Partner[] = [
    { name: "CCI", logo: "/partners/cci.png" },
    { name: "Eurasanté", logo: "/partners/eurasante.png" },
    { name: "Femmes Entrepreneuses Orange", logo: "/partners/femmes-entrepreneuses-orange.png" },
    { name: "French Care", logo: "/partners/french-care.png" },
    { name: "HDFID", logo: "/partners/hdfid.png" },
    { name: "Imt Nord Europe", logo: "/partners/imt-nord-europe.png" },
    { name: "Pepso", logo: "/partners/pepso.png" },
    { name: "Prevent-to-care", logo: "/partners/prevent-to-care.png" },
  ];

  const fundingPartners: Partner[] = [
    { name: "BPI France", logo: "/partners/bpifrance.png" },
    { name: "Fondation Mines-Télécom", logo: "/partners/fondation-mines-telecom.png" },
    { name: "Initiative Pays de Saint Omer", logo: "/partners/reseaux-initiative-pays-saint-omer.png" },
    { name: "Région Hauts-de-France", logo: "/partners/region-hauts-de-france.png" },
  ];

  return (
    <section className="relative py-16 md:py-24">
      {/* fond premium */}
      {/*
      <div className="pointer-events-none absolute inset-0 bg-brandOffWhite" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-brandOffWhite to-white" />
        */}

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionTitle kicker={t("kicker")} title={t("title")} subtitle={t("subtitle")} />

        <PartnersBlock
          kicker={t("support.kicker")}
          title={t("support.title")}
          subtitle={t("support.subtitle")}
          items={supportPartners}
        />

        <PartnersBlock
          kicker={t("funding.kicker")}
          title={t("funding.title")}
          subtitle={t("funding.subtitle")}
          items={fundingPartners}
        />
      </div>
    </section>
  );
}

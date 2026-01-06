"use client";

import { Radiation } from "lucide-react";

type RadiationLoaderProps = {
  size?: number; // taille de l'icône
  variant?: "navy" | "champagne";
  speed?: "slow" | "normal";
  ring?: boolean; // ✅ nouveau
};

export default function RadiationLoader({
  size = 20,
  variant = "navy",
  speed = "slow",
  ring = true,
}: RadiationLoaderProps) {
  const ringStroke =
    variant === "navy" ? "stroke-brandNavy/45" : "stroke-brandChampagne/70";
  const haloBg =
    variant === "navy" ? "bg-brandNavy/30" : "bg-brandChampagne/40";

  const box = size + 18;        // conteneur
  const svgSize = size + 18;    // ring svg
  const r = 15;                 // rayon dans viewBox 40

  return (
    <span
      aria-label="Chargement"
      role="status"
      className={[
        "relative inline-flex items-center justify-center",
        "rounded-2xl",
        variant === "navy" ? "text-brandNavy" : "text-brandChampagne",
      ].join(" ")}
      style={{ width: box, height: box }}
    >
      {/* halo discret */}
      <span className={["absolute inset-0 rounded-2xl blur-md opacity-40", haloBg].join(" ")} />

      {/* ✅ cercle autour (style logo) */}
      {ring ? (
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 40 40"
          className="absolute"
        >
          <circle
            cx="20"
            cy="20"
            r={r}
            fill="#C9B37E"
            strokeWidth="2.2"
            className={ringStroke}
            strokeLinecap="round"   // discret, premium
          />
        </svg>
      ) : null}

      {/* icône qui tourne */}
      <Radiation
        color="#070601ff"
        fill="#070601ff"
        size={size}
        strokeWidth={1.8}
        className={[
          "relative z-10",
          speed === "slow" ? "animate-spin-slow" : "animate-spin",
        ].join(" ")}
      />
    </span>
  );
}

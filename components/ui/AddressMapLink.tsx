"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";

type AddressMapLinkProps = {
  companyName?: string;
  address: string;
  label?: string;
  variant?: "card" | "inline";
  tone?: "light" | "dark";
  className?: string;
};

function buildGoogleMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
 // https://www.google.com/maps/place/3W+-+Well+With+Waves/@50.7268101,2.3319638,17z/data=!3m1!4b1!4m6!3m5!1s0x47dcf971dff176d7:0xbe08dee01d971c59!8m2!3d50.7268068!4d2.3368347!16s%2Fg%2F11w1cky29r?entry=ttu&g_ep=EgoyMDI2MDEwNy4wIKXMDSoASAFQAw%3D%3D
}

export default function AddressMapLink({
  companyName,
  address,
  label = "ATELIER & SIÈGE",
  variant = "card",
  tone = "light",
  className,
}: AddressMapLinkProps) {
  const href = buildGoogleMapsUrl(companyName ? companyName : address);
  const isDark = tone === "dark";
  const g = useTranslations("global");
 
  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          "inline-flex items-start gap-2 text-sm font-semibold",
          isDark
            ? "text-white"
            : "text-brandNavy hover:text-brandChampagne",
          className
        )}
      >
        <span className="leading-snug">
          {address}
        </span>
      </a>
    );
  }

  // card variant (inchangée pour pages claires)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "group block rounded-3xl p-6  transition-all duration-300",
        isDark
          ? "bg-white/5 ring-white/10 text-white"
          : "bg-white/60 ring-brandLine hover:-translate-y-0.5 hover:ring-brandChampagne/40",
        className
      )} 
    >
      <div
        className={clsx(
          "text-[11px] font-extrabold tracking-[0.22em]",
          isDark ? "text-white/60" : "text-brandNavy/60"
        )}
      >
        {label}
      </div>

      <address
        className={clsx(
          "not-italic mt-3 text-sm font-semibold leading-snug",
          isDark ? "text-white" : "text-brandNavy"
        )}
      >
        {address.split(",").map((line, i) => (
          <div key={i}>{line.trim()}</div>
        ))}
      </address>

      {!isDark && (
        <div className="mt-3 text-xs font-bold text-brandMuted">
          {g('openMaps')}
        </div>
      )}
    </a>
  );
}

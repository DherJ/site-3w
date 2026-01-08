"use client";

import clsx from "clsx";

type AddressMapLinkProps = {
  address: string;
  label?: string;
  variant?: "card" | "inline";
  tone?: "light" | "dark";
  className?: string;
};

function buildGoogleMapsUrl(address: string) {
  const query = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function AddressMapLink({
  address,
  label = "ATELIER & SIÈGE",
  variant = "card",
  tone = "light",
  className,
}: AddressMapLinkProps) {
  const href = buildGoogleMapsUrl(address);
  const isDark = tone === "dark";

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
          Ouvrir dans Google Maps
        </div>
      )}
    </a>
  );
}

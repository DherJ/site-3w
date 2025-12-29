"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/* -----------------------------
   Utils
----------------------------- */
function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getLocaleFromPathname(pathname: string) {
  const seg = pathname.split("/")[1];
  return seg === "en" ? "en" : "fr";
}

function switchLocale(pathname: string, nextLocale: "fr" | "en") {
  const parts = pathname.split("/");
  if (parts[1] === "fr" || parts[1] === "en") {
    parts[1] = nextLocale;
    return parts.join("/") || `/${nextLocale}`;
  }
  return `/${nextLocale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

/* -----------------------------
   Hook: scrolled
----------------------------- */
function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return scrolled;
}

/* -----------------------------
   Locale switch (for scrolled state)
----------------------------- */
function LocaleSwitch() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  const fr = switchLocale(pathname, "fr");
  const en = switchLocale(pathname, "en");

  const base = "rounded-lg px-2 py-1 text-sm font-semibold transition";
  const active = "bg-white text-brandNavy ring-1 ring-white/60";
  const inactive = "text-white/90 hover:bg-white/10 hover:text-white";

  return (
    <div className="flex items-center gap-2">
      <Link href={fr} className={`${base} ${currentLocale === "fr" ? active : inactive}`}>
        FR
      </Link>
      <span className="text-white/40">|</span>
      <Link href={en} className={`${base} ${currentLocale === "en" ? active : inactive}`}>
        EN
      </Link>
    </div>
  );
}

/* -----------------------------
   SiteHeader
----------------------------- */
export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const scrolled = useScrolled(24);

  const appleEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  const links = [
    { key: "products", href: `/${locale}/products`, label: t("products") },
    { key: "services", href: `/${locale}/services/sales`, label: t("services") },
    { key: "partners", href: `/${locale}/partners`, label: t("partners") },
    { key: "quote", href: `/${locale}/quote`, label: t("quote") },
    { key: "contact", href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="relative">
        {/* ============ TOP STATE (links only, centered) ============ */}
        <div
          className={[
            "absolute inset-x-0 top-0",
            "transition-all duration-500",
            appleEase,
            scrolled ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0",
          ].join(" ")}
        >
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-center px-4">
            <nav className="hidden md:flex items-center justify-center gap-5 border-b border-brandChampagne/60 pb-2">
              {links.map((l) => {
                const active = isActive(pathname, l.href);
                return (
                  <Link
                    key={l.key}
                    href={l.href}
                    className={[
                      "nav-top-link",
                      active ? "nav-top-link-active" : "",
                    ].join(" ")}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

          </div>
        </div>

        {/* ============ SCROLLED STATE (full navbar) ============ */}
        <div
          className={[
            "absolute inset-x-0 top-0",
            "transition-all duration-700",
            appleEase,
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
          ].join(" ")}
        >
          <div className="bg-brandNavy/90 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] overflow-hidden">
            <div className="flex h-[96px] items-stretch">
              {/* LEFT: Logo block */}
              <div className="flex items-stretch pl-0">
                <Link href={`/${locale}`} className="relative flex items-stretch">
                  <div className="relative flex items-center bg-white px-10 h-[96px]">
                    <Image
                      src="/logo.png"
                      alt="Well With Waves"
                      width={420}
                      height={140}
                      priority
                      className="h-20 md:h-24 w-auto object-contain"
                    />
                    <span
                      aria-hidden
                      className="absolute right-[-54px] top-0 h-full w-20 bg-white"
                      style={{ clipPath: "polygon(0 0, 100% 0, 70% 100%, 0 100%)" }}
                    />
                  </div>
                </Link>
              </div>

              {/* CENTER: Nav */}
              <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4">
                <nav className="hidden items-center gap-10 md:flex">
                  {links.map((l) => {
                    const active = isActive(pathname, l.href);
                    return (
                      <Link
                        key={l.key}
                        href={l.href}
                        className={[
                          "relative text-sm font-semibold text-white/90 transition-colors hover:text-white",
                          "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-full after:-translate-x-1/2",
                          "after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300",
                          "after:origin-center",
                          "hover:after:scale-x-100",
                          active ? "text-white after:scale-x-100" : "",
                        ].join(" ")}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* RIGHT: Locale + CTA */}
              <div className="flex items-center gap-3 pr-6 md:pr-10">
                <div className="mr-2 md:mr-4">
                  <LocaleSwitch />
                </div>
                <Link
                  href={`/${locale}/quote`}
                  className={[
                    "hidden md:inline-flex whitespace-nowrap rounded-2xl",
                    "bg-white px-6 py-2.5 text-sm font-extrabold text-brandNavy",
                    "shadow-sm transition-all duration-300",
                    appleEase,
                    "hover:bg-white/90 hover:-translate-y-0.5",
                  ].join(" ")}
                >
                  {t("quote")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer: garde la place du header (évite un jump) */}
        <div className="h-[96px]" />
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Users, Mail, BookOpen, Wrench, Handshake } from "lucide-react";
import HeaderProductsDropdown from "@/components/layout/HeaderProductsDropdown";
import HeaderServicesDropdown from "./layout/HeaderServicesDropdown";
import { NavIcon } from "./ui/NavBarServicesIcon";


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
  type OpenMenu = "products" | "services" | null;

  const [openMenu, setOpenMenu] = useState<OpenMenu>(null);
  const closeTimer = useRef<number | null>(null);

  const open = (menu: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(menu as any);
  };

  const close = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const appleEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  const links = [
    { key: "products", Icon: BookOpen, href: `/${locale}/products`, label: t("products") },
    { key: "services", Icon: Handshake, href: `/${locale}/services`, label: t("services") },
    { key: "about", Icon: Users, href: `/${locale}/about`, label: t("about") },
    { key: "contact", Icon: Mail, href: `/${locale}/contact`, label: t("contact") },
  ];


  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="relative">
        {/*
         ============ TOP STATE (links only, centered) ============ 
        <div
          className={[
            "absolute inset-x-0 top-0",
            "transition-all duration-500",
            appleEase,
            scrolled ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0",
          ].join(" ")}
        >
          <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-center px-4">
            <nav className="hidden md:flex items-center justify-center space-x-14 gap-8 border-b border-brandChampagne/60 pb-2">
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
        */}

        {/* ============ SCROLLED STATE (full navbar) ============ */}
        <div
          className={[
            "absolute inset-x-0 top-0",
            "transition-all duration-700",
            appleEase,
            // scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
            "opacity-100 translate-y-0"
          ].join(" ")}
        >
          <div className="relative z-[100] bg-brandNavy/90 backdrop-blur-xl ring-1 ring-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] overflow-visible">
            <div className="flex h-[96px] items-stretch">
              {/* LEFT: Logo block */}
              <div className="flex items-stretch pl-0">
                <Link href={`/${locale}`} className="relative flex items-stretch">
                  <div className="relative flex items-center bg-white px-6 h-[96px] shrink-0">
                    <div className="relative h-[52px] w-[170px] 2xl:h-[65px] 2xl:w-[190px]">
                      <Image
                        src="/logo.png"
                        alt="Well With Waves"
                        fill
                        priority
                        className="object-contain"
                        sizes="170px"
                        unoptimized
                      />
                    </div>

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
                <nav className="hidden items-center gap-10 space-x-14 md:flex">
                  {links.map((l) => {
                    const active = isActive(pathname, l.href);
                    // ✅ Special case: products dropdown
                    if (l.key === "products") {
                      return (
                        <div
                          key={l.key}
                          className="relative"
                          onMouseEnter={() => open("products")}
                          onMouseLeave={() => close()}
                        >
                          {/* ✅ lien */}
                          <Link
                            href={l.href}
                            className={[
                              "relative inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white",
                              "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-full after:-translate-x-1/2",
                              "after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300",
                              "after:origin-center hover:after:scale-x-100",
                              active ? "text-white after:scale-x-100" : "",
                            ].join(" ")}
                          >
                            <NavIcon link={l} />
                            {l.label}
                          </Link>

                          {/* ✅ zone tampon (évite que ça se ferme dans le “vide” entre lien et menu) */}
                          <div className="absolute left-0 right-0 top-full h-4" />

                          {/* ✅ dropdown */}
                          {openMenu === "products" ? (
                            <HeaderProductsDropdown
                              locale={locale}
                              onNavigate={() => setOpenMenu(null)}
                            />
                          ) : null}
                        </div>
                      );
                    }

                    // ✅ Dropdown services (même mécanique)
                    if (l.key === "services") {
                      return (
                        <div
                          key={l.key}
                          className="relative"
                          onMouseEnter={() => open("services")}
                          onMouseLeave={() => close()}
                        >
                          <Link
                            href={l.href}
                            className={[
                              "relative inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white",
                              "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-full after:-translate-x-1/2",
                              "after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300",
                              "after:origin-center hover:after:scale-x-100",
                              active ? "text-white after:scale-x-100" : "",
                            ].join(" ")}
                          >
                            <NavIcon link={l} />
                            {l.label}
                          </Link>

                          <div className="absolute left-0 right-0 top-full h-4" />

                          {openMenu === "services" ? (
                            <HeaderServicesDropdown
                              locale={locale}
                              onNavigate={() => setOpenMenu(null)}
                            />
                          ) : null}
                        </div>
                      );
                    }

                    // Default links
                    return (
                      <div
                        key={l.key}
                        className="relative"
                      >
                        <Link
                          href={l.href}
                          className={[
                            "relative inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white",
                            "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-full after:-translate-x-1/2",
                            "after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300",
                            "after:origin-center hover:after:scale-x-100",
                            active ? "text-white after:scale-x-100" : "",
                          ].join(" ")}
                        >
                          <NavIcon link={l} />
                          <span>{l.label}</span>
                        </Link>
                      </div>
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

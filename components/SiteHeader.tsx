"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Users, Mail, BookOpen, Handshake, X, Menu, ChevronDown } from "lucide-react";

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
   Locale switch
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

  // ✅ Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<{ products: boolean; services: boolean }>({
    products: false,
    services: false,
  });

  const open = (menu: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenMenu(menu as any);
  };

  const close = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const appleEase = "ease-[cubic-bezier(0.16,1,0.3,1)]";

  const links = [
    { key: "products", imageSrc: "/icons/products.png", Icon: BookOpen, href: `/${locale}/products`, label: t("products") },
    { key: "services", Icon: Handshake, href: `/${locale}/services`, label: t("services") },
    { key: "about", Icon: Users, href: `/${locale}/about`, label: t("about") },
    { key: "contact", Icon: Mail, href: `/${locale}/contact`, label: t("contact") },
  ] as const;

  // ✅ lock scroll + ESC close
  useEffect(() => {
    if (!mobileOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // ✅ close mobile when route changes (pathname)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const quoteHref = `/${locale}/quote`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 w-full">
      <div className="relative">
        {/* ============ NAVBAR ============ */}
        <div
          className={[
            "absolute inset-x-0 top-0",
            "transition-all duration-700",
            appleEase,
            "opacity-100 translate-y-0",
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

              {/* CENTER: Nav (desktop only) */}
              <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4">
                <nav className="hidden items-center gap-10 space-x-14 md:flex">
                  {links.map((l) => {
                    const active = isActive(pathname, l.href);
                    const imageSrc = (l as any).imageSrc;

                    if (l.key === "products") {
                      return (
                        <div
                          key={l.key}
                          className="relative"
                          onMouseEnter={() => open("products")}
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
                            {imageSrc ? (
                              <span className="relative h-8 w-8 shrink-0">
                                <Image src={imageSrc} alt="" fill className="object-contain opacity-90" sizes="48px" />
                              </span>
                            ) : (
                              <NavIcon link={l as any} />
                            )}
                            {l.label}
                          </Link>

                          <div className="absolute left-0 right-0 top-full h-4" />

                          {openMenu === "products" ? (
                            <HeaderProductsDropdown locale={locale} onNavigate={() => setOpenMenu(null)} />
                          ) : null}
                        </div>
                      );
                    }

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
                            <NavIcon link={l as any} />
                            {l.label}
                          </Link>

                          <div className="absolute left-0 right-0 top-full h-4" />

                          {openMenu === "services" ? (
                            <HeaderServicesDropdown locale={locale} onNavigate={() => setOpenMenu(null)} />
                          ) : null}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={l.key}
                        href={l.href}
                        className={[
                          "relative inline-flex items-center gap-2 text-lg font-semibold text-white/90 transition-colors hover:text-white",
                          "after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-full after:-translate-x-1/2",
                          "after:scale-x-0 after:rounded-full after:bg-current after:transition-transform after:duration-300",
                          "after:origin-center hover:after:scale-x-100",
                          active ? "text-white after:scale-x-100" : "",
                        ].join(" ")}
                      >
                        <NavIcon link={l as any} />
                        <span>{l.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* RIGHT: Locale + CTA (desktop) + Burger (mobile) */}
              <div className="flex items-center gap-3 pr-6 md:pr-10">
                {/* Desktop locale */}
                <div className="hidden md:block mr-2 md:mr-4">
                  <LocaleSwitch />
                </div>

                <Link
                  href={quoteHref}
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

                {/* ✅ Burger button (mobile only) */}
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 text-white hover:bg-white/15 transition"
                  aria-label="Open menu"
                  aria-expanded={mobileOpen}
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-[96px]" />

        {/* ============ MOBILE DRAWER ============ */}
        {mobileOpen ? (
          <div className="fixed inset-0 z-[200] md:hidden">
            {/* overlay */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/40"
            />

            {/* panel */}
            <div className="absolute inset-x-0 top-0 h-[100svh] bg-brandNavy text-white shadow-2xl">
              {/* top bar */}
              <div className="flex items-center justify-between px-4 py-4 ring-1 ring-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-32">
                    <Image src="/logo.png" alt="Well With Waves" fill className="object-contain" sizes="128px" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* content */}
              <div className="px-4 py-5">
                {/* Locale switch (mobile) */}
                <div className="mb-5 flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 p-3">
                  <div className="text-xs font-extrabold tracking-[0.22em] text-white/70">
                    {t("language", { default: "LANGUE" })}
                  </div>
                  <LocaleSwitch />
                </div>

                {/* Primary links */}
                <div className="grid gap-2">
                  {/* Products accordion */}
                  <button
                    type="button"
                    onClick={() => setMobileAcc((s) => ({ ...s, products: !s.products }))}
                    className="flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-left"
                  >
                    <span className="inline-flex items-center gap-3 font-extrabold">
                      <BookOpen className="h-5 w-5" />
                      {t("products")}
                    </span>
                    <ChevronDown
                      className={[
                        "h-5 w-5 transition-transform",
                        mobileAcc.products ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>

                  {mobileAcc.products ? (
                    <div className="mt-1 rounded-2xl bg-white/5 ring-1 ring-white/10 p-2">
                      <Link
                        href={`/${locale}/products`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                      >
                        {t("products", { default: "Produits" })}
                      </Link>

                      {/* 👉 Ajoute ici des sous-liens si tu veux */}
                      {/* <Link href={`/${locale}/products?cat=tabliers`} ...>Tabliers</Link> */}
                    </div>
                  ) : null}

                  {/* Services accordion */}
                  <button
                    type="button"
                    onClick={() => setMobileAcc((s) => ({ ...s, services: !s.services }))}
                    className="flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-left"
                  >
                    <span className="inline-flex items-center gap-3 font-extrabold">
                      <Handshake className="h-5 w-5" />
                      {t("services")}
                    </span>
                    <ChevronDown
                      className={[
                        "h-5 w-5 transition-transform",
                        mobileAcc.services ? "rotate-180" : "rotate-0",
                      ].join(" ")}
                    />
                  </button>

                  {mobileAcc.services ? (
                    <div className="mt-1 rounded-2xl bg-white/5 ring-1 ring-white/10 p-2">
                      <Link
                        href={`/${locale}/services`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-3 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                      >
                        {t("services", { default: "Services" })}
                      </Link>

                      {/* 👉 Ajoute ici des sous-liens si tu veux */}
                    </div>
                  ) : null}

                  {/* About */}
                  <Link
                    href={`/${locale}/about`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3"
                  >
                    <span className="inline-flex items-center gap-3 font-extrabold">
                      <Users className="h-5 w-5" />
                      {t("about")}
                    </span>
                  </Link>

                  {/* Contact */}
                  <Link
                    href={`/${locale}/contact`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 px-4 py-3"
                  >
                    <span className="inline-flex items-center gap-3 font-extrabold">
                      <Mail className="h-5 w-5" />
                      {t("contact")}
                    </span>
                  </Link>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    href={quoteHref}
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-brandNavy shadow-sm hover:bg-white/90 transition"
                  >
                    {t("quote")}
                  </Link>
                </div>

                {/* small hint / divider */}
                <div className="mt-6 h-px w-full bg-white/10" />
                <div className="mt-4 text-xs text-white/60">
                  {t("mobileHint", { default: "Menu" })}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import AddressMapLink from "@/components/ui/AddressMapLink";

type LegalCommon = {
  companyName: string;
  address: string;
  email: string;
  phone: string;
};

export default function SiteFooterClient({
  locale,
  common,
}: {
  locale: string;
  common: LegalCommon;
}) {
  const t = useTranslations("footer");
  const tradGlobal = useTranslations("global");

  return (
    <footer className="bg-brandNavy/95 backdrop-blur-xl ring-1 ring-white/10 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-3 md:items-start text-left">
          <div className="flex flex-col items-left">
            <div className="font-serif text-lg font-semibold tracking-tight">
              {t("society")}
            </div>
            <p className="mt-3 max-w-sm text-sm text-white/70">{t("description")}</p>
          </div>

          <div className="text-sm flex flex-col items-left">
            <div className="font-bold tracking-wide text-white">
              {t("navigation.title")}
            </div>

            <ul className="mt-4 space-y-2 text-white/70">
              {[
                { label: t("navigation.products"), href: `/${locale}/products` },
                { label: t("navigation.services"), href: `/${locale}/services` },
                { label: t("navigation.about"), href: `/${locale}/about` },
                { label: tradGlobal("requestQuote"), href: `/${locale}/quote` },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href as any}
                    className="inline-flex text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm flex flex-col items-left">
            <div className="font-bold tracking-wide text-white">
              {tradGlobal("contactUs")}
            </div>

            <ul className="mt-4 space-y-4 text-white/70 w-full max-w-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-brandChampagne shrink-0" />
                <AddressMapLink
                  companyName={common.companyName}
                  address={common.address}
                  variant="inline"
                  tone="dark"
                  className="text-white/80 hover:text-white text-left"
                />
              </li>

              <li className="flex items-left gap-3">
                <Mail className="h-4 w-4 text-brandChampagne shrink-0" />
                <a
                  href={`mailto:${common.email}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {common.email}
                </a>
              </li>

              <li className="flex items-left gap-3">
                <Phone className="h-4 w-4 text-brandChampagne shrink-0" />
                <a
                  href={`tel:${common.phone}`}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {common.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-5">
          <div className="flex flex-col items-center justify-center gap-3 text-xs text-white/60 md:flex-row md:gap-4">
            <div>© {new Date().getFullYear()} {t("allRightsReserved")}</div>

            <span className="hidden md:inline-block h-3 w-px bg-white/20" />

            <Link
              href={`/${locale}/legal/mentions-legales`}
              className="text-white/70 hover:text-white transition-colors"
            >
              {tradGlobal("legalNotice")}
            </Link>

            <span className="hidden md:inline-block h-3 w-px bg-white/20" />

            <Link
              href={`/${locale}/legal/privacy-policy`}
              className="text-white/60 hover:text-white transition-colors"
            >
              {tradGlobal("legal.privacyPolicy")}
            </Link>

            <span className="hidden md:inline-block h-3 w-px bg-white/20" />

            <Link
              href={`/${locale}/legal/terms`}
              className="text-white/60 hover:text-white transition-colors"
            >
              {tradGlobal("legal.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

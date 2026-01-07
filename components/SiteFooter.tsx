// components/layout/SiteFooter.tsx (ou ton fichier actuel)
import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import AddressMapLink from "@/components/ui/AddressMapLink";

export function SiteFooter() {
  const t = useTranslations("footer");
  const tradGlobal = useTranslations("global");
  const locale = useLocale();

  return (
    <footer className="bg-brandNavy/95 backdrop-blur-xl ring-1 ring-white/10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        {/* Bloc marque */}
        <div>
          <div className="font-serif text-lg font-semibold tracking-tight">
            {t("society")}
          </div>
          <p className="mt-3 max-w-sm text-sm text-white/70">
            {t("description")}
          </p>
        </div>

        {/* Liens */}
        <div className="text-sm">
          <div className="font-bold tracking-wide text-white">
            {t("navigation.title")}
          </div>

          <ul className="mt-4 space-y-2 text-white/70">
            {[
              { label: t("navigation.products"), href: `/${locale}/products` },
              { label: t("navigation.services"), href: `/${locale}/services` },
              { label: t("navigation.partners"), href: `/${locale}/partners` },
              { label: tradGlobal("requestQuote"), href: `/${locale}/quote` },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href as any}
                  className="inline-flex text-white/70 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-sm">
          <div className="font-bold tracking-wide text-white">
            {tradGlobal("contactUs")}
          </div>

          <ul className="mt-4 space-y-4 text-white/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-brandChampagne shrink-0" />
              <AddressMapLink
                address="110 Rue du Smetz PePSO, 62120 Campagne-lès-Wardrecques"
                variant="inline"
                tone="dark"
                className="text-white/80 hover:text-white" // blanc stable
              />
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brandChampagne" />
              <a
                href="mailto:cdhersin@wellwithwaves.com"
                className="text-white/80 hover:text-white transition-colors"
              >
                cdhersin@wellwithwaves.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brandChampagne" />
              <a
                href="tel:+33652710309"
                className="text-white/80 hover:text-white transition-colors"
              >
                +33 6 52 71 03 09
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bas de footer : legal */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="text-xs text-white/55">
            © {new Date().getFullYear()} {t("allRightsReserved")}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
            <Link
              href={`/${locale}/legal/mentions-legales`}
              className="text-white/65 hover:text-white underline-offset-4 hover:underline transition"
            >
              {tradGlobal("legalNotice")}
            </Link>
            <Link
              href={`/${locale}/legal/privacy-policy`}
              className="text-white/65 hover:text-white underline-offset-4 hover:underline transition"
            >
              {tradGlobal("legal.privacyPolicy")}
            </Link>
            <Link
              href={`/${locale}/legal/terms`}
              className="text-white/65 hover:text-white underline-offset-4 hover:underline transition"
            >
              {tradGlobal("legal.termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

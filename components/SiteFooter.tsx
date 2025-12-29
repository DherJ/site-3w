import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

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
                  className="
                    relative inline-block transition-colors
                    hover:text-brandChampagne
                    after:absolute after:left-0 after:-bottom-0.5
                    after:h-[1px] after:w-0 after:bg-brandChampagne
                    after:transition-all after:duration-300
                    hover:after:w-full
                  "
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
              <MapPin className="mt-0.5 h-4 w-4 text-brandChampagne" />
              <span>
                110 rue du Smetz <br />
                62120 Campagne-lès-Wardrecques <br />
                France
              </span>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-brandChampagne" />
              <a
                href="mailto:contact@wellwithwaves.com"
                className="hover:text-brandChampagne transition-colors"
              >
                cdhersin@wellwithwaves.com
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-brandChampagne" />
              <a
                href="tel:+33652710309"
                className="hover:text-brandChampagne transition-colors"
              >
                +33 6 52 71 03 09
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bas de footer */}
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {t("allRightsReserved")}
      </div>
    </footer>
  );
}

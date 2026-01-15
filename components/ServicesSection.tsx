"use client";

import { useTranslations, useLocale } from "next-intl";
import SectionTitle from "./ui/SectionTitle";
import ServiceCard from "./ui/ServiceCard";

import { SERVICES } from "@/data/services";

export default function ServicesSection() {
  const t = useTranslations("services");
  const locale = useLocale();

  const serviceHref = (slug: string) => `/${locale}/services/${slug}`;

  return (
    <section id="discover" className="section py-12 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          kicker="SERVICES"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (

            <ServiceCard
              key={s.slug}
              href={serviceHref(s.slug)}
              title={t(`${s.i18nKey}.title`)}
              desc={t(`${s.i18nKey}.desc`)}
              imageSrc={s.imageSrc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

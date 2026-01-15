"use client";

import Link from "next/link";
import SignatureLine from "@/components/ui/SignatureLine";
import { useRevealOnScroll } from "@/components/hooks/useRevealOnScroll";
import AddressMapLink from "@/components/ui/AddressMapLink";
import AwardsTimeline from "@/components/about/AwardsTimeline";
import { TEAM } from "@/data/team";
import { withBasePath } from "@/lib/withBasePath";

type CompanyBlock = {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    addressLabel: string;
    address: string;
    features: string[];
};

type RecognitionBlock = {
    kicker: string;
    title: string;
    intro: string;
    items: string[];
};

type TeamBlock = {
    kicker: string;
    title: string;
    intro: string;
    ctaTitle: string;
    ctaDesc: string;
    quoteHref: string;
};

const toWebp = (imageSrc: string) => imageSrc.replace(/\.(png|jpe?g)$/i, ".webp");

export default function AboutClient({
    locale,
    company,
    recognition,
    team,
}: {
    locale: string;
    company: CompanyBlock;
    recognition: RecognitionBlock;
    team: TeamBlock;
}) {
    useRevealOnScroll();

    return (
        <div className="mt-10 space-y-6 md:mt-14 md:space-y-10">
            {/* COMPANY */}
            <section
                data-reveal
                className={[
                    "rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur",
                    "reveal reveal-left",
                ].join(" ")}
            >
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div>
                        <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                            {company.kicker}
                        </div>

                        <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy md:text-3xl">
                            {company.title}
                        </h2>

                        <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

                        <div className="mt-4 w-[220px]">
                            <SignatureLine align="left" />
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
                            {company.p1}
                        </p>

                        <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
                            {company.p2}
                        </p>
                    </div>

                    {/* Atelier & localisation */}

                    <div className="rounded-3xl bg-white/60 ring-1 ring-brandLine overflow-hidden">
                        {/* Image */}
                        <div className="group relative aspect-[5/3] w-full">
                            <picture className="absolute inset-0 h-full w-full">
                                <source
                                    srcSet={withBasePath(`/about/webp/${toWebp("company.jpg")}`)}
                                    type="image/webp"
                                />
                                <img
                                    src={withBasePath("/about/company.jpg")}
                                    alt={locale === "fr" ? "Atelier Well With Waves" : "Well With Waves workshop"}
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    sizes="(min-width: 1024px) 420px, 100vw"
                                    loading="lazy"
                                />
                            </picture>

                            {/* voile premium */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                            {/* ring inset */}
                            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5" />
                        </div>

                        {/* Adresse */}
                        <div className="p-5">
                            <AddressMapLink
                                label={company.addressLabel.toUpperCase()}
                                address={company.address}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* RECOGNITION */}
            <AwardsTimeline
                kicker={recognition.kicker}
                title={recognition.title}
                intro={recognition.intro}
                items={recognition.items}
            />

            {/* TEAM + CTA */}
            <section
                data-reveal
                className={[
                    "rounded-3xl bg-white/70 p-6 ring-1 ring-brandLine shadow-soft backdrop-blur md:p-10",
                    "reveal reveal-left",
                ].join(" ")}
            >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
                            {team.kicker}
                        </div>

                        <h2 className="mt-3 font-serif text-2xl font-semibold tracking-tight text-brandNavy md:text-3xl">
                            {team.title}
                        </h2>

                        <div className="mt-2 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

                        <div className="mt-4 w-[220px]">
                            <SignatureLine align="left" />
                        </div>

                        <p className="mt-4 text-sm leading-relaxed text-brandMuted md:text-base">
                            {team.intro}
                        </p>
                    </div>

                    <div className="rounded-3xl bg-brandChampagne/15 p-6 ring-1 ring-brandChampagne/25">
                        <div className="text-sm font-extrabold text-brandNavy">
                            {team.ctaTitle}
                        </div>
                        <div className="mt-2 text-sm text-brandMuted">{team.ctaDesc}</div>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={team.quoteHref}
                                className="inline-flex items-center justify-center rounded-2xl bg-brandNavy px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandNavy/90"
                            >
                                {locale === "fr" ? "Demander un devis" : "Request a quote"}
                            </Link>

                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
                            >
                                {locale === "fr" ? "Nous contacter" : "Contact us"}
                            </Link>
                        </div>
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {/* placeholders */}
                        {TEAM.map((m) => (
                            <div key={m.role} className="card-premium overflow-hidden">
                                <div className="relative aspect-[4/3]">
                                    <picture className="absolute inset-0 h-full w-full">
                                        <source
                                            srcSet={withBasePath(`/team/webp/${toWebp(m.imageSrc.split("/").pop() || "")}`)}
                                            type="image/webp"
                                        />
                                        <img
                                            src={withBasePath(m.imageSrc)}
                                            alt={m.name}
                                            className="h-full w-full object-cover"
                                            sizes="(min-width: 768px) 33vw, 100vw"
                                            loading="lazy"
                                        />
                                    </picture>
                                </div>
                                <div className="p-6">
                                    <div className="font-serif text-lg font-semibold text-brandNavy">
                                        {m.name}
                                    </div>
                                    <div className="mt-1 text-sm font-semibold text-brandMuted">
                                        {m.role}
                                    </div>
                                    <div className="mt-4 text-sm text-brandMuted">
                                        Courte description (1 ligne) orientée expertise & accompagnement.
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

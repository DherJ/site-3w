"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import AddressMapLink from "@/components/ui/AddressMapLink";
import Link from "next/link";

export default function ContactClient({
  locale,
  legalCommon,
}: {
  locale: string;
  legalCommon: { companyName: string; address: string; email: string; phone: string };
}) {
  const t = useTranslations("contact");
  const g = useTranslations("global");

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "error">(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSent(null);

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("bad");
      setSent("ok");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setSent("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* FORM */}
      <form
        onSubmit={onSubmit}
        className="rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={t("form.name", { default: "Nom" })} name="name" required />
          <Field label={t("form.company", { default: "Établissement" })} name="company" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label={t("form.email", { default: "Email" })} name="email" type="email" required />
          <Field label={t("form.phone", { default: "Téléphone" })} name="phone" />
        </div>

        <div className="mt-4">
          <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
            {t("form.message", { default: "Message" }).toUpperCase()}
          </label>
          <textarea
            name="message"
            required
            rows={6}
            className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
            placeholder={t("form.placeholder", { default: "Dites-nous ce dont vous avez besoin…" })}
          />
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-2xl bg-brandNavy px-6 py-3 text-sm font-extrabold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brandNavy/90 disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? t("form.sending", { default: "Envoi…" }) : t("form.send", { default: "Envoyer" })}
          </button>

          <a
            href={`/${locale}/quote`}
            className="inline-flex items-center justify-center rounded-2xl bg-white/70 px-6 py-3 text-sm font-extrabold text-brandNavy ring-1 ring-brandLine transition-all duration-300 hover:-translate-y-0.5 hover:ring-brandChampagne/40 hover:bg-white"
          >
            {g("requestQuote")}
          </a>
        </div>

        <p className="mt-4 text-xs text-brandMuted">
          {g("privatePolicy.notice", {
            default:
              "Les informations transmises via ce formulaire sont utilisées uniquement pour répondre à votre demande. Merci de ne pas transmettre de données médicales. Pour en savoir plus :"
          })}{" "}
          <Link href={`/${locale}/legal/privacy-policy`} className="underline font-semibold">
            {g("privatePolicy.link", { default: "Politique de confidentialité" })}
          </Link>
          .
        </p>

        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        {sent === "ok" && (
          <div className="mt-4 rounded-2xl bg-brandChampagne/15 p-4 ring-1 ring-brandChampagne/25 text-sm font-semibold text-brandNavy">
            {t("form.success", { default: "Message envoyé ✅ On revient vers vous rapidement." })}
          </div>
        )}
        {sent === "error" && (
          <div className="mt-4 rounded-2xl bg-white/70 p-4 ring-1 ring-brandLine text-sm font-semibold text-red-600">
            {t("form.error", { default: "Erreur d’envoi. Réessayez ou contactez-nous par email." })}
          </div>
        )}
      </form>

      {/* INFOS */}
      <aside className="rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine">
        <div className="text-[11px] font-extrabold tracking-[0.28em] text-brandNavy/60">
          {t("info.kicker", { default: "COORDONNÉES" })}
        </div>

        <div className="mt-3 h-[2px] w-10 rounded-full bg-brandChampagne/70" />

        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-brandChampagne shrink-0" />
            <AddressMapLink
              address={legalCommon.address}
              variant="inline"
              tone="light"
              className="text-brandNavy"
            />
          </div>

          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-brandChampagne" />
            <a
              href={`mailto:${legalCommon.email}`}
              className="text-sm font-semibold text-brandNavy hover:text-brandChampagne transition-colors"
            >
              {legalCommon.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-brandChampagne" />
            <a
              href={`tel:${legalCommon.phone.replace(/\s/g, "")}`}
              className="text-sm font-semibold text-brandNavy hover:text-brandChampagne transition-colors"
            >
              {legalCommon.phone}
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-extrabold tracking-[0.14em] text-brandNavy/70">
        {label.toUpperCase()}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl bg-white/70 px-4 py-3 text-sm font-semibold text-brandNavy ring-1 ring-brandLine outline-none focus:ring-brandChampagne/45"
      />
    </div>
  );
}

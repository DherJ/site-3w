import AddressMapLink from "@/components/ui/AddressMapLink";
import { Mail, Phone, MapPin } from "lucide-react";

export default function LegalContactCard({
  address,
  email,
  phone,
  tone = "light",
}: {
  address: string;
  email: string;
  phone: string;
  tone?: "light" | "dark";
}) {
  const text = tone === "dark" ? "text-white/80" : "text-brandNavy";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-brandChampagne";

  return (
    <div className="rounded-3xl bg-white/60 p-6 ring-1 ring-brandLine">
      <div className="space-y-4 text-sm">
        <div className="flex items-start gap-3">
          <MapPin className="mt-0.5 h-4 w-4 text-brandChampagne shrink-0" />
          <AddressMapLink address={address} variant="inline" tone={tone} className={`${text} ${hover}`} />
        </div>

        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-brandChampagne" />
          <a href={`mailto:${email}`} className={`${text} ${hover} transition-colors font-semibold`}>
            {email}
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-brandChampagne" />
          <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${text} ${hover} transition-colors font-semibold`}>
            {phone}
          </a>
        </div>
      </div>
    </div>
  );
}

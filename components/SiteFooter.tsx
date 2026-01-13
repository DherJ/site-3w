import SiteFooterClient from "./SiteFooterClient";
import { getLegalCommon } from "@/app/[locale]/legal/_shared/legalCommon";

export default async function SiteFooter({ locale }: { locale: string }) {
  const common = await getLegalCommon(locale);
  return <SiteFooterClient locale={locale} common={common} />;
}

import { useTranslations } from "next-intl";
import { QuoteWizard } from "@/components/quote-wizard";
import { Section } from "@/components/section";

export default function QuotePage() {
  const t = useTranslations("quote");
  return (
    <Section title={t("title")}>
      <QuoteWizard />
    </Section>
  );
}

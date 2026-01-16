import { getRequestConfig } from "next-intl/server";

const SECTIONS = [
  "home",
  "proof",
  "services",
  "serviceDetail",
  "manufactureAndQuality",
  "mainProducts",
  "products",
  "partners",
  "ctaFinal",
  "team",
  "about",
  "quote",
  "footer",
  "legal",
  "contact"
];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale) {
    locale = "fr";
  }
  const resolvedLocale = locale || "fr";
  const common = (
    await import(`../messages/common/common-${resolvedLocale}.json`)
  ).default;
  const messages: Record<string, unknown> = { ...common };

  await Promise.all(
    SECTIONS.map(async (section) => {
      const mod = await import(
        `../messages/${section}/${section}-${resolvedLocale}.json`
      );
      messages[section] = mod.default;
    })
  );

  return {
    messages,
    locale: resolvedLocale,
  };
});

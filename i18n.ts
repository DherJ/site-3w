import { getRequestConfig } from "next-intl/server";
import { requestLocale } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = await requestLocale();
  const resolvedLocale = locale ?? "fr";

  return {
    locale: resolvedLocale,
    messages: (await import(`./messages/${resolvedLocale}.json`)).default
  };
});

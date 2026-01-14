// routing.ts
import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
  localeCookie: {
    // le point clé : isoler site-3w
    path: "/site-3w"
  }
});

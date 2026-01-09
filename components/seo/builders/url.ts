// components/seo/builders/url.ts

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getSiteUrlForLocale(locale: string) {
  return absoluteUrl(`/${locale}`);
}

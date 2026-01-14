import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/site-3w",
  assetPrefix: "/site-3w",
  images: {
    path: "/site-3w/_next/image",
  },
};

export default withNextIntl(nextConfig);

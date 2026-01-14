import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  //basePath: "/site-3w",
  assetPrefix: "/site-3w",
};

export default withNextIntl(nextConfig);

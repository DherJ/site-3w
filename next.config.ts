import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  basePath: "/3w",
  assetPrefix: "/3w",
  trailingSlash: false,
};

export default withNextIntl(nextConfig);

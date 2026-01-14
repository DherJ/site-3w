import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  //basePath: "/site-3w",
  assetPrefix: "/site-3w",
};

export default withNextIntl(nextConfig);

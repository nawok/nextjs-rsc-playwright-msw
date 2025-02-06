import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // https://github.com/vercel/next.js/blob/canary/packages/next/src/experimental/testmode/playwright/README.md
    testProxy: true,
  },
};

export default nextConfig;

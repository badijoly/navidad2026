import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  distDir: ".next-export",
  devIndicators: false,
  allowedDevOrigins: ["*.e2b.app"],
  experimental: { optimizePackageImports: ["@phosphor-icons/react"], browserDebugInfoInTerminal: true },
};

export default nextConfig;

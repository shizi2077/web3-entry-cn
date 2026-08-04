import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // vinext 0.0.50 cannot prerender generateStaticParams with framework basePath.
  // Internal links use the same build-time value in app code; assetPrefix keeps
  // the exported bundle relocatable without post-build replacement.
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
};

export default nextConfig;

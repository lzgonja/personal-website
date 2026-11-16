import type { NextConfig } from "next";

const isCslabBuild = process.env.CSLAB_BUILD === "true";
const cslabBasePath = "/~lana";

const nextConfig: NextConfig = {
  ...(isCslabBuild
    ? {
        basePath: cslabBasePath,
        images: { unoptimized: true },
        output: "export" as const,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: isCslabBuild ? cslabBasePath : "",
    NEXT_PUBLIC_CSLAB_BUILD: String(isCslabBuild),
  },
};

export default nextConfig;

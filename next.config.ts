import type { NextConfig } from "next";
import path from "path";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "beauty_salon";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGitHubActions
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;

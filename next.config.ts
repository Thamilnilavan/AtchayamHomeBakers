import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This site is fully static (no server routes) — export so it can be
  // previewed as plain files and deployed anywhere.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
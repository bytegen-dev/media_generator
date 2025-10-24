import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pollinations.ai",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.openai.com",
      },
      {
        protocol: "https",
        hostname: "api.x.ai",
      },
      {
        protocol: "https",
        hostname: "modelslab.com",
      },
      {
        protocol: "https",
        hostname: "stablehorde.net",
      },
      {
        protocol: "https",
        hostname: "huggingface.co",
      },
      {
        protocol: "https",
        hostname: "api.apiframe.ai",
      },
    ],
  },
};

export default nextConfig;

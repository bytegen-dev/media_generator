import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "pollinations.ai",
      "images.unsplash.com",
      "cdn.openai.com",
      "api.x.ai",
      "modelslab.com",
      "stablehorde.net",
      "huggingface.co",
      "api.apiframe.ai",
    ],
  },
};

export default nextConfig;

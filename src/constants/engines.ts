export interface Engine {
  id: string;
  name: string;
  requiresKey: boolean;
  free: boolean;
  mediaTypes: readonly ("images" | "videos" | "audio")[];
  apiKeyField?: string;
  placeholder?: string;
  link?: string;
  description?: string;
}

export const AVAILABLE_ENGINES: readonly Engine[] = [
  {
    id: "pollinations",
    name: "Pollinations.AI",
    requiresKey: false,
    free: true,
    mediaTypes: ["images"] as const,
    description: "Free AI image generation",
  },
  {
    id: "xai",
    name: "xAI Grok",
    requiresKey: true,
    free: false,
    mediaTypes: ["images"] as const,
    apiKeyField: "xaiKey",
    placeholder: "xai-...",
    link: "https://console.x.ai",
    description: "xAI's advanced image generation",
  },
  {
    id: "openai",
    name: "OpenAI DALL-E",
    requiresKey: true,
    free: false,
    mediaTypes: ["images"] as const,
    apiKeyField: "openaiKey",
    placeholder: "sk-...",
    link: "https://platform.openai.com/api-keys",
    description: "OpenAI's DALL-E image generation",
  },
  {
    id: "midjourney",
    name: "Midjourney (Apiframe)",
    requiresKey: true,
    free: false,
    mediaTypes: ["images"] as const,
    apiKeyField: "midjourneyKey",
    placeholder: "mj_...",
    link: "https://apiframe.ai",
    description: "Midjourney via Apiframe API",
  },
  {
    id: "cloudflare",
    name: "Cloudflare Workers AI",
    requiresKey: true,
    free: true,
    mediaTypes: ["images", "videos", "audio"] as const,
    apiKeyField: "cloudflareToken",
    placeholder: "Your Cloudflare API token",
    link: "https://dash.cloudflare.com/profile/api-tokens",
    description: "Cloudflare's AI with free tier",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    requiresKey: true,
    free: false,
    mediaTypes: ["images", "videos", "audio"] as const,
    apiKeyField: "huggingfaceKey",
    placeholder: "hf_...",
    link: "https://huggingface.co/settings/tokens",
    description: "Hugging Face model hub",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    requiresKey: true,
    free: false,
    mediaTypes: ["images"] as const,
    apiKeyField: "geminiKey",
    placeholder: "AI...",
    link: "https://makersuite.google.com/app/apikey",
    description: "Google's Gemini AI",
  },
  {
    id: "modelslab",
    name: "Modelslab",
    requiresKey: true,
    free: false,
    mediaTypes: ["images"] as const,
    apiKeyField: "modelslabKey",
    placeholder: "Your Modelslab API key",
    link: "https://modelslab.com",
    description: "Modelslab AI services",
  },
] as const;

// Helper functions
export const getEngineById = (id: string): Engine | undefined => {
  return AVAILABLE_ENGINES.find((engine) => engine.id === id);
};

export const getEnginesByMediaType = (
  mediaType: "images" | "videos" | "audio"
): readonly Engine[] => {
  return AVAILABLE_ENGINES.filter((engine) =>
    engine.mediaTypes.includes(mediaType)
  );
};

export const getFreeEngines = (): readonly Engine[] => {
  return AVAILABLE_ENGINES.filter((engine) => engine.free);
};

export const getEnginesRequiringKeys = (): readonly Engine[] => {
  return AVAILABLE_ENGINES.filter((engine) => engine.requiresKey);
};

export const getEnginesByCapability = (
  hasKey: boolean,
  mediaType?: "images" | "videos" | "audio"
) => {
  return AVAILABLE_ENGINES.filter((engine) => {
    const hasRequiredKey = !engine.requiresKey || hasKey;
    const supportsMediaType =
      !mediaType || engine.mediaTypes.includes(mediaType);
    return hasRequiredKey && supportsMediaType;
  });
};

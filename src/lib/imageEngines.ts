import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";

interface ImageResult {
  imageUrl?: string;
  error?: string;
}

// Initialize AI clients
const getGeminiClient = (apiKey: string) => {
  return new GoogleGenerativeAI(apiKey);
};

const getOpenAIClient = (apiKey: string) => {
  return new OpenAI({ apiKey });
};

export async function generateImage(
  engine: string,
  prompt: string,
  size: string,
  numImages: number,
  keys: Record<string, string>
): Promise<ImageResult> {
  try {
    switch (engine) {
      case "pollinations":
        return await generateWithPollinations(prompt, size);

      case "cloudflare":
        return await generateWithCloudflare(
          prompt,
          size,
          keys.cloudflare,
          keys.cloudflareAccountId
        );

      case "huggingface":
        return await generateWithHuggingFace(prompt, size, keys.huggingface);

      case "aihorde":
        return await generateWithAIHorde(prompt, size);

      case "gemini":
        return await generateWithGemini(prompt, keys.gemini);

      case "modelslab":
        return await generateWithModelslab(prompt, keys.modelslab);

      case "xai":
        return await generateWithXAI(prompt, keys.xai);

      case "openai":
        return await generateWithOpenAI(prompt, keys.openai);

      case "midjourney":
        return await generateWithMidjourney(prompt, keys.midjourney);

      default:
        throw new Error(`Unknown engine: ${engine}`);
    }
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Pollinations.AI - Free
async function generateWithPollinations(
  prompt: string,
  size: string
): Promise<ImageResult> {
  const [width, height] = size.split("x").map(Number);
  const url = `https://pollinations.ai/prompt/${encodeURIComponent(
    prompt
  )}?width=${width}&height=${height}`;

  return { imageUrl: url };
}

// Cloudflare Workers AI
async function generateWithCloudflare(
  prompt: string,
  size: string,
  token: string,
  accountId: string
): Promise<ImageResult> {
  if (!token || !accountId) {
    throw new Error("Cloudflare token and account ID required");
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        num_steps: 20,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Cloudflare API request failed");
  }

  const data = await response.json();
  return { imageUrl: data.result?.image || data.result };
}

// Hugging Face Stable Diffusion
async function generateWithHuggingFace(
  prompt: string,
  size: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("Hugging Face API key required");
  }

  const response = await fetch(
    "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          num_inference_steps: 20,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Hugging Face API request failed");
  }

  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  return { imageUrl };
}

// AI Horde - Free
async function generateWithAIHorde(
  prompt: string,
  size: string
): Promise<ImageResult> {
  const [width, height] = size.split("x").map(Number);

  // Submit generation request
  const submitResponse = await fetch(
    "https://stablehorde.net/api/v2/generate/async",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        params: {
          width,
          height,
          steps: 20,
          cfg_scale: 7.5,
        },
        apikey: "0000000000", // Anonymous key
      }),
    }
  );

  if (!submitResponse.ok) {
    throw new Error("AI Horde submission failed");
  }

  const { id } = await submitResponse.json();

  // Poll for completion
  let attempts = 0;
  const maxAttempts = 30; // 1 minute timeout

  while (attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

    const statusResponse = await fetch(
      `https://stablehorde.net/api/v2/generate/status/${id}`
    );
    const status = await statusResponse.json();

    if (status.done) {
      if (status.generations && status.generations.length > 0) {
        return { imageUrl: status.generations[0].img };
      } else {
        throw new Error("No images generated");
      }
    }

    attempts++;
  }

  throw new Error("AI Horde generation timeout");
}

// Google Gemini
async function generateWithGemini(
  prompt: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("Gemini API key required");
  }

  const genAI = getGeminiClient(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const result = await model.generateContent(prompt);
  const response = await result.response;

  // Note: Gemini doesn't generate images directly, this would need to be adapted
  // For now, return an error as this needs special handling
  throw new Error("Gemini image generation not implemented yet");
}

// Modelslab
async function generateWithModelslab(
  prompt: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("Modelslab API key required");
  }

  const response = await fetch("https://modelslab.com/api/v6/images/text2img", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      num_inference_steps: 20,
    }),
  });

  if (!response.ok) {
    throw new Error("Modelslab API request failed");
  }

  const data = await response.json();
  return { imageUrl: data.images?.[0] || data.image };
}

// xAI Grok
async function generateWithXAI(
  prompt: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("xAI API key required");
  }

  const response = await fetch("https://api.x.ai/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "grok-2-image-1212",
      prompt,
      n: 1,
    }),
  });

  if (!response.ok) {
    throw new Error("xAI API request failed");
  }

  const data = await response.json();
  return { imageUrl: data.data?.[0]?.url };
}

// OpenAI DALL-E
async function generateWithOpenAI(
  prompt: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("OpenAI API key required");
  }

  const openai = getOpenAIClient(apiKey);

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    n: 1,
    size: "1024x1024",
  });

  return { imageUrl: response.data?.[0]?.url };
}

// Midjourney via Apiframe
async function generateWithMidjourney(
  prompt: string,
  apiKey: string
): Promise<ImageResult> {
  if (!apiKey) {
    throw new Error("Midjourney API key required");
  }

  const response = await fetch(
    "https://api.apiframe.ai/v1/midjourney/generate",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Midjourney API request failed");
  }

  const data = await response.json();

  // Midjourney is async, so we need to poll for completion
  if (data.task_id) {
    // Poll for completion
    let attempts = 0;
    const maxAttempts = 60; // 2 minute timeout

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds

      const statusResponse = await fetch(
        `https://api.apiframe.ai/v1/midjourney/status/${data.task_id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const status = await statusResponse.json();

      if (status.status === "completed" && status.result) {
        return { imageUrl: status.result };
      } else if (status.status === "failed") {
        throw new Error("Midjourney generation failed");
      }

      attempts++;
    }

    throw new Error("Midjourney generation timeout");
  }

  throw new Error("No task ID received from Midjourney");
}

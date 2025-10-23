export interface EngineResult {
  engine: string;
  imageUrl?: string;
  error?: string;
}

export interface GenerationForm {
  prompt: string;
  engines: string[];
  size: string;
  numImages: number;
  keys: Record<string, string>;
}

export interface SessionData {
  results: EngineResult[];
  loadingStates: Record<string, boolean>;
  completed: boolean;
}

export const IMAGE_SIZES = [
  { value: "512x512", label: "512x512 (Square)" },
  { value: "1024x1024", label: "1024x1024 (Square)" },
  { value: "1024x768", label: "1024x768 (Landscape)" },
  { value: "768x1024", label: "768x1024 (Portrait)" },
] as const;

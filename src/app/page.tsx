"use client";

import { useState } from "react";
import { ImageGeneratorForm } from "@/components/ImageGeneratorForm";
import { ResultsGrid } from "@/components/ResultsGrid";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { type GenerationForm } from "@/types";

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { results, loadingStates, generateImages } = useImageGeneration();

  const handleGenerate = async (formData: GenerationForm) => {
    try {
      const id = await generateImages(formData);
      setSessionId(id);
    } catch (error) {
      console.error("Generation failed:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Media_Generator</h1>
        <p className="text-muted-foreground text-lg">
          Generate media (images, videos, audio) using multiple AI engines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGeneratorForm onSubmit={handleGenerate} />
        </div>

        <div>
          <ResultsGrid
            results={results}
            loadingStates={loadingStates}
            sessionId={sessionId}
          />
        </div>
      </div>
    </div>
  );
}

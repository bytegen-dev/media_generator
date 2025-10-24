"use client";

import { useState } from "react";
import { ImageGeneratorForm } from "@/components/ImageGeneratorForm";
import { ResultsGrid } from "@/components/ResultsGrid";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { type GenerationForm } from "@/types";
import DecryptedText from "@/components/DecryptedText";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Home() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { results, loadingStates, generateImages, clearResults } =
    useImageGeneration();

  const handleGenerate = async (formData: GenerationForm) => {
    try {
      setIsGenerating(true);
      const id = await generateImages(formData);
      setSessionId(id);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearResults = () => {
    clearResults();
    setSessionId(null);
  };

  const handleStopGeneration = () => {
    setIsGenerating(false);
    setSessionId(null);
    clearResults();
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <DecryptedText
            text="Media_Generator"
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="both"
          />
        </h1>

        <p className="text-muted-foreground text-lg">
          Generate media (images, videos, audio) using multiple AI engines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <ImageGeneratorForm
            onSubmit={handleGenerate}
            onStop={handleStopGeneration}
            loading={isGenerating}
          />
        </div>

        <div className="space-y-2 p-4 bg-card dark:bg-card/30 rounded-xl border backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Generated Results</p>
            {(results.length > 0 || Object.keys(loadingStates).length > 0) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearResults}
                className="flex items-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Clear Results</span>
              </Button>
            )}
          </div>
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

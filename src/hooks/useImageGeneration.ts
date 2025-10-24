"use client";

import { useState, useCallback } from "react";
import { type EngineResult, type GenerationForm } from "@/types";

export function useImageGeneration() {
  const [results, setResults] = useState<EngineResult[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const generateImages = useCallback(
    async (formData: GenerationForm): Promise<string> => {
      try {
        // Reset state
        setResults([]);
        setLoadingStates(
          formData.engines.reduce(
            (acc, engine) => ({ ...acc, [engine]: true }),
            {}
          )
        );

        // Start generation
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to start image generation");
        }

        const { sessionId } = await response.json();

        // Start polling for results
        pollForResults(sessionId);

        return sessionId;
      } catch (error) {
        console.error("Generation error:", error);
        throw error;
      }
    },
    []
  );

  const pollForResults = useCallback(async (sessionId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/generate?sessionId=${sessionId}`);
        const data = await response.json();

        setResults(data.results || []);
        setLoadingStates(data.loadingStates || {});

        if (data.completed) {
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error("Polling error:", error);
        clearInterval(pollInterval);
      }
    }, 2000);

    // Cleanup after 5 minutes
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 300000);
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setLoadingStates({});
  }, []);

  return {
    results,
    loadingStates,
    generateImages,
    clearResults,
  };
}

"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Loader2,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { AVAILABLE_ENGINES, type EngineResult } from "@/types";
import Image from "next/image";

interface ResultsGridProps {
  results: EngineResult[];
  loadingStates: Record<string, boolean>;
  sessionId: string | null;
}

export function ResultsGrid({
  results,
  loadingStates,
  sessionId,
}: ResultsGridProps) {
  const [polling, setPolling] = useState(false);

  // Poll for updates when session is active
  useEffect(() => {
    if (!sessionId || polling) return;

    setPolling(true);
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/generate?sessionId=${sessionId}`);
        const data = await response.json();

        if (data.completed) {
          clearInterval(pollInterval);
          setPolling(false);
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 2000);

    return () => {
      clearInterval(pollInterval);
      setPolling(false);
    };
  }, [sessionId]);

  const downloadImage = async (url: string, engine: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${engine}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const getEngineName = (engineId: string) => {
    return AVAILABLE_ENGINES.find((e) => e.id === engineId)?.name || engineId;
  };

  const getStatusIcon = (result: EngineResult) => {
    if (result.error) {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }
    if (result.imageUrl) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return <AlertCircle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusBadge = (result: EngineResult) => {
    if (result.error) {
      return <Badge variant="destructive">Error</Badge>;
    }
    if (result.imageUrl) {
      return <Badge variant="default">Complete</Badge>;
    }
    return <Badge variant="secondary">Processing</Badge>;
  };

  // Show loading states for engines that haven't completed yet
  const allEngines = [
    ...new Set([
      ...results.map((r) => r.engine),
      ...Object.keys(loadingStates),
    ]),
  ];
  const enginesToShow = allEngines.filter(
    (engine) =>
      loadingStates[engine] || results.some((r) => r.engine === engine)
  );

  if (enginesToShow.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <div className="text-center text-muted-foreground">
            <p className="text-lg">No images generated yet</p>
            <p className="text-sm">
              Enter a prompt and select engines to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Results</h3>
        {polling && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Updating...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enginesToShow.map((engine) => {
          const result = results.find((r) => r.engine === engine);
          const isLoading = loadingStates[engine] && !result;
          const engineName = getEngineName(engine);

          return (
            <Card key={engine} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">
                    {engineName}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    {result && getStatusIcon(result)}
                    {result && getStatusBadge(result)}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {isLoading && (
                  <div className="flex items-center justify-center h-48 bg-muted/50 rounded-md">
                    <div className="text-center">
                      <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Generating...
                      </p>
                    </div>
                  </div>
                )}

                {result?.error && (
                  <div className="flex items-center justify-center h-48 bg-destructive/10 rounded-md">
                    <div className="text-center">
                      <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                      <p className="text-sm text-destructive font-medium">
                        Generation Failed
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {result.error}
                      </p>
                    </div>
                  </div>
                )}

                {result?.imageUrl && (
                  <div className="space-y-3">
                    <div className="relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={result.imageUrl}
                        alt={`Generated by ${engineName}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <Button
                      onClick={() => downloadImage(result.imageUrl!, engine)}
                      size="sm"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Key, Zap } from "lucide-react";
import { AVAILABLE_ENGINES } from "@/constants/engines";
import { IMAGE_SIZES, type GenerationForm } from "@/types";

const MEDIA_TYPES = [
  { id: "images", name: "Images", isDisabled: false },
  { id: "videos", name: "Videos", isDisabled: true },
  { id: "audio", name: "Audio", isDisabled: true },
] as const;

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  engines: z.array(z.string()).min(1, "Select at least one engine"),
  size: z.string(),
  numImages: z.number().min(1).max(4),
  mediaType: z.string(),
});

export function ImageGeneratorForm({
  onSubmit,
}: {
  onSubmit: (data: GenerationForm) => void;
}) {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      engines: ["pollinations", "aihorde"], // Default to free engines
      size: "512x512",
      numImages: 1,
      mediaType: "images",
    },
  });

  // Load API keys from localStorage
  useEffect(() => {
    const storedKeys = localStorage.getItem("apiKeys");
    if (storedKeys) {
      setKeys(JSON.parse(storedKeys));
    }
  }, []);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      keys,
    });
  };

  const navigateToSettings = (engineId: string) => {
    router.push(`/settings?focus=${engineId}`);
  };

  const selectedEngines = form.watch("engines");
  const enginesWithoutKeys = selectedEngines.filter((engine) => {
    const engineConfig = AVAILABLE_ENGINES.find((e) => e.id === engine);
    return engineConfig?.requiresKey && !keys[engineConfig.id];
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Media</CardTitle>
        <CardDescription>
          Enter your prompt and select AI engines to generate media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Media Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="mediaType">Media Type</Label>
            <Select
              value={form.watch("mediaType")}
              onValueChange={(value) => form.setValue("mediaType", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MEDIA_TYPES.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id}
                    disabled={type.isDisabled}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{type.name}</span>
                      {type.isDisabled && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="A beautiful sunset over mountains..."
              {...form.register("prompt")}
              className="min-h-[100px]"
            />
            {form.formState.errors.prompt && (
              <p className="text-sm text-destructive">
                {form.formState.errors.prompt.message}
              </p>
            )}
          </div>

          {/* Engine Selection */}
          <div className="space-y-3">
            <Label>AI Engines</Label>
            <div className="grid grid-cols-1 gap-3">
              {AVAILABLE_ENGINES.map((engine) => {
                const hasKey = keys[engine.id];
                const isSelected = selectedEngines.includes(engine.id);
                const canSelect = !engine.requiresKey || hasKey;

                return (
                  <div key={engine.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={engine.id}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          form.setValue("engines", [
                            ...selectedEngines,
                            engine.id,
                          ]);
                        } else {
                          form.setValue(
                            "engines",
                            selectedEngines.filter((e) => e !== engine.id)
                          );
                        }
                      }}
                      disabled={!canSelect}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor={engine.id}
                        className="flex items-center space-x-2"
                      >
                        <span>{engine.name}</span>
                        {engine.free && (
                          <Badge variant="secondary" className="text-xs">
                            Free
                          </Badge>
                        )}
                        {engine.requiresKey && !hasKey && (
                          <div className="group relative">
                            <Badge
                              variant="destructive"
                              className="text-xs cursor-pointer hover:bg-destructive/80 transition-colors"
                              onClick={() => navigateToSettings(engine.id)}
                            >
                              <Key className="h-3 w-3 mr-1" />
                              Key Required
                            </Badge>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                              Click to add API key
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                            </div>
                          </div>
                        )}
                        {engine.requiresKey && hasKey && (
                          <Badge variant="default" className="text-xs">
                            <Zap className="h-3 w-3 mr-1" />
                            Ready
                          </Badge>
                        )}
                      </Label>
                    </div>
                  </div>
                );
              })}
            </div>
            {form.formState.errors.engines && (
              <p className="text-sm text-destructive">
                {form.formState.errors.engines.message}
              </p>
            )}
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">Image Size</Label>
              <Select
                value={form.watch("size")}
                onValueChange={(value) => form.setValue("size", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {IMAGE_SIZES.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numImages">Number of Images</Label>
              <Select
                value={form.watch("numImages").toString()}
                onValueChange={(value) =>
                  form.setValue("numImages", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} image{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Warnings */}
          {enginesWithoutKeys.length > 0 && (
            <div className="flex items-start space-x-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <p className="font-medium">API Keys Required</p>
                <p>
                  {enginesWithoutKeys
                    .map(
                      (engine) =>
                        AVAILABLE_ENGINES.find((e) => e.id === engine)?.name
                    )
                    .join(", ")}{" "}
                  require API keys.
                  <a href="/settings" className="underline ml-1">
                    Add keys in settings
                  </a>
                </p>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg">
            Generate{" "}
            {form.watch("mediaType") === "images"
              ? "Images"
              : form.watch("mediaType") === "videos"
              ? "Videos"
              : "Audio"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

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
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Key, X, Square } from "lucide-react";
import { AVAILABLE_ENGINES } from "@/constants/engines";
import { IMAGE_SIZES, type GenerationForm } from "@/types";
import { PromptSuggestions } from "@/components/PromptSuggestions";
import Link from "next/link";

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
  onStop,
  loading = false,
}: {
  onSubmit: (data: GenerationForm) => void;
  onStop?: () => void;
  loading?: boolean;
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

  // Load API keys and selected engines from localStorage
  useEffect(() => {
    const loadKeys = () => {
      const storedKeys = localStorage.getItem("apiKeys");
      if (storedKeys) {
        const parsedKeys = JSON.parse(storedKeys);
        setKeys(parsedKeys);
      }
    };

    const loadEngines = () => {
      const storedEngines = localStorage.getItem("selectedEngines");
      if (storedEngines) {
        const parsedEngines = JSON.parse(storedEngines);
        form.setValue("engines", parsedEngines);
      }
    };

    // Load keys and engines on mount
    loadKeys();
    loadEngines();

    // Listen for storage changes (when keys are updated in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "apiKeys") {
        loadKeys();
      }
      if (e.key === "selectedEngines") {
        loadEngines();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (when keys are updated in the same tab)
    const handleCustomStorageChange = () => {
      loadKeys();
    };

    window.addEventListener("apiKeysUpdated", handleCustomStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("apiKeysUpdated", handleCustomStorageChange);
    };
  }, [form]);

  // Save selected engines to localStorage whenever they change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "engines" && value.engines) {
        localStorage.setItem("selectedEngines", JSON.stringify(value.engines));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      keys,
    });
  };

  const navigateToSettings = (engineId?: string) => {
    if (engineId) {
      router.push(`/settings?focus=${engineId}`);
    } else {
      router.push("/settings");
    }
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

          <Separator className="my-6" />

          {/* Prompt Suggestions */}
          <PromptSuggestions
            onPromptSelect={(prompt) => form.setValue("prompt", prompt)}
            className="mt-4"
          />

          <Separator className="my-6" />

          {/* Engine Selection */}
          <div className="space-y-3">
            <Label>AI Engines</Label>
            <div className="space-y-2">
              <Select
                value=""
                onValueChange={(engineId) => {
                  if (engineId) {
                    if (selectedEngines.includes(engineId)) {
                      // Remove engine if already selected
                      form.setValue(
                        "engines",
                        selectedEngines.filter((e) => e !== engineId)
                      );
                    } else {
                      // Add engine if not selected
                      form.setValue("engines", [...selectedEngines, engineId]);
                    }
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Add an AI engine..." />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ENGINES.map((engine) => {
                    const hasKey = keys[engine.id];
                    const canSelect = !engine.requiresKey || hasKey;
                    const isAlreadySelected = selectedEngines.includes(
                      engine.id
                    );

                    return (
                      <SelectItem
                        key={engine.id}
                        value={engine.id}
                        disabled={!canSelect}
                      >
                        <div className="flex items-center space-x-2">
                          <span>{engine.name}</span>
                          {engine.free && (
                            <Badge variant="secondary" className="text-xs">
                              Free
                            </Badge>
                          )}
                          {engine.requiresKey && !hasKey && (
                            <Badge variant="destructive" className="text-xs">
                              <Key className="h-3 w-3 mr-1" />
                              Key Required
                            </Badge>
                          )}
                          {isAlreadySelected && (
                            <Badge variant="outline" className="text-xs">
                              Selected
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* Selected Engines */}
              {selectedEngines.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Selected Engines:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedEngines.map((engineId) => {
                      const engine = AVAILABLE_ENGINES.find(
                        (e) => e.id === engineId
                      );
                      if (!engine) return null;

                      return (
                        <div
                          key={engineId}
                          className="flex items-center space-x-2 bg-accent rounded-md px-3 py-2"
                        >
                          <span className="text-sm">{engine.name}</span>
                          <Button
                            variant="outline"
                            size={"icon-sm"}
                            className="h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => {
                              form.setValue(
                                "engines",
                                selectedEngines.filter((e) => e !== engineId)
                              );
                            }}
                          >
                            <X className="h-2.5 w-2.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Required Warning */}
              {selectedEngines.some((engineId) => {
                const engine = AVAILABLE_ENGINES.find((e) => e.id === engineId);
                return engine?.requiresKey && !keys[engine.id];
              }) && (
                <div className="flex items-start space-x-2 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div className="text-sm text-orange-800 dark:text-orange-200">
                    <p className="font-medium">API Keys Required</p>
                    <p>
                      Some selected engines require API keys. Go to{" "}
                      <button
                        type="button"
                        onClick={() => navigateToSettings()}
                        className="underline hover:no-underline"
                      >
                        Settings
                      </button>{" "}
                      to configure them.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {form.formState.errors.engines && (
              <p className="text-sm text-destructive">
                {form.formState.errors.engines.message}
              </p>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              to use engines that require api keys. add api keys in{" "}
              <Link href={"/settings"} className="text-primary">
                /settings
              </Link>
            </p>
          </div>

          <Separator className="my-6" />

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

            <div className="flex flex-col gap-2 space-y-2">
              <Label htmlFor="numImages">Number of Images</Label>
              <Slider
                id="numImages"
                min={1}
                max={4}
                step={1}
                value={[form.watch("numImages")]}
                onValueChange={(value) => form.setValue("numImages", value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
              </div>
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

          <div className="w-full flex gap-2">
            {loading ? (
              <>
                <Button
                  type="submit"
                  className="flex-1"
                  size="lg"
                  disabled={true}
                >
                  Generating{" "}
                  {form.watch("mediaType") === "images"
                    ? "Images"
                    : form.watch("mediaType") === "videos"
                    ? "Videos"
                    : "Audio"}
                  ...
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="destructive"
                      size="lg"
                      className="px-4"
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Stop Generation?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will abruptly stop the current generation process.
                        Any images that are already being generated may still
                        complete, but no new images will be generated. This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Continue Generation</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={onStop}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Stop Generation
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            ) : (
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                Generate{" "}
                {form.watch("mediaType") === "images"
                  ? "Images"
                  : form.watch("mediaType") === "videos"
                  ? "Videos"
                  : "Audio"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Key, AlertTriangle, Search, Trash2 } from "lucide-react";
import { AVAILABLE_ENGINES } from "@/constants/engines";

const settingsSchema = z.object({
  xaiKey: z.string().optional(),
  openaiKey: z.string().optional(),
  midjourneyKey: z.string().optional(),
  cloudflareToken: z.string().optional(),
  cloudflareAccountId: z.string().optional(),
  huggingfaceKey: z.string().optional(),
  geminiKey: z.string().optional(),
  modelslabKey: z.string().optional(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

export function SettingsForm({ focusKey }: { focusKey?: string | null }) {
  const [saved, setSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<
    "all" | "images" | "videos" | "audio"
  >("all");

  const form = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      xaiKey: "",
      openaiKey: "",
      midjourneyKey: "",
      cloudflareToken: "",
      cloudflareAccountId: "",
      huggingfaceKey: "",
      geminiKey: "",
      modelslabKey: "",
    },
  });

  // Load existing keys from localStorage
  useEffect(() => {
    const storedKeys = localStorage.getItem("apiKeys");
    if (storedKeys) {
      const keys = JSON.parse(storedKeys);

      const formData = {
        xaiKey: keys.xai || "",
        openaiKey: keys.openai || "",
        midjourneyKey: keys.midjourney || "",
        cloudflareToken: keys.cloudflare || "",
        cloudflareAccountId: keys.cloudflareAccountId || "",
        huggingfaceKey: keys.huggingface || "",
        geminiKey: keys.gemini || "",
        modelslabKey: keys.modelslab || "",
      };

      form.reset(formData);
    }
  }, [form]);

  // Focus on specific API key field if focusKey is provided
  useEffect(() => {
    if (focusKey) {
      const fieldId = `${focusKey}Key`;
      const element = document.getElementById(fieldId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }, 100);
      }
    }
  }, [focusKey]);

  const onSubmit = (data: SettingsForm) => {
    // Store keys in localStorage with the correct field names
    const apiKeys = {
      xai: data.xaiKey,
      openai: data.openaiKey,
      midjourney: data.midjourneyKey,
      cloudflare: data.cloudflareToken,
      cloudflareAccountId: data.cloudflareAccountId,
      huggingface: data.huggingfaceKey,
      gemini: data.geminiKey,
      modelslab: data.modelslabKey,
    };

    console.log("Saving keys to localStorage:", apiKeys);
    localStorage.setItem("apiKeys", JSON.stringify(apiKeys));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent("apiKeysUpdated"));

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetAll = () => {
    // Reset all form fields to empty
    form.reset({
      xaiKey: "",
      openaiKey: "",
      midjourneyKey: "",
      cloudflareToken: "",
      cloudflareAccountId: "",
      huggingfaceKey: "",
      geminiKey: "",
      modelslabKey: "",
    });

    // Clear localStorage
    localStorage.removeItem("apiKeys");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  // Filter engines based on search and media type
  const filteredEngines = AVAILABLE_ENGINES.filter((engine) => {
    const matchesSearch = engine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filterType === "all") return matchesSearch;
    return matchesSearch && engine.mediaTypes.includes(filterType);
  });

  const getKeyStatus = (key: string | undefined) => {
    if (!key)
      return {
        status: "missing",
        text: "Not set",
        variant: "destructive" as const,
      };
    if (key.length < 10)
      return {
        status: "invalid",
        text: "Too short",
        variant: "destructive" as const,
      };
    return { status: "valid", text: "Set", variant: "default" as const };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>API Keys</span>
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Button type="submit" form="settings-form" size="sm">
                {saved ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Saved!
                  </>
                ) : (
                  "Save Keys"
                )}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" type="button">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Reset All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset All API Keys</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your saved API keys. This
                      action cannot be undone. Are you sure you want to
                      continue?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetAll}>
                      Yes, Reset All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search & Filter Engines */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search engines (e.g., OpenAI, Google, Cloudflare)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="filter" className="text-sm font-medium">
                  Filter:
                </Label>
                <Select
                  value={filterType}
                  onValueChange={(
                    value: "all" | "images" | "videos" | "audio"
                  ) => setFilterType(value)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Media</SelectItem>
                    <SelectItem value="images">Images</SelectItem>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {(searchQuery || filterType !== "all") && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredEngines.length} of{" "}
                {filterType === "all"
                  ? AVAILABLE_ENGINES.length
                  : AVAILABLE_ENGINES.filter((engine) =>
                      engine.mediaTypes.includes(filterType)
                    ).length}{" "}
                engines
                {filterType !== "all" && ` for ${filterType}`}
              </p>
            )}
          </div>

          <Separator className="my-6" />

          <form
            id="settings-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            {filteredEngines.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2" />
                <p>No engines found matching your criteria</p>
                <p className="text-sm">Try adjusting your search or filter</p>
              </div>
            ) : (
              filteredEngines
                .filter((engine) => engine.requiresKey) // Only show engines that require API keys
                .map((engine) => (
                  <div key={engine.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={engine.apiKeyField}>
                        {engine.name} API Key
                      </Label>
                      <Badge
                        variant={
                          getKeyStatus(
                            form.watch(engine.apiKeyField as keyof SettingsForm)
                          ).variant
                        }
                      >
                        {
                          getKeyStatus(
                            form.watch(engine.apiKeyField as keyof SettingsForm)
                          ).text
                        }
                      </Badge>
                    </div>
                    <Input
                      id={engine.apiKeyField}
                      type="password"
                      placeholder={engine.placeholder}
                      {...form.register(
                        engine.apiKeyField as keyof SettingsForm
                      )}
                    />
                    <p className="text-xs text-muted-foreground">
                      {engine.description && `${engine.description}. `}
                      Get your key from{" "}
                      <a
                        href={engine.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        {engine.name}
                      </a>
                    </p>
                  </div>
                ))
            )}

            {/* Free Engines Info */}
            <div className="flex items-start space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium">Free Engines Available</p>
                <p>
                  Pollinations.AI works without API keys. You can start
                  generating media immediately!
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

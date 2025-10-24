"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shuffle, Lightbulb } from "lucide-react";
import { EXAMPLE_PROMPTS, getAllCategories } from "@/constants/prompts";

interface PromptSuggestionsProps {
  onPromptSelect: (prompt: string) => void;
  className?: string;
}

export function PromptSuggestions({
  onPromptSelect,
  className,
}: PromptSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleRandomize = () => {
    let availablePrompts = EXAMPLE_PROMPTS;

    if (selectedCategory !== "all") {
      availablePrompts = EXAMPLE_PROMPTS.filter(
        (p) => p.category === selectedCategory
      );
    }

    if (availablePrompts.length > 0) {
      const randomPrompt =
        availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
      onPromptSelect(randomPrompt.text);
    }
  };

  const handlePromptSelect = (promptId: string) => {
    const prompt = EXAMPLE_PROMPTS.find((p) => p.id === promptId);
    if (prompt) {
      onPromptSelect(prompt.text);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const getFilteredPrompts = () => {
    if (selectedCategory === "all") {
      return EXAMPLE_PROMPTS;
    }
    return EXAMPLE_PROMPTS.filter((p) => p.category === selectedCategory);
  };

  const categories = getAllCategories();

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-4 w-4" />
          <span className="text-sm font-medium text-muted-foreground">
            Need inspiration?
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          type="button"
          onClick={handleRandomize}
          className="flex items-center space-x-1"
        >
          <Shuffle className="h-3 w-3" />
          <span>Random Prompt</span>
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Category:</span>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select onValueChange={handlePromptSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a prompt suggestion..." />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            {getFilteredPrompts().map((prompt) => (
              <SelectItem key={prompt.id} value={prompt.id}>
                <div className="flex items-center space-x-2">
                  <span className="text-sm max-w-[70vw] line-clamp-1 truncate">
                    {prompt.text}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Select a prompt from the dropdown or click &quot;Random Prompt&quot;
          for a random selection
        </p>
      </div>
    </div>
  );
}

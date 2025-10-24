"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  Image,
  Video,
  Music,
  Info,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import DecryptedText from "@/components/DecryptedText";

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <HelpCircle className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">
            <DecryptedText
              text="Help_Center"
              speed={100}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              animateOn="both"
            />
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about using the Text to Media Generator
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Quick Start Guide</span>
          </CardTitle>
          <CardDescription>
            Get up and running in just a few steps
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  1
                </span>
                <span>Choose Media Type</span>
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Select between Images, Videos, or Audio from the dropdown
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  2
                </span>
                <span>Enter Your Prompt</span>
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Describe what you want to generate in detail
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  3
                </span>
                <span>Select AI Engines</span>
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Choose which AI engines to use for generation
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center space-x-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  4
                </span>
                <span>Generate & Download</span>
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Click generate and download your results
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Engines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>AI Engines</span>
          </CardTitle>
          <CardDescription>
            Learn about the different AI engines and their capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {/* Free Engines */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <span>Free Engines (No API Key Required)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Pollinations.AI</span>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    High-quality image generation
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">AI Horde</span>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Community-driven AI generation
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Engines */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center space-x-2">
                <span>Premium Engines (API Key Required)</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">OpenAI DALL-E</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Advanced image generation
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Google Gemini</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Google&apos;s AI image generation
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">xAI Grok</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    xAI&apos;s advanced image generation
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Midjourney</span>
                    <Badge variant="outline">Premium</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Professional image generation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Media Types</span>
          </CardTitle>
          <CardDescription>Supported media generation types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Image
                className="h-8 w-8 mx-auto mb-2 text-blue-500"
                alt="Images icon"
              />
              <h3 className="font-semibold">Images</h3>
              <p className="text-sm text-muted-foreground">
                Generate high-quality images from text prompts
              </p>
              <Badge variant="secondary" className="mt-2">
                Available
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg opacity-50">
              <Video className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <h3 className="font-semibold">Videos</h3>
              <p className="text-sm text-muted-foreground">
                Generate videos from text prompts
              </p>
              <Badge variant="outline" className="mt-2">
                Coming Soon
              </Badge>
            </div>
            <div className="text-center p-4 border rounded-lg opacity-50">
              <Music className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="font-semibold">Audio</h3>
              <p className="text-sm text-muted-foreground">
                Generate audio from text prompts
              </p>
              <Badge variant="outline" className="mt-2">
                Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>API Keys Setup</span>
          </CardTitle>
          <CardDescription>
            How to configure API keys for premium engines
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold">Go to Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Navigate to the Settings page from the navigation menu
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold">Get Your API Keys</h3>
                <p className="text-sm text-muted-foreground">
                  Visit the respective service websites to obtain your API keys
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold">Enter and Save</h3>
                <p className="text-sm text-muted-foreground">
                  Paste your API keys in the corresponding fields and save
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-medium">Security Note</p>
                <p>
                  Your API keys are stored locally in your browser and never
                  sent to our servers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>Troubleshooting</span>
          </CardTitle>
          <CardDescription>Common issues and solutions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Generation Failed</h3>
              <p className="text-sm text-muted-foreground mb-2">
                If image generation fails, try:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Check your internet connection</li>
                <li>• Verify your API keys are correct</li>
                <li>• Try a different AI engine</li>
                <li>• Simplify your prompt</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Slow Generation</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Generation can take time due to:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• High server load on AI services</li>
                <li>• Complex prompts requiring more processing</li>
                <li>• Multiple engines running simultaneously</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">API Key Issues</h3>
              <p className="text-sm text-muted-foreground mb-2">
                If engines show &quot;Key Required&quot;:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Go to Settings and add your API key</li>
                <li>• Ensure the key is valid and has sufficient credits</li>
                <li>• Check the service&apos;s documentation for key format</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/">
          <Button className="w-full sm:w-auto">
            Start Generating
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

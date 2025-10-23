"use client";

import { SettingsForm } from "@/components/SettingsForm";
import { useSearchParams } from "next/navigation";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const focusKey = searchParams.get("focus");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">API Settings</h1>
        <p className="text-muted-foreground">
          Configure your API keys for premium media generation engines
        </p>
      </div>

      <SettingsForm focusKey={focusKey} />
    </div>
  );
}

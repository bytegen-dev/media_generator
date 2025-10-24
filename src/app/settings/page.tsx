"use client";

import { Suspense } from "react";
import { SettingsForm } from "@/components/SettingsForm";
import { useSearchParams } from "next/navigation";
import DecryptedText from "@/components/DecryptedText";

function SettingsContent() {
  const searchParams = useSearchParams();
  const focusKey = searchParams.get("focus");

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">
          <DecryptedText
            text="API_Settings"
            speed={100}
            maxIterations={20}
            characters="ABCD1234!?"
            className="revealed"
            parentClassName="all-letters"
            encryptedClassName="encrypted"
            animateOn="both"
          />
        </h1>
        <p className="text-muted-foreground">
          Configure your API keys for premium media generation engines
        </p>
      </div>

      <SettingsForm focusKey={focusKey} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense
      fallback={<div className="max-w-4xl mx-auto p-8">Loading...</div>}
    >
      <SettingsContent />
    </Suspense>
  );
}

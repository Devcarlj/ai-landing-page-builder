"use client";

import React, { useState } from "react";
import { TopHeader } from "@/features/canvas/components/top-header";
import { PromptPanel } from "@/features/canvas/components/prompt-panel";
import { EditorCanvas } from "@/features/canvas/components/editor-canvas";
import { PropertyInspector } from "@/features/canvas/components/property-inspector";

export default function AppEditorPage() {
  const [apiKey, setApiKey] = useState("");

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TopHeader apiKey={apiKey} onApiKeyChange={setApiKey} />

      <div className="flex-1 flex overflow-hidden relative">
        <PromptPanel apiKey={apiKey} />

        <main className="flex-1 overflow-y-auto bg-muted/20 relative">
          <EditorCanvas />
        </main>

        <PropertyInspector />
      </div>
    </div>
  );
}

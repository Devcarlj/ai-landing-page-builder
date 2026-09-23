'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '../store/canvas.store';
import { ExportModal } from './export-modal';
import { Undo, Redo, Download, Key, Sparkles } from 'lucide-react';

interface TopHeaderProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ apiKey, onApiKeyChange }) => {
  const undo = useCanvasStore((s) => s.undo);
  const redo = useCanvasStore((s) => s.redo);
  const history = useCanvasStore((s) => s.history);
  const future = useCanvasStore((s) => s.future);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border bg-background px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>AI Builder</span>
        </div>

        {/* Undo / Redo Actions */}
        <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="p-1.5 hover:bg-background rounded text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={redo}
            disabled={future.length === 0}
            className="p-1.5 hover:bg-background rounded text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Settings & Export Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-md hover:bg-accent transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{apiKey ? 'API Key Set' : 'Set Gemini Key'}</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90 transition-opacity"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Code</span>
          </button>
        </div>
      </header>

      {/* Export Modal */}
      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />

      {/* BYOK API Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 className="font-semibold text-lg">Gemini API Key Configuration</h3>
            <p className="text-xs text-muted-foreground">
              Enter your Google Gemini API key below. Your key stays local to your session and is used directly for prompt calls.
            </p>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-border rounded bg-muted/40 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="px-4 py-1.5 bg-primary text-primary-foreground text-xs rounded font-medium hover:opacity-90"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
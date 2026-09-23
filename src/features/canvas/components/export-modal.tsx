'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '../store/canvas.store';
import { compileLayoutToReact } from '@/core/compiler/react.compiler';
import { Copy, Check, Download, Code } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const layout = useCanvasStore((s) => s.layout);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generatedCode = compileLayoutToReact(layout);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Page.tsx';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-background border border-border rounded-lg shadow-xl w-full max-w-3xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Code className="w-5 h-5 text-primary" />
            <span>Export React + Tailwind Code</span>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            ✕
          </button>
        </div>

        <div className="p-4 flex-1 overflow-auto bg-muted/30">
          <pre className="text-xs font-mono p-4 bg-slate-950 text-slate-50 rounded-md overflow-x-auto leading-relaxed">
            {generatedCode}
          </pre>
        </div>

        <div className="p-4 border-t border-border flex justify-end gap-3 bg-background">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent text-sm font-medium transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 text-sm font-medium transition-opacity"
          >
            <Download className="w-4 h-4" />
            Download Page.tsx
          </button>
        </div>
      </div>
    </div>
  );
};
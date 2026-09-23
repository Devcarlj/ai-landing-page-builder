'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '../store/canvas.store';
import { BlockType, CanvasBlock } from '@/shared/types';
import { Sparkles, Plus, MessageSquare, Layers, Loader2 } from 'lucide-react';

interface PromptPanelProps {
  apiKey: string;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({ apiKey }) => {
  const addBlock = useCanvasStore((s) => s.addBlock);
  const setLayout = useCanvasStore((s) => s.setLayout);

  const [activeTab, setActiveTab] = useState<'ai' | 'components'>('ai');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null); 

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, apiKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate layout.');
      }

      if (data.layout) {
        setLayout(data.layout);
        setPrompt('');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddManualBlock = (type: BlockType) => {
    const newId = `${type}-${crypto.randomUUID().slice(0, 8)}`;;
    let newBlock: CanvasBlock;

    switch (type) {
      case 'hero':
        newBlock = {
          id: newId,
          type: 'hero',
          props: {
            title: 'Your Headline Here',
            subtitle: 'A compelling subheadline explaining your product value.',
            ctaText: 'Get Started',
          },
        };
        break;
      case 'features':
        newBlock = {
          id: newId,
          type: 'features',
          props: {
            heading: 'Key Features',
            subheading: 'Everything you need to succeed.',
            items: [
              { title: 'Feature One', description: 'Description of feature one.' },
              { title: 'Feature Two', description: 'Description of feature two.' },
            ],
          },
        };
        break;
      case 'cta':
        newBlock = {
          id: newId,
          type: 'cta',
          props: {
            title: 'Take Action Now',
            description: 'Join thousands of satisfied users today.',
            buttonText: 'Start Free Trial',
          },
        };
        break;
      case 'footer':
        newBlock = {
          id: newId,
          type: 'footer',
          props: {
            brandName: 'My Brand',
            copyrightText: '© 2026 All rights reserved.',
            links: [{ label: 'Privacy', href: '#' }, { label: 'Terms', href: '#' }],
          },
        };
        break;
      default:
        return;
    }

    addBlock(newBlock);
  };

  return (
    <aside className="w-80 border-r border-border bg-background flex flex-col h-full shrink-0">
      {/* Panel Navigation Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'ai'
              ? 'border-primary text-primary bg-accent/30'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Assistant</span>
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'components'
              ? 'border-primary text-primary bg-accent/30'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Add Blocks</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {activeTab === 'ai' ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span>Prompt Generator</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Describe the web page you want to generate.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-3">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Build a sleek dark-mode landing page for an AI email automation tool..."
                rows={5}
                className="w-full p-3 text-xs border border-border rounded-md bg-muted/30 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />

              {error && (
                <div className="p-2 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full py-2 bg-primary text-primary-foreground text-xs font-medium rounded-md hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Generating Layout...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Page</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Component Library</h3>
            <p className="text-xs text-muted-foreground">
              Click any block to insert it directly into your layout canvas.
            </p>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {(['hero', 'features', 'cta', 'footer'] as BlockType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => handleAddManualBlock(type)}
                  className="p-3 text-left border border-border rounded-md hover:border-primary hover:bg-accent/40 transition-all flex items-center justify-between group"
                >
                  <span className="text-xs font-medium capitalize">{type} Section</span>
                  <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCanvasStore } from '../store/canvas.store';
import { BlockType, CanvasBlock, ChatMessage, ModifiedFile } from '@/shared/types';
import { Sparkles, Plus, Layers, Send, Bot, User, Loader2, FileCode2, ExternalLink } from 'lucide-react';

interface PromptPanelProps {
  apiKey: string;
}

// Sequence of realistic agent execution steps
const AGENT_STEPS = [
  'Analyzing design prompt and context...',
  'Planning page section hierarchy...',
  'Synthesizing marketing copywriting...',
  'Generating React + Tailwind component schema...',
  'Validating Zod JSON payload structure...',
  'Updating interactive canvas layout...',
];

export const PromptPanel: React.FC<PromptPanelProps> = ({ apiKey }) => {
  const addBlock = useCanvasStore((s) => s.addBlock);
  const setLayout = useCanvasStore((s) => s.setLayout);
  const focusBlock = useCanvasStore((s) => s.focusBlock);
  const layout = useCanvasStore((s) => s.layout);

  const [activeTab, setActiveTab] = useState<'agent' | 'components'>('agent');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'agent',
      text: "Hello! I am your AI web design agent. What kind of landing page would you like to build today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, currentStepIndex]);

// Dynamic step ticker interval during generation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => (prev < AGENT_STEPS.length - 1 ? prev + 1 : prev));
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  // Normalize file target resolution from string path or object
  const handleFileClick = (file: ModifiedFile) => {
    const filePath = typeof file === 'string' ? file : file.filePath;
    const blockId = typeof file === 'object' ? file.blockId : undefined;
    const targetSection = typeof file === 'object' ? file.targetSection : undefined;

    if (blockId) {
      focusBlock(blockId);
      return;
    }

    // Infer section block type from file path if targetSection is omitted
    const inferredType: BlockType | undefined = targetSection || (
      filePath.includes('hero') ? 'hero' :
      filePath.includes('feature') ? 'features' :
      filePath.includes('testimonial') ? 'testimonials' :
      filePath.includes('pricing') ? 'pricing' :
      filePath.includes('cta') ? 'cta' :
      filePath.includes('footer') ? 'footer' : undefined
    );

    if (inferredType) {
      const targetBlock = layout.find((b) => b.type === inferredType);
      if (targetBlock) {
        focusBlock(targetBlock.id);
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userPrompt = prompt.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userPrompt,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setCurrentStepIndex(0);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt, apiKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to communicate with AI agent.');
      }

      if (data.layout) {
        setLayout(data.layout);
      }

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: data.message || 'I have generated your page layout.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        layoutApplied: Boolean(data.layout),
        modifiedFiles: data.modifiedFiles || [],
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: unknown) {
      const errText = err instanceof Error ? err.message : 'An error occurred during response generation.';
      setError(errText);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddManualBlock = (type: BlockType) => {
    const newId = `${type}-${crypto.randomUUID().slice(0, 8)}`;
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
      {/* Navigation Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('agent')}
          className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'agent'
              ? 'border-primary text-primary bg-accent/30'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Chat Agent</span>
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

      {/* Tab Body */}
      {activeTab === 'agent' ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Stream History */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 text-xs ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'agent' && (
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-2.5 rounded-lg text-xs space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted/60 border border-border text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                  {/* Interactive Workspace Badges */}
                  {msg.modifiedFiles && msg.modifiedFiles.length > 0 && (
                    <div className="pt-1 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">
                        Touched Workspace Files ({msg.modifiedFiles.length})
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {msg.modifiedFiles.map((file: ModifiedFile, idx) => {
                          const displayPath = typeof file === 'string' ? file : file.filePath;
                          return (
                            <button
                              key={idx}
                              onClick={() => handleFileClick(file)}
                              title={displayPath}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-mono bg-background border border-border hover:border-primary hover:text-primary rounded text-foreground/90 transition-all cursor-pointer shadow-sm group"
                            >
                              <FileCode2 className="w-3 h-3 text-primary" />
                              <span>{displayPath.split('/').pop()}</span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[9px] opacity-60">
                    {msg.layoutApplied ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        ✓ Canvas Updated
                      </span>
                    ) : <span />}
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-foreground shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Dynamic Step-by-Step Thinking Indicator */}
            {isLoading && (
              <div className="flex gap-2 items-center text-xs text-muted-foreground pt-1">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-lg border border-border font-mono text-[11px] text-foreground/90 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-primary shrink-0" />
                  <span>{AGENT_STEPS[currentStepIndex]}</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-2 text-xs bg-destructive/10 border border-destructive/20 text-destructive rounded">
                {error}
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Prompt Form Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-background space-y-2">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Ask the AI agent to build or modify a landing page..."
                rows={3}
                className="w-full p-2.5 text-xs border border-border rounded-md bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary resize-none pr-8"
              />
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="absolute right-2 bottom-3 p-1.5 bg-primary text-primary-foreground rounded hover:opacity-90 disabled:opacity-40 transition-opacity"
                title="Send Prompt"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-4 space-y-3 flex-1 overflow-y-auto">
          <h3 className="text-sm font-semibold">Component Library</h3>
          <p className="text-xs text-muted-foreground">
            Click any block to insert it directly into your canvas layout.
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
    </aside>
  );
};
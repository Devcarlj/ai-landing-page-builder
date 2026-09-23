'use client';

import React from 'react';
import { useCanvasStore } from '../store/canvas.store';
import { CanvasBlock } from '@/shared/types';
import { Settings, Trash2 } from 'lucide-react';

export const PropertyInspector: React.FC = () => {
  const layout = useCanvasStore((s) => s.layout);
  const selectedBlockId = useCanvasStore((s) => s.selectedBlockId);
  const updateBlockProps = useCanvasStore((s) => s.updateBlockProps);
  const removeBlock = useCanvasStore((s) => s.removeBlock);

  const selectedBlock = layout.find((b): b is CanvasBlock => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <aside className="w-80 border-l border-border bg-background p-4 flex flex-col items-center justify-center text-center h-full shrink-0">
        <Settings className="w-8 h-8 text-muted-foreground/40 mb-2" />
        <h4 className="text-sm font-semibold text-muted-foreground">No Block Selected</h4>
        <p className="text-xs text-muted-foreground/80 mt-1 max-w-50">
          Click on any section on the canvas to inspect and edit its properties.
        </p>
      </aside>
    );
  }

  const { id, type } = selectedBlock;

  return (
    <aside className="w-80 border-l border-border bg-background flex flex-col h-full shrink-0">
      {/* Inspector Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <span className="text-xs uppercase font-bold text-primary tracking-wider">{type} Block</span>
          <h3 className="text-sm font-semibold">Property Inspector</h3>
        </div>
        <button
          onClick={() => removeBlock(id)}
          className="p-1.5 hover:bg-destructive/10 text-destructive rounded transition-colors"
          title="Delete Section"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Dynamic Strongly-Typed Property Inputs */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {selectedBlock.type === 'hero' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Headline Title</label>
              <input
                type="text"
                value={selectedBlock.props.title}
                onChange={(e) => updateBlockProps(id, { title: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Subtitle</label>
              <textarea
                rows={3}
                value={selectedBlock.props.subtitle}
                onChange={(e) => updateBlockProps(id, { subtitle: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Button Text</label>
              <input
                type="text"
                value={selectedBlock.props.ctaText}
                onChange={(e) => updateBlockProps(id, { ctaText: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'features' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Section Heading</label>
              <input
                type="text"
                value={selectedBlock.props.heading}
                onChange={(e) => updateBlockProps(id, { heading: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Subheading</label>
              <input
                type="text"
                value={selectedBlock.props.subheading}
                onChange={(e) => updateBlockProps(id, { subheading: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'cta' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">CTA Title</label>
              <input
                type="text"
                value={selectedBlock.props.title}
                onChange={(e) => updateBlockProps(id, { title: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Description</label>
              <textarea
                rows={3}
                value={selectedBlock.props.description}
                onChange={(e) => updateBlockProps(id, { description: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Button Text</label>
              <input
                type="text"
                value={selectedBlock.props.buttonText}
                onChange={(e) => updateBlockProps(id, { buttonText: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'footer' && (
          <>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Brand Name</label>
              <input
                type="text"
                value={selectedBlock.props.brandName}
                onChange={(e) => updateBlockProps(id, { brandName: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Copyright Text</label>
              <input
                type="text"
                value={selectedBlock.props.copyrightText}
                onChange={(e) => updateBlockProps(id, { copyrightText: e.target.value })}
                className="w-full p-2 text-xs border border-border rounded bg-muted/20 focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
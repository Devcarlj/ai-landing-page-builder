import React from 'react';
import { CanvasLayout } from '@/shared/types';
import { BlockRenderer } from './block-renderer';

interface EditorCanvasProps {
  layout: CanvasLayout;
}

export const EditorCanvas: React.FC<EditorCanvasProps> = ({ layout }) => {
  return (
    <div className="min-h-screen bg-background w-full">
      {layout.map((block) => (
        <div key={block.id} className="relative group">
          <BlockRenderer block={block} />
        </div>
      ))}
    </div>
  );
};
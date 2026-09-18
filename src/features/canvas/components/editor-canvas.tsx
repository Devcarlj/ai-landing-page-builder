'use client';

import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useCanvasStore } from '../store/canvas.store';
import { useDndCanvas } from '../hooks/use-dnd';
import { SortableBlock } from './sortable-block';

export const EditorCanvas: React.FC = () => {
  const layout = useCanvasStore((s) => s.layout);
  const { handleDragEnd } = useDndCanvas();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  if (layout.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] border-2 border-dashed border-border rounded-lg m-6 text-center p-8">
        <h3 className="text-lg font-semibold mb-2">Your canvas is empty</h3>
        <p className="text-muted-foreground text-sm max-w-sm">
          Generate a layout using the prompt bar or add components to get started.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={layout.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="min-h-screen bg-background w-full">
          {layout.map((block) => (
            <SortableBlock key={block.id} block={block} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
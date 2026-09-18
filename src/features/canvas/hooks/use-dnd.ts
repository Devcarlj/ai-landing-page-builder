import { DragEndEvent } from '@dnd-kit/core';
import { useCanvasStore } from '../store/canvas.store';

export function useDndCanvas() {
  const reorderBlocks = useCanvasStore((s) => s.reorderBlocks);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderBlocks(String(active.id), String(over.id));
    }
  };

  return { handleDragEnd };
}
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CanvasBlock } from '@/shared/types';
import { BlockRenderer } from './block-renderer';
import { useCanvasStore } from '../store/canvas.store';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableBlockProps {
  block: CanvasBlock;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({ block }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const selectedBlockId = useCanvasStore((s) => s.selectedBlockId);
  const selectBlock = useCanvasStore((s) => s.selectBlock);
  const removeBlock = useCanvasStore((s) => s.removeBlock);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const isSelected = selectedBlockId === block.id;

  return (
    <div
      id={`canvas-block-${block.id}`}
      ref={setNodeRef}
      style={style}
      onClick={() => selectBlock(block.id)}
      className={`relative group border-2 transition-all ${
        isSelected ? 'border-primary shadow-lg ring-2 ring-primary/20' : 'border-transparent hover:border-muted-foreground/30'
      }`}
    >
      {/* Block Drag Handle & Remove Actions Overlay */}
      <div className="absolute top-2 right-2 z-10 hidden group-hover:flex items-center gap-1 bg-background/90 border border-border rounded p-1 shadow-sm">
        <button
          {...attributes}
          {...listeners}
          className="p-1 cursor-grab hover:bg-muted rounded"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(block.id);
          }}
          className="p-1 hover:bg-destructive/10 text-destructive rounded"
          title="Delete Block"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <BlockRenderer block={block} />
    </div>
  );
};
import { create } from 'zustand';
import { CanvasBlock, CanvasLayout } from '@/shared/types';

interface CanvasState {
  layout: CanvasLayout;
  history: CanvasLayout[];
  future: CanvasLayout[];
  selectedBlockId: string | null;

  // Actions
  setLayout: (newLayout: CanvasLayout) => void;
  updateBlockProps: (id: string, newProps: Partial<CanvasBlock['props']>) => void;
  reorderBlocks: (activeId: string, overId: string) => void;
  addBlock: (block: CanvasBlock, index?: number) => void;
  removeBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  focusBlock: (id: string) => void;
  
  // History Actions
  undo: () => void;
  redo: () => void;
}

export const useCanvasStore = create<CanvasState>((set, get) => ({
  layout: [],
  history: [],
  future: [],
  selectedBlockId: null,

  setLayout: (newLayout) => {
    const { layout, history } = get();
    set({
      history: [...history, layout],
      layout: newLayout,
      future: [],
    });
  },

  updateBlockProps: (id, newProps) => {
    const { layout, history } = get();
    const updatedLayout = layout.map((block) => {
      if (block.id !== id) return block;
      return {
        ...block,
        props: {
          ...block.props,
          ...newProps,
        },
      } as CanvasBlock;
    });

    set({
      history: [...history, layout],
      layout: updatedLayout,
      future: [],
    });
  },

  reorderBlocks: (activeId, overId) => {
    const { layout, history } = get();
    const oldIndex = layout.findIndex((b) => b.id === activeId);
    const newIndex = layout.findIndex((b) => b.id === overId);

    if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) return;

    const newLayout = [...layout];
    const [movedItem] = newLayout.splice(oldIndex, 1);
    newLayout.splice(newIndex, 0, movedItem);

    set({
      history: [...history, layout],
      layout: newLayout,
      future: [],
    });
  },

  addBlock: (block, index) => {
    const { layout, history } = get();
    const newLayout = [...layout];
    
    if (typeof index === 'number') {
      newLayout.splice(index, 0, block);
    } else {
      newLayout.push(block);
    }

    set({
      history: [...history, layout],
      layout: newLayout,
      future: [],
    });
  },

  removeBlock: (id) => {
    const { layout, history } = get();
    set({
      history: [...history, layout],
      layout: layout.filter((b) => b.id !== id),
      selectedBlockId: get().selectedBlockId === id ? null : get().selectedBlockId,
      future: [],
    });
  },

  selectBlock: (id) => set({ selectedBlockId: id }),

  undo: () => {
    const { history, layout, future } = get();
    if (history.length === 0) return;

    const previous = history[history.length - 1];
    const newHistory = history.slice(0, history.length - 1);

    set({
      layout: previous,
      history: newHistory,
      future: [layout, ...future],
    });
  },

  redo: () => {
    const { future, layout, history } = get();
    if (future.length === 0) return;

    const next = future[0];
    const newFuture = future.slice(1);

    set({
      layout: next,
      history: [...history, layout],
      future: newFuture,
    });
  },
  
  focusBlock: (id) => {
    set({ selectedBlockId: id });
    const element = document.getElementById(`canvas-block-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}));
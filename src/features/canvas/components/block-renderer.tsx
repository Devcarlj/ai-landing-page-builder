import React from 'react';
import { CanvasBlock } from '@/shared/types';
import { componentRegistry } from '@/components/registry';
import { BlockType, BlockPropsMap } from '@/shared/types';

interface BlockRendererProps {
  block: CanvasBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  const Component = componentRegistry[block.type];

  if (!Component) {
    return (
      <div className="p-4 border border-dashed border-red-500 text-red-500 rounded text-center">
        Unknown block type: {block.type}
      </div>
    );
  }

  const SpecificComponent = Component as React.FC<BlockPropsMap[BlockType]>;

  return <SpecificComponent {...block.props} />;
};
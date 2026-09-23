import { CanvasBlock, CanvasLayout } from '@/shared/types';
import {
  compileCTA,
  compileFeatures,
  compileFooter,
  compileHero,
  compilePricing,
  compileTestimonials,
} from './block.compilers';

/**
 * Pure compiler function converting CanvasLayout JSON into a single-file
 * React component using Tailwind CSS styling.
 */
export function compileLayoutToReact(layout: CanvasLayout): string {
  const compiledBlocks = layout
    .map((block: CanvasBlock) => {
      switch (block.type) {
        case 'hero':
          return compileHero(block.props);
        case 'features':
          return compileFeatures(block.props);
        case 'testimonials':
          return compileTestimonials(block.props);
        case 'pricing':
          return compilePricing(block.props);
        case 'cta':
          return compileCTA(block.props);
        case 'footer':
          return compileFooter(block.props);
        default:
          return `      {/* Unknown block type */}`;
      }
    })
    .join('\n\n');

  return `'use client';

import React from 'react';

export default function ExportedLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
${compiledBlocks}
    </div>
  );
}
`;
}
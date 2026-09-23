'use client';

import React, { useEffect } from 'react';
import { EditorCanvas } from '@/features/canvas/components/editor-canvas';
import { useCanvasStore } from '@/features/canvas/store/canvas.store';
import { compileLayoutToReact } from '@/core/compiler/react.compiler';
import { CanvasLayout } from '@/shared/types';

const mockLayout: CanvasLayout = [
  {
    id: 'hero-1',
    type: 'hero',
    props: {
      title: 'Build Landing Pages in Seconds with AI',
      subtitle: 'Generate clean React and Tailwind code visual blocks instantly.',
      ctaText: 'Get Started Free',
    },
  },
  {
    id: 'features-1',
    type: 'features',
    props: {
      heading: 'Powerful Features',
      subheading: 'Everything you need to launch high-converting pages quickly.',
      items: [
        { title: 'AI Generation', description: 'Describe your vision in natural language.' },
        { title: 'Clean Export', description: 'Export raw Tailwind + React code directly.' },
      ],
    },
  },
  {
    id: 'cta-1',
    type: 'cta',
    props: {
      title: 'Ready to Launch?',
      description: 'Start creating responsive landing pages today.',
      buttonText: 'Try AI Builder',
    },
  },
];

export default function AppEditorPage() {
  const setLayout = useCanvasStore((s) => s.setLayout);
  const layout = useCanvasStore((s) => s.layout);

  useEffect(() => {
    setLayout(mockLayout);
  }, [setLayout]);

  const handleTestExport = () => {
    const code = compileLayoutToReact(layout);
    console.log('--- COMPILED REACT + TAILWIND OUTPUT ---');
    console.log(code);
    alert('Compiled successfully! Check browser console for output.');
  };

  return (
    <main className="w-full min-h-screen pb-20">
      <div className="p-4 bg-muted border-b border-border flex justify-between items-center">
        <h1 className="font-bold text-sm">Testing Canvas Editor</h1>
        <button
          onClick={handleTestExport}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded font-medium"
        >
          Test Code Compiler
        </button>
      </div>

      <EditorCanvas />
    </main>
  );
}
import { EditorCanvas } from '@/features/canvas/components/editor-canvas';
import { CanvasLayout } from '@/shared/types';

const mockLayout: CanvasLayout = [
  {
    id: '1',
    type: 'hero',
    props: {
      title: 'Build Landing Pages in Seconds with AI',
      subtitle: 'Generate clean React and Tailwind code visual blocks instantly with natural language.',
      ctaText: 'Get Started Free',
    },
  },
  {
    id: '2',
    type: 'features',
    props: {
      heading: 'Powerful Features',
      subheading: 'Everything you need to launch high-converting pages quickly.',
      items: [
        { title: 'AI Generation', description: 'Describe your vision and watch the JSON layout generate in real time.' },
        { title: 'Clean Export', description: 'Export fully formatted Tailwind + React code directly into your repository.' },
        { title: 'Figma-like Editor', description: 'Reorder, tweak text inline, and adjust visual themes on the fly.' },
      ],
    },
  },
  {
    id: '3',
    type: 'cta',
    props: {
      title: 'Ready to Launch Your Next Project?',
      description: 'Start creating responsive landing pages today with your own API key.',
      buttonText: 'Try AI Builder',
    },
  },
  {
    id: '4',
    type: 'footer',
    props: {
      brandName: 'AI Builder',
      copyrightText: '© 2026 AI Builder Inc. All rights reserved.',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
    },
  },
];

export default function AppEditorPage() {
  return (
    <main className="w-full">
      <EditorCanvas layout={mockLayout} />
    </main>
  );
}
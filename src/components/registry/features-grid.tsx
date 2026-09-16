import React from 'react';
import { FeaturesProps } from '@/shared/types';

export const FeaturesGrid: React.FC<FeaturesProps> = ({ heading, subheading, items }) => {
  return (
    <section className="py-20 px-6 bg-muted/40 border-b border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{heading}</h2>
          <p className="text-muted-foreground text-lg">{subheading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
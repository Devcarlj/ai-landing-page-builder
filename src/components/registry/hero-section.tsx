import React from 'react';
import { HeroProps } from '@/shared/types';

export const HeroSection: React.FC<HeroProps> = ({ title, subtitle, ctaText }) => {
  return (
    <section className="py-24 px-6 text-center bg-background border-b border-border">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
        <div className="pt-4">
          <button className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
};
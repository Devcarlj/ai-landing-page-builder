import React from 'react';
import { CTAProps } from '@/shared/types';

export const CTASection: React.FC<CTAProps> = ({ title, description, buttonText }) => {
  return (
    <section className="py-20 px-6 bg-primary text-primary-foreground text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="text-lg opacity-90 max-w-xl mx-auto">{description}</p>
        <div>
          <button className="px-8 py-3 rounded-md bg-background text-foreground font-semibold hover:bg-accent transition-colors">
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
};
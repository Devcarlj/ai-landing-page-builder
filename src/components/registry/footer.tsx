import React from 'react';
import { FooterProps } from '@/shared/types';

export const FooterSection: React.FC<FooterProps> = ({ brandName, copyrightText, links }) => {
  return (
    <footer className="py-12 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="font-bold text-lg">{brandName}</span>
          <p className="text-sm text-muted-foreground mt-1">{copyrightText}</p>
        </div>
        <div className="flex gap-6">
          {links.map((link, idx) => (
            <a key={idx} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
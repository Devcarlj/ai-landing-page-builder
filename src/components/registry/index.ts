import React from 'react';
import { BlockType, BlockPropsMap } from '@/shared/types';
import { HeroSection } from './hero-section';
import { FeaturesGrid } from './features-grid';
import { CTASection } from './cta';
import { FooterSection } from './footer';


type ComponentRegistryType = {
  [K in BlockType]: React.FC<BlockPropsMap[K]>;
};

export const componentRegistry: ComponentRegistryType = {
  hero: HeroSection,
  features: FeaturesGrid,
  testimonials: () => null, 
  pricing: () => null,
  cta: CTASection,
  footer: FooterSection,
};
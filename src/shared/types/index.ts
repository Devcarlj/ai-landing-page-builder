export type BlockType = 
  | 'hero' 
  | 'features' 
  | 'testimonials' 
  | 'pricing' 
  | 'cta' 
  | 'footer';

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  iconName?: string;
}

export interface FeaturesProps {
  heading: string;
  subheading: string;
  items: FeatureItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
}

export interface TestimonialsProps {
  heading: string;
  items: TestimonialItem[];
}

export interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
}

export interface PricingProps {
  heading: string;
  plans: PricingPlan[];
}

export interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
}

export interface FooterProps {
  brandName: string;
  copyrightText: string;
  links: Array<{ label: string; href: string }>;
}

export type BlockPropsMap = {
  hero: HeroProps;
  features: FeaturesProps;
  testimonials: TestimonialsProps;
  pricing: PricingProps;
  cta: CTAProps;
  footer: FooterProps;
};

export interface CanvasBlock<T extends BlockType = BlockType> {
  id: string;
  type: T;
  props: BlockPropsMap[T];
}

export type CanvasLayout = CanvasBlock[];
import { z } from "zod";

export const HeroBlockSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1).max(160, "Subtitle must be concise"),
  ctaText: z.string().min(1).max(25),
  ctaLink: z.string().optional(),
});

export const FeatureItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  iconName: z.string().optional(),
});

export const FeaturesBlockSchema = z.object({
  heading: z.string().min(1),
  subheading: z.string().min(1),
  items: z.array(FeatureItemSchema).min(3),
});

export const TestimonialItemSchema = z.object({
  quote: z.string().min(1),
  author: z.string().min(1),
  role: z.string().min(1),
  avatarUrl: z.string().optional(),
});

export const TestimonialsBlockSchema = z.object({
  heading: z.string().min(1),
  items: z.array(TestimonialItemSchema).min(1),
});

export const PricingPlanSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  features: z.array(z.string().min(1)).min(1),
  ctaText: z.string().min(1),
  highlighted: z.boolean().optional(),
});

export const PricingBlockSchema = z.object({
  heading: z.string().min(1),
  plans: z.array(PricingPlanSchema).min(2),
});

export const CTABlockSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  buttonText: z.string().min(1),
});

export const FooterLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const FooterBlockSchema = z.object({
  brandName: z.string().min(1),
  copyrightText: z.string().min(1),
  links: z.array(FooterLinkSchema).min(3),
});

export const CanvasBlockSchema = z.discriminatedUnion("type", [
  z.object({ id: z.string(), type: z.literal("hero"), props: HeroBlockSchema }),
  z.object({
    id: z.string(),
    type: z.literal("features"),
    props: FeaturesBlockSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("testimonials"),
    props: TestimonialsBlockSchema,
  }),
  z.object({
    id: z.string(),
    type: z.literal("pricing"),
    props: PricingBlockSchema,
  }),
  z.object({ id: z.string(), type: z.literal("cta"), props: CTABlockSchema }),
  z.object({
    id: z.string(),
    type: z.literal("footer"),
    props: FooterBlockSchema,
  }),
]);

export const CanvasLayoutSchema = z.array(CanvasBlockSchema);

export type CanvasLayoutSchemaType = z.infer<typeof CanvasLayoutSchema>;

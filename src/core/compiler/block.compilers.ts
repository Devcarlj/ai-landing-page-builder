import {
  CTAProps,
  FeaturesProps,
  FooterProps,
  HeroProps,
  PricingProps,
  TestimonialsProps,
} from '@/shared/types';

export function compileHero(props: HeroProps): string {
  return `      {/* Hero Section */}
      <section className="py-24 px-6 text-center bg-background border-b border-border">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            ${escapeJsx(props.title)}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ${escapeJsx(props.subtitle)}
          </p>
          <div className="pt-4">
            <button className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              ${escapeJsx(props.ctaText)}
            </button>
          </div>
        </div>
      </section>`;
}

export function compileFeatures(props: FeaturesProps): string {
  const itemsJsx = props.items
    .map(
      (item) => `            <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              <h3 className="text-xl font-semibold mb-2">${escapeJsx(item.title)}</h3>
              <p className="text-muted-foreground leading-relaxed">${escapeJsx(item.description)}</p>
            </div>`
    )
    .join('\n');

  return `      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ${escapeJsx(props.heading)}
            </h2>
            <p className="text-muted-foreground text-lg">
              ${escapeJsx(props.subheading)}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${itemsJsx}
          </div>
        </div>
      </section>`;
}

export function compileTestimonials(props: TestimonialsProps): string {
  const testimonialsJsx = props.items
    .map(
      (item) => `            <div className="p-6 rounded-xl border border-border bg-card text-card-foreground shadow-sm">
              <p className="italic mb-4 text-muted-foreground">"${escapeJsx(item.quote)}"</p>
              <div>
                <p className="font-semibold text-foreground">${escapeJsx(item.author)}</p>
                <p className="text-sm text-muted-foreground">${escapeJsx(item.role)}</p>
              </div>
            </div>`
    )
    .join('\n');

  return `      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ${escapeJsx(props.heading)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${testimonialsJsx}
          </div>
        </div>
      </section>`;
}

export function compilePricing(props: PricingProps): string {
  const plansJsx = props.plans
    .map(
      (plan) => `            <div className="p-8 rounded-xl border ${
        plan.highlighted ? 'border-primary ring-2 ring-primary' : 'border-border'
      } bg-card text-card-foreground shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">${escapeJsx(plan.name)}</h3>
                <p className="text-4xl font-extrabold mb-6">${escapeJsx(plan.price)}</p>
                <ul className="space-y-3 mb-8 text-muted-foreground">
${plan.features
  .map((feature) => `                  <li className="flex items-center gap-2">✓ ${escapeJsx(feature)}</li>`)
  .join('\n')}
                </ul>
              </div>
              <button className="w-full py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                ${escapeJsx(plan.ctaText)}
              </button>
            </div>`
    )
    .join('\n');

  return `      {/* Pricing Section */}
      <section className="py-20 px-6 bg-muted/40 border-b border-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ${escapeJsx(props.heading)}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
${plansJsx}
          </div>
        </div>
      </section>`;
}

export function compileCTA(props: CTAProps): string {
  return `      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl font-bold">${escapeJsx(props.title)}</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto">${escapeJsx(props.description)}</p>
          <div>
            <button className="px-8 py-3 rounded-md bg-background text-foreground font-semibold hover:bg-accent transition-colors">
              ${escapeJsx(props.buttonText)}
            </button>
          </div>
        </div>
      </section>`;
}

export function compileFooter(props: FooterProps): string {
  const linksJsx = props.links
    .map(
      (link) =>
        `            <a href="${escapeJsx(link.href)}" className="text-sm text-muted-foreground hover:text-foreground transition-colors">${escapeJsx(link.label)}</a>`
    )
    .join('\n');

  return `      {/* Footer Section */}
      <footer className="py-12 px-6 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <span className="font-bold text-lg">${escapeJsx(props.brandName)}</span>
            <p className="text-sm text-muted-foreground mt-1">${escapeJsx(props.copyrightText)}</p>
          </div>
          <div className="flex gap-6">
${linksJsx}
          </div>
        </div>
      </footer>`;
}

function escapeJsx(text: string): string {
  return text.replace(/[{}`]/g, (match) => `\\${match}`);
}
"use client";

import { ProductSection, getProductsBySection } from "@/data/products";
import ProductCard from "./ProductCard";

interface ProductSectionProps {
  section: ProductSection;
  title: string;
  description: string;
}

export default function ProductSectionDisplay({ section, title, description }: ProductSectionProps) {
  const sectionProducts = getProductsBySection(section);

  return (
    <section className="section-spacing relative overflow-hidden bg-ivory">
      {/* Subtle background decoration - positioned within natural bounds */}
      <div className="absolute top-10 right-1/2 translate-x-1/3 w-64 h-64 bg-muted-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/3 w-64 h-64 bg-wine-red/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Content Container - Centered, Constrained */}
      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="heading-xl text-charcoal mb-4">{title}</h2>
          <div className="inline-block h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full mb-5" />
          <p className="body-lg text-charcoal/70 max-w-2xl">{description}</p>
        </div>

        {/* Products Grid */}
        {sectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {sectionProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/50 rounded-lg border border-ivory">
            <p className="text-charcoal/70 italic">New pieces coming soon to this collection.</p>
          </div>
        )}
      </div>
    </section>
  );
}

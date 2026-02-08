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
    <section className="section-spacing">
      {/* Section Header */}
      <div className="mb-12">
        <h2 className="heading-xl text-charcoal mb-3">{title}</h2>
        <div className="inline-block h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full mb-4" />
        <p className="body-lg text-charcoal/70 max-w-2xl">{description}</p>
      </div>

      {/* Products Grid */}
      {sectionProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-charcoal/70">No products available in this section yet.</p>
        </div>
      )}
    </section>
  );
}

"use client";

import { ProductCategory, categories } from "@/data/products";

interface ProductFiltersProps {
  activeCategory: ProductCategory | "All";
  onCategoryChange: (category: ProductCategory | "All") => void;
}

export default function ProductFilters({ activeCategory, onCategoryChange }: ProductFiltersProps) {
  const filterOptions: (ProductCategory | "All")[] = ["All", ...categories];

  return (
    <div className="w-full">
      {/* Filter Header */}
      <div className="mb-6">
        <h3 className="heading-sm text-charcoal mb-4">Filter by Category</h3>

        {/* Filter Buttons - Scrollable on mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 md:overflow-x-visible md:flex-wrap">
          {filterOptions.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all duration-200 font-medium text-sm flex-shrink-0 md:flex-shrink-1 ${
                activeCategory === category
                  ? "bg-maroon text-ivory shadow-md"
                  : "bg-ivory border border-muted-gold text-charcoal hover:border-maroon hover:bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-muted-gold to-transparent mb-6" />
    </div>
  );
}

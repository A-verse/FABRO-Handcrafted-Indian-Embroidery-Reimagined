"use client";

import { useState } from "react";
import { ProductCategory, getProductsByCategory } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "All">("All");

  const filteredProducts = getProductsByCategory(activeCategory);

  return (
    <div>
      {/* Filters */}
      <ProductFilters activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      {/* Products Count */}
      <div className="mb-8">
        <p className="text-sm text-charcoal/60">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          {activeCategory !== "All" && ` in ${activeCategory}`}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-charcoal/70 mb-4">No products found in this category.</p>
          <button
            onClick={() => setActiveCategory("All")}
            className="btn-primary px-6 py-2 rounded-md transition-all duration-200"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
}

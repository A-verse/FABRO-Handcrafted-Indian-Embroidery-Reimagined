"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

// Map product images to realistic embroidery/fabric images
const getProductImage = (category: string, id: number): string => {
  const imageMap: { [key: string]: string[] } = {
    "Kurtis": [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
    ],
    "Shirts": [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1598521910271-6e5e6b4f2e08?w=500&h=500&fit=crop",
    ],
    "Dupattas": [
      "https://images.unsplash.com/photo-1535193566835-aa23bf28e7d0?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1537555467226-47bc2f18f89b?w=500&h=500&fit=crop",
    ],
    "Jeans": [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541999414701-4ee6c4b97d9d?w=500&h=500&fit=crop",
    ],
    "Accessories": [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop",
    ],
    "Custom Pieces": [
      "https://images.unsplash.com/photo-1495562411223-441a19a6def3?w=500&h=500&fit=crop",
    ],
  };
  
  const images = imageMap[category] || imageMap["Kurtis"];
  return images[(id - 1) % images.length];
};

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const productImage = getProductImage(product.category, product.id);

  const handleWhatsApp = () => {
    const message = `Hi! I'm interested in: ${product.name} - ₹${product.price}. Can you provide more details?`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/8852808522?text=${encoded}`, "_blank");
  };

  const handleEmail = () => {
    const subject = `Product Inquiry: ${product.name}`;
    const body = `Hello,\n\nI'm interested in learning more about: ${product.name} (₹${product.price})\n\nPlease provide more details.\n\nThank you!`;
    window.location.href = `mailto:hello@fabro.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="h-full bg-white border border-ivory rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col hover:-translate-y-1">
      {/* Product Image Section */}
      <div className="relative bg-ivory h-64 flex items-center justify-center overflow-hidden group">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300"></div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-maroon text-ivory px-3 py-1 rounded text-xs font-semibold shadow-lg z-10">
            {discount}% OFF
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-muted-gold/90 text-charcoal px-3 py-1 rounded text-xs font-medium z-10">
          {product.category}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="heading-sm text-charcoal mb-2 hover:text-maroon transition-colors duration-200 cursor-pointer line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="body-sm text-charcoal/70 mb-4 line-clamp-2 flex-1">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.floor(product.rating) ? "text-gold" : "text-gray-200"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-charcoal/60">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mb-4 flex items-baseline gap-2">
          <span className="text-lg font-bold text-maroon">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-charcoal/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleWhatsApp}
            className="flex-1 btn-primary text-xs sm:text-sm py-2.5 rounded transition-all duration-200 hover:shadow-md"
          >
            Order Now
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 btn-secondary text-xs sm:text-sm py-2.5 rounded transition-all duration-200 hover:shadow-md"
          >
            Enquire
          </button>
        </div>
      </div>
    </div>
  );
}

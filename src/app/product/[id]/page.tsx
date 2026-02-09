"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getProductById, getReviewsByProductId, getAverageRating } from "@/data/products";
import ProductReviews from "@/components/ProductReviews";
import { useCart } from "@/context/CartContext";

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

// Helper function to get product images
function getProductImages(category: string, _productId: number) {
  const imageMap: Record<string, string[]> = {
    Kurtis: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610652750937-7ffce97fd2e3?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1583391733981-8b85ab08f4de?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610796103985-347feae7b723?w=800&h=800&fit=crop",
    ],
    Shirts: [
      "https://images.unsplash.com/photo-1602810319428-019690571b5b?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&h=800&fit=crop",
    ],
    Dupattas: [
      "https://images.unsplash.com/photo-1610796103985-347feae7b723?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1585487000714-f23d5a6f97c4?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop",
    ],
    Jeans: [
      "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&h=800&fit=crop",
    ],
    Accessories: [
      "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1610652750937-7ffce97fd2e3?w=800&h=800&fit=crop",
    ],
  };

  const categoryImages = imageMap[category] || imageMap.Kurtis;
  return categoryImages;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProductById(parseInt(params.id));
  const productReviews = product ? getReviewsByProductId(product.id) : [];
  const averageRating = getAverageRating(productReviews);
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <main className="min-h-screen section-spacing pt-24">
        <div className="section-container">
          <div className="text-center py-16">
            <h1 className="heading-xl text-charcoal mb-4">Product Not Found</h1>
            <p className="body-lg text-charcoal/70 mb-8">The product you are looking for does not exist.</p>
            <Link href="/products" className="btn-primary px-8 py-3 rounded-lg transition-all duration-200 inline-block">
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const productImages = getProductImages(product.category, product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: productImages[0],
      category: product.category,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <main className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="section-spacing-sm pt-8 pb-4 bg-ivory/50">
        <div className="section-container">
          <Link href="/products" className="text-maroon hover:text-wine-red text-sm font-medium transition-colors duration-200 inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="section-spacing-lg">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square rounded-lg overflow-hidden mb-6 border border-ivory shadow-card relative group">
                <Image
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-wine-red text-ivory px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {discount}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-wine-red shadow-md'
                        : 'border-ivory hover:border-muted-gold'
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Micro-copy */}
              <div className="mt-6 p-4 bg-gradient-to-r from-ivory/50 to-ivory/20 rounded-lg border border-ivory">
                <p className="text-sm text-charcoal/70 italic text-center">
                  Hand-embroidered. Heart-approved.
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div>
              {/* Category Badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-muted-gold/30 to-gold/20 text-charcoal px-4 py-2 rounded-full text-sm font-medium border border-muted-gold/30">
                  {product.category}
                </span>
                {product.sections.includes('best-sellers') && (
                  <span className="bg-wine-red/10 text-wine-red px-4 py-2 rounded-full text-sm font-medium border border-wine-red/20">
                    ⭐ Best Seller
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="heading-display-md text-charcoal mb-4">{product.name}</h1>

              {/* Micro-copy */}
              <p className="body-sm text-charcoal/60 italic mb-6">Not mass-made. Soul-made.</p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-ivory">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-lg ${i < Math.floor(product.rating) ? "text-gold" : "text-gray-300"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-charcoal/60">
                  {product.rating} ({productReviews.length} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-sm text-charcoal/60 mb-2">Price</p>
                <div className="flex items-baseline gap-3">
                  <span className="heading-display-sm text-wine-red">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-charcoal/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <p className="text-xs text-green-600 mt-2 font-medium">✓ Free shipping • Pay on delivery</p>
              </div>

              {/* Description */}
              <div className="mb-8 pb-8 border-b border-ivory">
                <p className="body-lg text-charcoal/80 mb-4">{product.description}</p>
                <p className="body-md text-charcoal/70 italic">{product.embroideryDetails}</p>
              </div>

              {/* Details */}
              <div className="mb-8 space-y-4 pb-8 border-b border-ivory">
                <div>
                  <p className="label-text text-charcoal font-medium mb-1">Fabric</p>
                  <p className="body-md text-charcoal/70">{product.fabric}</p>
                </div>
                <div>
                  <p className="label-text text-charcoal font-medium mb-1">Care Instructions</p>
                  <p className="body-md text-charcoal/70">{product.care}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-medium transition-all duration-300 text-center text-base ${
                    addedToCart
                      ? 'bg-green-600 text-white'
                      : 'btn-primary hover:shadow-lg'
                  }`}
                >
                  {addedToCart ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Added to Cart!
                    </span>
                  ) : (
                    'Add to Cart'
                  )}
                </button>

                <Link
                  href="/customize"
                  className="w-full btn-secondary py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg text-center flex items-center justify-center"
                >
                  Customize This
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-br from-muted-gold/10 to-wine-red/5 rounded-lg border border-muted-gold/30">
                <p className="body-sm text-charcoal/80">
                  <span className="font-bold text-wine-red">✨ Want it customized?</span><br/>
                  We can modify embroidery, colors, or size. Your fabric, our thread, one story.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {productReviews.length > 0 && (
        <section className="section-spacing-lg bg-gradient-to-b from-ivory/30 to-ivory/10">
          <div className="section-container">
            <ProductReviews reviews={productReviews} averageRating={averageRating} />
          </div>
        </section>
      )}
    </main>
  );
}

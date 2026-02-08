'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container">
          <div className="text-center py-20">
            <div className="mb-8">
              <svg
                className="w-24 h-24 mx-auto text-charcoal/20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="heading-display-sm mb-4">Your Cart is Empty</h1>
            <p className="body-lg text-charcoal/70 mb-8 max-w-md mx-auto">
              Not mass-made. Soul-made. Start your collection today.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Explore Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-ivory to-ivory/50">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="heading-display-md mb-4">Your Cart</h1>
          <p className="body-lg text-charcoal/70">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-ivory p-6 shadow-card hover:shadow-lg transition-all"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-ivory">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h3 className="heading-sm text-charcoal mb-1">{item.name}</h3>
                        <p className="text-sm text-charcoal/60">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal/40 hover:text-wine-red transition-colors"                        aria-label="Remove item from cart"                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-ivory hover:border-wine-red hover:text-wine-red transition-all flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="font-medium text-charcoal w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-ivory hover:border-wine-red hover:text-wine-red transition-all flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-sm text-charcoal/60">₹{item.price.toLocaleString()} each</p>
                        <p className="heading-sm text-wine-red">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-ivory/30 rounded-lg border border-ivory p-8 shadow-card sticky top-24">
              <h2 className="heading-md mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-muted-gold to-transparent my-4" />
                <div className="flex justify-between text-lg font-bold text-charcoal">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="btn-primary w-full block text-center mb-4"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="btn-secondary w-full block text-center"
              >
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-ivory/50 space-y-3">
                <div className="flex items-center gap-3 text-sm text-charcoal/70">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pay on Delivery Available</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal/70">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Free Shipping Nationwide</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal/70">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Personal Order Confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

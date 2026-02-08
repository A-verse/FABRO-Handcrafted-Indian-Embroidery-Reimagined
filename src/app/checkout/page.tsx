'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Format order message for WhatsApp
    const orderItems = items
      .map((item) => `${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}`)
      .join('%0A');

    const whatsappMessage = `🛍️ NEW ORDER from ${formData.name}%0A%0A` +
      `📦 ITEMS:%0A${orderItems}%0A%0A` +
      `💰 Total: ₹${totalPrice.toLocaleString()}%0A%0A` +
      `📍 DELIVERY DETAILS:%0A` +
      `Name: ${formData.name}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Email: ${formData.email}%0A` +
      `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}%0A%0A` +
      `📝 Notes: ${formData.notes || 'None'}%0A%0A` +
      `Payment: Cash on Delivery`;

    // Send to WhatsApp
    window.open(`https://wa.me/8852808522?text=${whatsappMessage}`, '_blank');

    // Send email confirmation (mailto fallback)
    const emailBody = `New Order from ${formData.name}\n\nItems:\n${items.map(i => `${i.name} (x${i.quantity})`).join('\n')}\n\nTotal: ₹${totalPrice}\n\nDelivery Details:\n${formData.name}\n${formData.address}\n${formData.city}, ${formData.state} - ${formData.pincode}\nPhone: ${formData.phone}`;
    
    setTimeout(() => {
      window.location.href = `mailto:hello@fabro.in?subject=FABRO Order Confirmation&body=${encodeURIComponent(emailBody)}`;
    }, 1000);

    // Clear cart and redirect after delay
    setTimeout(() => {
      clearCart();
      router.push('/order-confirmation');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container">
          <div className="text-center py-20">
            <h1 className="heading-display-sm mb-4">Your Cart is Empty</h1>
            <p className="body-lg text-charcoal/70 mb-8">Add some items before checking out.</p>
            <a href="/products" className="btn-primary inline-block">
              Browse Products
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-ivory to-ivory/50">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="heading-display-md mb-4">Checkout</h1>
          <p className="body-lg text-charcoal/70">
            Your fabric, our thread, one story.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg border border-ivory p-8 shadow-card">
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text block mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                    />
                  </div>
                  <div>
                    <label className="label-text block mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-text block mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg border border-ivory p-8 shadow-card">
                <h2 className="heading-md mb-6">Delivery Address</h2>
                <div className="space-y-6">
                  <div>
                    <label className="label-text block mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="label-text block mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                      />
                    </div>
                    <div>
                      <label className="label-text block mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                      />
                    </div>
                    <div>
                      <label className="label-text block mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{6}"
                        className="input-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-text block mb-2">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="textarea-base w-full px-4 py-3 border border-ivory rounded-lg focus:border-wine-red focus:ring-2 focus:ring-wine-red/20 resize-none"
                      placeholder="Any special instructions or preferences..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-br from-muted-gold/10 to-wine-red/5 rounded-lg border border-muted-gold/30 p-8">
                <h2 className="heading-md mb-4">Payment Method</h2>
                <div className="flex items-start gap-4 p-6 bg-white rounded-lg border-2 border-wine-red/30">
                  <div className="w-6 h-6 rounded-full border-2 border-wine-red flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-wine-red" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-charcoal mb-2">Cash on Delivery (COD)</h3>
                    <p className="text-sm text-charcoal/70 mb-4">
                      Pay when you receive your handcrafted piece. We confirm orders personally before dispatch.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">Free Shipping • Personal Confirmation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-primary w-full py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing Order...' : 'Place Order via WhatsApp'}
              </button>

              <p className="text-xs text-center text-charcoal/60 italic">
                By placing this order, you agree to our terms and conditions. We'll confirm your order via WhatsApp and email.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-ivory p-8 shadow-card sticky top-24">
              <h2 className="heading-md mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ivory flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-charcoal">{item.name}</p>
                      <p className="text-xs text-charcoal/60">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-wine-red">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-muted-gold to-transparent my-6" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-charcoal pt-3 border-t border-ivory">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-ivory">
                <p className="text-xs text-charcoal/60 text-center italic">
                  Hand-embroidered. Heart-approved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

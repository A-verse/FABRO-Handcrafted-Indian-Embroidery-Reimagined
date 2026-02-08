'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { generateOrderId, storeOrder, generateWhatsAppMessage } from '@/utils/orderUtils';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Validate required fields
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';

    // Validate phone number (basic check)
    if (formData.phone.trim() && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Validate email
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate PIN code (6 digits)
    if (formData.pincode.trim() && !/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Generate unique order ID
      const orderId = generateOrderId();

      // Create order object
      const order = {
        orderId,
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        notes: formData.notes,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice,
        paymentMethod: 'COD' as const,
        createdAt: new Date().toISOString(),
      };

      // Store order
      storeOrder(order);

      // Clear cart after successful order placement
      clearCart();

      // Optional: Generate WhatsApp message for user
      const whatsappMessage = generateWhatsAppMessage(order);
      
      // Store WhatsApp message for optional use on confirmation page
      sessionStorage.setItem('whatsapp-message', whatsappMessage);
      sessionStorage.setItem('whatsapp-phone', '8852808522');

      // Redirect to order confirmation with order ID
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrors({ form: 'An error occurred while placing your order. Please try again.' });
      setIsProcessing(false);
    }
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
    <main className="min-h-screen pt-24 pb-16 bg-ivory">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="heading-display-md mb-4">Checkout</h1>
          <p className="body-lg text-charcoal/70">
            Your fabric, our thread, one story.
          </p>
        </div>

        {/* Form Errors */}
        {errors.form && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text block mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                        errors.name ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label-text block mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                        errors.phone ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                      }`}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-text block mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                        errors.email ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md mb-6">Delivery Address</h2>
                <div className="space-y-6">
                  <div>
                    <label className="label-text block mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                        errors.address ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="label-text block mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                          errors.city ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                        }`}
                        placeholder="Mumbai"
                      />
                      {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="label-text block mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                          errors.state ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                        }`}
                        placeholder="Maharashtra"
                      />
                      {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="label-text block mb-2">PIN Code *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all ${
                          errors.pincode ? 'border-red-400 bg-red-50' : 'border-charcoal/10'
                        }`}
                        placeholder="400001"
                      />
                      {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="label-text block mb-2">Order Notes (Optional)</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all resize-none"
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
                className="btn-primary w-full py-4 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? 'Processing Order...' : 'Place Order'}
              </button>

              <p className="text-xs text-center text-charcoal/60 italic">
                By placing this order, you agree to our terms and conditions. We'll confirm your order details shortly.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md sticky top-24">
              <h2 className="heading-md mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-ivory flex-shrink-0 border border-charcoal/5">
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
                <div className="flex justify-between text-lg font-bold text-charcoal pt-3 border-t border-charcoal/5">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-charcoal/5">
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
        {/* Header */}

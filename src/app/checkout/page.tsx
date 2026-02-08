'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentMethod {
  type: 'COD' | 'Razorpay';
  label: string;
  description: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedPayment, setSelectedPayment] = useState<'COD' | 'Razorpay'>('COD');
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

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';

    if (formData.phone.trim() && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.pincode.trim() && !/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createOrder = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          shippingAddress: formData.address,
          shippingCity: formData.city,
          shippingState: formData.state,
          shippingPincode: formData.pincode,
          orderNotes: formData.notes,
          items: items.map(item => ({
            productId: item.id,
            productName: item.name,
            productImage: item.image,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: totalPrice,
          paymentMethod: selectedPayment,
        }),
      });

      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleCODPayment = async () => {
    try {
      const orderData = await createOrder();

      // Send confirmation email
      await fetch('/api/emails/order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderData.orderId }),
      });

      // Clear cart and redirect
      clearCart();
      router.push(`/order-confirmation?orderId=${orderData.orderId}&orderNumber=${orderData.orderNumber}`);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Failed to place order' });
    }
  };

  const handleRazorpayPayment = async () => {
    try {
      const orderData = await createOrder();

      // Create Razorpay order
      const razorpayRes = await fetch('/api/payments/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice * 100, // Convert to paisa
          orderId: orderData.orderId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
        }),
      });

      if (!razorpayRes.ok) throw new Error('Failed to create payment order');
      const razorpayOrder = await razorpayRes.json();

      // Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: totalPrice * 100,
        currency: 'INR',
        name: 'FABRO',
        description: 'Premium Embroidered Clothing',
        order_id: razorpayOrder.id,
        customer: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response: any) => {
          try {
            // Verify payment signature
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: orderData.orderId,
                razorpayOrderId: razorpayOrder.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            if (!verifyRes.ok) throw new Error('Payment verification failed');

            // Send confirmation email
            await fetch('/api/emails/order-confirmation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: orderData.orderId }),
            });

            // Clear cart and redirect
            clearCart();
            router.push(`/order-confirmation?orderId=${orderData.orderId}&orderNumber=${orderData.orderNumber}`);
          } catch (error) {
            setErrors({ form: 'Payment verification failed. Please contact support.' });
            setIsProcessing(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#8B4252',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setIsProcessing(false);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Failed to initiate payment' });
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    setErrors({});

    try {
      if (selectedPayment === 'COD') {
        await handleCODPayment();
      } else {
        await handleRazorpayPayment();
      }
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'An error occurred' });
      setIsProcessing(false);
    }
  };

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
            <p className="body-lg text-charcoal/70 mb-8">Not mass-made. Soul-made. Start your collection today.</p>
            <a href="/products" className="btn-primary inline-block">
              Explore Products
            </a>
          </div>
        </div>
      </main>
    );
  }

  const paymentMethods: PaymentMethod[] = [
    {
      type: 'COD',
      label: 'Cash on Delivery',
      description: 'Pay when you receive your order. Free shipping nationwide.',
    },
    {
      type: 'Razorpay',
      label: 'Card / UPI / Wallet',
      description: 'Pay securely online using Razorpay. Instant confirmation.',
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-ivory">
      <div className="section-container">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="heading-display-md mb-4">Checkout</h1>
          <p className="body-lg text-charcoal/70">Your fabric, our thread, one story.</p>
        </div>

        {errors.form && (
          <div className="mb-8 max-w-4xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errors.form}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text block mb-2">Full Name</label>
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
                    <label className="label-text block mb-2">Phone Number</label>
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
                    <label className="label-text block mb-2">Email Address</label>
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
                    <label className="label-text block mb-2">Street Address</label>
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
                      <label className="label-text block mb-2">City</label>
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
                      <label className="label-text block mb-2">State</label>
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
                      <label className="label-text block mb-2">PIN Code</label>
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
                      className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 resize-none transition-all"
                      placeholder="Any special instructions..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md mb-6">Payment Method</h2>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.type}
                      className={`flex items-start gap-4 p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPayment === method.type
                          ? 'border-wine-red bg-wine-red/5'
                          : 'border-charcoal/10 hover:border-charcoal/20'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedPayment === method.type
                              ? 'border-wine-red'
                              : 'border-charcoal/30'
                          }`}
                        >
                          {selectedPayment === method.type && (
                            <div className="w-3 h-3 rounded-full bg-wine-red" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <input
                          type="radio"
                          name="payment"
                          value={method.type}
                          checked={selectedPayment === method.type}
                          onChange={(e) => setSelectedPayment(e.target.value as 'COD' | 'Razorpay')}
                          className="hidden"
                        />
                        <h3 className="font-bold text-charcoal">{method.label}</h3>
                        <p className="text-sm text-charcoal/60">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-wine-red text-white rounded-lg font-bold text-lg hover:bg-wine-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₹${totalPrice.toLocaleString()}`}
              </button>

              <p className="text-xs text-center text-charcoal/60 italic">
                By placing this order, you agree to our terms and conditions.
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
              <div className="space-y-3 mb-6">
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
                  <span className="text-wine-red">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-charcoal/5">
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

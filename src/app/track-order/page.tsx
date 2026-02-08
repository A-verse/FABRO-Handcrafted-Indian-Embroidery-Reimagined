'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  total_amount: number;
  order_status: string;
  created_at: string;
  customers: {
    name: string;
    email: string;
    phone: string;
  };
  order_items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

const STATUS_TIMELINE = [
  { status: 'placed', label: 'Order Placed', icon: '📦' },
  { status: 'confirmed', label: 'Confirmed', icon: '✓' },
  { status: 'in_progress', label: 'In Progress', icon: '🧵' },
  { status: 'shipped', label: 'Shipped', icon: '🚚' },
  { status: 'delivered', label: 'Delivered', icon: '🎉' },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setOrder(null);
    setIsLoading(true);
    setSearched(true);

    try {
      if (!orderNumber.trim() || !phoneOrEmail.trim()) {
        setError('Please enter both order ID and phone number or email');
        setIsLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from('orders')
        .select(`
          *,
          customers (*),
          order_items (*)
        `)
        .eq('order_number', orderNumber.trim())
        .single();

      if (queryError || !data) {
        setError('Order not found. Please check your order ID.');
        setIsLoading(false);
        return;
      }

      // Verify phone or email matches
      const isPhoneMatch = data.customers.phone === phoneOrEmail.trim();
      const isEmailMatch = data.customers.email === phoneOrEmail.trim();

      if (!isPhoneMatch && !isEmailMatch) {
        setError('Phone number or email does not match this order');
        setIsLoading(false);
        return;
      }

      setOrder(data as Order);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('An error occurred while searching for your order');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    return STATUS_TIMELINE.findIndex(s => s.status === status);
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-ivory to-ivory/50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-display-md mb-4">Track Your Order</h1>
          <p className="body-lg text-charcoal/70 max-w-2xl mx-auto">
            Enter your order ID and phone number or email to track your FABRO order
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
              <div>
                <label className="label-text block mb-2">Order ID</label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                  placeholder="e.g., FABRO-20260208-A7K2M"
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all"
                />
                <p className="text-xs text-charcoal/60 mt-2">
                  You can find your order ID in your confirmation email
                </p>
              </div>

              <div>
                <label className="label-text block mb-2">Phone Number or Email</label>
                <input
                  type="text"
                  value={phoneOrEmail}
                  onChange={(e) => setPhoneOrEmail(e.target.value)}
                  placeholder="e.g., 9876543210 or your@email.com"
                  className="w-full px-4 py-3 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-wine-red text-white rounded-lg font-medium hover:bg-wine-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Searching...' : 'Track Order'}
              </button>
            </form>
          </div>

          {/* Order Details */}
          {searched && order && (
            <div className="space-y-8">
              {/* Order Summary */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md text-charcoal mb-6">Order Summary</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Order ID</p>
                    <p className="font-mono font-bold text-wine-red text-lg">{order.order_number}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Order Date</p>
                    <p className="text-charcoal font-medium">
                      {new Date(order.created_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Customer Name</p>
                    <p className="text-charcoal font-medium">{order.customers.name}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Total Amount</p>
                    <p className="text-charcoal font-bold text-lg">₹{order.total_amount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="border-t border-charcoal/5 pt-6">
                  <h3 className="font-bold text-charcoal mb-4">Items</h3>
                  <div className="space-y-3">
                    {order.order_items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <p className="text-charcoal font-medium">{item.product_name}</p>
                          <p className="text-sm text-charcoal/60">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-wine-red">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md text-charcoal mb-8">Order Status</h2>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute top-10 left-0 w-full h-1 bg-charcoal/10" />

                  {/* Status items */}
                  <div className="relative flex justify-between">
                    {STATUS_TIMELINE.map((item, index) => {
                      const currentIndex = getStatusIndex(order.order_status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;

                      return (
                        <div key={item.status} className="flex flex-col items-center">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl border-4 transition-all ${
                              isCompleted
                                ? 'bg-wine-red border-wine-red text-white'
                                : 'bg-white border-charcoal/10 text-charcoal/40'
                            } ${isCurrent ? 'ring-4 ring-wine-red/20' : ''}`}
                          >
                            {item.icon}
                          </div>
                          <p
                            className={`text-xs font-semibold mt-3 text-center max-w-20 ${
                              isCompleted ? 'text-charcoal' : 'text-charcoal/40'
                            }`}
                          >
                            {item.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <span className="font-bold">Current Status:</span> {order.order_status.replace('_', ' ')}
                  </p>
                  {order.order_status !== 'delivered' && order.order_status !== 'cancelled' && (
                    <p className="text-blue-600 text-xs mt-2">
                      Our team will reach out via WhatsApp with updates. Remember to check your messages!
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
                <h2 className="heading-md text-charcoal mb-4">Shipping Address</h2>
                <p className="text-charcoal">{order.shipping_address}</p>
                <p className="text-charcoal">
                  {order.shipping_city}, {order.shipping_state} {order.shipping_pincode}
                </p>
              </div>

              {/* Support CTA */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={`https://wa.me/${order.customers.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  💬 Contact on WhatsApp
                </a>
                <Link
                  href="/products"
                  className="flex items-center justify-center gap-3 py-3 border border-wine-red text-wine-red rounded-lg font-medium hover:bg-wine-red/5 transition-colors"
                >
                  🛍️ Shop More
                </Link>
              </div>
            </div>
          )}

          {searched && !order && !isLoading && (
            <div className="bg-white rounded-lg border border-charcoal/5 p-12 shadow-md text-center">
              <svg
                className="w-16 h-16 mx-auto text-charcoal/20 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-charcoal/60">No order found. Please check your details and try again.</p>
              <button
                onClick={() => {
                  setSearched(false);
                  setOrderNumber('');
                  setPhoneOrEmail('');
                }}
                className="mt-6 text-wine-red hover:underline font-medium"
              >
                Try Another Search
              </button>
            </div>
          )}

          {/* Help Section */}
          {!searched && (
            <div className="bg-wine-red/5 border border-wine-red/20 rounded-lg p-8 text-center">
              <h3 className="heading-sm text-charcoal mb-2">Need Help?</h3>
              <p className="text-charcoal/70 mb-4">
                Can't find your order ID? Check your email for the confirmation message from FABRO.
              </p>
              <a
                href="https://wa.me/8852808522"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-wine-red font-medium hover:underline"
              >
                Contact us on WhatsApp →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

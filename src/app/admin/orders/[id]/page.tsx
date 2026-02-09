'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';
import { AdminProtectedLayout } from '@/components/admin/AdminProtectedLayout';
import Link from 'next/link';

interface OrderItem {
  id: string;
  product_name: string;
  product_image: string | null;
  quantity: number;
  price: number;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  order_notes: string | null;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at: string;
  razorpay_payment_id: string | null;
  customers: Customer;
  order_items: OrderItem[];
}

const ORDER_STATUSES = [
  'placed',
  'confirmed',
  'in_progress',
  'shipped',
  'delivered',
  'cancelled',
];

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          *,
          customers (*),
          order_items (*)
        `
        )
        .eq('id', orderId)
        .single<Order>();

      if (error || !data) throw error;
      setOrder(data);
      setNewStatus(data.order_status);
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Failed to load order');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!order) return;
    if (newStatus === order.order_status) {
      setError('Please select a different status');
      return;
    }

    try {
      setIsSaving(true);
      setError('');
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from('orders')
        .update<Order>({ order_status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrder({ ...order, order_status: newStatus });
      setSuccess('Order status updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error updating order:', error);
      setError('Failed to update order');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminProtectedLayout>
        <main className="min-h-screen bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-charcoal/60">Loading order...</p>
          </div>
        </main>
      </AdminProtectedLayout>
    );
  }

  if (!order) {
    return (
      <AdminProtectedLayout>
        <main className="min-h-screen bg-ivory">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-red-700">Order not found</p>
            <Link href="/admin" className="text-wine-red hover:underline mt-4 inline-block">
              Back to Dashboard
            </Link>
          </div>
        </main>
      </AdminProtectedLayout>
    );
  }

  return (
    <AdminProtectedLayout>
      <main className="min-h-screen bg-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin" className="text-wine-red hover:underline text-sm mb-4 inline-block">
              ← Back to Orders
            </Link>
            <h1 className="heading-display-sm text-charcoal mb-2">Order {order.order_number}</h1>
            <p className="text-charcoal/60">
              {new Date(order.created_at).toLocaleDateString()} at{' '}
              {new Date(order.created_at).toLocaleTimeString()}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Customer Information */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm mb-6">
                <h2 className="heading-md text-charcoal mb-4">Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Name</p>
                    <p className="text-charcoal font-medium">{order.customers.name}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Email</p>
                    <p className="text-charcoal font-medium">{order.customers.email}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 text-sm mb-1">Phone</p>
                    <p className="text-charcoal font-medium">{order.customers.phone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm mb-6">
                <h2 className="heading-md text-charcoal mb-4">Shipping Address</h2>
                <p className="text-charcoal">{order.shipping_address}</p>
                <p className="text-charcoal">
                  {order.shipping_city}, {order.shipping_state} {order.shipping_pincode}
                </p>
                {order.order_notes && (
                  <div className="mt-4 pt-4 border-t border-charcoal/5">
                    <p className="text-charcoal/60 text-sm mb-2">Special Notes</p>
                    <p className="text-charcoal">{order.order_notes}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
                <h2 className="heading-md text-charcoal mb-4">Order Items</h2>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-charcoal/5 last:border-b-0">
                      {item.product_image && (
                        <div className="w-16 h-16 bg-ivory rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-charcoal">{item.product_name}</p>
                        <p className="text-sm text-charcoal/60">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-wine-red">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-charcoal/60">Unit: ₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Status Update */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm mb-6">
                <h2 className="heading-md text-charcoal mb-4">Update Status</h2>
                <div className="space-y-3">
                  <div>
                    <label className="label-text block mb-2 text-sm">Current Status</label>
                    <p className="px-4 py-2 bg-charcoal/5 rounded-lg text-charcoal font-medium capitalize">
                      {order.order_status.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <label className="label-text block mb-2 text-sm">New Status</label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="w-full px-4 py-2 border border-charcoal/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine-red/20 transition-all"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleStatusUpdate}
                    disabled={isSaving || newStatus === order.order_status}
                    className="w-full py-2 bg-wine-red text-white rounded-lg font-medium hover:bg-wine-red/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isSaving ? 'Updating...' : 'Update Status'}
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm mb-6">
                <h2 className="heading-md text-charcoal mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span className="text-charcoal font-medium">₹{order.total_amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="h-px bg-charcoal/5" />
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-charcoal">Total</span>
                    <span className="font-bold text-wine-red">₹{order.total_amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
                <h2 className="heading-md text-charcoal mb-4">Payment</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-charcoal/60 mb-1">Method</p>
                    <p className="text-charcoal font-medium">{order.payment_method}</p>
                  </div>
                  <div>
                    <p className="text-charcoal/60 mb-1">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                        order.payment_status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : order.payment_status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </div>
                  {order.razorpay_payment_id && (
                    <div>
                      <p className="text-charcoal/60 mb-1">Payment ID</p>
                      <p className="text-charcoal text-xs font-mono break-all">{order.razorpay_payment_id}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AdminProtectedLayout>
  );
}

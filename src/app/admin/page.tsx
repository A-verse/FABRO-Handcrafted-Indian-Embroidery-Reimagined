'use client';

import { AdminProtectedLayout } from '@/components/admin/AdminProtectedLayout';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  total_amount: number;
  order_status: string;
  payment_status: string;
  payment_method: string;
  created_at: string;
  customers?: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function AdminDashboardPage() {
  const { email, logout } = useAdmin();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (statusFilter === 'all') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.order_status === statusFilter));
    }
  }, [orders, statusFilter]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('orders')
        .select(
          `
          id,
          order_number,
          customer_id,
          total_amount,
          order_status,
          payment_status,
          payment_method,
          created_at,
          customers (
            name,
            email,
            phone
          )
        `
        )
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders((data as unknown as Order[]) || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AdminProtectedLayout>
      <main className="min-h-screen bg-ivory">
        {/* Header */}
        <header className="bg-white border-b border-charcoal/5 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="heading-lg text-charcoal">Admin Dashboard</h1>
              <p className="text-sm text-charcoal/60">{email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
              <p className="text-charcoal/60 text-sm mb-2">Total Orders</p>
              <p className="heading-lg text-wine-red">{orders.length}</p>
            </div>
            <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
              <p className="text-charcoal/60 text-sm mb-2">Pending</p>
              <p className="heading-lg text-yellow-600">
                {orders.filter((o) => o.order_status === 'placed').length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
              <p className="text-charcoal/60 text-sm mb-2">Confirmed</p>
              <p className="heading-lg text-blue-600">
                {orders.filter((o) => o.order_status === 'confirmed').length}
              </p>
            </div>
            <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm">
              <p className="text-charcoal/60 text-sm mb-2">Delivered</p>
              <p className="heading-lg text-green-600">
                {orders.filter((o) => o.order_status === 'delivered').length}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg border border-charcoal/5 p-6 shadow-sm mb-6">
            <h2 className="heading-sm mb-4">Filter Orders</h2>
            <div className="flex flex-wrap gap-2">
              {['all', 'placed', 'confirmed', 'in_progress', 'shipped', 'delivered', 'cancelled'].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      statusFilter === status
                        ? 'bg-wine-red text-white'
                        : 'bg-charcoal/5 text-charcoal hover:bg-charcoal/10'
                    }`}
                  >
                    {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-lg border border-charcoal/5 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-charcoal/60">Loading orders...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="p-8 text-center text-charcoal/60">No orders found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-charcoal/5 border-b border-charcoal/5">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Payment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-charcoal uppercase tracking-wide">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-charcoal/5">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-charcoal/2 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-wine-red">
                          {order.order_number}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div>
                            <p className="font-medium text-charcoal">{order.customers?.name}</p>
                            <p className="text-charcoal/60 text-xs">{order.customers?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-charcoal">
                          ₹{order.total_amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.payment_status === 'paid'
                                ? 'bg-green-100 text-green-700'
                                : order.payment_status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.payment_method} ({order.payment_status})
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              order.order_status === 'delivered'
                                ? 'bg-green-100 text-green-700'
                                : order.order_status === 'cancelled'
                                  ? 'bg-red-100 text-red-700'
                                  : order.order_status === 'confirmed'
                                    ? 'bg-blue-100 text-blue-700'
                                    : order.order_status === 'in_progress' || order.order_status === 'shipped'
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.order_status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-charcoal/60">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="text-wine-red hover:text-wine-red/80 font-medium transition-colors"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </AdminProtectedLayout>
  );
}

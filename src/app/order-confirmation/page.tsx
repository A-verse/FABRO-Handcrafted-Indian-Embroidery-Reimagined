'use client';

import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { getOrder, generateWhatsAppMessage } from '@/utils/orderUtils';
import Image from 'next/image';

interface Order {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  totalPrice: number;
  paymentMethod: 'COD';
  createdAt: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Load order from localStorage
    if (orderId) {
      const savedOrder = getOrder(orderId);
      setOrder(savedOrder);
    }
    setIsLoading(false);
  }, [orderId]);

  const handleWhatsAppConfirm = () => {
    if (!order) return;
    const message = generateWhatsAppMessage(order);
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8852808522?text=${encodedMessage}`, '_blank');
  };

  const handleContactSupport = () => {
    window.open('https://wa.me/8852808522', '_blank');
  };

  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-ivory">
        <div className="section-container text-center py-20">
          <p className="text-charcoal/70">Loading your order...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen pt-24 pb-16 bg-ivory">
        <div className="section-container">
          <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="heading-display-md mb-6">Order Not Found</h1>
            <p className="body-lg text-charcoal/70 mb-8">
              We couldn't find your order. Please check your email or contact support.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <button onClick={handleContactSupport} className="btn-secondary">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <main className="min-h-screen pt-24 pb-16 bg-ivory">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          {/* Success Section */}
          <div className="text-center mb-16 animate-slide-up">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="heading-display-md mb-4">Order Placed Successfully!</h1>
            <p className="body-lg text-charcoal/80 mb-2">
              Order ID: <span className="font-bold text-wine-red">{order.orderId}</span>
            </p>
            <p className="body-base text-charcoal/70 mb-8">
              Your fabric, our thread, one story begins now.
            </p>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Customer Details */}
            <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
              <h2 className="heading-sm text-charcoal mb-6">Customer Details</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-charcoal/60 mb-1">Name</p>
                  <p className="text-charcoal font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">Email</p>
                  <p className="text-charcoal font-medium">{order.email}</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">Phone</p>
                  <p className="text-charcoal font-medium">{order.phone}</p>
                </div>
                <div>
                  <p className="text-charcoal/60 mb-1">Order Date</p>
                  <p className="text-charcoal font-medium">{orderDate}</p>
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md">
              <h2 className="heading-sm text-charcoal mb-6">Delivery Address</h2>
              <div className="space-y-2 text-sm text-charcoal">
                <p className="font-medium">{order.address}</p>
                <p>{order.city}, {order.state}</p>
                <p>PIN: {order.pincode}</p>
                {order.notes && (
                  <div className="mt-4 pt-4 border-t border-charcoal/10">
                    <p className="text-charcoal/60 mb-1">Special Notes</p>
                    <p className="text-charcoal italic">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md mb-12">
            <h2 className="heading-sm text-charcoal mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-8">
              {order.items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-charcoal/5 last:border-b-0">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-ivory flex-shrink-0 border border-charcoal/5">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-charcoal font-medium">{item.name}</p>
                    <p className="text-sm text-charcoal/60">Quantity: {item.quantity}</p>
                    <p className="text-sm font-bold text-wine-red mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-charcoal/60 mb-1">Unit: ₹{item.price.toLocaleString()}</p>
                    <p className="text-sm text-charcoal/60">x {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-muted-gold to-transparent mb-6" />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-charcoal/70">
                <span>Subtotal</span>
                <span>₹{order.totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal/70">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-charcoal pt-3 border-t border-charcoal/5">
                <span>Total</span>
                <span className="text-wine-red">₹{order.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 pt-6 border-t border-charcoal/5">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-charcoal">Cash on Delivery</p>
                  <p className="text-xs text-charcoal/60">Pay when you receive your order</p>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-lg border border-charcoal/5 p-8 shadow-md mb-12">
            <h2 className="heading-md text-center mb-8">What Happens Next?</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-red/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-wine-red font-bold">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal mb-2">Personal Confirmation</h3>
                  <p className="text-sm text-charcoal/70">
                    Our team will reach out via WhatsApp within 24 hours to confirm your order details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-red/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-wine-red font-bold">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal mb-2">Handcrafted with Care</h3>
                  <p className="text-sm text-charcoal/70">
                    Our artisans will hand-embroider your piece with the attention it deserves.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-wine-red/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-wine-red font-bold">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal mb-2">Delivered to Your Door</h3>
                  <p className="text-sm text-charcoal/70">
                    Free shipping across India. Pay on delivery when your order arrives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={handleWhatsAppConfirm} className="btn-primary px-8">
              📬 Send to WhatsApp
            </button>
            <button onClick={handleContactSupport} className="btn-secondary px-8">
              💬 Contact Support
            </button>
            <Link href="/products" className="btn-light px-8">
              Continue Shopping
            </Link>
          </div>

          <p className="text-sm text-center text-charcoal/60 italic">
            Made slow, styled fast. Thank you for choosing FABRO.
          </p>
        </div>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen pt-24 pb-16 bg-ivory">
        <div className="section-container text-center py-20">
          <p className="text-charcoal/70">Loading your order...</p>
        </div>
      </main>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}

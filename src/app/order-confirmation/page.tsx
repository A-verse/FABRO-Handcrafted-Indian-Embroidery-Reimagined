'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function OrderConfirmationPage() {
  useEffect(() => {
    // Celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-ivory to-ivory/50">
      <div className="section-container">
        <div className="max-w-2xl mx-auto text-center py-20">
          {/* Success Icon */}
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="heading-display-md mb-6">Order Placed Successfully!</h1>
          
          {/* Micro-copy */}
          <p className="body-lg text-charcoal/80 mb-4">
            Your fabric, our thread, one story begins now.
          </p>
          
          <p className="body-base text-charcoal/70 mb-12 max-w-lg mx-auto">
            We've received your order and sent confirmation details to your WhatsApp and email. 
            Our team will personally confirm everything before we start crafting your piece.
          </p>

          {/* What Happens Next */}
          <div className="bg-white rounded-lg border border-ivory p-8 shadow-card mb-12 text-left">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary px-8">
              Continue Shopping
            </Link>
            <a
              href="https://wa.me/8852808522"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-8"
            >
              Contact Us on WhatsApp
            </a>
          </div>

          <p className="mt-12 text-sm text-charcoal/60 italic">
            Made slow, styled fast. Thank you for choosing FABRO.
          </p>
        </div>
      </div>
    </main>
  );
}

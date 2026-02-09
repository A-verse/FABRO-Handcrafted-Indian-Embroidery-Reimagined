'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full bg-ivory min-h-screen flex flex-col justify-center">
      {/* Content Container - Centered, Constrained Width */}
      <div className="section-container py-20 md:py-32 lg:py-40">
        {/* Two-Column Grid: Text Left, Image Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <div className="animate-slide-up">
            {/* Label with micro-copy */}
            <p className="label-text text-charcoal/55 mb-6 tracking-widest">HANDCRAFTED FOR YOU</p>

            {/* Large, Editorial-Style Headline */}
            <h1 className="heading-display-lg text-charcoal mb-8">
              Threads of Tradition,
              <br />
              <span className="text-wine-red">Styled for Today</span>
            </h1>

            {/* Micro-copy tagline */}
            <p className="text-lg md:text-xl text-charcoal/65 mb-6 font-light italic leading-relaxed">
              Hand-embroidered. Heart-approved.
            </p>

            {/* Body copy - constrained to readable line length */}
            <p className="body-lg text-charcoal/70 max-w-xl mb-12 leading-relaxed">
              Discover premium Indian embroidered clothing where traditional artistry meets modern minimalism. Each piece is a conversation between heritage and contemporary elegance.
            </p>

            {/* CTAs - Left-aligned below text */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <a 
                href="/products" 
                className="btn-primary text-center group relative overflow-hidden"
              >
                <span className="relative z-10">Shop Collection</span>
                <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </a>
              <a 
                href="/customize" 
                className="btn-secondary text-center"
              >
                Customize Your Piece
              </a>
            </div>

            {/* Trust indicator with elegant divider */}
            <div className="pt-10 border-t border-charcoal/8">
              <p className="label-text text-charcoal/45 mb-3 uppercase">TRUSTED BY ARTISANS</p>
              <p className="text-sm text-charcoal/55 italic leading-relaxed">
                Not mass-made. Soul-made.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: IMAGE BLOCK */}
          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            {/* Editorial Image Rectangle - Vertical Format */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-700">
              <Image
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop&q=90"
                alt="Premium embroidered Indian fabric detail"
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                priority
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle border for editorial feel */}
              <div className="absolute inset-0 rounded-lg pointer-events-none border border-charcoal/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-charcoal/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

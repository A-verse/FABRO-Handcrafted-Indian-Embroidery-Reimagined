'use client';

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Full-Bleed Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&h=1080&fit=crop&q=80"
          alt="Premium embroidered Indian fabric detail"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        
        {/* Sophisticated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="section-container w-full">
          <div className="max-w-2xl animate-slide-up">
            {/* Label with micro-copy */}
            <p className="label-text text-ivory/90 mb-6 tracking-widest">HANDCRAFTED FOR YOU</p>

            {/* Large, Editorial-Style Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-ivory mb-6 leading-[1.1]">
              Threads of Tradition,
              <br />
              <span className="text-muted-gold">Styled for Today</span>
            </h1>

            {/* Micro-copy tagline */}
            <p className="text-xl md:text-2xl text-ivory/90 mb-3 font-light italic">
              Hand-embroidered. Heart-approved.
            </p>

            <p className="body-lg text-ivory/80 max-w-xl mb-10 leading-relaxed">
              Discover premium Indian embroidered clothing where traditional artistry meets modern minimalism. Each piece is a conversation between heritage and contemporary elegance.
            </p>

            {/* CTAs */}
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
                className="px-8 py-4 border-2 border-ivory/80 text-ivory font-medium rounded-lg hover:bg-ivory hover:text-charcoal transition-all shadow-lg backdrop-blur-sm text-center"
              >
                Customize Your Piece
              </a>
            </div>

            {/* Trust indicator with elegant divider */}
            <div className="pt-8 border-t border-ivory/20">
              <p className="text-xs uppercase tracking-wider text-ivory/70 mb-2 font-medium">TRUSTED BY ARTISANS</p>
              <p className="text-sm text-ivory/80 italic">
                Not mass-made. Soul-made.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-ivory/60"
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

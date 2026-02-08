'use client';

import Link from 'next/link';

export default function CustomizationHighlight() {
  return (
    <section className="section-spacing bg-ivory">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="aspect-square bg-gradient-to-tl from-wine-red/10 to-gold/20 rounded-sm overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center text-charcoal/20">
                <span className="text-sm">Custom Design Process</span>
              </div>
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-gold/20 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center order-1 lg:order-2 animate-slide-up">
            <p className="label-text mb-4">BESPOKE SERVICE</p>

            <h2 className="heading-display-md mb-6">
              Your Design,
              <br />
              <span className="text-wine-red">Perfectly Crafted</span>
            </h2>

            <p className="body-lg text-charcoal/80 mb-8">
              Envision an embroidered piece that's uniquely yours. Commission a bespoke design from our master artisans. From color palettes to intricate motifs, every detail is customizable.
            </p>

            {/* Why choose custom */}
            <div className="space-y-5 mb-10">
              {[
                "Work directly with design specialists",
                "Choose your fabric, colors, and embroidery style",
                "Get a personalized timeline and consultation",
                "Receive a one-of-a-kind bespoke piece",
              ].map((item, index) => (
                <div key={index} className="flex gap-3">
                  <svg className="w-5 h-5 text-wine-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="body-base text-charcoal">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/customize" className="btn-primary">
                Start Customizing
              </Link>
              <a href="https://wa.me/8852808522" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Chat with Designer
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

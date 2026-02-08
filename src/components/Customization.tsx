'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function CustomizationHighlight() {
  return (
    <section className="section-spacing bg-ivory relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920&h=1080&fit=crop&q=70"
          alt="Fabric texture background"
          fill
          className="object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Grid */}
          <div className="relative order-2 lg:order-1 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop&q=80"
                  alt="Hand embroidery process"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              
              {/* Two smaller images */}
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80"
                  alt="Embroidered fabric detail"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&q=80"
                  alt="Thread selection"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-2xl p-6 border border-muted-gold/20">
              <p className="text-sm text-charcoal/60 mb-1">Crafted with care</p>
              <p className="heading-sm text-wine-red">100% Handmade</p>
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

'use client';

import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="section-spacing bg-gradient-to-b from-ivory to-ivory/50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <p className="label-text mb-4">OUR HERITAGE</p>
          <h2 className="heading-display-md mb-6">Artisan Stories, Woven Together</h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
          <p className="body-lg text-charcoal/80">
            FABRO is a celebration of Indian embroidery—a craft refined through centuries. We partner with master artisans who inherit techniques from their lineage, blending ancestral knowledge with contemporary design.
          </p>
        </div>

        {/* Two column content on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left: Image */}
          <div className="animate-slide-up order-2 md:order-1" style={{ animationDelay: '200ms' }}>
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-muted-gold/20">
              <Image
                src="https://images.unsplash.com/photo-1582142842583-1a30e5e4fae3?w=600&h=400&fit=crop"
                alt="Indian embroidery artisan at work"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center animate-slide-up order-1 md:order-2" style={{ animationDelay: '300ms' }}>
            <h3 className="heading-lg text-maroon mb-6">Every Stitch Tells a Story</h3>

            <p className="body-lg text-charcoal/80 mb-6 leading-relaxed">
              From the selection of the finest fabrics to the final knot, every step of creation is intentional. Our artisans spend hours perfecting each design, ensuring that your piece is not just clothing but a wearable piece of art.
            </p>

            <p className="body-base text-charcoal/70 mb-10">
              What sets FABRO apart is our commitment to ethical practices, fair artisan partnerships, and sustainable sourcing. We believe luxury should enhance both the wearer and the maker.
            </p>

            {/* Three pillars */}
            <div className="space-y-6 mb-8">
              {[
                { title: "Authentic Craftsmanship", desc: "Traditional embroidery techniques refined through generations" },
                { title: "Ethical Partnerships", desc: "Fair wages and support for artisan communities" },
                { title: "Sustainable Materials", desc: "Premium fabrics sourced responsibly" },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-wine-red"></div>
                  </div>
                  <div>
                    <h4 className="heading-sm text-charcoal mb-1">{item.title}</h4>
                    <p className="body-sm text-charcoal/60">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <button className="btn-secondary">Learn Our Values</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

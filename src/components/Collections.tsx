'use client';

import Image from 'next/image';

const collections = [
  {
    id: 1,
    title: "Heirloom Embroidery",
    description: "Timeless pieces designed to become family treasures",
    accent: "Maroon & Gold",
    microcopy: "Stitched to stay. Forever.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop&q=90",
  },
  {
    id: 2,
    title: "Festive Edit",
    description: "Celebration-ready embroidered wear for special moments",
    accent: "Wine & Ivory",
    microcopy: "Made for memories.",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop&q=90",
  },
  {
    id: 3,
    title: "Everyday Elegance",
    description: "Refined daily wear with subtle embroidery details",
    accent: "Muted Gold",
    microcopy: "Luxe. Every day.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=90",
  },
  {
    id: 4,
    title: "Custom Creations",
    description: "Your vision brought to life by master artisans",
    accent: "Personalized",
    microcopy: "Your story, our craft.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop&q=90",
  },
];

export default function Collections() {
  return (
    <section id="collections" className="section-spacing-lg bg-ivory">
      <div className="section-container">
        {/* Header */}
        <div className="section-header animate-slide-up">
          <p className="section-header-label">COLLECTIONS</p>
          <h2 className="section-header-h2">Curated for Every Moment</h2>
          <div className="flex justify-center mb-8">
            <div className="section-header-divider"></div>
          </div>
          <p className="section-header-desc">
            Explore our thoughtfully curated collections, each celebrating different facets of Indian embroidery artistry.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-16">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Collection Image - Portrait Ratio for Editorial Feel */}
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-8 relative shadow-lg hover:shadow-xl transition-all duration-500 border border-charcoal/5">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Micro-copy on Hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-ivory text-sm italic">{collection.microcopy}</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="heading-md text-charcoal mb-4 group-hover:text-wine-red transition-colors">
                  {collection.title}
                </h3>

                <p className="body-sm text-charcoal/70 mb-5">
                  {collection.description}
                </p>

                <p className="label-accent mb-7 text-charcoal/70">{collection.accent}</p>

                <a href="/products" className="link-arrow font-medium text-sm">
                  View Collection →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '600ms' }}>
          <p className="body-base text-charcoal/70 mb-6">Discover what speaks to your style</p>
          <a href="/products" className="btn-primary">Explore All Pieces</a>
        </div>
      </div>
    </section>
  );
}

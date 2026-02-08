'use client';

import Image from 'next/image';

const collections = [
  {
    id: 1,
    title: "Heirloom Embroidery",
    description: "Timeless pieces designed to become family treasures",
    accent: "Maroon & Gold",
    microcopy: "Stitched to stay. Forever.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Festive Edit",
    description: "Celebration-ready embroidered wear for special moments",
    accent: "Wine & Ivory",
    microcopy: "Made for memories.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&h=800&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Everyday Elegance",
    description: "Refined daily wear with subtle embroidery details",
    accent: "Muted Gold",
    microcopy: "Luxe. Every day.",
    image: "https://images.unsplash.com/photo-1585487000714-f23d5a6f97c4?w=600&h=800&fit=crop&q=80",
  },
  {
    id: 4,
    title: "Custom Creations",
    description: "Your vision brought to life by master artisans",
    accent: "Personalized",
    microcopy: "Your story, our craft.",
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&h=800&fit=crop&q=80",
  },
];

export default function Collections() {
  return (
    <section id="collections" className="section-spacing-lg bg-ivory">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 animate-slide-up">
          <p className="label-text mb-4">COLLECTIONS</p>
          <h2 className="heading-display-md mb-6">Curated for Every Moment</h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
          <p className="body-lg text-charcoal/70">
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
              <div className="aspect-[3/4] rounded-lg overflow-hidden mb-6 relative shadow-card hover:shadow-xl transition-all duration-500">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  quality={85}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Micro-copy on Hover */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-ivory text-sm italic">{collection.microcopy}</p>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="heading-md text-charcoal mb-3 group-hover:text-wine-red transition-colors">
                  {collection.title}
                </h3>

                <p className="body-sm text-charcoal/70 mb-4">
                  {collection.description}
                </p>

                <p className="label-accent mb-6">{collection.accent}</p>

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

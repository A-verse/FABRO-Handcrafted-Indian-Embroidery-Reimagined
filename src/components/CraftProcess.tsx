'use client';

import Image from 'next/image';

const process_steps = [
  {
    step: "01",
    title: "Design",
    description: "Collaborate with our artisans to envision your piece",
    details: "Share your inspiration, color palette, and embroidery style. Our designers sketch initial concepts.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80"
  },
  {
    step: "02",
    title: "Thread Selection",
    description: "Choose premium threads and embellishments",
    details: "Select from our curated collection of threads, silks, and traditional embroidery materials.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&q=80"
  },
  {
    step: "03",
    title: "Embroidery",
    description: "Hand-embroidered with meticulous care",
    details: "Master artisans hand-embroider your piece using traditional techniques passed through generations.",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&q=80"
  },
  {
    step: "04",
    title: "Finishing",
    description: "Quality inspection and careful finishing",
    details: "Each piece undergoes rigorous quality checks before hand-wrapped delivery to your door.",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&h=400&fit=crop&q=80"
  },
];

export default function CraftProcess() {
  return (
    <section id="process" className="section-spacing-lg bg-ivory relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-wine-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-muted-gold rounded-full blur-3xl"></div>
      </div>

      <div className="section-container relative z-10">
        <div className="text-center mb-24 animate-slide-up">
          <p className="label-text mb-4">THE CRAFT</p>
          <h2 className="heading-display-md mb-6">Journey of Creation</h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
          <p className="body-lg text-charcoal/70 max-w-2xl mx-auto">
            From concept to completion, every step honors both tradition and your vision.
          </p>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process_steps.map((item, index) => (
            <div
              key={index}
              className="relative animate-slide-up group"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="aspect-square rounded-lg overflow-hidden mb-6 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent"></div>
                
                {/* Step number overlay */}
                <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-serif font-bold text-wine-red">{item.step}</span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="heading-md text-maroon mb-3 group-hover:text-wine-red transition-colors">{item.title}</h3>
                <p className="body-sm text-charcoal/70 mb-3 font-medium">{item.description}</p>
                <p className="body-sm text-charcoal/60 leading-relaxed">{item.details}</p>
              </div>

              {/* Connector line between cards (desktop only) */}
              {index < process_steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 -right-4 w-8 h-0.5 bg-gradient-to-r from-wine-red/60 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-20 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <a href="/customize" className="btn-primary">Start Your Bespoke Journey</a>
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    quote: "Each piece from FABRO carries the soul of its maker. It's not just clothing; it's wearable art and heritage.",
    author: "Anjali Sharma",
    role: "Fashion Designer",
  },
  {
    id: 2,
    quote: "The level of detail and craftsmanship is unparalleled. Worth every moment of anticipation.",
    author: "Priya Menon",
    role: "Customer",
  },
  {
    id: 3,
    quote: "Finally, a brand that truly respects traditional embroidery while keeping it contemporary and wearable.",
    author: "Rav Kapoor",
    role: "Luxury Curator",
  },
];

export default function Testimonials() {
  return (
    <section className="section-spacing-lg bg-ivory relative overflow-hidden">
      {/* Background fabric texture */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image
          src="https://images.unsplash.com/photo-1585487000714-f23d5a6f97c4?w=1920&h=1080&fit=crop&q=90"
          alt="Fabric texture background"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-muted-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-wine-red/5 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10">
        <div className="section-header animate-slide-up">
          <p className="section-header-label">WORDS FROM OUR COMMUNITY</p>
          <h2 className="section-header-h2">Voices of Appreciation</h2>
          <div className="flex justify-center mb-8">
            <div className="section-header-divider"></div>
          </div>
          <p className="section-header-desc">Customers share why they love FABRO.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white/85 backdrop-blur-sm rounded-lg border border-charcoal/5 p-8 md:p-9 hover:shadow-lg hover:bg-white transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Mark */}
              <div className="mb-6">
                <svg
                  className="w-10 h-10 text-wine-red opacity-40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5S0 4.75 0 5v4c0 .5 0 1 .25 1.75.25 1.25 1 2 1 2.5 0 1-1.5 2-2.5 2s-3-1-3-3 0-6 2-6.5 6.5-2 6.5-5c0-3.51-3-4.5-5.5-4.5 0 0-2 0-2 2.5v2c.5 1 1 2 2 3" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="body-base text-charcoal/80 mb-8 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-charcoal/8 pt-6">
                <p className="heading-sm text-maroon mb-2">{testimonial.author}</p>
                <p className="body-sm text-charcoal/55">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

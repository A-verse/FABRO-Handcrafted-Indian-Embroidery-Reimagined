'use client';

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
    <section className="section-spacing-lg bg-gradient-to-b from-ivory to-off-white/50">
      <div className="section-container">
        <div className="text-center mb-20 animate-slide-up">
          <p className="label-text mb-4">WORDS FROM OUR COMMUNITY</p>
          <h2 className="heading-display-md mb-6">Voices of Appreciation</h2>
          <div className="flex justify-center">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg border border-ivory p-7 md:p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-slide-up"
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
              <p className="body-lg text-charcoal/85 mb-8 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-charcoal/10 pt-6">
                <p className="heading-sm text-maroon mb-1">{testimonial.author}</p>
                <p className="body-sm text-charcoal/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

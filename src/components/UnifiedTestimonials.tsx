'use client';

import Image from 'next/image';

interface Review {
  quote: string;
  author: string;
  role?: string;
  country?: string;
  rating?: number;
}

export default function UnifiedTestimonials() {
  const topReviews: Review[] = [
    {
      quote: "Absolutely exquisite! The hand embroidery is impeccable. Every thread is placed with such care. Worth every rupee.",
      author: "Priya Sharma",
      country: "Delhi, India",
      role: "Fashion Enthusiast",
      rating: 5,
    },
    {
      quote: "The level of detail and craftsmanship is unparalleled. Wearing FABRO feels like carrying a piece of art.",
      author: "Sarah Mitchell",
      country: "New York, USA",
      role: "Luxury Editor",
      rating: 5,
    },
    {
      quote: "I was amazed by the customization experience. The team understood exactly what I wanted and delivered a piece that's completely one-of-a-kind.",
      author: "Emma Johnson",
      country: "London, UK",
      role: "Sustainable Fashion Advocate",
      rating: 5,
    },
    {
      quote: "Supporting artisans while getting beautiful, timeless pieces? This is what FABRO does perfectly. Every purchase feels like celebrating Indian heritage.",
      author: "Anjali Verma",
      country: "Mumbai, India",
      role: "Design Professional",
      rating: 5,
    },
    {
      quote: "Finally, a brand that truly respects traditional embroidery while keeping it contemporary and wearable.",
      author: "Elena Romano",
      country: "Milan, Italy",
      role: "Art Collector",
      rating: 5,
    },
    {
      quote: "The custom embroidery service is amazing. I worked with the team to create a piece exactly as I imagined.",
      author: "Meera Gupta",
      country: "Bangalore, India",
      role: "Wedding Planner",
      rating: 5,
    },
  ];

  const ratingStats = {
    average: 4.8,
    totalReviews: 324,
  };

  return (
    <section className="section-spacing-lg bg-ivory relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1580541831550-7323e45bbef5?w=1920&h=1080&fit=crop&q=90"
          alt="Fabric texture background"
          fill
          className="object-cover"
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-muted-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-wine-red/5 rounded-full blur-3xl"></div>

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="section-header animate-slide-up">
          <p className="section-header-label">VOICES OF OUR COMMUNITY</p>
          <h2 className="section-header-h2">Customer Reviews & Testimonials</h2>
          <div className="flex justify-center mb-8">
            <div className="section-header-divider"></div>
          </div>
        </div>

        {/* Rating Summary */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block bg-white/90 backdrop-blur-sm rounded-lg border border-ivory p-8 shadow-md">
            <div className="flex items-center justify-center gap-4">
              <div>
                <div className="flex gap-1 justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-2xl text-gold">★</span>
                  ))}
                </div>
                <p className="heading-md text-wine-red mb-1">{ratingStats.average}</p>
                <p className="body-sm text-charcoal/60">{ratingStats.totalReviews} verified reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white/85 backdrop-blur-sm rounded-lg border border-charcoal/5 p-8 hover:shadow-lg hover:bg-white transition-all duration-300 animate-slide-up flex flex-col"
              style={{ animationDelay: `${(index % 3) * 100}ms` }}
            >
              {/* Star Rating */}
              {review.rating && (
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-sm text-gold">★</span>
                  ))}
                </div>
              )}

              {/* Quote Mark */}
              <div className="mb-4">
                <svg
                  className="w-8 h-8 text-wine-red opacity-40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5S0 4.75 0 5v4c0 .5 0 1 .25 1.75.25 1.25 1 2 1 2.5 0 1-1.5 2-2.5 2s-3-1-3-3 0-6 2-6.5 6.5-2 6.5-5c0-3.51-3-4.5-5.5-4.5 0 0-2 0-2 2.5v2c.5 1 1 2 2 3" />
                </svg>
              </div>

              {/* Quote Text */}
              <p className="body-base text-charcoal/80 mb-6 italic leading-relaxed flex-1">
                "{review.quote}"
              </p>

              {/* Author */}
              <div className="border-t border-charcoal/8 pt-6">
                <p className="heading-sm text-maroon mb-1">{review.author}</p>
                {review.role && <p className="text-xs text-charcoal/60 mb-1">{review.role}</p>}
                {review.country && <p className="text-xs text-wine-red font-medium">{review.country}</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-ivory animate-slide-up">
          <p className="body-lg text-charcoal/70 mb-6">Have a FABRO story to share?</p>
          <button
            onClick={() => {
              const message =
                "Hello! I'd like to share my FABRO experience and review.";
              window.open(`https://wa.me/918852808522?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="btn-primary px-8 py-3 transition-all duration-200"
          >
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
}

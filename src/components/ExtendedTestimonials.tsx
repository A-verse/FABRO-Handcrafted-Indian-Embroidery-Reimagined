"use client";

import Image from 'next/image';

interface Testimonial {
  quote: string;
  author: string;
  country: string;
  role?: string;
}

export default function ExtendedTestimonials() {
  const indianTestimonials: Testimonial[] = [
    {
      quote: "The hand embroidery work is absolutely impeccable. Every kurti I've purchased from FABRO tells a story of true craftsmanship. The quality matches luxury brands at a fraction of the price.",
      author: "Priya Sharma",
      country: "Delhi, India",
      role: "Fashion Enthusiast",
    },
    {
      quote: "I was amazed by the customization experience. The team understood exactly what I wanted and delivered a piece that's completely one-of-a-kind. Wearing it feels special every single time.",
      author: "Anjali Verma",
      country: "Mumbai, India",
      role: "Wedding Planner",
    },
    {
      quote: "Supporting artisans while getting beautiful, timeless pieces? This is what FABRO does perfectly. Every purchase feels like celebrating Indian heritage.",
      author: "Meera Gupta",
      country: "Bangalore, India",
      role: "Design Professional",
    },
  ];

  const internationalTestimonials: Testimonial[] = [
    {
      quote: "I've ordered embroidered pieces before, but nothing compares to FABRO. The attention to detail and the quality of materials are extraordinary. Truly world-class craftsmanship.",
      author: "Sarah Mitchell",
      country: "New York, USA",
      role: "Luxury Editor",
    },
    {
      quote: "Wearing FABRO feels like carrying a piece of art. The embroidery is so intricate, and the ethical manufacturing gives me peace of mind. Highly recommend to everyone.",
      author: "Emma Johnson",
      country: "London, UK",
      role: "Sustainable Fashion Advocate",
    },
    {
      quote: "The custom embroidery service is amazing. I worked with the team to create a piece exactly as I imagined. The quality and service exceeded my expectations by far.",
      author: "Elena Romano",
      country: "Milan, Italy",
      role: "Art Collector",
    },
  ];

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg border border-ivory hover:shadow-xl hover:bg-white transition-all duration-300">
      {/* Quote Mark */}
      <div className="text-4xl text-gold opacity-60 mb-4">&#8220;</div>

      {/* Quote Text */}
      <p className="body-lg text-charcoal/80 italic mb-6 leading-relaxed">{testimonial.quote}</p>

      {/* Author Info */}
      <div className="border-t border-ivory pt-4">
        <p className="font-medium text-charcoal">{testimonial.author}</p>
        {testimonial.role && <p className="text-sm text-charcoal/60 mt-1">{testimonial.role}</p>}
        <p className="text-xs text-maroon font-medium mt-2">{testimonial.country}</p>
      </div>
    </div>
  );

  return (
    <section className="section-spacing bg-gradient-to-b from-ivory/30 to-transparent py-24 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <Image
          src="https://images.unsplash.com/photo-1542272604-787c62d465d1?w=1920&h=1080&fit=crop&q=60"
          alt="Embroidered fabric texture"
          fill
          className="object-cover"
        />
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-40 left-20 w-72 h-72 bg-wine-red/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-72 h-72 bg-muted-gold/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-xl text-charcoal mb-3">Voices of Our Community</h2>
          <div className="flex justify-center mb-4">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full" />
          </div>
          <p className="body-lg text-charcoal/70 max-w-2xl mx-auto">
            From India to around the world, customers share why they love FABRO
          </p>
        </div>

        {/* Indian Testimonials Section */}
        <div className="mb-16">
          <div className="mb-8 pb-6 border-b-2 border-muted-gold">
            <h3 className="heading-md text-maroon mb-2">From Our Hearts</h3>
            <p className="body-sm text-charcoal/70">Voices from India celebrating heritage and craftsmanship</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {indianTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-1 bg-gradient-to-r from-transparent via-muted-gold to-transparent my-12" />

        {/* International Testimonials Section */}
        <div>
          <div className="mb-8 pb-6 border-b-2 border-muted-gold">
            <h3 className="heading-md text-wine-red mb-2">From Around the World</h3>
            <p className="body-sm text-charcoal/70">International customers discovering the art of Indian embroidery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internationalTestimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 pt-12 border-t-2 border-ivory">
          <p className="body-lg text-charcoal/70 mb-6">Have a FABRO story to share?</p>
          <button
            onClick={() => {
              const message =
                "Hello! I'd like to share my FABRO experience and review.";
              window.open(`https://wa.me/8852808522?text=${encodeURIComponent(message)}`, "_blank");
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

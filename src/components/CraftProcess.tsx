'use client';

const process_steps = [
  {
    step: "01",
    title: "Design",
    description: "Collaborate with our artisans to envision your piece",
    details: "Share your inspiration, color palette, and embroidery style. Our designers sketch initial concepts.",
  },
  {
    step: "02",
    title: "Thread Selection",
    description: "Choose premium threads and embellishments",
    details: "Select from our curated collection of threads, silks, and traditional embroidery materials.",
  },
  {
    step: "03",
    title: "Embroidery",
    description: "Hand-embroidered with meticulous care",
    details: "Master artisans hand-embroider your piece using traditional techniques passed through generations.",
  },
  {
    step: "04",
    title: "Finishing",
    description: "Quality inspection and careful finishing",
    details: "Each piece undergoes rigorous quality checks before hand-wrapped delivery to your door.",
  },
];

export default function CraftProcess() {
  return (
    <section id="process" className="section-spacing-lg bg-gradient-to-b from-ivory/30 to-ivory/10">
      <div className="section-container">
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

        {/* Timeline - Vertical on mobile, horizontal on desktop */}
        <div className="relative">
          {/* Vertical line (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-wine-red to-muted-gold"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-8">
            {process_steps.map((item, index) => (
              <div
                key={index}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Circle indicator */}
                <div className="flex lg:justify-center mb-8">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-wine-red/10 to-maroon/5 border-2 border-wine-red/60 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="heading-lg text-wine-red font-serif font-bold">{item.step}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <h3 className="heading-md text-maroon mb-3">{item.title}</h3>
                  <p className="body-sm text-charcoal/70 mb-3 font-medium">{item.description}</p>
                  <p className="body-sm text-charcoal/60 leading-relaxed">{item.details}</p>
                </div>

                {/* Connector line (mobile only) */}
                {index < process_steps.length - 1 && (
                  <div className="lg:hidden absolute left-10 top-24 w-0.5 h-20 bg-gradient-to-b from-wine-red/40 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-20 animate-slide-up" style={{ animationDelay: '600ms' }}>
          <a href="/customize" className="btn-primary">Start Your Bespoke Journey</a>
        </div>
      </div>
    </section>
  );
}

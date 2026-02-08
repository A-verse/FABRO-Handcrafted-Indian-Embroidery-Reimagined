"use client";

export default function MeeshoSection() {
  return (
    <section className="section-spacing-lg bg-ivory">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <p className="label-text mb-4">ALSO AVAILABLE ON</p>
          <h2 className="heading-display-sm text-charcoal mb-4">Find Us on Meesho</h2>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-16 bg-gradient-to-r from-maroon to-wine-red rounded-full"></div>
          </div>
          <p className="body-lg text-charcoal/70 italic mb-2">
            Made slow, found fast.
          </p>
          <p className="body-base text-charcoal/60">
            Shop authentic hand-embroidered pieces on India's largest social commerce platform
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-gradient-to-br from-white to-ivory/30 border border-ivory rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-8 md:p-12 items-center">
            {/* Left - Content */}
            <div>
              <div className="inline-block bg-gradient-to-r from-muted-gold/20 to-maroon/10 text-maroon px-4 py-2 rounded-full text-sm font-medium mb-8 border border-muted-gold/30">
                Available Now on Meesho
              </div>

              <h3 className="heading-lg text-charcoal mb-6">Shop FABRO on India's Largest Social Commerce Platform</h3>

              <p className="body-lg text-charcoal/80 mb-8 leading-relaxed">
                Explore our complete collection of hand-embroidered pieces on Meesho. Browse, compare, and discover. Shop 
                directly from artisans bringing you authentic Indian craftsmanship with every stitch.
              </p>

              {/* Trust Points */}
              <ul className="space-y-4 mb-10">
                <li className="flex items-start gap-3">
                  <span className="text-wine-red text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="body-md text-charcoal/80">Verified seller with high customer ratings</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-wine-red text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="body-md text-charcoal/80">Secure payment and buyer protection</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-wine-red text-lg font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="body-md text-charcoal/80">Direct reseller opportunities available</span>
                </li>
              </ul>

              <a
                href="https://www.meesho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block btn-primary px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Visit FABRO on Meesho →
              </a>
            </div>

            {/* Right - Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-xs rounded-lg overflow-hidden">
                {/* Meesho Logo Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-maroon/10 to-wine-red/10 border-2 border-dashed border-muted-gold rounded-lg flex items-center justify-center shadow-card">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-maroon/40 mb-4">MEESHO</div>
                    <p className="text-sm text-charcoal/50 font-medium">Largest Social Commerce<br/>Platform in India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center p-8 rounded-lg bg-gradient-to-r from-muted-gold/10 to-gold/10 border border-muted-gold/20">
          <p className="body-base text-charcoal/80 mb-6 font-medium">
            Looking for wholesale or reseller opportunities? FABRO offers competitive wholesale pricing on Meesho.
          </p>
          <button
            onClick={() => {
              const message = "Hi! I'm interested in wholesale/reseller opportunities for FABRO products.";
              window.open(`https://wa.me/8852808522?text=${encodeURIComponent(message)}`, "_blank");
            }}
            className="text-maroon font-medium hover:text-wine-red transition-colors duration-200"
          >
            Inquire about wholesale →
          </button>
        </div>
      </div>
    </section>
  );
}

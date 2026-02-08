'use client';

export default function CTA() {
  return (
    <section className="bg-maroon py-20 md:py-32 text-ivory">
      <div className="container-custom text-center">
        <p className="label-text mb-4 text-ivory/60 tracking-[0.3em]">
          READY TO ELEVATE YOUR STYLE
        </p>

        <h2 className="heading-lg text-ivory mb-8">
          Discover the Art of
          <br />
          Handcrafted Embroidery
        </h2>

        <p className="body-text max-w-2xl mx-auto mb-12 text-ivory/80">
          Join a community of individuals who celebrate craftsmanship, cultural heritage, and timeless beauty. Explore our collections or commission your bespoke embroidered piece today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 md:px-10 md:py-4 bg-ivory text-maroon rounded-sm font-medium hover:bg-muted-gold focus:outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-maroon">
            Shop Now
          </button>
          <button className="px-8 py-3 md:px-10 md:py-4 border border-ivory text-ivory rounded-sm font-medium hover:bg-ivory hover:text-maroon focus:outline-none focus:ring-2 focus:ring-ivory focus:ring-offset-2 focus:ring-offset-maroon">
            Contact Us
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-ivory/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="label-text text-ivory/60 mb-2">Email</p>
            <p className="text-ivory">hello@fabro.in</p>
          </div>
          <div>
            <p className="label-text text-ivory/60 mb-2">Follow</p>
            <p className="text-ivory">Instagram • Pinterest</p>
          </div>
          <div>
            <p className="label-text text-ivory/60 mb-2">Location</p>
            <p className="text-ivory">India</p>
          </div>
        </div>
      </div>
    </section>
  );
}

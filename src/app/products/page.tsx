import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "Products - FABRO | Hand-Embroidered Collections",
  description: "Explore FABRO's curated collection of hand-embroidered kurtis, shirts, dupattas, and accessories. Premium Indian craftsmanship.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="section-spacing">
        <div className="text-center mb-12">
          <h1 className="heading-display-lg text-charcoal mb-4">Our Collections</h1>
          <div className="flex justify-center mb-6">
            <div className="h-1 w-20 bg-gradient-to-r from-maroon to-wine-red rounded-full" />
          </div>
          <p className="body-lg text-charcoal/70 max-w-2xl mx-auto">
            Discover our curated range of hand-embroidered pieces, from timeless classics to contemporary designs. Each piece tells a story of craftsmanship and heritage.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-spacing">
        <ProductGrid />
      </section>

      {/* Call to Action */}
      <section className="section-spacing bg-gradient-to-b from-ivory/30 to-transparent py-16">
        <div className="text-center">
          <h2 className="heading-lg text-charcoal mb-4">Did not find what you are looking for?</h2>
          <p className="body-lg text-charcoal/70 mb-6 max-w-xl mx-auto">
            We offer bespoke customization services. Design your own embroidered piece with our artisans.
          </p>
          <a
            href="/customize"
            className="inline-block btn-primary px-8 py-3 rounded-md transition-all duration-200 hover:shadow-lg"
          >
            Start Customizing
          </a>
        </div>
      </section>
    </main>
  );
}

import Hero from "@/components/Hero";
import About from "@/components/About";
import Collections from "@/components/Collections";
import CustomizationHighlight from "@/components/Customization";
import ProductSection from "@/components/ProductSection";
import CraftProcess from "@/components/CraftProcess";
import UnifiedTestimonials from "@/components/UnifiedTestimonials";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      
      {/* Product Showcase Sections */}
      <ProductSection 
        section="best-sellers" 
        title="Best Sellers" 
        description="Customer favorites and most loved pieces from our collection"
      />
      
      <ProductSection 
        section="trending" 
        title="Trending Now" 
        description="Most popular designs this season"
      />
      
      <Collections />
      <CustomizationHighlight />
      <CraftProcess />
      <UnifiedTestimonials />
      <ContactSection />
    </main>
  );
}

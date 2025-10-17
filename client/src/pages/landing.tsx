import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import FeaturedProductsSection from "@/components/home/featured-products-section";
import CTASection from "@/components/home/cta-section";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

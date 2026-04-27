import Navbar from "@/components/custom/Navbar";
import HeroSection from "@/sections/HeroSection";
import ManifestoSection from "@/sections/ManifestoSection";
import ValueGridSection from "@/sections/ValueGridSection";
import HowItWorksSection from "@/sections/HowItWorksSection";
import PricingSection from "@/sections/PricingSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import CTASection from "@/sections/CTASection";
import Footer from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#101820]">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ValueGridSection />
      <HowItWorksSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}

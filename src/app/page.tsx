import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import ProblemSection from "@/components/problem-section";
import FeatureShowcase from "@/components/feature-showcase";
import TrustSection from "@/components/trust-section";
import FinalCta from "@/components/final-cta";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <FeatureShowcase />
        <TrustSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

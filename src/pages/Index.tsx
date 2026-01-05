import HeroSection from "@/components/landing/HeroSection";
import PainValidationSection from "@/components/landing/PainValidationSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TreatmentContinuitySection from "@/components/landing/TreatmentContinuitySection";
import AIReassuranceSection from "@/components/landing/AIReassuranceSection";
import WhoItsForSection from "@/components/landing/WhoItsForSection";
import TrustPrivacySection from "@/components/landing/TrustPrivacySection";
import FinalCTASection from "@/components/landing/FinalCTASection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <PainValidationSection />
      <HowItWorksSection />
      <TreatmentContinuitySection />
      <AIReassuranceSection />
      <WhoItsForSection />
      <TrustPrivacySection />
      <FinalCTASection />
      
      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="section-container text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} כל הזכויות שמורות
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
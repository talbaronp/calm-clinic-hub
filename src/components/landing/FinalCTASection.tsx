import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignupModal from "@/components/landing/SignupModal";

const FinalCTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              רוצה להוריד את העומס האדמיניסטרטיבי?
            </h2>
            
            <div className="space-y-3">
              <Button 
                variant="cta" 
                size="xl"
                onClick={() => setIsModalOpen(true)}
              >
                בוא נתחיל
              </Button>
              <p className="text-sm text-text-subtle">
                התחלה קצרה, ללא התחייבות.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SignupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default FinalCTASection;
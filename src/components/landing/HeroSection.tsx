import { useState } from "react";
import { Button } from "@/components/ui/button";
import SignupModal from "@/components/landing/SignupModal";
import heroImage from "@/assets/hero-therapy-room.jpg";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight text-balance">
                ניהול קליניקה בראש שקט.
                <br />
                <span className="text-muted-foreground">
                  פחות אדמיניסטרציה. התמקדות בטיפול.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                מערכת אחת למטפלים פרטיים:
                <br />
                תיעוד טיפולים, גבייה וחשבוניות – עם AI שעוזר לך לחסוך זמן, ולהתמקד בטיפולים.
              </p>
              
              <div className="pt-4 space-y-3">
                <Button 
                  variant="cta" 
                  size="xl"
                  onClick={() => setIsModalOpen(true)}
                >
                  בוא נתחיל
                </Button>
                <p className="text-sm text-text-subtle">
                  התחלה פשוטה. בלי התחייבות.
                </p>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={heroImage} 
                  alt="חדר טיפול שקט ונעים עם אור טבעי" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle decorative element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <SignupModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default HeroSection;
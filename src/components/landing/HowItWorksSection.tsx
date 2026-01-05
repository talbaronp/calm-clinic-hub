import { Mic, FileText, Layers } from "lucide-react";

const steps = [
  {
    icon: Mic,
    title: "מדברים, לא מקלידים",
    description: "בסיום פגישה אפשר להקליט סיכום חופשי.",
  },
  {
    icon: FileText,
    title: "המערכת מעבדת ומארגנת את הדברים",
    description: "AI הופך את ההקלטה לרשומה טיפולית מסודרת וברורה.",
  },
  {
    icon: Layers,
    title: "הכול במקום אחד",
    description: "תיעוד, חשבוניות ומעקב גבייה – במערכת אחת.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-section-muted">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center mb-5">
                <step.icon className="w-6 h-6 text-accent-foreground" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
import { Shield, Lock, UserCheck } from "lucide-react";

const trustPoints = [
  {
    icon: Lock,
    text: "שמירה על פרטיות ודיסקרטיות",
  },
  {
    icon: UserCheck,
    text: "גישה בלעדית למטפל",
  },
  {
    icon: Shield,
    text: "מותאם לעבודה טיפולית מקצועית",
  },
];

const TrustPrivacySection = () => {
  return (
    <section className="section-padding bg-section-muted">
      <div className="section-container max-w-3xl">
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground">
            נבנה לעולם הטיפולי.
          </h2>
          
          <ul className="space-y-4">
            {trustPoints.map((point, index) => (
              <li 
                key={index}
                className="flex items-center gap-4 text-lg text-muted-foreground"
              >
                <point.icon className="w-5 h-5 text-primary shrink-0" strokeWidth={1.5} />
                {point.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrustPrivacySection;
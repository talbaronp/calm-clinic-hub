import { Check } from "lucide-react";

const audiences = [
  "פסיכולוגים פרטיים עם קליניקה עצמאית",
  "מטפלים שמנהלים לעצמם את האדמיניסטרציה",
  "מי שמחפש סדר, פשטות ושקט",
];

const WhoItsForSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container max-w-3xl">
        <div className="space-y-6 animate-fade-in">
          <h2 className="text-2xl font-semibold text-foreground">
            למי זה מתאים?
          </h2>
          
          <ul className="space-y-4">
            {audiences.map((audience, index) => (
              <li 
                key={index}
                className="flex items-center gap-3 text-lg text-muted-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-accent-foreground" strokeWidth={2} />
                </div>
                {audience}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
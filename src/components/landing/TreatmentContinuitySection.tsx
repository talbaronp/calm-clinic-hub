import { MessageSquareText } from "lucide-react";

const TreatmentContinuitySection = () => {
  return (
    <section className="section-padding">
      <div className="section-container max-w-3xl">
        <div className="flex flex-col md:flex-row gap-8 items-start animate-fade-in">
          {/* Icon */}
          <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center shrink-0">
            <MessageSquareText className="w-8 h-8 text-accent-foreground" strokeWidth={1.5} />
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              התמונה הטיפולית – נגישה וברורה.
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              כל התיעוד נשמר בצורה שמאפשרת לחזור לרצף הטיפולי לאורך זמן.
            </p>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              אפשר לתשאל את המערכת על הטיפול, להיזכר בנושאים מרכזיים ולראות את התהליך בצורה מסודרת – הכל מבלי לחפש במסמכים.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentContinuitySection;
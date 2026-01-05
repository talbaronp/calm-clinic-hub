const PainValidationSection = () => {
  return (
    <section className="section-padding">
      <div className="section-container max-w-3xl">
        <div className="space-y-6 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            יום טיפולים עמוס לא אמור להיגמר בעוד שעתיים של אדמיניסטרציה.
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            סיכומי פגישות, חשבוניות ומעקב תשלומים –
            <br className="hidden md:block" />
            כל אלה נחוצים, אבל גוזלים זמן וקשב מהעבודה הטיפולית עצמה.
          </p>
          
          <p className="text-lg text-foreground">
            המערכת נבנתה כדי להוריד עומס ולאפשר לך להתמקד בעיקר.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainValidationSection;
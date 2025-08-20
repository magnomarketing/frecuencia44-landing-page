const TechnologiesSection = () => {
  return (
    <section id="soluciones" className="py-16 gradient-subtle">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center">
          <h3 className="text-lg text-muted-foreground mb-8">
            The technologies we work with:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                Xenko
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Advanced Platform
              </div>
            </div>
            
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                GoEva
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Inteligencia Artificial
              </div>
            </div>
            
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                Servnet
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Network Solutions
              </div>
            </div>
            
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                Alestra
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Telecommunications
              </div>
            </div>
            
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                Wisp MX
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Wireless Solutions
              </div>
            </div>
            
            <div className="bg-card rounded-lg px-6 py-4 shadow-md border border-border text-center hover:shadow-lg transition-shadow">
              <div className="text-lg font-bold text-gradient">
                Equinix
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Global Infrastructure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
import { Globe, Sparkles } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section-padding bg-cream-dark relative overflow-hidden">
      {/* Subtle decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-narrow mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Text Content */}
          <div className="order-2 md:order-1">
            <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              A Taste of <span className="text-accent">Two Worlds</span>
            </h2>
            
            {/* Paragraph 1 with Highlights */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Bites of Bliss brings a unique fusion of <span className="text-foreground font-bold text-accent">English classics</span> and <span className="text-foreground font-bold text-accent">Indian food</span> to Coventry. 
              Born from a passion for bold flavors and creative cooking, we've crafted a menu that celebrates 
              the best of both culinary traditions.
            </p>
            
            {/* Paragraph 2 with Highlights */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              From <span className="font-medium text-foreground">crispy chicken tacos</span> to <span className="font-medium text-foreground">authentic masala dosas</span>, every bite is a journey. 
              Our food truck brings the vibrant energy of street food culture right to your neighborhood.
            </p>
            
            {/* CREATIVE STATS BADGES */}
            <div className="flex flex-wrap gap-6">
              {/* Badge 1: Cuisines */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/10 border border-accent/20 shadow-sm">
                <div className="bg-white/80 p-2 rounded-full">
                    <Globe className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-accent leading-none block">
                    2
                  </span>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mt-1">Worlds Collide</p>
                </div>
              </div>
              
              {/* Badge 2: Flavor */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/10 border border-accent/20 shadow-sm">
                <div className="bg-white/80 p-2 rounded-full">
                    <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <span className="font-serif text-4xl font-bold text-accent leading-none block pt-1">
                    ∞
                  </span>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider font-bold mt-1">Flavor Possibilities</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="order-1 md:order-2">
            <div className="relative group">
              {/* Subtle offset border effect behind image for depth */}
              <div className="absolute inset-0 bg-accent/20 rounded-3xl transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              
              <img
                src="/images/about-food.jpg"
                alt="Fresh ingredients and fusion food"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-elevated border-2 border-white"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground px-6 py-4 rounded-2xl shadow-card">
                <span className="font-serif text-2xl font-bold">Est. 2025</span>
                <p className="text-sm opacity-90 font-medium">119 Gosford Street, Coventry CV1 5DL</p>
<p className="text-xs opacity-80">United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
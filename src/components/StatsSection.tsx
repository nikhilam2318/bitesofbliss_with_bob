import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Users, Utensils, Star, Sparkles } from "lucide-react";

// Helper for the counting animation
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    if (!node) return;
    const duration = 2000;
    const start = performance.now();
    const animate = (time: number) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(from + (to - from) * ease);
      node.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, from, to]);
  return <span ref={nodeRef}>{from}</span>;
};

const StatsSection = () => {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Decorative Background Elements (Subtle) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-50" />

      <div className="container-narrow mx-auto px-4 relative z-10">
        <div className="text-center space-y-16">
          
          {/* Tagline - Now BOLD and readable */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
             <p className="text-2xl md:text-4xl text-foreground font-serif leading-snug">
               "Where <span className="text-accent font-black decoration-4 underline-offset-4 drop-shadow-sm">English Classics</span> meet <span className="text-accent font-black decoration-4 underline-offset-4 drop-shadow-sm">Indian Food</span> magic."
             </p>
          </motion.div>

          {/* Creative Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Stat 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl bg-card border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.4)]"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex flex-col items-center gap-4">
                {/* Icon Circle */}
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  <Users className="w-8 h-8" />
                </div>
                
                <div className="text-center">
                  {/* Number - Huge & Bold */}
                  <h4 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
                    <Counter from={0} to={1000} />+
                  </h4>
                  {/* Label - Bold & Clean */}
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground transition-colors">
                    Happy Customers
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl bg-card border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.4)]"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  <Utensils className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h4 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
                    <Counter from={0} to={25} />+
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground transition-colors">
                    Menu Items
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl bg-card border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.4)]"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  <Star className="w-8 h-8" fill="currentColor" />
                </div>
                <div className="text-center">
                  <h4 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
                    4.9
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground transition-colors">
                    Average Rating
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="group relative p-6 rounded-3xl bg-card border-2 border-transparent hover:border-accent transition-all duration-300 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(255,193,7,0.4)]"
            >
              <div className="absolute inset-0 bg-accent/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <h4 className="text-4xl md:text-5xl font-black text-foreground mb-2 tracking-tight">
                    100%
                  </h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-accent-foreground transition-colors">
                    Fresh Daily
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
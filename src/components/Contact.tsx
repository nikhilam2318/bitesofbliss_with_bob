import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-cream-dark">
      <div className="container-narrow mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-accent font-medium tracking-widest uppercase text-xs mb-2 block">
            Get in Touch
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">
            Contact Us
          </h2>
        </motion.div>

        {/* Grid with items forced to same height (items-stretch) */}
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto items-stretch">
          
          {/* 1. Location Box - Now containing two separate links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.05)" }}
            className="group h-full bg-card p-5 rounded-xl shadow-sm border border-border/50 flex items-center gap-4 hover:border-accent transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <MapPin className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-serif text-lg font-bold text-foreground mb-2">Visit Us</h3>
              
              {/* Location 1 Link - Gosford Street */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=119+Gosford+Street,+Coventry,+CV1+5DL"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground text-sm leading-relaxed font-medium border-b border-dashed border-border/60 pb-2 mb-2 hover:text-accent transition-colors flex items-start justify-between group/link1"
              >
                <span>119 Gosford Street,<br />Coventry, CV1 5DL</span>
                <ArrowUpRight className="w-3 h-3 mt-1 opacity-0 group-hover/link1:opacity-100 transition-opacity text-accent" />
              </a>
              
              {/* Location 2 Link - Stoney Stanton */}
              <a 
                href="https://www.google.com/maps/search/?api=1&query=577+Stoney+Stanton+Rd,+Coventry,+CV6+5ED"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-foreground text-sm leading-relaxed font-medium hover:text-accent transition-colors flex items-start justify-between group/link2"
              >
                <span>577 Stoney Stanton Rd,<br />Coventry, CV6 5ED</span>
                <ArrowUpRight className="w-3 h-3 mt-1 opacity-0 group-hover/link2:opacity-100 transition-opacity text-accent" />
              </a>
            </div>
          </motion.div>

          {/* 2. Phone Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.05)" }}
            className="group h-full bg-card p-5 rounded-xl shadow-sm border border-border/50 flex items-center gap-4 hover:border-accent transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Phone className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-serif text-lg font-bold text-foreground mb-1">Call Us</h3>
              
              <a href="tel:+447350739707" className="block text-foreground text-sm font-medium hover:text-accent hover:underline decoration-accent transition-colors py-0.5">
                +44 7350 739707
              </a>
              <a href="tel:+447825229301" className="block text-foreground text-sm font-medium hover:text-accent hover:underline decoration-accent transition-colors py-0.5">
                +44 7825 229301
              </a>
            </div>
          </motion.div>

          {/* 3. Email Box */}
          <motion.a
            href="mailto:bitesofblissbob@gmail.com"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--accent), 0.05)" }}
            className="group h-full bg-card p-5 rounded-xl shadow-sm border border-border/50 flex items-center gap-4 cursor-pointer hover:border-accent transition-all hover:shadow-md"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Mail className="w-6 h-6 text-accent group-hover:text-accent-foreground" />
            </div>
            <div className="flex-1 text-left min-w-0">
               <div className="flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-foreground">Email Us</h3>
                <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-foreground text-sm mt-1 truncate font-medium">
                bitesofblissbob@gmail.com
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
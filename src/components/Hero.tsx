import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const heroImages = [
  "/images/hero-food.jpg",
  "/images/burger.jpg",
  "/images/dosa-hero-img.jpg",
  "/images/oreo.jpg",
  "/images/idli.jpg",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToMenu = () => {
    const element = document.querySelector("#menu");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Fusion food"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <span className="inline-block text-accent font-bold tracking-[0.2em] uppercase text-[10px]
                         mb-6 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm
                         border border-accent/50">
          Fusion Food
        </span>

        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold
                       text-white mb-10 leading-tight drop-shadow-2xl">
          Flavors that Roll.
          <br />
          <span className="text-accent">Taste the Fusion.</span>
        </h1>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">

          {/* VIEW MENU */}
          <motion.button
            onClick={scrollToMenu}
            className="px-10 py-4 rounded-full text-lg font-bold
                       bg-accent text-accent-foreground border-2 border-accent
                       shadow-elevated transition-all"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            View Menu
          </motion.button>

          {/* ORDER ONLINE */}
          <motion.button
            onClick={scrollToMenu}
            className="px-8 py-3 rounded-full text-base font-semibold
                       bg-black/60 text-white border border-white/30
                       hover:border-accent hover:text-accent
                       backdrop-blur-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Order Now
          </motion.button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

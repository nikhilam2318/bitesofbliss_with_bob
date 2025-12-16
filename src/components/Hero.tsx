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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            alt="Delicious fusion food"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        {/* Darker overlay for better text contrast with new vibrant colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30}}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Tagline with Bright Gold Glow */}
          <span className="inline-block text-accent font-bold tracking-[0.2em] uppercase text-[10px] mb-6 drop-shadow-[0_0_15px_rgba(255,193,7,0.8)] bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm border border-accent/50">
            Fusion Food
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl"
        >
          Flavors that Roll.
          <br />
          {/* Neon/Glowing Text Effect */}
          <span className="text-accent drop-shadow-[0_0_20px_rgba(255,193,7,0.6)]">
            Taste the Fusion.
          </span>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          onClick={scrollToMenu}
          className="btn-gold px-12 py-4 rounded-full text-lg shadow-elevated hover:shadow-[0_0_30px_rgba(255,193,7,0.7)] transition-all duration-300 mb-10 border-2 border-accent"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          View Menu
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/80 drop-shadow-md"
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
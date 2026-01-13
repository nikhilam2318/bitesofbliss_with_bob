import { useState, useEffect, useRef } from "react";
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
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const deliveryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        deliveryOpen &&
        deliveryRef.current &&
        !deliveryRef.current.contains(e.target as Node)
      ) {
        setDeliveryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [deliveryOpen]);

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
        {/* TAG */}
        <span
          className="inline-block text-accent font-bold tracking-[0.2em] uppercase text-[10px]
                     mb-6 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm
                     border border-accent/50"
        >
          Fusion Food
        </span>

        {/* HEADING */}
        <h1
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-extrabold
                     text-white mb-10 leading-tight drop-shadow-2xl"
        >
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
                       shadow-elevated hover:shadow-[0_0_30px_rgba(255,193,7,0.7)]
                       transition-all"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
          >
            View Menu
          </motion.button>

          {/* PICK UP */}
          <motion.button
            onClick={scrollToMenu}
            className="px-8 py-3 rounded-full text-base font-semibold
                       bg-black/60 text-white border border-white/30
                       hover:border-accent hover:text-accent
                       hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]
                       backdrop-blur-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Pick Up
          </motion.button>

          {/* ONLINE DELIVERY DROPDOWN */}
          <div className="relative" ref={deliveryRef}>
            <motion.button
              onClick={() => setDeliveryOpen(!deliveryOpen)}
              className="px-8 py-3 rounded-full text-base font-semibold
                         bg-black/60 text-white border border-white/30
                         hover:border-accent hover:text-accent
                         hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]
                         backdrop-blur-md transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Online Delivery
              <ChevronDown className="w-4 h-4" />
            </motion.button>

            <AnimatePresence>
              {deliveryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-3
                             bg-black/80 backdrop-blur-lg rounded-xl
                             border border-white/10 shadow-xl
                             p-3 flex flex-col gap-2 min-w-[220px]"
                >
                  <a
                    href="https://www.order.store/in/store/bob-bites-of-bliss-stoney-stanton-road/FE-alBQnTRiQt0nWZ8pysA"
                    target="_blank"
                    className="text-center px-4 py-2 rounded-md text-white
                               bg-accent hover:bg-yellow-400 transition-all font-medium"
                  >
                    Uber Eats
                  </a>

                  <a
                    href="#"
                    className="text-center px-4 py-2 rounded-md text-white
                               bg-accent hover:bg-yellow-400 transition-all font-medium"
                  >
                    Deliveroo Delivery
                  </a>

                  <a
                    href="#"
                    className="text-center px-4 py-2 rounded-md text-white
                               bg-accent hover:bg-yellow-400 transition-all font-medium"
                  >
                    Deliveroo Pickup
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

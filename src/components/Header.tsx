import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Menu", href: "#menu" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // 1. Close mobile menu immediately
    setMobileMenuOpen(false);

    // 2. WAIT 500ms (Increased from 300ms)
    // This ensures the menu animation is totally finished before scrolling starts.
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 500); 
  };

  const headerBgClass = scrolled || mobileMenuOpen 
    ? "bg-background/95 backdrop-blur-md shadow-soft" 
    : "bg-transparent";

  const textColorClass = scrolled || mobileMenuOpen 
    ? "text-foreground" 
    : "text-white drop-shadow-md";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${headerBgClass}`}
    >
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20 relative z-50">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            className="cursor-pointer"
          >
            <img 
              src="/images/logo.png" 
              alt="Bites of Bliss Logo" 
              className="h-14 w-auto rounded-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`relative group font-bold text-lg hover:text-accent transition-colors duration-300 ${textColorClass}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            <motion.button
              onClick={() => scrollToSection("#menu")}
              className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold shadow-soft hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Order Now
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
            >
              {mobileMenuOpen ? 
                <X className={`w-7 h-7 ${textColorClass}`} /> : 
                <Menu className={`w-7 h-7 ${textColorClass}`} />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 right-0 bg-background border-t border-border/50 shadow-lg z-40 md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-6">
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-left text-xl font-serif font-bold text-foreground hover:text-accent transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={() => scrollToSection("#menu")}
                className="w-full bg-accent text-accent-foreground px-6 py-3.5 rounded-full text-lg font-bold shadow-soft hover:bg-yellow-400 transition-colors mt-4"
                whileTap={{ scale: 0.98 }}
              >
                Order Now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
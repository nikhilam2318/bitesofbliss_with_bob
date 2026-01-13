import { useState, useEffect, useRef } from "react";
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.querySelector<HTMLElement>(href);
      if (!element) return;

      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }, 200);
  };

  const headerBgClass = scrolled
    ? "bg-background/95 backdrop-blur-md shadow-soft"
    : "bg-transparent";

  const textColorClass = scrolled
    ? "text-foreground"
    : "text-white drop-shadow-md";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all ${headerBgClass}`}
    >
      <div className="container-narrow mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
          >
            <img
              src="/images/logo.png"
              alt="Bites of Bliss Logo"
              className="h-14 w-auto rounded-full hover:scale-105 transition-transform"
            />
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={`font-bold text-lg hover:text-accent transition-colors ${textColorClass}`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className={`w-7 h-7 ${textColorClass}`} />
              ) : (
                <Menu className={`w-7 h-7 ${textColorClass}`} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="bg-background border-t md:hidden overflow-hidden"
          >
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-xl font-bold text-left"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;

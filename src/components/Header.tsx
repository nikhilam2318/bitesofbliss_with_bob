import { useState, useEffect } from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

@@ -12,7 +12,11 @@ const navLinks = [
const Header = () => {
const [scrolled, setScrolled] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll for navbar
useEffect(() => {
const handleScroll = () => {
setScrolled(window.scrollY > 20);
@@ -21,33 +25,47 @@ const Header = () => {
return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToSection = (href: string) => {
    // 1. Close mobile menu immediately
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        orderOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOrderOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [orderOpen]);

  const scrollToSection = (href: string): void => {
setMobileMenuOpen(false);
    setOrderOpen(false);

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
      const element = document.querySelector<HTMLElement>(href);
      if (!element) return;

      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }, 300);
};

  const headerBgClass = scrolled || mobileMenuOpen 
    ? "bg-background/95 backdrop-blur-md shadow-soft" 
  const headerBgClass = scrolled
    ? "bg-background/95 backdrop-blur-md shadow-soft"
: "bg-transparent";

  const textColorClass = scrolled || mobileMenuOpen 
    ? "text-foreground" 
  const textColorClass = scrolled
    ? "text-foreground"
: "text-white drop-shadow-md";

return (
@@ -58,21 +76,25 @@ const Header = () => {
>
<div className="container-narrow mx-auto px-4 md:px-8">
<div className="flex items-center justify-between h-20 relative z-50">
          {/* Logo */}

          {/* LOGO */}
<a
href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
className="cursor-pointer"
>
            <img 
              src="/images/logo.png" 
              alt="Bites of Bliss Logo" 
            <img
              src="/images/logo.png"
              alt="Bites of Bliss Logo"
className="h-14 w-auto rounded-full object-contain hover:scale-105 transition-transform duration-300"
/>
</a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
{navLinks.map((link) => (
<button
key={link.name}
@@ -83,7 +105,8 @@ const Header = () => {
<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
</button>
))}
            

            {/* ORDER NOW BUTTON */}
<motion.button
onClick={() => scrollToSection("#menu")}
className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold shadow-soft hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all"
@@ -92,24 +115,75 @@ const Header = () => {
>
Order Now
</motion.button>

            {/* ORDER ONLINE DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                onClick={() => setOrderOpen(!orderOpen)}
                className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold shadow-soft hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Order Online
              </motion.button>

              <AnimatePresence>
                {orderOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute right-0 mt-2 w-48 flex flex-col gap-2 bg-white rounded-xl shadow-lg overflow-hidden z-50 p-2"
                  >
                    <a
                      href="https://www.order.store/store/bob-bites-of-bliss/wvPbiWGoQBeBVGB_a6iV4Q"
                      target="_blank"
                      onClick={() => setOrderOpen(false)}
                      className="w-full bg-accent text-accent-foreground text-center px-4 py-2 rounded-md font-medium hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                    >
                       Uber Eats
                    </a>

                    <a
                      href="deliveroo://restaurants/735253?fulfillment_method=delivery&utm_medium=qrcode&utm_source=restaurant-hub"
                      target="_blank"
                      onClick={() => setOrderOpen(false)}
                      className="w-full bg-accent text-accent-foreground text-center px-4 py-2 rounded-md font-medium hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                    >
                       Deliveroo Delivery
                    </a>

                    <a
                      href="deliveroo://restaurants/735253?fulfillment_method=collection&utm_medium=qrcode&utm_source=restaurant-hub"
                      target="_blank"
                      onClick={() => setOrderOpen(false)}
                      className="w-full bg-accent text-accent-foreground text-center px-4 py-2 rounded-md font-medium hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                    >
                       Deliveroo Pickup
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
</nav>

          {/* Mobile Menu Toggle */}
          {/* MOBILE MENU TOGGLE */}
<div className="md:hidden">
<button
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
              className="p-2 rounded-full"
>
              {mobileMenuOpen ? 
                <X className={`w-7 h-7 ${textColorClass}`} /> : 
              {mobileMenuOpen ? (
                <X className={`w-7 h-7 ${textColorClass}`} />
              ) : (
<Menu className={`w-7 h-7 ${textColorClass}`} />
              }
              )}
</button>
</div>
</div>
</div>

      {/* Mobile Menu Dropdown */}
      {/* MOBILE MENU DROPDOWN */}
<AnimatePresence>
{mobileMenuOpen && (
<motion.div
@@ -119,32 +193,71 @@ const Header = () => {
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
            <nav className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-xl font-bold text-foreground hover:text-accent transition-colors"
                >
                  {link.name}
                </button>
              ))}

<motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
onClick={() => scrollToSection("#menu")}
                className="w-full bg-accent text-accent-foreground px-6 py-3.5 rounded-full text-lg font-bold shadow-soft hover:bg-yellow-400 transition-colors mt-4"
                className="w-full bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-bold shadow-soft hover:bg-yellow-400 transition-colors"
whileTap={{ scale: 0.98 }}
>
Order Now
</motion.button>

              {/* MOBILE ORDER ONLINE */}
              <div>
                <motion.button
                  onClick={() => setOrderOpen(!orderOpen)}
                  className="w-full bg-accent text-accent-foreground px-6 py-3.5 rounded-full font-bold shadow-soft hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(255,193,7,0.6)] transition-all mt-2"
                  whileTap={{ scale: 0.98 }}
                >
                  Order Online
                </motion.button>

                <AnimatePresence>
                  {orderOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex flex-col gap-2 mt-2"
                    >
                      <a
                        href="https://www.order.store/store/bob-bites-of-bliss/wvPbiWGoQBeBVGB_a6iV4Q"
                        target="_blank"
                        onClick={() => { setOrderOpen(false); setMobileMenuOpen(false); }}
                        className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium text-center hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                      >
                         Uber Eats
                      </a>

                      <a
                        href="deliveroo://restaurants/735253?fulfillment_method=delivery&utm_medium=qrcode&utm_source=restaurant-hub"
                        onClick={() => { setOrderOpen(false); setMobileMenuOpen(false); }}
                        className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium text-center hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                      >
                         Deliveroo Delivery
                      </a>

                      <a
                        href="deliveroo://restaurants/735253?fulfillment_method=collection&utm_medium=qrcode&utm_source=restaurant-hub"
                        onClick={() => { setOrderOpen(false); setMobileMenuOpen(false); }}
                        className="w-full bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium text-center hover:bg-yellow-400 hover:shadow-[0_0_15px_rgba(255,193,7,0.5)] transition-all"
                      >
                         Deliveroo Pickup
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
</nav>
</motion.div>
)}

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Filter } from "lucide-react";
import { getCategories, getItemsByCategory, searchItems } from "@/data/menuData";
import MenuCard from "./MenuCard";
import MobileFilterSheet from "./MobileFilterSheet";

const Menu = () => {
  const [activeType, setActiveType] = useState("Indian Breakfast"); 
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const menuTypes = ["Indian Breakfast", "Desi Mains", "BoB OG"];
  const categories = ["All", ...getCategories(activeType)];

  const getFilteredItems = () => {
    if (searchQuery.trim()) {
      return searchItems(searchQuery, "All");
    }
    
    if (activeCategory === "All") {
      const allCategories = getCategories(activeType);
      return allCategories.flatMap(cat => getItemsByCategory(cat, activeType));
    }
    
    return getItemsByCategory(activeCategory, activeType);
  };

  const filteredItems = getFilteredItems();
  
  // Group items by category for display
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  const handleTypeToggle = (type: string) => {
    setActiveType(type);
    setActiveCategory("All");
    setSearchQuery("");
  };

  return (
    <section id="menu" className="section-padding">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-accent font-medium tracking-widest uppercase text-sm mb-4 block">
            Explore
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Our Menu
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully crafted dishes, from classic English bites to authentic Indian food.
          </p>
        </motion.div>

        {/* --- GLOBAL SEARCH BAR + FILTER BUTTON --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto mb-8 px-4 md:px-0"
        >
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search all items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Filter Button (Yellow Highlighted) */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="w-12 h-12 bg-accent hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors shadow-sm group relative"
              title="Filter categories"
            >
              <Filter className="w-5 h-5 text-accent-foreground" />
            </button>
          </div>
        </motion.div>

        {/* --- 3-WAY TOGGLE SWITCH --- */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
        >
            <div className="bg-secondary p-1 rounded-full grid grid-cols-3 relative shadow-inner h-14 w-full max-w-[360px] items-center">
                {/* The Sliding Background */}
                <motion.div
                    className="absolute top-1 bottom-1 bg-accent rounded-full shadow-md z-0"
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    style={{
                        width: "calc((100% - 0.5rem) / 3)",
                        left: "0.25rem",
                    }}
                    animate={{
                        x: menuTypes.indexOf(activeType) * 100 + "%"
                    }}
                />

                {menuTypes.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleTypeToggle(type)}
                        className={`relative z-10 h-full flex items-center justify-center text-center px-1 transition-colors duration-200 ${
                            activeType === type ? 'text-accent-foreground' : 'text-muted-foreground'
                        }`}
                    >
                        <span className="text-xs sm:text-sm font-bold leading-tight uppercase tracking-tight">
                            {type}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>

        {/* Desktop Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block"
        >
          <div className="flex items-center justify-center gap-4 mb-12">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-x-auto scrollbar-hide flex justify-center"
            >
              <div className="flex gap-2 pb-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setSearchQuery("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-accent text-accent-foreground shadow-soft"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeType}-${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No items found</p>
              </div>
            ) : (
              Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="mb-12 last:mb-0">
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-xl md:text-2xl font-semibold text-foreground mb-6 flex items-center gap-4"
                  >
                    <span className="w-8 md:w-12 h-0.5 bg-accent" />
                    {category}
                  </motion.h3>

                  {/* 4 Cards per row on desktop (lg:grid-cols-4) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {items.map((item, index) => (
                      <MenuCard key={item.id} item={item} index={index} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Filter Sheet - Categories only */}
        <MobileFilterSheet
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setSearchQuery("");
          }}
        />
      </div>
    </section>
  );
};

export default Menu;
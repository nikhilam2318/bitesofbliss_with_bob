import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const MobileFilterSheet = ({
  isOpen,
  onClose,
  categories,
  activeCategory,
  onSelectCategory,
}: MobileFilterSheetProps) => {
  const handleShowResults = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-3xl z-50 max-h-[70vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="font-serif text-xl font-semibold text-foreground">Filter Menu</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content - Categories Only */}
            <div className="p-5">
              <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                Categories
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => onSelectCategory(category)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-accent text-accent-foreground shadow-soft"
                        : "bg-transparent border-2 border-foreground/20 text-foreground hover:border-accent"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 border-t border-border">
              <motion.button
                onClick={handleShowResults}
                className="w-full py-4 bg-accent text-accent-foreground rounded-xl font-semibold text-lg shadow-soft"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Show Results
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterSheet;

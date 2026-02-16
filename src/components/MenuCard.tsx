import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, X, Check } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

// --- CUSTOMIZATION CONFIGURATION ---
type Option = { name: string; price: number };
type OptionGroup = {
  title: string;
  type: "checkbox" | "radio";
  options: Option[];
  required?: boolean;
  conditionalOn?: string; 
};

// 1. UPDATED: Added "(Combo)" to names to prevent conflict with Extra Drinks
const COMBO_DRINK_OPTIONS = [
  { name: "Fanta (Combo)", price: 0 },
  { name: "Dr Pepper (Combo)", price: 0 },
  { name: "Coke (Combo)", price: 0 },
];

// 2. Water is separate and costs £1.00
const EXTRA_WATER_OPTION = [
  { name: "Water", price: 1.00 }
];

// 3. Standard "Add Drinks" list (Fixed one)
const STANDARD_ADD_DRINKS = [
  { name: "Fanta", price: 1.00 },
  { name: "Dr Pepper", price: 1.00 },
  { name: "Coke", price: 1.00 },
  { name: "Water", price: 1.00 }, 
];

const SAUCES_LIST = [
  { name: "BoB Sauce", price: 0.50 },
  { name: "Ranch Sauce", price: 0.50 },
];

const CUSTOMIZATIONS: Record<string, OptionGroup[]> = {
  "taco-custom": [
    {
      title: "Add Condiments",
      type: "checkbox",
      options: SAUCES_LIST
    },
    {
      title: "Add Drinks",
      type: "checkbox",
      options: STANDARD_ADD_DRINKS
    }
  ],
  "burger-lamb": [
    {
      title: "Preparation Option",
      type: "checkbox",
      options: [{ name: "Make It Combo (Fries & Drink)", price: 1.99 }]
    },
    {
      title: "Select Your Combo Drink",
      type: "radio",
      required: true,
      conditionalOn: "Make It Combo (Fries & Drink)", 
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Protein",
      type: "checkbox",
      options: [{ name: "Extra Patty", price: 1.00 }]
    },
    {
      title: "Extra Cheese",
      type: "checkbox",
      options: [{ name: "Extra Cheese", price: 1.00 }] 
    },
    {
      title: "Add Extra Drinks",
      type: "checkbox",
      options: STANDARD_ADD_DRINKS
    }
  ],
  "burger-chicken": [
    {
      title: "Preparation Option",
      type: "checkbox",
      options: [{ name: "Make It Combo (Fries & Drink)", price: 1.99 }]
    },
    {
      title: "Select Your Combo Drink",
      type: "radio",
      required: true,
      conditionalOn: "Make It Combo (Fries & Drink)", 
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Cheese",
      type: "checkbox",
      options: [{ name: "Extra Cheese", price: 1.00 }] 
    },
    {
      title: "Add Extra Drinks",
      type: "checkbox",
      options: STANDARD_ADD_DRINKS
    }
  ],
  "combo-4tacos": [
    {
      title: "Choose Tacos",
      type: "radio",
      required: true,
      options: [
        { name: "Chicken Tacos", price: 0 },
        { name: "Lamb Tacos", price: 0 }
      ]
    },
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
  ],
  "combo-2nashville": [
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
  ],
  "combo-2tacos": [
    {
      title: "Choose Tacos",
      type: "radio",
      required: true,
      options: [
        { name: "Chicken Tacos", price: 0 },
        { name: "Lamb Tacos", price: 0 }
      ]
    },
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
  ],
   "combo-chickendum": [
    
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
   ],
   "combo-frypeice": [
    
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
   ],
   "combo-muttonbir": [
    
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
   ],
   "combo-gongurachick": [
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
   ],

   "combo-gonmuttonbir": [
    {
      title: "Choose Drink",
      type: "radio",
      required: true,
      options: COMBO_DRINK_OPTIONS
    },
    {
      title: "Extra Drinks",
      type: "checkbox",
      options: EXTRA_WATER_OPTION
    }
   ],
  "strips-custom": [
    {
        title: "Choose Size",
        type: "radio",
        required: true,
        options: [
            { name: "3 Pcs", price: 0 },      
            { name: "5 Pcs", price: 1.49 },   
            { name: "10 Pcs", price: 5.49 },  
        ]
    }
  ],
  "wings-custom": [
    {
        title: "Choose Size",
        type: "radio",
        required: true,
        options: [
            { name: "4 Pcs", price: 0 },      
            { name: "6 Pcs", price: 2.00 },   
            { name: "12 Pcs", price: 3.51 },  
        ]
    }
  ],
  "fries-custom": [
    {
        title: "Choose Size",
        type: "radio",
        required: true,
        options: [
            { name: "Regular", price: 0 },     
            { name: "Large", price: 0.51 },    
        ]
    }
  ],
  "biryani-chicken-custom": [
    {
        title: "Choose Portion",
        type: "radio",
        required: true,
        options: [
            { name: "Regular", price: 0 },     
            { name: "Large", price: 2.00 },    
        ]
    }
  ],
  "biryani-mutton-custom": [
    {
        title: "Choose Portion",
        type: "radio",
        required: true,
        options: [
            { name: "Regular", price: 0 },     
            { name: "Large", price: 2.00 },    
        ]
    }
  ]
};

// -----------------------------------

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const MenuCard = ({ item, index }: MenuCardProps) => {
  // UPDATED: Destructure updateQuantity to allow decrementing directly
  const { addItem, updateQuantity, items } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // --- LOGIC: Check current quantity for Standard Items ---
  // If item is customizable, we don't show controls on the card (as each add is unique)
  const isStandardItem = !item.customizationId;
  const cartItem = isStandardItem 
    ? items.find(i => i.id === item.id && (!i.selectedOptions || i.selectedOptions.length === 0))
    : null;
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  // -- Modal Logic --
  const handleOptionToggle = (group: OptionGroup, option: Option) => {
    if (group.type === 'radio') {
      const otherOptionsNames = group.options.map(o => o.name);
      const filtered = selectedOptions.filter(opt => !otherOptionsNames.includes(opt));
      setSelectedOptions([...filtered, option.name]);
    } else {
      if (selectedOptions.includes(option.name)) {
        let newSelection = selectedOptions.filter(o => o !== option.name);
        const config = CUSTOMIZATIONS[item.customizationId || ""];
        if (config) {
          const dependentGroups = config.filter(g => g.conditionalOn === option.name);
          dependentGroups.forEach(g => {
            const dependentOptionNames = g.options.map(o => o.name);
            newSelection = newSelection.filter(sel => !dependentOptionNames.includes(sel));
          });
        }
        setSelectedOptions(newSelection);
      } else {
        setSelectedOptions(prev => [...prev, option.name]);
      }
    }
  };

  const calculateTotal = () => {
    let total = item.price;
    const config = CUSTOMIZATIONS[item.customizationId || ""];
    if (!config) return total;

    config.forEach(group => {
      if (group.conditionalOn && !selectedOptions.includes(group.conditionalOn)) {
        return;
      }
      group.options.forEach(opt => {
        if (selectedOptions.includes(opt.name)) {
          total += opt.price;
        }
      });
    });
    return total;
  };

  const handleAddToCart = () => {
    if (item.customizationId) {
      setIsModalOpen(true);
      const config = CUSTOMIZATIONS[item.customizationId];
      const defaults: string[] = [];
      config.forEach(group => {
          if (group.type === 'radio' && group.required && group.options.length > 0) {
              defaults.push(group.options[0].name);
          }
      });
      setSelectedOptions(defaults);
    } else {
      addItem(item);
    }
  };

  const confirmCustomization = () => {
    const config = CUSTOMIZATIONS[item.customizationId || ""];
    if (config) {
      for (const group of config) {
        if (group.conditionalOn && !selectedOptions.includes(group.conditionalOn)) {
          continue; 
        }
        if (group.required) {
          const hasSelection = group.options.some(opt => selectedOptions.includes(opt.name));
          if (!hasSelection) {
            alert(`Please select an option for ${group.title}`);
            return;
          }
        }
      }
    }
    const finalPrice = calculateTotal();
    addItem(item, 1, selectedOptions, finalPrice);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
        className="card-menu overflow-hidden group flex flex-row md:flex-col cursor-pointer bg-card rounded-2xl shadow-sm border border-border/50 hover:border-accent hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all p-2 md:p-0 gap-3 md:gap-0"
      >
        {/* Image */}
        <div className="relative w-28 h-28 md:w-full md:h-52 flex-shrink-0 overflow-hidden rounded-xl md:rounded-none">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between md:p-4">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground leading-tight mb-1 md:mb-2 line-clamp-2">
              {item.name}
            </h3>
            
            <span className="text-amber-600 font-black text-xl block mb-2">
              £{item.price.toFixed(2)}
            </span>

            {item.description && (
              <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{item.description}</p>
            )}
          </div>

          {/* --- BUTTON AREA (Conditional Render) --- */}
          {isStandardItem && quantityInCart > 0 ? (
            // QUANTITY CONTROLS (Matches the image style)
            <div className="flex items-center justify-between w-full md:w-[90%] md:mx-auto">
               <motion.button
                 whileTap={{ scale: 0.9 }}
                 onClick={(e) => {
                   e.stopPropagation();
                   updateQuantity(item.id, quantityInCart - 1);
                 }}
                 className="w-12 h-10 rounded-2xl border-2 border-accent text-accent-foreground flex items-center justify-center font-bold text-xl bg-transparent hover:bg-accent/10 transition-colors"
               >
                 <Minus className="w-5 h-5" />
               </motion.button>

               <span className="font-bold text-xl text-foreground w-8 text-center">
                 {quantityInCart}
               </span>

               <motion.button
                 whileTap={{ scale: 0.9 }}
                 onClick={(e) => {
                    e.stopPropagation();
                    addItem(item);
                 }}
                 className="w-12 h-10 rounded-2xl border-2 border-accent text-accent-foreground flex items-center justify-center font-bold text-xl bg-transparent hover:bg-accent/10 transition-colors"
               >
                 <Plus className="w-5 h-5" />
               </motion.button>
            </div>
          ) : (
            // STANDARD ADD BUTTON
            <motion.button
              onClick={handleAddToCart}
              className="w-full md:w-[90%] md:mx-auto flex items-center justify-center gap-2 py-2 md:py-2.5 bg-accent hover:bg-gold-dark text-accent-foreground rounded-xl text-sm font-bold shadow-sm transition-colors duration-300"
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span className="md:hidden">Add</span>
              <span className="hidden md:inline">Add to Cart</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* --- CUSTOMIZATION MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-background w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-md p-4 border-b border-border flex items-center justify-between z-10">
                <h3 className="font-serif text-xl font-bold">{item.name}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-6">
                {CUSTOMIZATIONS[item.customizationId || ""].map((group, idx) => {
                  if (group.conditionalOn && !selectedOptions.includes(group.conditionalOn)) {
                    return null;
                  }

                  return (
                    <div key={idx}>
                      <h4 className="font-bold text-base mb-3 flex items-center justify-between">
                        {group.title}
                        {group.required && <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">Required</span>}
                      </h4>
                      <div className="space-y-2">
                        {group.options.map((opt, optIdx) => {
                          const isSelected = selectedOptions.includes(opt.name);
                          return (
                            <div 
                              key={optIdx} 
                              onClick={() => handleOptionToggle(group, opt)}
                              className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                                isSelected 
                                  ? 'border-accent bg-accent/5' 
                                  : 'border-border hover:border-accent/50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                                  isSelected ? 'bg-accent border-accent text-accent-foreground' : 'border-muted-foreground'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3" />}
                                </div>
                                <span className="font-medium text-sm">{opt.name}</span>
                              </div>
                              {opt.price > 0 && (
                                <span className="text-sm font-bold text-muted-foreground">+£{opt.price.toFixed(2)}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 p-4 border-t border-border bg-background">
                <button
                  onClick={confirmCustomization}
                  className="w-full py-3.5 bg-accent text-accent-foreground rounded-xl font-bold text-lg shadow-lg hover:bg-yellow-400 transition-all flex items-center justify-between px-6"
                >
                  <span>Add to Cart</span>
                  <span>£{calculateTotal().toFixed(2)}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MenuCard;
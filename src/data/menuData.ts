export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  type: "BoB OG" | "Indian Breakfast" | "Desi Mains";
  image: string;
  description?: string;
  customizationId?: string; // New field to trigger modals
}

export const menuItems: MenuItem[] = [
  // ==========================================
  // 1. BoB OG (Prices Increased by £1.00)
  // ==========================================

  // THE BIG N' SPICY
  { id: 16, name: "BOB Crispy Chicken Tacos", price: 6.99, category: "THE BIG N' SPICY", type: "BoB OG", image: "/images/taco.jpg", customizationId: "taco-custom" },
  { id: 17, name: "BOB Lamb Tacos", price: 6.99, category: "THE BIG N' SPICY", type: "BoB OG", image: "/images/lambtaco.jpg", customizationId: "taco-custom" },
  { id: 18, name: "BOB Crispy Chicken Burger", price: 5.99, category: "THE BIG N' SPICY", type: "BoB OG", image: "/images/Crispy-chicken-burger.jpg", customizationId: "burger-chicken" },
  { id: 19, name: "BOB Smash Lamb Burger", price: 5.99, category: "THE BIG N' SPICY", type: "BoB OG", image: "/images/lambburger.jpg", customizationId: "burger-lamb" },

  // COMBOS
  { id: 25, name: "4 Mexican Tacos Combo", description: "Includes Regular fries + Soft drink", price: 11.99, category: "COMBOS", type: "BoB OG", image: "/images/combo.jpg", customizationId: "combo-4tacos" },
  { id: 26, name: "2 Nashville Chicken Burgers Combo", description: "Includes Regular fries + Soft drink", price: 12.99, category: "COMBOS", type: "BoB OG", image: "/images/2nashville-combo.jpg", customizationId: "combo-2nashville" },
  { id: 27, name: "2 Mexican Tacos Combo", description: "Includes Regular fries + Soft drink", price: 12.99, category: "COMBOS", type: "BoB OG", image: "/images/2tacos-combo.jpg", customizationId: "combo-2tacos" },
  { id: 179, name:"Chicken Dum Biryani", description: "Includes Chicken 65 + Soft drink", price: 12.99, category: "COMBOS", type: "BoB OG", image: "/images/chickendum.png", customizationId: "combo-chickendum"},
  { id: 180, name:"Chicken Fry Piece Biryani", description: "Includes Chilli chicken + Soft drink", price: 13.99, category: "COMBOS", type: "BoB OG", image: "/images/frypeice.png", customizationId: "combo-frypeice"},
  { id: 181, name:"Mutton Fry Peice Biryani", description: "Includes Chilli chicken + Soft drink", price: 13.99, category: "COMBOS", type: "BoB OG", image: "/images/muttonfry.jpeg", customizationId: "combo-muttonbir"},
  { id: 182, name:"Gongura Chicken Biryani", description: "Includes Chilli chicken + Soft drink", price: 14.99, category: "COMBOS", type: "BoB OG", image: "/images/gongura_chickenbiryani.webp", customizationId: "combo-gongurachick"},
  { id: 183, name:"Gongura Mutton Biryani", description: "Includes Chicken 65 + Soft drink", price: 14.99, category: "COMBOS", type: "BoB OG", image: "/images/gongura_muttonbiryani.jpg", customizationId: "combo-gonmuttonbir"},


  // FRYER'S CLUB (Consolidated Items with Customizations)
  { id: 1, name: "Chicken Strips", price: 4.50, category: "FRYER'S CLUB", type: "BoB OG", image: "/images/3pc-chicken-strips.jpg", customizationId: "strips-custom" },
  { id: 4, name: "Chicken Wings", price: 3.99, category: "FRYER'S CLUB", type: "BoB OG", image: "/images/4pc-wings.jpg", customizationId: "wings-custom" },
  { id: 7, name: "Fries", price: 1.99, category: "FRYER'S CLUB", type: "BoB OG", image: "/images/fries.jpg", customizationId: "fries-custom" },
  // SPECIAL BOB SAUCES (New Added Category)
  { id: 81, name: "BoB Sauce", price: 0.50, category: "SPECIAL BOB SAUCES", type: "BoB OG", image: "/images/bobsauce.jpg" },
  { id: 82, name: "Ranch Sauce", price: 0.50, category: "SPECIAL BOB SAUCES", type: "BoB OG", image: "/images/ranchsauce.jpg" },

  // SUNDAES (Prices + £1.00)
  { id: 22, name: "Lotus Biscoff Sundae", price: 4.99, category: "SUNDAES", type: "BoB OG", image: "/images/lotusbiscoffsundae.jpeg" },
  { id: 23, name: "Oreo Sundae", price: 4.99, category: "SUNDAES", type: "BoB OG", image: "/images/oreosundae.jpg" },
  { id: 24, name: "Kinder Bueno Sundae", price: 4.99, category: "SUNDAES", type: "BoB OG", image: "/images/kindersundae.jpg" },

  // BEVERAGES (Prices + £1.00)
  { id: 9, name: "Lotus Biscoff Milkshake", price: 3.99, category: "BEVERAGES", type: "BoB OG", image: "/images/biscoff.jpg" },
  { id: 10, name: "Oreo Milkshake", price: 3.99, category: "BEVERAGES", type: "BoB OG", image: "/images/oreo.jpg" },
  { id: 11, name: "Kinder Bueno Milkshake", price: 3.99, category: "BEVERAGES", type: "BoB OG", image: "/images/kinder.jpg" },
  { id: 12, name: "Coke", price: 1.00, category: "BEVERAGES", type: "BoB OG", image: "/images/coke.jpg" },
  { id: 13, name: "Fanta", price: 1.00, category: "BEVERAGES", type: "BoB OG", image: "/images/fanta.jpg" },
  { id: 14, name: "Dr Pepper", price: 1.00, category: "BEVERAGES", type: "BoB OG", image: "/images/drpepper.jpg" },
  { id: 15, name: "Still Water", price: 1.00, category: "BEVERAGES", type: "BoB OG", image: "/images/water.jpg" },

  // ==========================================
  // 2. Indian Breakfast
  // ==========================================

  // DOSA-LICIOUS
  { id: 28, name: "Plain Dosa", price: 2.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/plain-dosa.jpg" },
  { id: 29, name: "Onion Dosa", price: 3.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/onion-dosa.jpg" },
  { id: 30, name: "Ghee Karam Dosa", price: 3.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/gheedosa.jpg" },
  { id: 31, name: "Masala Dosa", price: 4.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/masala-dosa.jpg" },
  { id: 32, name: "Egg Dosa", price: 5.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/Egg-dosa.jpg" },
  { id: 33, name: "Paneer Butter Dosa", price: 5.99, category: "DOSA-LICIOUS", type: "Indian Breakfast", image: "/images/paneer-Butter-dosa.jpg" },

  // TIFFIN-TASTIC
  { id: 37, name: "Bonda", price: 3.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/bonda.jpg" },
  { id: 38, name: "Tawa Bonda", price: 5.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/Tawa-bonda.jpg" },
  { id: 39, name: "Idli", price: 2.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/idli.jpg" },
  { id: 40, name: "Ghee Karam Idli", price: 3.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/ghee-karam-idli.jpg" },
  { id: 41, name: "Tawa Idli", price: 4.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/tawa-idli.jpg" },
  
  // NEW TIFFIN-TASTIC ITEMS
  { id: 43, name: "Sambar Idly", price: 4.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/sambar_idly.jpg" },
  { id: 44, name: "Idly with Chicken Curry", price: 5.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/idli_chicken.jpg" },
  { id: 45, name: "Kheema Dosa", price: 6.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/kheema_dosa.jpeg" },
  { id: 46, name: "Dosa with Chicken Curry", price: 6.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/dosa_chicken.jpg" },
  { id: 47, name: "Poori with Bombay Chutney", price: 5.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/poori_bombay.jpg" },
  { id: 48, name: "Poori with Chicken Curry", price: 6.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/poori_chicken.jpg" },
  { id: 49, name: "Poori Kheema", price: 6.99, category: "TIFFIN-TASTIC", type: "Indian Breakfast", image: "/images/kheema_puri.jpg" },
  
  // ADDED CHUTNEYS (CONDIMENTS)
  { id: 79, name: "Peanut Chutney", price: 0.50, category: "CONDIMENTS", type: "Indian Breakfast", image: "/images/peanutchutney.jpg" },
  { id: 80, name: "Tomato Chutney", price: 0.50, category: "CONDIMENTS", type: "Indian Breakfast", image: "/images/tomatochutney.jpg" },

  // ==========================================
  // 3. Desi Mains
  // ==========================================

  // BOB BOSS OF BIRYANIS (Consolidated)
  { id: 50, name: "Chicken Dum Biryani", price: 5.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/chickendum_biryani.jpg", customizationId: "biryani-chicken-custom" },
  { id: 52, name: "Chicken Fry Piece Biryani", price: 8.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/chickenfrypiece_biryani.jpg" },
  { id: 53, name: "Mutton Dum Biryani", price: 6.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/muttondum_biryani.jpg", customizationId: "biryani-mutton-custom" },
  { id: 55, name: "Mutton Fry Piece Biryani", price: 9.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/muttonfrypiece_biryani.jpg" },
  { id: 56, name: "Prawns Fry Biryani", price: 9.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/prawnsfry_biryani.jpg" },
  { id: 57, name: "Gongura Chicken Biryani", price: 9.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/gongura_chickenbiryani.webp" },
  { id: 58, name: "Gongura Mutton Biryani", price: 10.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/gongura_muttonbiryani.jpg" },
  { id: 59, name: "Gongura Prawns Biryani", price: 10.99, category: "BOB BOSS OF BIRYANIS", type: "Desi Mains", image: "/images/gonguraprawns_biryani.jpeg" },

  // FUSION BOB
  { id: 60, name: "Egg Fried Rice", price: 5.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/eggfriedrice.jpg" },
  { id: 61, name: "Veg Fried Rice", price: 5.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/vegfriedrice.jpg" },
  { id: 62, name: "Chicken Fried Rice", price: 6.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/chickenfriedrice.jpg" },
  { id: 63, name: "Prawns Fried Rice", price: 7.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/prawnsfriedrice.jpg" },
  { id: 64, name: "Egg Noodles", price: 5.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/eggnoodles.jpg" },
  { id: 65, name: "Veg Noodles", price: 5.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/vegnoodles.jpg" },
  { id: 66, name: "Chicken Noodles", price: 6.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/chickennoodles.webp" },
  { id: 67, name: "Prawns Noodles", price: 7.99, category: "FUSION BOB", type: "Desi Mains", image: "/images/prawnsnoodles.jpg" },

  // BOB STARTER PACK
  { id: 68, name: "Chilli Gobi", price: 6.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chilli_gobi.jpg" },
  { id: 69, name: "Paneer Chilli", price: 6.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chilli_paneer.jpg" },
  { id: 70, name: "Chilli Chicken", price: 6.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chilli_chicken.jpg" },
  { id: 71, name: "Gobi 65", price: 5.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/gobi65.jpg" },
  { id: 72, name: "Paneer 65", price: 5.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/paneer65.jpg" },
  { id: 73, name: "Chicken 65", price: 5.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chicken65.jpg" },
  { id: 74, name: "Gobi Manchuria", price: 5.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/gobi_manchuria.jpg" },
  { id: 75, name: "Chicken Manchuria", price: 5.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chicken_manchuria.jpeg" },
  { id: 76, name: "Chicken Pakodi", price: 4.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/chicken_pakodi.jpg" },
  { id: 77, name: "Mirchi Bajji", price: 3.99, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/mirchibajji.jpg" },
  { id: 78, name: "Punugulu", price: 4.50, category: "BOB STARTER PACK", type: "Desi Mains", image: "/images/punugulu.webp" },
  
  //BOB MANDI
  { id: 83, name: "Chicken Mandi", price: 10.99, category: "BOB MANDI", type: "Desi Mains", image: "/images/chickmandi.jpeg", customizationId: "chicken-mandi-custom" },
];

export const getCategories = (type?: string) => {
  const filteredItems = type && type !== "All" 
    ? menuItems.filter(item => item.type === type)
    : menuItems;
    
  return [...new Set(filteredItems.map(item => item.category))];
};

export const getItemsByCategory = (category: string, type?: string) => {
  return menuItems.filter(item => {
    const matchesCategory = item.category === category;
    const matchesType = !type || type === "All" || item.type === type;
    return matchesCategory && matchesType;
  });
};

export const searchItems = (query: string, type?: string) => {
  const lowerQuery = query.toLowerCase();
  return menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(lowerQuery) || 
                          item.category.toLowerCase().includes(lowerQuery);
    const matchesType = !type || type === "All" || item.type === type;
    return matchesSearch && matchesType;
  });
};
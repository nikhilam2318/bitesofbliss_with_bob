import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "@/data/menuData";

// UPDATED: CartItem now tracks selected options
export interface CartItem extends MenuItem {
  quantity: number;
  selectedOptions?: string[]; 
}

interface CartContextType {
  items: CartItem[];
  // UPDATED: addItem now accepts options and a specific price (for bundles/addons)
  addItem: (item: MenuItem, quantity?: number, options?: string[], finalPrice?: number) => void;
  // UPDATED: remove/update now need to know which variant to touch
  removeItem: (id: number, options?: string[]) => void;
  updateQuantity: (id: number, quantity: number, options?: string[]) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Helper to generate a unique key for options
  const getOptionsKey = (options?: string[]) => {
    return options ? JSON.stringify([...options].sort()) : "[]";
  };

  // UPDATED: Add Item handles variants
  const addItem = (item: MenuItem, quantity = 1, options: string[] = [], finalPrice?: number) => {
    setItems(prev => {
      const optionsKey = getOptionsKey(options);
      
      // Check if we already have this item with EXACTLY these options
      const existingItemIndex = prev.findIndex(i => 
        i.id === item.id && getOptionsKey(i.selectedOptions) === optionsKey
      );

      if (existingItemIndex > -1) {
        // Update existing item quantity
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      }

      // Add new item (Override price if finalPrice is provided from customization)
      return [...prev, { 
        ...item, 
        quantity, 
        selectedOptions: options,
        price: finalPrice !== undefined ? finalPrice : item.price 
      }];
    });
    
  };

  // UPDATED: Remove specific variant
  const removeItem = (id: number, options: string[] = []) => {
    const targetKey = getOptionsKey(options);
    setItems(prev => prev.filter(i => 
      !(i.id === id && getOptionsKey(i.selectedOptions) === targetKey)
    ));
  };

  // UPDATED: Update specific variant quantity
  const updateQuantity = (id: number, quantity: number, options: string[] = []) => {
    const targetKey = getOptionsKey(options);
    
    if (quantity <= 0) {
      removeItem(id, options);
      return;
    }

    setItems(prev => 
      prev.map(i => 
        (i.id === id && getOptionsKey(i.selectedOptions) === targetKey)
          ? { ...i, quantity } 
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice,
      isOpen,
      setIsOpen,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
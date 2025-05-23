
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "@/data/products";
import { toast } from "@/components/ui/sonner";

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  price: number;
  variantId?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number, selectedSize: string, selectedColor: { name: string; hex: string }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number, selectedSize: string, selectedColor: { name: string; hex: string }) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => 
        item.product.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor.name === selectedColor.name
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { 
        id: product.id,
        product, 
        quantity, 
        selectedSize, 
        selectedColor,
        price: product.price,
        variantId: undefined
      }]);
    }
    
    toast(`Added ${quantity} ${product.name} to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

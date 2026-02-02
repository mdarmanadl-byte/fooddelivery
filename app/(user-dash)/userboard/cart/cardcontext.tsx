'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
 const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const res = await fetch('/api/user/cart');
    const data = await res.json();
    setCartItems(data.items || []);
  };
  const clearCart = () => {
    setCartItems([]);
    
  };
  useEffect(() => { fetchCart(); }, []);

  // Use this for BOTH adding new items and updating quantities
  const updateQuantity = async (id: string, change: number) => {
    try {
      // Find the item in state to get the foodId
      const item: any = cartItems.find((i: any) => i.id === id);
      const foodId = item ? item.foodId : id; // fallback if id is already foodId

      const res = await fetch('/api/user/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodId, change }), // Use lowercase 'change'
      });

      if (res.ok) await fetchCart();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart: (food: any) => updateQuantity(food.id, 1), 
      updateQuantity, // NOW THE CART PAGE CAN SEE THIS
      removeFromCart: async (id: string) => { /* Add delete logic here */ } ,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);



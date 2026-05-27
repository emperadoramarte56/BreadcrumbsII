import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ product, qty }]

  function addItem(product, qty = 1) {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
            : i
        );
      }
      return [...prev, { product, qty: Math.min(qty, product.stock) }];
    });
  }

  function removeItem(productId) {
    setItems(prev => prev.filter(i => i.product.id !== productId));
  }

  function updateQty(productId, qty) {
    if (qty <= 0) { removeItem(productId); return; }
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId
          ? { ...i, qty: Math.min(qty, i.product.stock) }
          : i
      )
    );
  }

  function clearCart() { setItems([]); }

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

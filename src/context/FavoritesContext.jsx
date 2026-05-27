import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites]           = useState([]);
  const [pendingProduct, setPendingProduct] = useState(null); // producto esperando login

  function toggleFavorite(product, user, openAccountModal) {
    if (!user) {
      setPendingProduct(product);
      openAccountModal();
      return;
    }
    setFavorites(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  }

  // Llama esto justo después de que el usuario inicia sesión
  function confirmPending(user) {
    if (pendingProduct && user) {
      setFavorites(prev =>
        prev.find(p => p.id === pendingProduct.id)
          ? prev
          : [...prev, pendingProduct]
      );
      setPendingProduct(null);
    }
  }

  function isFavorite(productId) {
    return favorites.some(p => p.id === productId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, pendingProduct, confirmPending }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}

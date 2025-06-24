// context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductCart, CartContextType } from '../app/lib/types'; // Importamos los tipos

// Valor inicial del contexto (puede ser null o un objeto por defecto)
// Es común inicializarlo con un valor que represente su estado "vacío" o "no inicializado"
// para evitar errores de tipo si se usa antes de que el Provider lo establezca.
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Propiedades del CartProvider
interface CartProviderProps {
  children: ReactNode; // Define ReactNode para los children
}

// El Provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ProductCart[]>([]);

  // Opcional: Cargar carrito desde localStorage al inicio (para persistencia)
  useEffect(() => {
    // Asegurarse de que el código se ejecute solo en el cliente
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cartItems');
      if (storedCart) {
        try {
          const parsedCart: ProductCart[] = JSON.parse(storedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Failed to parse cart items from localStorage:", error);
          localStorage.removeItem('cartItems'); // Limpiar datos corruptos
        }
      }
    }
  }, []);

  // Opcional: Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Funciones para manipular el carrito
  const addToCart = (product: ProductCart) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
        .filter((item) => item.quantity > 0) // Eliminar si la cantidad llega a 0
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // El valor que se proveerá a los consumidores del contexto, tipado como CartContextType
  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity, 
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
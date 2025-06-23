// types/index.ts

export interface Product {
  id: number;
  name: string;
  price: number;
  // Agrega otras propiedades del producto si las tienes (ej: image, description)
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string; // Devolver string para .toFixed(2)
}
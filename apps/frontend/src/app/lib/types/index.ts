// types/index.ts

export interface ProductCart {
  id: number;
  name: string;
  price: number;
  image: string; // Opcional, si tienes imágenes de productos
  // Agrega otras propiedades del producto si las tienes (ej: image, description)
  quantity: number;
}


export interface CartContextType {
  cartItems: ProductCart[];
  addToCart: (product: ProductCart) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => string; // Devolver string para .toFixed(2)
}
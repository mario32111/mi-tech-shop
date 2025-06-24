// apps/frontend/src/app/cart/page.tsx
'use client'; // ¡IMPORTANTE! Marca esta página como Client Component

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../context/context'; // Ajusta la ruta a tu CartContext

const CartPage: React.FC = () => {
  // Obtenemos todos los métodos y el estado del carrito usando nuestro custom hook
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart,
  } = useCart();

  // Si el carrito está vacío, mostramos un mensaje diferente
  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] p-6 bg-white text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-center">Tu Carrito de Compras</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">¡Tu carrito está vacío!</p>
        <p className="text-lg text-gray-500 mb-8 text-center">Parece que aún no has agregado ningún producto. ¡Explora nuestra tienda y encuentra lo que necesitas!</p>
        <Link href="/products" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
          Ir a la Tienda
        </Link>
      </div>
    );
  }

  // Si el carrito tiene ítems, mostramos la lista
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg my-8 text-gray-800 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center border-b pb-4">Tu Carrito de Compras ({getTotalItems()} ítems)</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
            <img src={item.image || '/placeholder-product.jpg'} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-6 shadow-sm" />
            
            <div className="flex-grow">
              <h2 className="text-xl font-semibold">{item.name}</h2>
              <p className="text-lg text-gray-700 mt-1">${item.price.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-3 mx-4">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
                disabled={item.quantity <= 1} // Deshabilita si la cantidad es 1 para no bajar a 0
              >
                -
              </button>
              <span className="text-xl font-medium w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition duration-300"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-6 mt-8 flex flex-col items-end">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Total: ${getTotalPrice()}</h2>
        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
          >
            Vaciar Carrito
          </button>
          <button
            // Aquí iría la lógica para proceder al pago
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
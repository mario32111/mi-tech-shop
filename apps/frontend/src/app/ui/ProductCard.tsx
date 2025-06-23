import React from "react";
import { Product } from "../lib/definitions"; // Asegúrate de que la ruta sea correcta
import Link from "next/link";


// Componente ProductCard
export default function ProductCard({ product }: { product: Product }) {
  return ( // ¡Faltaba este return!
    <Link
      href={`/product/${product.id}`} // Link to product detail page

      key={product.id}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-32 h-32 object-contain mb-4"
        loading="lazy"
      />
      <h2 className="text-lg font-semibold mb-2 text-center">{product.title}</h2>
      <div className="mb-2">
        <span className="text-gray-400 line-through mr-2">
          ${product.price}
        </span>
        <span className="text-2xl font-bold text-red-600">
          ${(product.price - (product.discountPercentage * 0.01 * product.price)).toFixed(2)}
        </span>
      </div>

    </Link>
  );
}
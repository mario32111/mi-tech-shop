import React from "react";
import { Product } from "../lib/definitions"; // Ensure the path is correct

export default function ProductResult({ product }: { product: Product }) {
  const discountedPrice = (
    product.price -
    product.discountPercentage * 0.01 * product.price
  ).toFixed(2);

  return (
    <div
      key={product.id}
      className="
        w-full bg-white rounded-lg shadow-md p-4 flex
        flex-row items-center justify-between            /* Default for mobile (ProductResult layout) */
        md:flex-col md:items-center md:justify-start    /* On medium screens and up (ProductCard layout) */
        hover:shadow-xl transition-shadow
      "
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="
          w-12 h-12 object-contain mr-4             /* Mobile image size and margin */
          md:w-32 md:h-32 md:mb-4 md:mr-0           /* Tablet/Desktop image size and margin */
        "
        loading="lazy"
      />
      <div
        className="
          flex flex-col items-start                 /* Mobile text alignment */
          md:items-center                           /* Tablet/Desktop text alignment */
          flex-grow md:flex-grow-0 md:mb-2
        "
      >
        <h2 className="
            text-sm font-semibold mb-1 text-left      /* Mobile title size and alignment */
            md:text-lg md:font-semibold md:mb-2 md:text-center /* Tablet/Desktop title size and alignment */
          "
        >
          {product.title}
        </h2>
        <div className="mb-2 flex items-center md:block">
          <span className="text-gray-400 line-through mr-2 text-xs md:text-base">
            ${product.price}
          </span>
          <span className="text-lg font-bold text-red-600 md:text-2xl">
            ${discountedPrice}
          </span>
        </div>
      </div>
      <button
        className="
          w-min bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded transition-colors
          md:w-auto md:px-4 md:mt-auto
          text-sm md:text-base
        "
      >
        Comprar ahora
      </button>
    </div>
  );
}
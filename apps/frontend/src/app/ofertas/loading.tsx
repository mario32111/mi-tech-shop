import React from 'react';

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">Cargando Ofertas...</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Un momento por favor, estamos preparando las mejores ofertas para ti.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full">
        {/* Placeholder para simular las tarjetas mientras cargan */}
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
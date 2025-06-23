// app/product/[id]/loading.tsx
// Este es un Server Component por defecto, no necesita "use client"

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div> {/* Título */}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Esqueleto para la imagen */}
        <div className="flex-shrink-0 w-full md:w-96 h-96 bg-gray-200 rounded-lg shadow-md"></div>

        {/* Esqueleto para el contenido de texto */}
        <div className="flex-grow">
          <div className="h-6 bg-gray-200 rounded w-full mb-4"></div> {/* Descripción 1 */}
          <div className="h-6 bg-gray-200 rounded w-11/12 mb-4"></div> {/* Descripción 2 */}
          <div className="h-6 bg-gray-200 rounded w-5/6 mb-6"></div> {/* Descripción 3 */}

          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div> {/* Precio */}

          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div> {/* Marca */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div> {/* Categoría */}
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div> {/* Stock */}

          <div className="h-12 bg-gray-200 rounded w-48"></div> {/* Botón */}
        </div>
      </div>
    </div>
  );
}
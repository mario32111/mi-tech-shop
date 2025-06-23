// app/ui/SearchResults.tsx
import { searchProducts } from '../lib/data';
import { Product } from '../lib/definitions';
import ProductResult from '../ui/ProductResult';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchTerm = searchParams.q || '';
  const productos: Product[] = searchTerm ? await searchProducts(searchTerm) : [];
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <p className="text-lg text-gray-600 mb-8 text-center">Resultados de "{searchTerm}"</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <ProductResult key={producto.id} product={producto} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            {searchTerm ? (
              <>No se encontraron productos para "<span className="font-semibold text-accent-blue">{searchTerm}</span>"</>
            ) : (
              <>Escribe algo para buscar productos.</>
            )}
          </div>
        )}
      </div>
    </main>
          
  );
}
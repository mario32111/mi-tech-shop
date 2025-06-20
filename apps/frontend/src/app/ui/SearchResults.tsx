// app/ui/SearchResults.tsx
'use client';
import { Product } from '../lib/definitions';
import ProductCard from './ProductCard';

interface Props {
  productos: Product[];
}

export function SearchResults({ productos }: Props) {
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {productos.map((producto) => (
        <ProductCard key={producto.id} product={producto} />
      ))}
    </div>
  );
}
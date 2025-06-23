// app/components/ProductGridLoader.tsx
// Este es un Server Component, no necesita "use client"
import { Product } from '../lib/definitions'; // Asegúrate de la ruta correcta
import { getOfertas } from '../lib/data';    // Tu función con el delay
import ProductCard from './ProductCard'; // Tu ProductCard que es "use client"

export default async function ProductGridLoader() {
    const productos: Product[] = await getOfertas();
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {productos.map((oferta) => (
                <ProductCard key={oferta.id} product={oferta} />
            ))}
        </div>
    );
}
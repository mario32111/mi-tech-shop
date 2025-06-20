// app/ofertas/page.tsx
import React, { Suspense } from "react";
import ProductCard from "../ui/ProductCard";
import {  ProductResponse } from "../lib/definitions";

export default async function OfertasPage() {
    // Fetch data directly in the component (runs on server by default)
    const ofertas: ProductResponse[] = await getOfertas();

    return (
        <main className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold mb-2 text-center">Ofertas Especiales</h1>
            <p className="text-lg text-gray-600 mb-8 text-center">
                ¡Aprovecha los mejores precios en tecnología solo por tiempo limitado!
            </p>
            <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {ofertas.map((oferta) => (
                        <ProductCard key={oferta.id} product={oferta} />
                    ))}
                </div>
            </Suspense>

        </main>
    );
}

// Simulate data fetching (replace with real API call)
async function getOfertas(): Promise<ProductResponse[]> {
    const res = await fetch('https://api.escuelajs.co/api/v1/products', { cache: 'no-store' })

    return res.json().then((data) => {
        return data;
    });
}


// * Comentario resaltado → Verde (para información importante).

// ! Alerta o problema → Rojo (para advertencias críticas).

// ? Pregunta o duda → Azul (para marcar secciones pendientes).

// TODO: tarea pendiente → Naranja (similar al estándar TODO).

// // Comentario tachado → Gris tachado (para código deshabilitado).
import Head from 'next/head';
import HeroSlider from './ui/HeroSlider'; // Import the new slider component
import ProductCard from './ui/ProductCard';
import { ProductResponse } from './lib/definitions'; // Ensure this path is correct
import { Suspense } from 'react';

export default async function HomePage() {
  const productos: ProductResponse[] = await getOfertas();

  return (
    <>
      <Head>
        <title>Mi-Shop | Tu Destino para la Tecnología del Mañana</title>
        <meta name="description" content="Descubre los gadgets más innovadores, componentes de alto rendimiento y las mejores ofertas en tecnología." />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div>
        {/* --- Sección Hero (Principal) --- */}
        {/* Replace the static section with the HeroSlider component */}
        <HeroSlider />

        {/* --- Sección de Productos Destacados --- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800 mb-12">
              Productos Destacados
            </h2>
            {/*// TODO: refactor the ProductCard to use a skeleton loader */}
            <Suspense fallback={<p className="text-gray-400">Loading...</p>}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {productos.map((oferta) => (
                <ProductCard key={oferta.id} product={oferta} />
              ))}
            </div>
            </Suspense>

          </div>
        </section>

        {/* --- Sección de Categorías Populares --- */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800 mb-12">
              Explora por Categoría
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {/* Tarjeta de Categoría - Ejemplo 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Smartphones</h3>
              </div>
              {/* Tarjeta de Categoría - Ejemplo 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Laptops</h3>
              </div>
              {/* Tarjeta de Categoría - Ejemplo 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Accesorios</h3>
              </div>
              {/* Tarjeta de Categoría - Ejemplo 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Componentes PC</h3>
              </div>
              {/* Tarjeta de Categoría - Ejemplo 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Wearables</h3>
              </div>
              {/* Tarjeta de Categoría - Ejemplo 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow duration-300 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-800">Audio</h3>
              </div>
            </div>
          </div>
        </section>

        {/* --- Sección de CTA (Llamada a la Acción) --- */}
        <section className="bg-gray-900 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              ¿Listo para el Futuro?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Suscríbete a nuestro boletín para recibir las últimas novedades, ofertas exclusivas y lanzamientos directamente en tu bandeja de entrada.
            </p>
            <div className="flex justify-center gap-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="py-3 px-6 rounded-lg border-2 border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue lg:w-96"
              />
              <button className="bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 shadow-md">
                Suscribirse
              </button>
            </div>
          </div>
        </section>

        {/* --- Pie de Página --- */}
        <footer className="bg-gray-900 border-t border-gray-800 py-10 text-gray-400 text-center text-sm">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} Mi-Shop. Todos los derechos reservados.</p>
            <div className="flex justify-center space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors duration-200">Privacidad</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Términos</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors duration-200">Contacto</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

// TODO: hacer esta funcion reutilizable

async function getOfertas(): Promise<ProductResponse[]> {
  const res = await fetch('https://api.escuelajs.co/api/v1/products', { 
    cache: 'no-store' // SSR dinámico
  });
  return res.json().then(data => data.slice(0, 8));
}
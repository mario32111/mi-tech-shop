import Head from 'next/head'; // Importa Head para el SEO y metadatos

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Mi-Shop | Tu Destino para la Tecnología del Mañana</title>
        <meta name="description" content="Descubre los gadgets más innovadores, componentes de alto rendimiento y las mejores ofertas en tecnología." />
        {/* Aquí puedes añadir enlaces a Google Fonts para 'Inter' si no lo haces en globals.css */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="font-sans"> {/* Aplica la fuente Inter a toda la página */}

        {/* --- Sección Hero (Principal) --- */}
        <section className="animate-zoom-in bg-gray-50 text-center py-20 lg:py-32">
          <div className="container mx-auto px-4"> {/* Contenedor para centrar y añadir padding */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Tu Destino para la Tecnología del Mañana
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
              Descubre los gadgets más innovadores, componentes de alto rendimiento y las mejores ofertas, diseñados para impulsar tu futuro.
            </p>
            {/* Botón con el color de acento azul */}
            <button className="bg-accent-blue hover:bg-accent-blue-dark text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              Explora Productos
            </button>
          </div>
        </section>

        {/* --- Sección de Productos Destacados --- */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl lg:text-4xl font-semibold text-center text-gray-800 mb-12">
              Productos Destacados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {/* Tarjeta de Producto - Ejemplo 1 */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                <img src="/placeholder-laptop.jpg" alt="Laptop Gaming" className="w-full h-48 object-contain mb-4 rounded-md" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Laptop Gaming XYZ</h3>
                <p className="text-gray-600 mb-3 text-lg font-bold">$1,299.99</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Procesador de última generación, tarjeta gráfica dedicada y 16GB de RAM.</p>
                <button className="w-full bg-accent-green hover:bg-accent-green-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                  Añadir al Carrito
                </button>
              </div>

              {/* Repite la estructura de la tarjeta para más productos destacados */}
              {/* Tarjeta de Producto - Ejemplo 2 (puedes duplicar la anterior y cambiar contenido) */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                <img src="/placeholder-phone.jpg" alt="Smartphone Ultra" className="w-full h-48 object-contain mb-4 rounded-md" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smartphone Ultra Pro</h3>
                <p className="text-gray-600 mb-3 text-lg font-bold">$899.00</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Cámara de 108MP, pantalla AMOLED, batería de larga duración.</p>
                <button className="w-full bg-accent-green hover:bg-accent-green-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                  Añadir al Carrito
                </button>
              </div>
               {/* Tarjeta de Producto - Ejemplo 3 */}
               <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                <img src="/placeholder-watch.jpg" alt="Smartwatch X" className="w-full h-48 object-contain mb-4 rounded-md" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smartwatch X</h3>
                <p className="text-gray-600 mb-3 text-lg font-bold">$249.00</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Monitor de salud avanzado, GPS integrado, notificaciones inteligentes.</p>
                <button className="w-full bg-accent-green hover:bg-accent-green-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                  Añadir al Carrito
                </button>
              </div>
               {/* Tarjeta de Producto - Ejemplo 4 */}
               <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200">
                <img src="/placeholder-headphones.jpg" alt="Auriculares Pro" className="w-full h-48 object-contain mb-4 rounded-md" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Auriculares Pro X</h3>
                <p className="text-gray-600 mb-3 text-lg font-bold">$199.99</p>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">Cancelación de ruido activa, audio de alta fidelidad, cómodos y duraderos.</p>
                <button className="w-full bg-accent-green hover:bg-accent-green-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-300">
                  Añadir al Carrito
                </button>
              </div>
            </div>
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
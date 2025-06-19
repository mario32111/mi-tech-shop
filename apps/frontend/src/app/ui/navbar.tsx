'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Estado para animación de cierre
  const [itemCount] = useState(3); // Ejemplo: número de artículos en el carrito
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

  const toggleMenu = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // Duración igual a la de Tailwind (300ms)
    } else {
      setIsOpen(true);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí iría la lógica para redirigir a la página de resultados de búsqueda
    // Por ejemplo: router.push(`/search?query=${searchTerm}`);
    console.log('Realizando búsqueda para:', searchTerm);
    // Podrías limpiar el input después de la búsqueda si lo deseas: setSearchTerm('');
  };


  return (
    <nav className="bg-white shadow-md pt-4 animate-slide-in-top">
      <div className="w-full max-w-3xl pb-4 mx-auto px-4 flex justify-between items-center min-h-[56px]">
        <Link href="/" className="block md:hidden text-2xl font-bold text-gray-900 hover:text-accent-blue transition-colors duration-200">
          M-S
        </Link>

        {/* Logo "Mi-Shop" (Grande): Oculto por defecto, visible en pantallas medianas (md) y más grandes */}
        <Link href="/" className="hidden md:block text-2xl font-bold text-gray-900 hover:text-accent-blue transition-colors duration-200">
          Mi-Shop
        </Link>

        {/* Barra de Búsqueda (Escritorio) - se muestra entre el logo y los enlaces principales */}
        <div className="mx-2 sm:mx-8 md:mx-4 flex-grow max-w-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </form>
        </div>


        {/* Botón de Menú Hamburguesa (Móvil) y Carrito para Móvil */}
        <div className=" flex items-center space-x-4">
          {/* Icono de Carrito de Compras (Móvil) */}
          <Link href="/cart" className="relative text-gray-700 hover:text-accent-blue transition-colors duration-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8a2 2 0 100 4m0-4v4m0 0H3m14 0a2 2 0 100 4m0-4v4m0 0h-3"
              />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          <button onClick={toggleMenu} className="text-gray-700 hover:text-accent-blue focus:outline-none focus:ring-2 focus:ring-accent-blue rounded-md p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                // Icono de cerrar (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Icono de hamburguesa
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable*/}
      {(isOpen || isClosing) && (
        <div
          className={`bg-white border-t border-gray-200 py-4 mt-2 transition-all duration-300 transform ${isOpen && !isClosing
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
            }`}
        >
          <div className="flex flex-col items-center space-y-4 px-4">
            <Link href="/productos" className="animate-slide-in-top animate-delay-50 animate-duration-50 text-gray-700 hover:text-accent-blue font-medium w-full text-center py-2 transition-colors duration-200" onClick={toggleMenu}>
              Productos
            </Link>
            <Link href="/categorias" className="animate-slide-in-top animate-delay-100 animate-duration-50 text-gray-700 hover:text-accent-blue font-medium w-full text-center py-2 transition-colors duration-200" onClick={toggleMenu}>
              Categorías
            </Link>
            <Link href="/ofertas" className="animate-slide-in-top animate-delay-150 animate-duration-50 text-gray-700 hover:text-accent-blue font-medium w-full text-center py-2 transition-colors duration-200" onClick={toggleMenu}>
              Ofertas
            </Link>
            <Link href="/contacto" className="animate-slide-in-top animate-delay-200 animate-duration-50 text-gray-700 hover:text-accent-blue font-medium w-full text-center py-2 transition-colors duration-200" onClick={toggleMenu}>
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
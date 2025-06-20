'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react'; // Importamos useRef
import { SearchResults } from './SearchResults'; // Asegúrate de que esta sea la ruta correcta
import { searchProducts } from '../lib/data'; // Tu función de búsqueda (Client-Side compatible)
import { Product } from '../lib/definitions'; // Tu definición de producto

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [itemCount] = useState(3);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [productos, setProductos] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para el loading
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref para el input de búsqueda

  // Función para cerrar el menú y limpiar la búsqueda
  const toggleMenu = () => {
    // Si el menú está abierto y hay resultados de búsqueda, los ocultamos primero
    if (showSearchResults) {
      resetSearchbar();
    }
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
    const value = event.target.value;
    setSearchTerm(value);
    // Mostrar resultados solo si hay algo escrito
    setShowSearchResults(value.trim().length > 0);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // **Recomendado:** Redirigir a una página de resultados de búsqueda SSR
      // Si tienes un router hook de Next.js, puedes usarlo aquí:
      // import { useRouter } from 'next/navigation';
      // const router = useRouter();
      // router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      console.log('Realizando búsqueda para:', searchTerm);
      resetSearchbar(); // Limpia la barra después de enviar la búsqueda
    }
  };

  // Cierre del menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Usar un nombre de clase más específico o ref para el navbar si es complejo
      // En este ejemplo, el navbar no tiene una clase específica, así que usaremos una ref para él si es posible.
      // Asumamos que el div principal del nav tiene una clase 'navbar-container' si no, envolverlo o usar ref
      const navbarElement = target.closest('nav');

      // Si el clic fue en un enlace del menú o dentro del propio navbar, no hacemos nada
      if (target.closest('a[href]') || navbarElement) {
        return;
      }

      // Solo cierra si el clic fue fuera del navbar y el menú está abierto
      if (isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, 300);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Manejo de la búsqueda en tiempo real para el dropdown
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchProducts = async () => {
      setIsLoading(true); // Activa el estado de carga
      try {
        const fetchedProducts: Product[] = await searchProducts(searchTerm);
        setProductos(fetchedProducts);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProductos([]); // En caso de error, limpia los productos
      } finally {
        setIsLoading(false); // Desactiva el estado de carga
      }
    };

    if (searchTerm.trim().length >= 2) { // Buscar si hay al menos 2 caracteres
      timeoutId = setTimeout(fetchProducts, 300); // Debounce de 300ms
    } else {
      setProductos([]); // Limpia los resultados si el término es muy corto o vacío
      setIsLoading(false); // Asegúrate de que no esté en estado de carga si se borra el texto
    }

    return () => {
      clearTimeout(timeoutId); // Limpia el timeout si el componente se desmonta o el searchTerm cambia
    };
  }, [searchTerm]);

  const resetSearchbar = () => {
    setSearchTerm('');
    setShowSearchResults(false);
    setProductos([]); // También limpia los productos del estado
  };

  const handleInputBlur = () => {
    // Retrasar el ocultamiento para permitir clics en los resultados
    setTimeout(() => {
      setShowSearchResults(false);
    }, 150);
  };

  const handleInputFocus = () => {
    // Mostrar resultados si el input tiene contenido y se enfoca
    if (searchTerm.trim().length > 0) {
      setShowSearchResults(true);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md pt-4 animate-slide-in-top">
        <div className="w-full max-w-3xl pb-4 mx-auto px-4 flex justify-between items-center min-h-[56px]">
          {/* Logos */}
          <Link
            onClick={() => resetSearchbar()}
            href="/"
            className="block md:hidden text-2xl font-bold text-gray-900 hover:text-accent-blue transition-colors duration-200"
          >
            M-S
          </Link>
          <Link
            onClick={() => resetSearchbar()}
            href="/"
            className="hidden md:block text-2xl font-bold text-gray-900 hover:text-accent-blue transition-colors duration-200"
          >
            Mi-Shop
          </Link>

          {/* Barra de Búsqueda */}
          <div className="mx-2 sm:mx-8 md:mx-4 flex-grow flex justify-center"> {/* Cambiamos a flex y justify-center */}
            <div className="relative w-full max-w-2xl"> {/* Añadimos un contenedor intermedio con max-width */}
              <form onSubmit={handleSearchSubmit} className="relative">
                {/* Input de búsqueda (se mantiene igual) */}
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-accent-blue transition-all duration-200"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
                <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {/* Icono de lupa */}
                </button>
              </form>

              {/* Dropdown de resultados de búsqueda - Cambios aquí */}
              {showSearchResults && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[80vw]  bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1 max-h-80 overflow-y-auto">
                  {/* Contenido de los resultados se mantiene igual */}
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Buscando productos...
                    </div>
                  ) : searchTerm.trim().length < 2 ? (
                    <div className="p-4 text-center text-gray-500">
                      Escribe al menos 2 caracteres para buscar.
                    </div>
                  ) : productos.length > 0 ? (
                    <SearchResults productos={productos} />
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-600 font-medium mb-2">
                        ¡Vaya! No encontramos resultados para "
                        <span className="font-semibold text-accent-blue">{searchTerm}</span>"
                      </p>
                      <p className="text-gray-500 text-sm">
                        Prueba con palabras clave diferentes o más generales.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Botón de Menú Hamburguesa (Móvil) y Carrito para Móvil */}
          <div className="flex items-center space-x-4">
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
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
    </>
  );
}
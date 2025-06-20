'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { searchProducts } from '../lib/data'; // Your client-side search function
import { Product } from '../lib/definitions'; // Your product definition

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [itemCount] = useState(3); // Assuming this is for a cart item count
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false); // Renamed for clarity
  const [suggestions, setSuggestions] = useState<Product[]>([]); // Renamed for clarity
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter(); // Initialize useRouter

  // Function to close the menu and clear the search/suggestions
  const toggleMenu = () => {
    if (showSuggestions) {
      resetSearchbar();
    }
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // Duration matches Tailwind (300ms)
    } else {
      setIsOpen(true);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // Show suggestions only if there's something typed
    setShowSuggestions(value.trim().length > 0);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      // Redirect to the search results page with the search term
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      resetSearchbar(); // Clear the search bar after submission
    }
  };

  // Close menu and suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const navElement = target.closest('nav'); // Reference to the whole nav element

      // If the click was inside the nav or on a menu link, do nothing
      if (navElement) {
        return;
      }

      // Only close if the click was outside the nav AND the menu or suggestions are open
      if (isOpen) {
        setIsClosing(true);
        setTimeout(() => {
          setIsOpen(false);
          setIsClosing(false);
        }, 300);
      }
      if (showSuggestions) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, showSuggestions]); // Add showSuggestions to dependency array

  // Handle real-time search for suggestions (debounced)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        // Fetch fewer results for suggestions, perhaps limit to 5-10
        const fetchedProducts: Product[] = await searchProducts(searchTerm); // Add limit parameter if your searchProducts supports it
        setSuggestions(fetchedProducts.slice(0, 5));
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (searchTerm.trim().length >= 2) { // Fetch suggestions if at least 2 characters
      timeoutId = setTimeout(fetchSuggestions, 300); // Debounce of 300ms
    } else {
      setSuggestions([]); // Clear suggestions if term is too short or empty
      setIsLoading(false);
    }

    return () => {
      clearTimeout(timeoutId); // Clear timeout if component unmounts or searchTerm changes
    };
  }, [searchTerm]);

  const resetSearchbar = () => {
    setSearchTerm('');
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleInputBlur = () => {
    // Delay hiding to allow clicks on suggestions.
    // However, for navigation (which is what suggestions typically do),
    // a small delay is still good, but you need to be careful not to
    // close before the click event registers.
    setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  const handleInputFocus = () => {
    // Show suggestions if input has content when focused
    if (searchTerm.trim().length > 0) {
      setShowSuggestions(true);
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

          {/* Search Bar and Suggestions */}
          <div className="mx-2 sm:mx-8 md:mx-4 flex-grow flex justify-center">
            <div className="relative w-full max-w-2xl">
              <form onSubmit={handleSearchSubmit} className="relative">
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
                <button
                  type="submit"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[90vw] md:w-[calc(100%+2rem)] max-w-2xl bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1 max-h-80 overflow-y-auto">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      Buscando sugerencias...
                    </div>
                  ) : searchTerm.trim().length < 2 ? (
                    <div className="p-4 text-center text-gray-500">
                      Escribe al menos 2 caracteres para sugerencias.
                    </div>
                  ) : suggestions.length > 0 ? (
                    <div className="py-2">
                      {suggestions.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.id}`} // Link to product detail page
                          onClick={() => resetSearchbar()} // Clear search on suggestion click
                          className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <img
                            src={product.thumbnail} // Assuming 'thumbnail' exists or use images[0]
                            alt={product.title}
                            className="w-8 h-8 object-cover rounded mr-2"
                          />
                          <span className="text-gray-800 text-sm truncate">{product.title}</span>
                        </Link>
                      ))}
                      {/* Option to view all results for the current search term */}
                      <Link
                        href={`/search?q=${encodeURIComponent(searchTerm.trim())}`}
                        onClick={() => resetSearchbar()}
                        className="block text-center p-2 text-accent-blue hover:underline font-medium border-t border-gray-200 mt-2 pt-2"
                      >
                        Ver todos los resultados para "{searchTerm}"
                      </Link>
                    </div>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-gray-600 font-medium mb-2">
                        No encontramos sugerencias para "
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

          {/* Hamburger Menu Button (Mobile) and Cart for Mobile */}
          <div className="flex items-center space-x-4">
            {/* Shopping Cart Icon (Mobile) */}
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

        {/* Mobile Menu Dropdown */}
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
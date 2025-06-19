// components/HeroSlider.js
import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'Tu Destino para la Tecnología del Mañana',
    description: 'Descubre los gadgets más innovadores, componentes de alto rendimiento y las mejores ofertas, diseñados para impulsar tu futuro.',
    buttonText: 'Explora Productos',
    buttonLink: '/products', // You can change this link
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-900',
    accentColor: 'bg-accent-blue',
  },
  {
    title: 'Innovación a tu Alcance',
    description: 'Desde lo último en smartphones hasta potentes laptops para gaming, tenemos lo que necesitas para estar a la vanguardia.',
    buttonText: 'Ver Novedades',
    buttonLink: '/new-arrivals', // You can change this link
    bgColor: 'bg-indigo-50', // A different background color for variety
    textColor: 'text-indigo-900',
    accentColor: 'bg-indigo-600',
  },
  {
    title: 'Ofertas Exclusivas Cada Semana',
    description: 'No te pierdas nuestras promociones especiales y descuentos increíbles en una amplia gama de productos tecnológicos.',
    buttonText: 'Descubre Ofertas',
    buttonLink: '/offers', // You can change this link
    bgColor: 'bg-purple-50', // Another background color
    textColor: 'text-purple-900',
    accentColor: 'bg-purple-600',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <section className={`animate-fade-in ${slide.bgColor} text-center py-20 lg:py-32 transition-colors duration-500`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl lg:text-6xl font-bold ${slide.textColor} mb-4 leading-tight`}>
          {slide.title}
        </h1>
        <p className={`text-lg lg:text-xl ${slide.textColor.replace('-900', '-700')} mb-10 max-w-3xl mx-auto`}>
          {slide.description}
        </p>
        <button className={`${slide.accentColor} hover:${slide.accentColor}-dark text-white font-semibold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md hover:shadow-lg`}>
          {slide.buttonText}
        </button>

        {/* Slider Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? slides[index].accentColor : 'bg-gray-400'} transition-colors duration-300`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
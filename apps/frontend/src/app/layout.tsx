// apps/frontend/src/app/layout.tsx

import './global.css'; // Tus estilos globales, incluyendo paleta de colores claros
import { inter } from './fonts'; // <-- Asegúrate que la ruta sea correcta y que importes 'inter'
import Navbar from './ui/navbar';

export const metadata = {
  // Configuración del título: fundamental para SEO
  title: {
    template: '%s | Mi Tech Shop', // '%s' será reemplazado por el título específico de cada página
    default: 'Mi Tech Shop - Tu Tienda Online de Tecnología', // Título para la página de inicio y como fallback
  },
  // Descripción general de la tienda: aparece en los resultados de búsqueda
  description: 'Descubre los últimos gadgets, componentes de PC, smartphones y accesorios en Mi Tech Shop. Tecnología de vanguardia al mejor precio.',
  
  // Metadatos para compartir en redes sociales (Open Graph para Facebook, LinkedIn, etc.)
  openGraph: {
    title: 'Mi Tech Shop - Tecnología a tu Alcance',
    description: 'Encuentra las mejores ofertas en laptops, móviles, hardware y más. ¡Mi Tech Shop es tu destino tecnológico!',
    url: 'https://www.mitiendatech.com', // **¡IMPORTANTE! Reemplaza con el dominio real de tu tienda**
    siteName: 'Mi Tech Shop',
    images: [
      {
        url: 'https://www.mitiendatech.com/og-image.jpg', // **¡IMPORTANTE! Crea esta imagen (1200x630px) para tus redes**
        width: 1200,
        height: 630,
        alt: 'Mi Tech Shop - Logo y Banner',
      },
    ],
    locale: 'es_MX', // O 'es_ES', 'es_CL', etc., según tu público principal
    type: 'website', // Tipo de contenido que estás compartiendo
  },
  
  // Metadatos para Twitter Cards
  twitter: {
    card: 'summary_large_image', // Tipo de tarjeta de Twitter
    title: 'Mi Tech Shop - Tu tienda de tecnología de confianza',
    description: 'Explora ofertas exclusivas en electrónica y componentes de PC. Envíos rápidos y seguros.',
    creator: '@MiTechShop', // Opcional: Tu usuario de Twitter si tienes uno
    images: ['https://www.mitiendatech.com/twitter-image.jpg'], // Opcional: si quieres una imagen específica para Twitter (ej. 800x418px)
  },

  // Iconos del sitio (favicon, iconos para Apple, etc.)
  icons: {
    icon: '/favicon.ico', // Archivo favicon estándar
    shortcut: '/favicon-16x16.png', // Icono más pequeño
    apple: '/apple-touch-icon.png', // Icono para dispositivos Apple
    // Puedes añadir otros tamaños si es necesario, generados por herramientas como RealFaviconGenerator
  },

  // Robots meta tag: indica a los motores de búsqueda cómo rastrear tu sitio
  robots: {
    index: true, // Permitir indexación
    follow: true, // Permitir seguir enlaces
    googleBot: { // Directivas específicas para Googlebot
      index: true,
      follow: true,
      'max-video-preview': -1, // Sin límite para vistas previas de video
      'max-image-preview': 'large', // Vistas previas de imagen grandes
      'max-snippet': -1, // Sin límite para fragmentos de texto
    },
  },

  // Otros metadatos comunes
  // authors: [{ name: 'Mi Tech Shop' }],
  // keywords: ['tecnología', 'gadgets', 'smartphones', 'laptops', 'pc gaming', 'electrónica', 'tienda online'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ¡IMPORTANTE! Asegúrate de que lang="es" para español
    <html lang="es">
      <body className={`${inter.className} antialiased`}> {/* Aplicamos 'inter.className' */}
        {/* Aquí irán componentes globales como la barra de navegación (Navbar) y el pie de página (Footer) */}
        <Navbar />
        {children} {/* Aquí se renderizará el contenido específico de cada página */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
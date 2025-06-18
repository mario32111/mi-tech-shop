
import { Inter } from 'next/font/google'; // <-- ¡Aquí cambiamos a Inter!

export const inter = Inter({ // <-- El nombre de tu variable también cambia a 'inter'
  subsets: ['latin'],
  display: 'swap', // 'swap' es ideal para evitar el CLS (Cumulative Layout Shift)
  // Puedes especificar pesos si solo necesitas algunos, por ejemplo:
  // weight: ['400', '500', '700'],
});
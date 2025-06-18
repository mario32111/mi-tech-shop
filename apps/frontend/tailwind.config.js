// const { createGlobPatternsForDependencies } = require('@nx/next/tailwind');

// The above utility import will not work if you are using Next.js' --turbo.
// Instead you will have to manually add the dependent paths to be included.
// For example
// ../libs/buttons/**/*.{ts,tsx,js,jsx,html}',                 <--- Adding a shared lib
// !../libs/buttons/**/*.{stories,spec}.{ts,tsx,js,jsx,html}', <--- Skip adding spec/stories files from shared lib

// If you are **not** using `--turbo` you can uncomment both lines 1 & 19.
// A discussion of the issue can be found: https://github.com/nrwl/nx/issues/26510

/** @type {import('tailwindcss').Config} */
const animations = require('@midudev/tailwind-animations')

module.exports = {
  content: [
    './{src,pages,components,app}/**/*.{ts,tsx,js,jsx,html}',
    '!./{src,pages,components,app}/**/*.{stories,spec}.{ts,tsx,js,jsx,html}',
    //     ...createGlobPatternsForDependencies(__dirname)
  ],
theme: {
    extend: {
      // --- Colores ---
      colors: {
        // Colores de fondo y texto principales
        'white': '#FFFFFF',      // Blanco puro
        'black': '#000000',      // Negro puro
        'gray-50': '#F9FAFB',    // Gris muy claro, casi blanco (para fondos sutiles)
        'gray-100': '#F3F4F6',   // Gris más claro
        'gray-200': '#E5E7EB',   // Gris claro
        'gray-300': '#D1D5DB',   // Gris medio claro
        'gray-400': '#9CA3AF',   // Gris intermedio (para bordes, líneas)
        'gray-500': '#6B7280',   // Gris medio (para texto secundario)
        'gray-600': '#4B5563',   // Gris oscuro
        'gray-700': '#374151',   // Gris muy oscuro (para texto principal)
        'gray-800': '#1F2937',   // Casi negro
        'gray-900': '#111827',   // Negro intenso

        // Colores de acento (para botones, enlaces, elementos interactivos, highlights)
        // Puedes elegir un azul, verde, o un color vibrante que quieras destacar.
        // Aquí algunas opciones comunes:
        'accent-blue': {
          DEFAULT: '#0070F3',    // Azul vibrante (como el de Vercel/Next.js)
          'light': '#3B82F6',    // Azul un poco más claro
          'dark': '#1D4ED8',     // Azul más oscuro
        },
        'accent-green': {
          DEFAULT: '#16A34A',    // Un verde para éxito o confirmaciones
          'light': '#22C55E',
          'dark': '#15803D',
        },
        'accent-red': {
          DEFAULT: '#EF4444',    // Un rojo para errores o alertas
          'light': '#F87171',
          'dark': '#B91C1C',
        },
      },

      // --- Tipografía (Fuentes) ---
      // Las marcas tech suelen usar fuentes limpias, sans-serif.
      // Puedes importar estas fuentes desde Google Fonts en tu CSS global.
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Inter es una fuente popular, moderna y limpia
        // Si quieres una fuente más específica como Apple usa San Francisco,
        // tendrías que ver opciones alternativas de Google Fonts como "Roboto" o "Open Sans"
        // o si tienes una licencia, usarla directamente.
        // monospace: ['Fira Code', 'monospace'], // Para código
      },

      // --- Espaciado (opcional, si quieres más granularidad) ---
      // Puedes extender el espaciado predeterminado de Tailwind si lo necesitas.
      // spacing: {
      //   '72': '18rem',
      //   '84': '21rem',
      // },

      // --- Sombras (para profundidad y UI limpia) ---
      // Las sombras suaves son clave para un diseño moderno.
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'none': 'none',
      },

      // --- Transiciones (para animaciones suaves) ---
      // Aunque usas un plugin de animaciones, las transiciones básicas son útiles.
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '2000': '2000ms', // Puedes añadir duraciones extra si las necesitas
      },
      transitionTimingFunction: {
        'ease-in-out-quad': 'cubic-bezier(0.45, 0, 0.55, 1)', // Curva de animación personalizada
      },
    },
  },
  plugins: [animations],
};

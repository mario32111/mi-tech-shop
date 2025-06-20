// Definición de tipos
export type Product = {
  id: string | number;
  imagen: string;
  nombre: string;
  precioOriginal: number;
  precioOferta: number; // Corregido: era "precioproduct" antes
};


export interface ProductResponse {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}
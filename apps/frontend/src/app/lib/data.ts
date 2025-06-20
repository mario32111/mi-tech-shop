import { Product } from "./definitions";

export async function getOfertas(): Promise<Product[]> {
    const res = await fetch('https://dummyjson.com/products/category/laptops', { cache: 'no-store' })
    const data = await res.json();
    await new Promise(resolve => setTimeout(resolve, 2000));
    return data.products;
}

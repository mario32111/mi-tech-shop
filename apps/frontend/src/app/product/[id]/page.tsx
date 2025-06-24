
  import { Product } from '../../lib/definitions';
  import { getProductById } from '../../lib/data';
  import Image from 'next/image';
  import AddToCartButton from '../../ui/addToCartButton';
  import { ProductCart } from '../../lib/types';

  interface ProductDetailPageProps {
    params: {
      id: string;
    };
  }

  export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const productId = params.id;
    const product:Product = await getProductById(productId)
    const productToCart: ProductCart = {
      id: product.id,
      image: product.images[0],
      name: product.title,
      price: product.price,
      quantity: 1,
    };

    console.log(productToCart);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">{product.title}</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0">
            {product.thumbnail && (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={400}
                height={400}
                className="rounded-lg shadow-md"
                priority
              />
            )}
          </div>
          <div className="flex-grow">
            <p className="text-gray-700 text-lg mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="ml-3 text-red-500 font-semibold">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-2">Marca: <span className="font-medium">{product.brand}</span></p>
            <p className="text-gray-600 mb-2">Categoría: <span className="font-medium">{product.category}</span></p>
            <p className="text-gray-600 mb-4">Stock: <span className="font-medium">{product.stock} unidades</span></p>

              <AddToCartButton product={productToCart} />

          </div>
        </div>
      </div>
    );
  }

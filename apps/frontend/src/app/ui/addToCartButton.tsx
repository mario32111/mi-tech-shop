// apps/frontend/src/app/ui/add-to-cart-button.tsx
'use client'; // ¡IMPORTANTE! Este es un Client Component

import React from 'react';
import { ProductCart } from '../../app/lib/types'; // Asegúrate de que la ruta es correcta
import { useCart } from '../../context/context'; // Asegúrate de la ruta correcta para tu contexto

interface AddToCartButtonProps {
    product: ProductCart; // El producto completo que se va a añadir
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        // Opcional: Podrías mostrar una notificación toast o un mensaje visual de éxito aquí
        alert(`"${product.name}" ha sido añadido al carrito!`);
    };

    return (
        <button 
        onClick={handleAddToCart}
        className="bg-accent-blue text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300">
            Añadir al Carrito
        </button>
    );
};

export default AddToCartButton;
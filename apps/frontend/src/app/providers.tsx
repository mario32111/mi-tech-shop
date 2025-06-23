'use client';

import { ReactNode } from 'react';
import { CartProvider } from '../../src/context/context'
interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
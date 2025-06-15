'use client';

import React from 'react';
import { IProduct } from '@/models/Product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: IProduct[];
  variant?: 'default' | 'compact';
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  variant = 'default',
  className = '' 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
      </div>
    );
  }

  const gridClasses = variant === 'compact' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8';

  return (
    <div className={`${gridClasses} ${className}`}>
      {products.map((product) => (
        <ProductCard 
          key={String(product._id)} 
          product={product} 
          variant={variant}
        />
      ))}
    </div>
  );
};
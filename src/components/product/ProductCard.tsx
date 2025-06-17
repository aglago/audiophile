'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/models/Product';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, type CartItem } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: IProduct;
  variant?: 'default' | 'featured' | 'compact';
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  variant = 'default' 
}) => {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem: Omit<CartItem, 'quantity'> & { quantity?: number } = {
      id: (product._id as number),
      name: product.name,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      quantity: 1
    };
    
    addToCart(cartItem);
    toast.success(`Added ${product.name} to cart`);
  };

  if (variant === 'featured') {
    return (
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary to-primary text-white">
        <div className="px-6 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              {product.featured && (
                <Badge variant="secondary" className="bg-white/20 text-white">
                  Featured
                </Badge>
              )}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {product.name}
              </h2>
              <p className="text-lg opacity-90 max-w-md">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/products/${product._id}`}>
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                    See Product
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-primary"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart - {formatPrice(product.price)}
                </Button>
              </div>
            </div>
            <div className="relative h-64 lg:h-80">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product._id}`} className="group">
        <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200">
          <div className="relative h-48 bg-gray-50 rounded-t-lg overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-200"
            />
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-primary">
                Featured
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {formatPrice(product.price)}
            </p>
            <Button 
              className="w-full mt-3" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product._id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-200">
        <div className="relative h-64 bg-gray-50 rounded-t-lg overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
          {product.featured && (
            <Badge className="absolute top-3 left-3 bg-primary">
              Featured
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="secondary" className="bg-white text-black">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            <Button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="bg-primary hover:bg-primary"
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};


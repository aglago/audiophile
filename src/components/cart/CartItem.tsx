// components/cart/CartItem.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemType, useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

interface CartItemProps {
  item: CartItemType;
  variant?: 'default' | 'compact';
}

export const CartItem: React.FC<CartItemProps> = ({ item, variant = 'default' }) => {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain rounded-md"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500">
            {formatPrice(item.price)} × {item.quantity}
          </p>
        </div>
        
        <div className="text-sm font-medium text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 py-6 border-b border-gray-200 last:border-b-0">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(item.price)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center border border-gray-300 rounded-md">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => handleQuantityChange(item.quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
            {item.quantity}
          </span>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-lg font-semibold text-gray-900 min-w-[4rem] text-right">
          {formatPrice(item.price * item.quantity)}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeItem(item.id)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};


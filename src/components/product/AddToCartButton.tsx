// components/product/AddToCartButton.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { useCartStore } from '@/lib/cart-store';
import { IProduct } from '@/models/Product';
import { toast } from 'sonner';

interface AddToCartButtonProps {
  product: IProduct;
  className?: string;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  className = '' 
}) => {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }

    addToCart({
      id: (product._id as string | number).toString(),
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity
    });

    toast.success(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <QuantitySelector
        value={quantity}
        onChange={setQuantity}
        min={1}
        max={Math.min(product.stock, 99)}
      />
      
      <Button
        onClick={handleAddToCart}
        disabled={!product.inStock}
        className="bg-primary hover:bg-primary px-8"
        size="lg"
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  );
};


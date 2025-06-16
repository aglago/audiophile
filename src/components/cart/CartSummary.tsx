'use client';

import React from 'react';
import { useCartStore } from '@/lib/cart-store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
  className?: string;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  showCheckoutButton = true, 
  onCheckout,
  className = ''
}) => {
  const { getSubtotal, getShipping, getVAT, getTotal, getTotalItems } = useCartStore();
  
  const subtotal = getSubtotal();
  const shipping = getShipping();
  const vat = getVAT();
  const total = getTotal();
  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
        <p className="text-gray-500 text-center">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">{formatPrice(shipping)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">VAT (20%)</span>
          <span className="font-medium">{formatPrice(vat)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
      
      {showCheckoutButton && (
        <Button 
          className="w-full mt-6 bg-primary hover:bg-primary"
          size="lg"
          onClick={onCheckout}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
};

// components/cart/CartDrawer.tsx

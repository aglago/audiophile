'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { CartItem, useCartStore } from '@/lib/cart-store';
import { CartItem as CartItemUI} from './CartItem';
import { CartSummary } from './CartSummary';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  children: React.ReactNode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ children }) => {
  const { items, getTotalItems } = useCartStore();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const handleCheckout = () => {
    setOpen(false);
    router.push('/checkout');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Shopping Cart ({getTotalItems()})</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Your cart is empty</p>
                <Button onClick={() => setOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item: CartItem) => (
                  <CartItemUI key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
          
          {/* Cart Summary */}
          {items.length > 0 && (
            <div className="border-t pt-4">
              <CartSummary onCheckout={handleCheckout} />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
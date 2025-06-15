'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem as CartItemUI } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { EmptyState } from '@/components/ui/empty-state';
import { CartItem, useCartStore } from '@/lib/cart-store';

export default function CartPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <EmptyState
            icon={<ShoppingBag className="h-12 w-12" />}
            title="Your cart is empty"
            description="Add some products to your cart to get started"
            action={{
              label: 'Continue Shopping',
              onClick: () => router.push('/products')
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Button 
            variant="outline" 
            onClick={clearCart}
            className="text-red-600 border-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Cart Items ({items.length})
                </h2>
                <div className="space-y-0">
                  {items.map((item: CartItem) => (
                    <CartItemUI key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary onCheckout={handleCheckout} />
              
              <div className="mt-6 text-center">
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
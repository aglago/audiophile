'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/lib/cart-store';
import { X, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  if (!isOpen) return null;

  const cleanImagePath = (path: string) => path.replace('./', '/');

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
            Cart ({items.length})
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Remove All */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm text-gray-600">
                  {items.reduce((total, item) => total + item.quantity, 0)} items
                </span>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  Remove all
                </button>
              </div>

              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={cleanImagePath(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded">
                      <Button
                      variant={"ghost"}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 py-2 text-sm font-bold min-w-[2.5rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                      variant={"ghost"}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t pt-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-gray-600 uppercase">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    $ {getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" onClick={onClose}>
                <Button size={"lg"}>Checkout</Button>
              </Link>
            </>
          )}
        </div>

        {/* Additional Content for larger screens */}
        <div className="hidden md:block p-6 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Headphones
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            You have XX99 Mark II headphones in the comfort of your device hands. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>• Frequency Response:</strong> 4Hz-40kHz</p>
            <p><strong>• Impedance:</strong> 25 Ω</p>
            <p><strong>• SPL:</strong> 101dB SPL</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
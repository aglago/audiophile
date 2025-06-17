"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Button } from "../ui/button";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, clearCart, getTotalPrice } = useCartStore();

  const cleanImagePath = (path: string) => path.replace("./", "/");
  const isEmpty = items.length === 0;

  // Disable body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
        {/* Cart Modal */}
        <div
          className="absolute top-20 right-0 sm:right-6 md:right-10 lg:right-40 w-full md:max-w-1/2 lg:max-w-96 bg-white rounded-lg p-6 md:p-8 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-black uppercase tracking-[1px]">
              Cart ({items.length})
            </h2>
            <button
              onClick={clearCart}
              className="text-sm text-black/30 underline hover:text-black/50 transition-colors"
            >
              Remove all
            </button>
          </div>

          {/* Empty cart spacing */}
          {isEmpty && <div className="py-8"></div>}

          {/* Cart Items */}
          {!isEmpty && (
            <div className="space-y-6 mb-8 max-h-80 overflow-y-auto">
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
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-black leading-tight mb-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-black/50 font-bold">
                      $ {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center bg-gray-100 rounded flex-shrink-0">
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      variant={"ghost"}
                    >
                      -
                    </Button>
                    <span className="text-black px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold min-w-[1.5rem] sm:min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      variant={"ghost"}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-black/50 uppercase tracking-[1px]">
              Total
            </span>
            <span className="text-lg font-bold text-black">
              $ {isEmpty ? 0 : getTotalPrice().toLocaleString()}
            </span>
          </div>

          {isEmpty ? (
            <Button variant={"inactive"}>Checkout</Button>
          ) : (
            <Link href="/checkout" onClick={onClose}>
              <Button className="w-full">Checkout</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default CartModal;

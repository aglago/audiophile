"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const cleanImagePath = (path: string) => path.replace("./", "/");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-white rounded-lg">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold text-gray-900 uppercase tracking-wide">
              Cart ({items.length})
            </DialogTitle>
            {items.length > 0 && (
              <Button onClick={clearCart} variant={"ghost"}>
                Remove all
              </Button>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8 max-h-80 overflow-y-auto px-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 sm:gap-4 min-w-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                      <Image
                        src={cleanImagePath(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs sm:text-sm text-gray-900 truncate max-w-[76px]">
                        {item.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-black/50">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded flex-shrink-0">
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        variant={"ghost"}
                        className="h-8 w-8 p-0 text-lg hover:bg-gray-200"
                      >
                        -
                      </Button>
                      <span className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-bold min-w-[1.5rem] sm:min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        variant={"ghost"}
                        className="h-8 w-8 p-0 text-lg hover:bg-gray-200"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-black/50 uppercase">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    $ {getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full">Checkout</Button>
              </Link>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CartModal;

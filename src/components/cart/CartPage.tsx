"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/cart-store";
import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

const CartPage = () => {
  const { items, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();

  const cleanImagePath = (path: string) => path.replace("./", "/");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link href="/products">
            <Button size={"lg"}>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium"
        >
          Go Back
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 uppercase tracking-wide">
                  Cart ({items.length})
                </h1>
                <button
                  onClick={clearCart}
                  className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
                >
                  Remove all
                </button>
              </div>

              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-6 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={cleanImagePath(item.image)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">
                        $ {item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center bg-gray-100 rounded">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-3 text-gray-600 hover:text-primary transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-4 py-3 text-sm font-bold min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-3 text-gray-600 hover:text-primary transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 lg:p-8 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">
                Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Items (
                    {items.reduce((total, item) => total + item.quantity, 0)})
                  </span>
                  <span className="font-bold text-gray-900">
                    $ {getTotalPrice().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-bold text-gray-900">$ 50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (Included)</span>
                  <span className="font-bold text-gray-900">
                    $ {Math.round(getTotalPrice() * 0.2).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-300">
                  <span className="text-gray-900 font-bold uppercase">
                    Total
                  </span>
                  <span className="font-bold text-xl text-primary">
                    $ {(getTotalPrice() + 50).toLocaleString()}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size={"lg"}>Checkout</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Product Info for larger screens */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 mt-16 pt-16 border-t border-gray-200">
          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4 uppercase tracking-wide">
              Headphones
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              You have XX99 Mark II headphones in the comfort of your device
              hands. It redefines your premium headphone experience by
              reproducing the balanced depth and precision of studio-quality
              sound.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>• Frequency Response:</strong> 4Hz-40kHz
              </p>
              <p>
                <strong>• Impedance:</strong> 25 Ω
              </p>
              <p>
                <strong>• SPL:</strong> 101dB SPL
              </p>
              <p>
                <strong>• Weight:</strong> 11 oz
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-xl text-gray-900 mb-4 uppercase tracking-wide">
              In The Box
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex gap-4">
                <span className="text-primary font-bold min-w-[2rem]">1x</span>
                <span>Headphone unit</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold min-w-[2rem]">2x</span>
                <span>Replacement earcups</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold min-w-[2rem]">1x</span>
                <span>User manual</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold min-w-[2rem]">1x</span>
                <span>3.5mm 5m audio cable</span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-bold min-w-[2rem]">1x</span>
                <span>Travel bag</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

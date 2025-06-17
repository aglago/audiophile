"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore, type CartItem } from "@/lib/cart-store";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartIcon from "../icons/cart";
import { usePathname } from "next/navigation";
import CategoriesSection from "../home/categories/CategoriesSection";
import CartModal from "../cart/CartModal";
import Image from "next/image";

export const Header = () => {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemsCount = useCartStore((state) =>
    state.items.reduce(
      (total: number, item: CartItem) => total + item.quantity,
      0
    )
  );

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Headphones", href: "/products?category=headphones" },
    { name: "Speakers", href: "/products?category=speakers" },
    { name: "Earphones", href: "/products?category=earphones" },
  ];

  return (
    <header
      className={`text-white w-full ${
        pathname === "/" ? "absolute top-0" : "relative bg-black"
      }`}
    >
      <div
        className="max-w-7xl mx-auto border-b border-white"
        style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
      >
        <div className="flex items-center justify-between py-8 px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Logo */}
          <Link href="/">
            <Image alt="audiophile logo" src="/assets/shared/desktop/logo.svg" width={143} height={25} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium tracking-wide hover:text-primary transition-colors duration-200 uppercase"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:flex text-white hover:bg-gray-800"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-gray-800"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="relative text-white hover:bg-gray-800"
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
        </div>


      </div>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Menu Content */}
          <div className="fixed left-0 top-24 right-0 bg-white z-50 lg:hidden max-h-screen overflow-y-auto">
            <div className="pb-9 md:pb-16">
              <CategoriesSection />
            </div>
          </div>
        </>
      )}

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};
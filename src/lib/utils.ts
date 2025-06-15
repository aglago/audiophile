import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatCurrency = (amount: number): string => {
  return formatPrice(amount);
};

export const calculateOrderTotals = (subtotal: number) => {
  const shipping = subtotal > 0 ? 50 : 0;
  const vat = Math.round(subtotal * 0.2 * 100) / 100;
  const total = Math.round((subtotal + shipping + vat) * 100) / 100;
  
  return {
    subtotal,
    shipping,
    vat,
    total
  };
};

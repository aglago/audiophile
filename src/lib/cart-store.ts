import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getVAT: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                : i
            )
          };
        } else {
          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }]
          };
        }
      }),
      
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      
      updateQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { items: state.items.filter(item => item.id !== id) };
        }
        return {
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        };
      }),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal > 0 ? 50 : 0; // Fixed $50 shipping
      },
      
      getVAT: () => {
        const subtotal = get().getSubtotal();
        return Math.round(subtotal * 0.2 * 100) / 100; // 20% VAT
      },
      
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = get().getShipping();
        const vat = get().getVAT();
        return Math.round((subtotal + shipping + vat) * 100) / 100;
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);


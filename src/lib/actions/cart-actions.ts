'use server';

import connectDB from '@/lib/db';
import { Cart } from '@/models/Cart';
import { Product } from '@/models/Product';
import { cartItemSchema } from '@/lib/validation';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';

export async function addToCart(productId: string, quantity: number = 1, sessionId?: string) {
  try {
    await connectDB();
    
    // Validate input
    const validatedInput = cartItemSchema.parse({ productId, quantity });
    
    // Check if product exists and is in stock
    const product = await Product.findById(validatedInput.productId);
    if (!product) {
      throw new Error('Product not found');
    }
    
    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    // Get user session
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId && !sessionId) {
      throw new Error('User session or session ID required');
    }

    // Find or create cart
    let cart = await Cart.findOne(
      userId ? { user: userId } : { sessionId }
    );

    if (!cart) {
      cart = new Cart({
        user: userId || undefined,
        sessionId: !userId ? sessionId : undefined,
        items: []
      });
    }

    // Check if product already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (      item: { product: { toString: () => string; }; }) => item.product.toString() === validatedInput.productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += validatedInput.quantity;
    } else {
      // Add new item
      cart.items.push({
        product: validatedInput.productId,
        quantity: validatedInput.quantity,
        addedAt: new Date()
      });
    }

    await cart.save();
    
    return { success: true, message: 'Product added to cart' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to add to cart');
  }
}

export async function updateCartItem(productId: string, quantity: number, sessionId?: string) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const cart = await Cart.findOne(
      userId ? { user: userId } : { sessionId }
    );

    if (!cart) {
      throw new Error('Cart not found');
    }

    if (quantity <= 0) {
      // Remove item
      cart.items = cart.items.filter(
        (        item: { product: { toString: () => string; }; }) => item.product.toString() !== productId
      );
    } else {
      // Update quantity
      const itemIndex = cart.items.findIndex(
        (        item: { product: { toString: () => string; }; }) => item.product.toString() === productId
      );
      
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    await cart.save();
    
    return { success: true, message: 'Cart updated' };
  } catch (error) {
    console.error('Error updating cart:', error);
    throw new Error('Failed to update cart');
  }
}

export async function removeFromCart(productId: string, sessionId?: string) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const cart = await Cart.findOne(
      userId ? { user: userId } : { sessionId }
    );

    if (!cart) {
      throw new Error('Cart not found');
    }

    cart.items = cart.items.filter(
      (      item: { product: { toString: () => string; }; }) => item.product.toString() !== productId
    );

    await cart.save();
    
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw new Error('Failed to remove from cart');
  }
}

export async function getCart(sessionId?: string) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const cart = await Cart.findOne(
      userId ? { user: userId } : { sessionId }
    ).populate('items.product');

    if (!cart) {
      return { items: [] };
    }

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.error('Error fetching cart:', error);
    return { items: [] };
  }
}

export async function clearCart(sessionId?: string) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    await Cart.findOneAndDelete(
      userId ? { user: userId } : { sessionId }
    );
    
    return { success: true, message: 'Cart cleared' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
}


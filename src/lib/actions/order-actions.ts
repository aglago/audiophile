'use server';

import connectDB from '@/lib/db';
import { Order, type IOrderItem } from '@/models/Order';
import { Product, type IProduct } from '@/models/Product';
import { Cart } from '@/models/Cart';
import { CheckoutInput, checkoutSchema } from '@/lib/validation';
import { getAuthSession, requireAuth } from '@/lib/session';
import { revalidatePath } from 'next/cache';

export async function createOrder(checkoutData: CheckoutInput) {
  try {
    await connectDB();
    
    // Validate checkout data
    const validatedData = checkoutSchema.parse(checkoutData);
    
    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id;

    // Get user's cart
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    // ✅ Fixed: Properly typed order items and products
    const orderItems: IOrderItem[] = [];
    let subtotal = 0;

    for (const cartItem of cart.items) {
      const product = cartItem.product as IProduct;
      
      if (!product.isActive) {
        throw new Error(`Product ${product.name} is no longer available`);
      }
      
      if (product.stock < cartItem.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      const itemTotal = product.price * cartItem.quantity;
      subtotal += itemTotal;

      orderItems.push({
        product: product._id as import('mongoose').Types.ObjectId,
        productName: product.name,
        productImage: product.images[0],
        quantity: cartItem.quantity,
        price: product.price,
        total: itemTotal
      });

      // Update product stock
      await Product.findByIdAndUpdate(
        product._id,
        { $inc: { stock: -cartItem.quantity } }
      );
    }

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      subtotal,
      shippingAddress: validatedData.shippingAddress,
      billingAddress: validatedData.billingAddress,
      paymentMethod: validatedData.paymentMethod,
      notes: validatedData.notes
    });

    await order.save();

    // Clear user's cart
    await Cart.findOneAndDelete({ user: userId });

    // In a real app, you would process payment here
    // For now, we'll mark it as paid
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    await order.save();

    revalidatePath('/orders');
    
    return { 
      success: true, 
      orderId: order._id.toString(),
      orderNumber: order.orderNumber 
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create order');
  }
}

export async function getOrderById(orderId: string) {
  try {
    await connectDB();
    
    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id;

    const order = await Order.findOne({
      _id: orderId,
      user: userId
    }).populate('items.product').lean();

    if (!order) {
      throw new Error('Order not found');
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
}

export async function getUserOrders(page: number = 1, limit: number = 10) {
  try {
    await connectDB();
    
    const session = await getAuthSession();
    const authSession = requireAuth(session);
    const userId = authSession.user.id;

    const skip = (page - 1) * limit;

    const [orders, totalCount] = await Promise.all([
      Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments({ user: userId })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      orders: JSON.parse(JSON.stringify(orders)),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw new Error('Failed to fetch orders');
  }
}
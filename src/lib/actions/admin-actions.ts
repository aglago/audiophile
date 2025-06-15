'use server';

import connectDB from '@/lib/db';
import { Product } from '@/models/Product';
import { Order } from '@/models/Order';
import { ProductInput, OrderUpdateInput, productSchema, orderUpdateSchema } from '@/lib/validation';
import { getAuthSession, requireAdmin } from '@/lib/session';
import { revalidatePath } from 'next/cache';

async function checkAdminPermission(): Promise<string> {
  const session = await getAuthSession();
  const authSession = requireAdmin(session);
  return authSession.user.id;
}

export async function createProduct(productData: ProductInput) {
  try {
    await checkAdminPermission();
    await connectDB();
    
    // Validate product data
    const validatedData = productSchema.parse(productData);
    
    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: validatedData.sku });
    if (existingProduct) {
      throw new Error('Product with this SKU already exists');
    }

    const product = new Product(validatedData);
    await product.save();

    revalidatePath('/admin/products');
    revalidatePath('/products');
    
    return { 
      success: true, 
      message: 'Product created successfully',
      productId: String(product._id)
    };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to create product');
  }
}

export async function updateProduct(productId: string, productData: Partial<ProductInput>) {
  try {
    await checkAdminPermission();
    await connectDB();
    
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // If SKU is being updated, check for duplicates
    if (productData.sku && productData.sku !== product.sku) {
      const existingProduct = await Product.findOne({ 
        sku: productData.sku,
        _id: { $ne: productId }
      });
      if (existingProduct) {
        throw new Error('Product with this SKU already exists');
      }
    }

    Object.assign(product, productData);
    await product.save();

    revalidatePath('/admin/products');
    revalidatePath('/products');
    revalidatePath(`/products/${productId}`);
    
    return { success: true, message: 'Product updated successfully' };
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update product');
  }
}

export async function deleteProduct(productId: string) {
  try {
    await checkAdminPermission();
    await connectDB();
    
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    // Soft delete by setting isActive to false
    product.isActive = false;
    await product.save();

    revalidatePath('/admin/products');
    revalidatePath('/products');
    
    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
}

export async function updateOrderStatus(orderId: string, updateData: OrderUpdateInput) {
  try {
    await checkAdminPermission();
    await connectDB();
    
    // Validate update data
    const validatedData = orderUpdateSchema.parse(updateData);
    
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    order.status = validatedData.status;
    if (validatedData.notes) {
      order.notes = validatedData.notes;
    }

    await order.save();

    revalidatePath('/admin/orders');
    revalidatePath(`/orders/${orderId}`);
    
    return { success: true, message: 'Order status updated successfully' };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
}

interface AdminStats {
  products: {
    total: number;
    active: number;
    inactive: number;
  };
  orders: {
    total: number;
    revenue: number;
  };
  recentOrders: Array<{
    _id: string;
    orderNumber: string;
    total: number;
    status: string;
    createdAt: Date;
    user: {
      name: string;
      email: string;
    };
  }>;
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    await checkAdminPermission();
    await connectDB();
    
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      totalRevenue,
      recentOrders
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, total: { $sum: '$total' } } }
      ]),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('user', 'name email')
        .lean()
    ]);

    return {
      products: {
        total: totalProducts,
        active: activeProducts,
        inactive: totalProducts - activeProducts
      },
      orders: {
        total: totalOrders,
        revenue: totalRevenue[0]?.total || 0
      },
      recentOrders: JSON.parse(JSON.stringify(recentOrders))
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw new Error('Failed to fetch admin statistics');
  }
}


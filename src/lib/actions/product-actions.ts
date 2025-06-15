'use server';

import connectDB from '@/lib/db';
import { Product, type IProduct, type ProductCategory } from '@/models/Product';
import { SearchInput, searchSchema } from '@/lib/validation';

// Define proper types for MongoDB queries
interface MongoQuery {
  isActive: boolean;
  $text?: { $search: string };
  category?: ProductCategory;
  price?: {
    $gte?: number;
    $lte?: number;
  };
  stock?: { $gt: number };
  featured?: boolean;
}

interface SortOptions {
  [key: string]: 1 | -1 | { $meta: 'textScore' };
}

interface ProductsResult {
  products: IProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export async function getProducts(params?: Partial<SearchInput>): Promise<ProductsResult> {
  try {
    await connectDB();
    
    // Validate and set defaults
    const validatedParams = searchSchema.parse(params || {});
    const { 
      query, 
      category, 
      minPrice, 
      maxPrice, 
      sortBy, 
      inStock, 
      featured, 
      page, 
      limit 
    } = validatedParams;

    // ✅ Fixed: Properly typed MongoDB query
    const mongoQuery: MongoQuery = { isActive: true };

    // Text search
    if (query) {
      mongoQuery.$text = { $search: query };
    }

    // Category filter
    if (category && category !== 'all') {
      mongoQuery.category = category as ProductCategory;
    }

    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      mongoQuery.price = {};
      if (minPrice !== undefined) mongoQuery.price.$gte = minPrice;
      if (maxPrice !== undefined) mongoQuery.price.$lte = maxPrice;
    }

    // Stock filter
    if (inStock) {
      mongoQuery.stock = { $gt: 0 };
    }

    // Featured filter
    if (featured) {
      mongoQuery.featured = true;
    }

    // ✅ Fixed: Properly typed sort options
    const sortOptions: SortOptions = {};
    switch (sortBy) {
      case 'price-low':
        sortOptions.price = 1;
        break;
      case 'price-high':
        sortOptions.price = -1;
        break;
      case 'name-asc':
        sortOptions.name = 1;
        break;
      case 'name-desc':
        sortOptions.name = -1;
        break;
      case 'newest':
      default:
        sortOptions.createdAt = -1;
        break;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [products, totalCount] = await Promise.all([
      Product.find(mongoQuery)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(mongoQuery)
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      products: JSON.parse(JSON.stringify(products)),
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function getProductById(id: string): Promise<IProduct> {
  try {
    await connectDB();
    
    const product = await Product.findById(id).lean();
    
    if (!product) {
      throw new Error('Product not found');
    }

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function getFeaturedProducts(limit: number = 3): Promise<IProduct[]> {
  try {
    await connectDB();
    
    const products = await Product.find({ 
      featured: true, 
      isActive: true,
      stock: { $gt: 0 }
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw new Error('Failed to fetch featured products');
  }
}

export async function getRelatedProducts(
  productId: string, 
  category: string, 
  limit: number = 4
): Promise<IProduct[]> {
  try {
    await connectDB();
    
    const products = await Product.find({
      _id: { $ne: productId },
      category,
      isActive: true,
      stock: { $gt: 0 }
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching related products:', error);
    return [];
  }
}

export async function searchProducts(query: string, limit: number = 10): Promise<IProduct[]> {
  try {
    await connectDB();
    
    const products = await Product.find({
      $text: { $search: query },
      isActive: true
    })
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

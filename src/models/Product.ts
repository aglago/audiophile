// models/Product.ts - Fixed with proper TypeScript types
import mongoose, { Document, Schema } from 'mongoose';

// Define specific types for specifications
export interface ProductSpecifications {
  impedance?: string;
  headphoneType?: 'Over-ear' | 'On-ear' | 'In-ear';
  frequency?: string;
  powerOutput?: string;
  speakerType?: 'Bookshelf' | 'Floor-standing' | 'Portable';
  includedItems?: string[];
  connectivity?: string[];
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
  };
  battery?: {
    life?: string;
    chargingTime?: string;
    type?: string;
  };
  warranty?: string;
  [key: string]: unknown; // Allow additional custom fields
}

// Define product categories as const for better type safety
export const PRODUCT_CATEGORIES = ['headphones', 'speakers', 'earphones', 'accessories'] as const;
export type ProductCategory = typeof PRODUCT_CATEGORIES[number];

// Define product tags
export const PRODUCT_TAGS = [
  'premium',
  'wireless',
  'wired',
  'bluetooth',
  'noise-cancelling',
  'over-ear',
  'on-ear',
  'in-ear',
  'portable',
  'bookshelf',
  'featured',
  'bestseller',
  'new',
  'limited-edition'
] as const;
export type ProductTag = typeof PRODUCT_TAGS[number];

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: ProductCategory;
  subcategory?: string;
  stock: number;
  sku: string;
  slug: string;
  brand?: string;
  specifications: ProductSpecifications;
  tags: ProductTag[];
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  images: [{
    type: String,
    required: true,
    validate: {
      validator: function(v: string) {
        return v.length > 0;
      },
      message: 'At least one image is required'
    }
  }],
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: PRODUCT_CATEGORIES,
      message: 'Category must be one of: {VALUES}'
    }
  },
  subcategory: {
    type: String,
    trim: true,
    maxlength: [100, 'Subcategory cannot exceed 100 characters']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0,
    validate: {
      validator: Number.isInteger,
      message: 'Stock must be a whole number'
    }
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    uppercase: true,
    trim: true,
    minlength: [3, 'SKU must be at least 3 characters'],
    maxlength: [20, 'SKU cannot exceed 20 characters']
  },
  brand: {
    type: String,
    trim: true,
    maxlength: [100, 'Brand name cannot exceed 100 characters']
  },
  specifications: {
    type: Schema.Types.Mixed,
    default: {},
    validate: {
      validator: function(v: ProductSpecifications) {
        return typeof v === 'object' && v !== null;
      },
      message: 'Specifications must be an object'
    }
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true,
    enum: {
      values: PRODUCT_TAGS,
      message: 'Tag must be one of: {VALUES}'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
ProductSchema.index({ name: 'text', description: 'text' });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ featured: 1, isActive: 1 });
ProductSchema.index({ sku: 1 }, { unique: true });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ brand: 1 });

// Virtual for checking if in stock
ProductSchema.virtual('inStock').get(function(this: IProduct) {
  return this.stock > 0;
});

// Pre-save middleware for validation
ProductSchema.pre('save', function(this: IProduct, next) {
  // Ensure at least one image
  if (!this.images || this.images.length === 0) {
    next(new Error('At least one image is required'));
    return;
  }
  
  // Validate price
  if (this.price < 0) {
    next(new Error('Price cannot be negative'));
    return;
  }
  
  next();
});

// Static methods with proper typing
ProductSchema.statics.findByCategory = function(category: ProductCategory) {
  return this.find({ category, isActive: true });
};

ProductSchema.statics.findFeatured = function(limit: number = 10) {
  return this.find({ featured: true, isActive: true }).limit(limit);
};

ProductSchema.statics.findInStock = function() {
  return this.find({ stock: { $gt: 0 }, isActive: true });
};

// Instance methods with proper typing
ProductSchema.methods.updateStock = function(this: IProduct, quantity: number) {
  this.stock = Math.max(0, this.stock + quantity);
  return this.save();
};

ProductSchema.methods.isInStock = function(this: IProduct, quantity: number = 1) {
  return this.stock >= quantity;
};

// Add static methods to interface
export interface IProductModel extends mongoose.Model<IProduct> {
  findByCategory(category: ProductCategory): mongoose.Query<IProduct[], IProduct>;
  findFeatured(limit?: number): mongoose.Query<IProduct[], IProduct>;
  findInStock(): mongoose.Query<IProduct[], IProduct>;
}

export const Product = (mongoose.models.Product || mongoose.model<IProduct, IProductModel>('Product', ProductSchema)) as IProductModel;

// Helper types for forms and API
export type CreateProductInput = Omit<IProduct, '_id' | 'createdAt' | 'updatedAt' | 'inStock'>;
export type UpdateProductInput = Partial<CreateProductInput>;

// Type guards
export function isValidProductCategory(category: string): category is ProductCategory {
  return PRODUCT_CATEGORIES.includes(category as ProductCategory);
}

export function isValidProductTag(tag: string): tag is ProductTag {
  return PRODUCT_TAGS.includes(tag as ProductTag);
}

// Utility functions for specifications
export function createHeadphoneSpecs(specs: {
  impedance?: string;
  headphoneType?: 'Over-ear' | 'On-ear' | 'In-ear';
  frequency?: string;
  includedItems?: string[];
}): ProductSpecifications {
  return {
    ...specs,
    headphoneType: specs.headphoneType || 'Over-ear'
  };
}

export function createSpeakerSpecs(specs: {
  powerOutput?: string;
  speakerType?: 'Bookshelf' | 'Floor-standing' | 'Portable';
  frequency?: string;
  includedItems?: string[];
}): ProductSpecifications {
  return {
    ...specs,
    speakerType: specs.speakerType || 'Bookshelf'
  };
}


import { z } from 'zod';
import { PRODUCT_CATEGORIES, PRODUCT_TAGS } from '@/models/Product';


// Product validation schema
export const productSchema = z.object({
  name: z.string()
    .min(1, 'Product name is required')
    .max(200, 'Product name cannot exceed 200 characters')
    .trim(),
  description: z.string()
    .min(1, 'Description is required')
    .max(2000, 'Description cannot exceed 2000 characters')
    .trim(),
  price: z.number()
    .min(0, 'Price must be positive')
    .max(99999.99, 'Price is too high'),
  images: z.array(z.string().url('Invalid image URL'))
    .min(1, 'At least one image is required')
    .max(10, 'Maximum 10 images allowed'),
  category: z.enum(PRODUCT_CATEGORIES, {
    errorMap: () => ({ message: 'Invalid category' })
  }),
  subcategory: z.string()
    .max(100, 'Subcategory cannot exceed 100 characters')
    .optional(),
  stock: z.number()
    .int('Stock must be a whole number')
    .min(0, 'Stock cannot be negative')
    .max(99999, 'Stock is too high'),
  sku: z.string()
    .min(3, 'SKU must be at least 3 characters')
    .max(20, 'SKU cannot exceed 20 characters')
    .regex(/^[A-Z0-9-]+$/, 'SKU can only contain uppercase letters, numbers, and hyphens')
    .trim()
    .transform(val => val.toUpperCase()),
  brand: z.string()
    .max(100, 'Brand name cannot exceed 100 characters')
    .optional(),
  specifications: z.object({
    impedance: z.string().optional(),
    headphoneType: z.enum(['Over-ear', 'On-ear', 'In-ear']).optional(),
    frequency: z.string().optional(),
    powerOutput: z.string().optional(),
    speakerType: z.enum(['Bookshelf', 'Floor-standing', 'Portable']).optional(),
    includedItems: z.array(z.string()).optional(),
    connectivity: z.array(z.string()).optional(),
    dimensions: z.object({
      width: z.number().positive().optional(),
      height: z.number().positive().optional(),
      depth: z.number().positive().optional(),
      weight: z.number().positive().optional(),
    }).optional(),
    battery: z.object({
      life: z.string().optional(),
      chargingTime: z.string().optional(),
      type: z.string().optional(),
    }).optional(),
    warranty: z.string().optional(),
  }).optional().default({}),
  tags: z.array(z.enum(PRODUCT_TAGS))
    .max(10, 'Maximum 10 tags allowed')
    .optional()
    .default([]),
  isActive: z.boolean().default(true),
  featured: z.boolean().default(false)
});

// User registration schema
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

// Address validation schema
export const addressSchema = z.object({
  type: z.enum(['billing', 'shipping']),
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  company: z.string().max(100).optional(),
  address1: z.string().min(1, 'Address is required').max(200),
  address2: z.string().max(200).optional(),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  zipCode: z.string().min(1, 'ZIP code is required').max(20),
  country: z.string().min(1, 'Country is required').max(100),
  phone: z.string().regex(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number').optional(),
  isDefault: z.boolean().default(false).optional()
});

// Cart item schema
export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1').max(99, 'Quantity cannot exceed 99')
});

// Checkout form schema
export const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  sameAsShipping: z.boolean().default(false).optional(),
  paymentMethod: z.enum(['credit-card', 'paypal', 'bank-transfer']),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  cardholderName: z.string().optional(),
  notes: z.string().max(500).optional()
}).refine((data) => {
  if (data.paymentMethod === 'credit-card') {
    return !!(data.cardNumber && data.expiryDate && data.cvv && data.cardholderName);
  }
  return true;
}, {
  message: 'Credit card details are required when selecting credit card payment',
  path: ['cardNumber']
});


// Search/filter schema
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.enum(['all', 'headphones', 'speakers', 'earphones', 'accessories']).default('all'),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortBy: z.enum(['newest', 'price-low', 'price-high', 'name-asc', 'name-desc']).default('newest'),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12)
});

// Order status update schema
export const orderUpdateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']),
  notes: z.string().max(500).optional()
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address')
});

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000)
});

// Export all schemas as a group for easier imports
export const schemas = {
  product: productSchema,
  register: registerSchema,
  login: loginSchema,
  address: addressSchema,
  cartItem: cartItemSchema,
  checkout: checkoutSchema,
  search: searchSchema,
  orderUpdate: orderUpdateSchema,
  newsletter: newsletterSchema,
  contact: contactSchema
};

// Type exports for TypeScript inference
export type ProductInput = z.infer<typeof productSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = {
  type: 'billing' | 'shipping';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean
};

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export type CartItemInput = z.infer<typeof cartItemSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type OrderUpdateInput = z.infer<typeof orderUpdateSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type SearchProductInput = z.infer<typeof searchProductSchema>;




export const updateProductSchema = productSchema.partial();

export const searchProductSchema = z.object({
  query: z.string().optional(),
  category: z.enum(['all', ...PRODUCT_CATEGORIES]).default('all'),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortBy: z.enum(['newest', 'price-low', 'price-high', 'name-asc', 'name-desc']).default('newest'),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  tags: z.array(z.enum(PRODUCT_TAGS)).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12)
});

import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './User';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  user: mongoose.Types.ObjectId;
  items: IOrderItem[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: IAddress;
  billingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  }
});

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [OrderItemSchema],
  subtotal: {
    type: Number,
    required: true,
    min: [0, 'Subtotal cannot be negative']
  },
  shipping: {
    type: Number,
    required: true,
    default: 50 // Fixed $50 shipping
  },
  vat: {
    type: Number,
    required: true,
    min: [0, 'VAT cannot be negative']
  },
  total: {
    type: Number,
    required: true,
    min: [0, 'Total cannot be negative']
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
  shippingAddress: {
    type: new Schema<IAddress>({
      type: { type: String, enum: ['billing', 'shipping'], required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      company: { type: String },
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false }
    }, { _id: false }),
    required: true
  },
  billingAddress: {
    type: new Schema<IAddress>({
      type: { type: String, enum: ['billing', 'shipping'], required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      company: { type: String },
      address1: { type: String, required: true },
      address2: { type: String },
      city: { type: String, required: true },
      state: { type: String },
      country: { type: String, required: true },
      isDefault: { type: Boolean, default: false }
    }, { _id: false }),
    required: true
  },
    type: String,
    required: true,
    enum: ['credit-card', 'paypal', 'bank-transfer']
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Generate order number before saving
OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.orderNumber = `ORD-${timestamp}-${random}`;
  }
  next();
});

// Calculate totals before saving
OrderSchema.pre('save', function(next) {
  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.total, 0);
  
  // VAT is 20% of subtotal (excluding shipping)
  this.vat = Math.round(this.subtotal * 0.2 * 100) / 100;
  
  // Total = subtotal + shipping + VAT
  this.total = Math.round((this.subtotal + this.shipping + this.vat) * 100) / 100;
  
  next();
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);


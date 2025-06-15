import mongoose, { Document, Schema } from 'mongoose';

export interface ICartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  addedAt: Date;
}

export interface ICart extends Document {
  user?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    max: [99, 'Quantity cannot exceed 99']
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const CartSchema = new Schema<ICart>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sessionId: {
    type: String
  },
  items: [CartItemSchema],
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    expires: 0
  }
}, {
  timestamps: true
});

// Ensure either user or sessionId is provided
CartSchema.pre('save', function(next) {
  if (!this.user && !this.sessionId) {
    next(new Error('Cart must have either a user or session ID'));
  }
  next();
});

export const Cart = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
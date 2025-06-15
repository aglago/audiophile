'use server';

import connectDB from './db';
import { Product } from '@/models/Product';

export const sampleProducts = [
  {
    name: "XX99 Mark II Headphones",
    description: "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    price: 2999,
    images: [
      "/products/xx99-mark-two-headphones/desktop/image-product.jpg",
      "/products/xx99-mark-two-headphones/desktop/image-gallery-1.jpg",
      "/products/xx99-mark-two-headphones/desktop/image-gallery-2.jpg",
      "/products/xx99-mark-two-headphones/desktop/image-gallery-3.jpg"
    ],
    category: "headphones",
    stock: 15,
    sku: "XX99-MK2",
    brand: "Audiophile",
    specifications: {
      impedance: "25 Ω",
      headphoneType: "Over-ear",
      frequency: "5Hz to 40kHz",
      includedItems: ["Headphone unit", "Replacement earcups", "User manual", "3.5mm 5m audio cable", "Travel bag"]
    },
    tags: ["premium", "over-ear", "wireless", "featured"],
    featured: true
  },
  {
    name: "XX99 Mark I Headphones",
    description: "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    price: 1750,
    images: [
      "/products/xx99-mark-one-headphones/desktop/image-product.jpg",
      "/products/xx99-mark-one-headphones/desktop/image-gallery-1.jpg",
      "/products/xx99-mark-one-headphones/desktop/image-gallery-2.jpg",
      "/products/xx99-mark-one-headphones/desktop/image-gallery-3.jpg"
    ],
    category: "headphones",
    stock: 22,
    sku: "XX99-MK1",
    brand: "Audiophile",
    specifications: {
      impedance: "25 Ω",
      headphoneType: "Over-ear",
      frequency: "20Hz to 40kHz",
      includedItems: ["Headphone unit", "Replacement earcups", "User manual", "3.5mm 5m audio cable"]
    },
    tags: ["premium", "over-ear", "wired"],
    featured: true
  },
  {
    name: "XX59 Headphones",
    description: "Enjoy your audio almost anywhere and customize it to your specific tastes with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    price: 899,
    images: [
      "/products/xx59-headphones/desktop/image-product.jpg",
      "/products/xx59-headphones/desktop/image-gallery-1.jpg",
      "/products/xx59-headphones/desktop/image-gallery-2.jpg",
      "/products/xx59-headphones/desktop/image-gallery-3.jpg"
    ],
    category: "headphones",
    stock: 8,
    sku: "XX59",
    brand: "Audiophile",
    specifications: {
      impedance: "32 Ω",
      headphoneType: "Over-ear",
      frequency: "20Hz to 22kHz",
      includedItems: ["Headphone unit", "User manual", "3.5mm 5m audio cable", "Travel bag"]
    },
    tags: ["wireless", "portable", "mid-range"],
    featured: false
  },
  {
    name: "ZX9 Speaker",
    description: "Upgrade your sound system with the all new ZX9 active bookshelf speaker. It's a bookshelf speaker system that offers truly wireless connectivity -- creating new possibilities for more pleasing and practical audio setups.",
    price: 4500,
    images: [
      "/products/zx9-speaker/desktop/image-product.jpg",
      "/products/zx9-speaker/desktop/image-gallery-1.jpg",
      "/products/zx9-speaker/desktop/image-gallery-2.jpg",
      "/products/zx9-speaker/desktop/image-gallery-3.jpg"
    ],
    category: "speakers",
    stock: 5,
    sku: "ZX9",
    brand: "Audiophile",
    specifications: {
      powerOutput: "125W",
      speakerType: "Bookshelf",
      frequency: "20Hz to 20kHz",
      includedItems: ["Speaker unit", "User manual", "Power cable", "RCA cable"]
    },
    tags: ["premium", "bookshelf", "wireless", "featured"],
    featured: true
  },
  {
    name: "ZX7 Speaker",
    description: "Stream high quality sound wirelessly with minimal loss. The ZX7 bookshelf speaker uses high-end audiophile components that represents the pinnacle of ingenuity in design and produce incredible sound.",
    price: 3500,
    images: [
      "/products/zx7-speaker/desktop/image-product.jpg",
      "/products/zx7-speaker/desktop/image-gallery-1.jpg",
      "/products/zx7-speaker/desktop/image-gallery-2.jpg",
      "/products/zx7-speaker/desktop/image-gallery-3.jpg"
    ],
    category: "speakers",
    stock: 12,
    sku: "ZX7",
    brand: "Audiophile",
    specifications: {
      powerOutput: "100W",
      speakerType: "Bookshelf",
      frequency: "20Hz to 20kHz",
      includedItems: ["Speaker unit", "User manual", "Power cable"]
    },
    tags: ["premium", "bookshelf", "wireless"],
    featured: false
  },
  {
    name: "YX1 Wireless Earphones",
    description: "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    price: 599,
    images: [
      "/products/yx1-earphones/desktop/image-product.jpg",
      "/products/yx1-earphones/desktop/image-gallery-1.jpg",
      "/products/yx1-earphones/desktop/image-gallery-2.jpg",
      "/products/yx1-earphones/desktop/image-gallery-3.jpg"
    ],
    category: "earphones",
    stock: 25,
    sku: "YX1",
    brand: "Audiophile",
    specifications: {
      impedance: "16 Ω",
      headphoneType: "In-ear",
      frequency: "20Hz to 20kHz",
      includedItems: ["Earphone unit", "Multi-size earplugs", "User manual", "USB-C charging cable", "Travel pouch"]
    },
    tags: ["wireless", "in-ear", "noise-cancelling", "portable"],
    featured: true
  }
];

export async function seedDatabase() {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    
    console.log(`✅ Seeded ${products.length} products`);
    return products;
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
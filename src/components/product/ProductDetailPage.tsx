"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CategoriesSection from "../home/categories/CategoriesSection";
import AboutSection from "../home/AboutSection";
import { Button } from "../ui/button";
import { useCartStore } from '@/lib/cart-store';

interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

interface Product {
  id: number;
  slug: string;
  name: string;
  image: ProductImage;
  category: string;
  categoryImage: ProductImage;
  new: boolean;
  price: number;
  description: string;
  features: string;
  includes: Array<{
    quantity: number;
    item: string;
  }>;
  gallery: {
    first: ProductImage;
    second: ProductImage;
    third: ProductImage;
  };
  others: Array<{
    slug: string;
    name: string;
    image: ProductImage;
  }>;
}

interface ProductDetailPageProps {
  product: Product;
  allProducts?: Product[];
}

const ProductDetailPage = ({ product }: ProductDetailPageProps) => {

const addToCart = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (action: "increment" | "decrement") => {
    if (action === "increment") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
  addToCart({
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image.mobile
  });
};

  // Clean image paths (remove ./ prefix)
  const cleanImagePath = (path: string) => path.replace("./", "/");

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="bg-white max-w-7xl mx-auto py-4">
        <Button variant={"ghost"} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>

      {/* Product Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center md:h-[480px] lg:h-[560px]">
          {/* Product Image */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden h-full">
            <div className="aspect-square relative flex items-center justify-center w-full h-full">
              <Image
                src={cleanImagePath(product.image.desktop)}
                alt={product.name}
                fill
                className="object-cover h-full"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 lg:space-y-8">
            <h1 className="max-w-[300px] lg:max-w-[445px] text-3xl sm:text-4xl lg:text-5xl font-bold text-black tracking-wide uppercase">
              {product.name}
            </h1>

            <p className="text-black/50 text-base leading-relaxed">
              {product.description}
            </p>

            <div className="text-lg font-bold text-black">
              $ {product.price.toLocaleString()}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100">
                <Button
                  variant={"ghost"}
                  onClick={() => handleQuantityChange("decrement")}
                >
                  -
                </Button>
                <span className="px-4 py-3 font-bold min-w-[3rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant={"ghost"}
                  onClick={() => handleQuantityChange("increment")}
                >
                  +
                </Button>
              </div>

              <Button onClick={handleAddToCart} size={"lg"}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features and In The Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[88px] md:pt-[120px] lg:py-[160px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Features */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
              Features
            </h2>
            <div className="space-y-6 text-black/50 leading-relaxed">
              {product.features.split("\n\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* In The Box */}
          <div className="space-y-6 flex flex-col md:flex-row lg:flex-col md:items-center md:gap-40 lg:gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-black uppercase tracking-wide">
              In The Box
            </h2>
            <ul className="space-y-3">
              {product.includes.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="text-primary font-bold min-w-[2rem]">
                    {item.quantity}x
                  </span>
                  <span className="text-black/50">{item.item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden h-44 lg:h-72 w-full">
              <Image
                src={cleanImagePath(product.gallery.first.desktop)}
                alt={`${product.name} gallery image 1`}
                fill
                className="object-cover h-44"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden h-44 lg:h-72 w-full">
              <Image
                src={cleanImagePath(product.gallery.second.desktop)}
                alt={`${product.name} gallery image 2`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="relative aspect-square lg:aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden h-[368px] lg:h-[602px] w-full">
              <Image
                src={cleanImagePath(product.gallery.third.desktop)}
                alt={`${product.name} gallery image 3`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-12 lg:mb-16 uppercase tracking-wide">
          You May Also Like
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {product.others.map((relatedProduct) => (
            <div key={relatedProduct.slug} className="text-center group">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-6 lg:mb-8">
                <div className="aspect-square relative">
                  <Image
                    src={cleanImagePath(relatedProduct.image.desktop)}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-black mb-6 uppercase tracking-wide">
                {relatedProduct.name}
              </h3>

              <Link href={`/products/${product.slug}`}>
                <Button size={"lg"}>See Product</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="pb-[120px] md:pb-40">
        <CategoriesSection />
      </div>
      <AboutSection />
    </div>
  );
};

export default ProductDetailPage;

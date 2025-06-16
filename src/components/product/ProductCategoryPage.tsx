"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CategoriesSection from "../home/categories/CategoriesSection";
import AboutSection from "../home/AboutSection";
import { Button } from "../ui/button";
import { Product } from "@/types/product";

interface ProductCategoryPageProps {
  category?: string;
  products: Product[];
}

const ProductCategoryPage = ({
  category,
  products,
}: ProductCategoryPageProps) => {
  const searchParams = useSearchParams();

  // Get category from URL params if not provided as prop
  const urlCategory = searchParams.get("category");
  const activeCategory = category || urlCategory || "headphones";

  // Filter products by category
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  // Sort products with new products first
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (a.new && !b.new) return -1;
    if (!a.new && b.new) return 1;
    return 0;
  });

  const categoryTitle =
    activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Header */}
      <section className="bg-black text-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide uppercase">
              {categoryTitle}
            </h1>
          </div>
        </div>
      </section>

      {/* Products List */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-32">
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Product Image */}
                <div
                  className={`relative bg-gray-100 rounded-lg overflow-hidden ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="aspect-square relative">
                    <Image
                      src={product.image.desktop.replace("./", "/")}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div
                  className={`space-y-6 lg:space-y-8 text-center lg:text-left ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  {product.new && (
                    <span className="text-primary text-sm font-medium tracking-[10px] uppercase">
                      New Product
                    </span>
                  )}

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-wide uppercase">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {product.description}
                  </p>

                  <Link href={`/products/${product.slug}`}>
                    <Button size={"lg"}>See Product</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-[120px] md:pb-40">
        <CategoriesSection />
      </div>
      <AboutSection />
    </div>
  );
};

export default ProductCategoryPage;

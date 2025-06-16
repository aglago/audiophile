import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/actions/product-actions";
import { Header } from "@/components/layout/Header";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[url('/assets/home/mobile/image-header.jpg')] lg:bg-[url('/assets/home/desktop/image-hero.jpg')] bg-cover bg-top min-h-screen lg:min-h-[85vh] flex items-start justify-center flex-col">
        <Header />
        <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 mx-auto w-full text-white">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="w-full py-12 lg:py-20 items-center">
              <div className="space-y-8 flex items-center justify-center lg:items-start flex-col">
                <div className="space-y-4 text-center lg:text-left">
                  <p className="text-white mix-blend-normal opacity-50 text-sm font-medium tracking-[10px] uppercase">
                    New Product
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight uppercase">
                    XX99 Mark II
                    <br />
                    Headphones
                  </h1>
                  <p className="text-lg text-white mix-blend-normal opacity-75 max-w-[349px]">
                    Experience natural, lifelike audio and exceptional build
                    quality made for the passionate music enthusiast.
                  </p>
                </div>
                <Link href="/products">
                  <Button size="lg">See Product</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Featured Products */}
      <section className={featuredProducts.length > 0 ? "py-16 lg:py-24" : ""}>
        {featuredProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our hand-picked selection of premium audio equipment
              </p>
            </div>
            <div className="space-y-12">
              {/* First featured product - large showcase */}
              <ProductCard product={featuredProducts[0]} variant="featured" />

              {/* Other featured products */}
              {featuredProducts.length > 1 && (
                <ProductGrid
                  products={featuredProducts.slice(1)}
                  variant="default"
                />
              )}
            </div>
          </div>
        )}
      </section>

      {/* Category Showcase */}
      <section className="py-12 sm:py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 lg:gap-8">
      {[
        {
          name: "Headphones",
          image: "/assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg",
          href: "/products?category=headphones",
        },
        {
          name: "Speakers", 
          image: "/assets/product-zx9-speaker/mobile/image-category-page-preview.jpg",
          href: "/products?category=speakers",
        },
        {
          name: "Earphones",
          image: "/assets/product-yx1-earphones/mobile/image-category-page-preview.jpg", 
          href: "/products?category=earphones",
        },
      ].map((category) => (
        <Link 
          key={category.name} 
          href={category.href} 
          className="group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
        >
          <div className="relative flex flex-col items-center justify-end bg-gray-100 rounded-lg p-6 sm:p-8 text-center h-40 sm:h-44 lg:h-52 transition-all duration-300 hover:shadow-lg hover:bg-gray-50">
            {/* Image container with better positioning */}
            <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 z-10">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="mt-auto space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-wide">
                {category.name}
              </h3>
              
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
                <span>Shop</span>
                <div className="w-2 h-2 relative">
                  <Image
                    alt="Arrow right"
                    src="/assets/shared/desktop/icon-arrow-right.svg"
                    fill
                    className="object-contain transition-transform duration-200 group-hover:translate-x-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Bringing you the <span className="text-primary">best</span>{" "}
                audio gear
              </h2>
              <p className="text-lg text-gray-600">
                Located at the heart of New York City, Audiophile is the premier
                store for high end headphones, earphones, speakers, and audio
                accessories. We have a large showroom and luxury demonstration
                rooms available for you to browse and experience a wide range of
                our products. Stop by our store to meet some of the fantastic
                people who make Audiophile the best place to buy your portable
                audio equipment.
              </p>
            </div>

            <div className="relative h-64 lg:h-80">
              <Image
                src="/about-image.jpg"
                alt="About Audiophile"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

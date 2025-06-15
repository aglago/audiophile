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
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of premium audio equipment
            </p>
          </div>

          {featuredProducts.length > 0 && (
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
          )}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Headphones",
                image: "/category-headphones.png",
                href: "/products?category=headphones",
              },
              {
                name: "Speakers",
                image: "/category-speakers.png",
                href: "/products?category=speakers",
              },
              {
                name: "Earphones",
                image: "/category-earphones.png",
                href: "/products?category=earphones",
              },
            ].map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <div className="bg-white rounded-lg p-8 text-center hover:shadow-lg transition-all duration-200">
                  <div className="relative h-32 mb-6">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {category.name}
                  </h3>
                  <Button
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white group-hover:border-primary"
                  >
                    Shop {category.name}
                  </Button>
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

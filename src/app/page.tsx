import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/actions/product-actions";
import { Header } from "@/components/layout/Header";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import CategoriesSection from "@/components/home/categories/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <AboutSection />
    </div>
  );
}

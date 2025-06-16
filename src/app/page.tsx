import React from "react";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import CategoriesSection from "@/components/home/categories/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";

export default async function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <AboutSection />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductImageGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  alt,
  className = ''
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-200 rounded-lg flex items-center justify-center h-96">
        <span className="text-gray-500">No image available</span>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
        <Image
          src={images[selectedImage]}
          alt={alt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative h-20 bg-gray-50 rounded-md overflow-hidden border-2 transition-colors",
                selectedImage === index
                  ? "border-primary"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


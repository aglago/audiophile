import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/lib/actions/product-actions';
import { Badge } from '@/components/ui/badge';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { ProductImageGallery } from '@/components/product/ProductImageGallery';
import { formatPrice } from '@/lib/utils';

// ✅ Fixed: Updated interface for Next.js 15
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    // ✅ Resolve the params promise
    const { id } = await params;
    
    const product = await getProductById(id);
    const relatedProducts = await getRelatedProducts(id, product.category, 4);

    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><Link href="/" className="hover:text-gray-900">Home</Link></li>
              <li>/</li>
              <li><Link href="/products" className="hover:text-gray-900">Products</Link></li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <ProductImageGallery images={product.images} alt={product.name} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                {product.featured && (
                  <Badge className="mb-4 bg-primary">Featured</Badge>
                )}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                  {product.inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Add to Cart */}
              <AddToCartButton product={product} />

              {/* Product Specifications */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <dt className="text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </dt>
                        <dd className="text-gray-900 font-medium">
                          {Array.isArray(value)
                            ? value.join(', ')
                            : typeof value === 'string' || typeof value === 'number'
                              ? value.toString()
                              : JSON.stringify(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                You may also like
              </h2>
              <ProductGrid products={relatedProducts} />
            </section>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}


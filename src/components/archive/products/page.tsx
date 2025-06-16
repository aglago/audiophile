import React, { Suspense } from 'react';
import { SearchInput } from '@/lib/validation';
import { getProducts } from '@/lib/actions/product-actions';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilters } from '@/components/product/ProductFilters';
import { ProductSort } from '@/components/product/ProductSort';
import { Pagination } from '@/components/ui/pagination';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface ProductsPageProps {
  searchParams: Promise<{
    category?: "all" | "headphones" | "speakers" | "earphones" | "accessories" | undefined;
    query?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: string;
    inStock?: string;
    featured?: string;
    page?: string;
    limit?: string;
  }>;
}

// ✅ Server Component - can be async
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Resolve searchParams and convert to proper types
  const rawSearchParams = await searchParams;
  
  // Convert string parameters to proper types for validation
  const processedSearchParams: Partial<SearchInput> = {
    category: rawSearchParams.category || 'all',
    query: rawSearchParams.query,
    minPrice: rawSearchParams.minPrice ? parseFloat(rawSearchParams.minPrice) : undefined,
    maxPrice: rawSearchParams.maxPrice ? parseFloat(rawSearchParams.maxPrice) : undefined,
    sortBy: rawSearchParams.sortBy as SearchInput['sortBy'] || 'newest',
    inStock: rawSearchParams.inStock === 'true',
    featured: rawSearchParams.featured === 'true',
    page: rawSearchParams.page ? parseInt(rawSearchParams.page) : 1,
    limit: rawSearchParams.limit ? parseInt(rawSearchParams.limit) : 12,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {processedSearchParams.category && processedSearchParams.category !== 'all'
              ? `${processedSearchParams.category.charAt(0).toUpperCase() + processedSearchParams.category.slice(1)}`
              : 'All Products'
            }
          </h1>
          <p className="text-gray-600">Discover our premium audio equipment collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Suspense fallback={<LoadingSpinner />}>
              <ProductFilters />
            </Suspense>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <ProductSort />
            </div>

            <Suspense fallback={<ProductsLoading />}>
              <ProductsContent searchParams={processedSearchParams} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Server Component - can be async
async function ProductsContent({ searchParams }: { searchParams: Partial<SearchInput> }) {
  const { products, pagination } = await getProducts(searchParams);

  return (
    <div className="space-y-8">
      <ProductGrid products={products} />
      
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          hasNextPage={pagination.hasNextPage}
          hasPrevPage={pagination.hasPrevPage}
        />
      )}
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
}


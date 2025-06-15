// components/product/ProductFilters.tsx
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

export const ProductFilters: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = [
    { value: 'headphones', label: 'Headphones' },
    { value: 'speakers', label: 'Speakers' },
    { value: 'earphones', label: 'Earphones' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const updateFilter = (key: string, value: string | number | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    
    router.push(`/products?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/products');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-medium mb-3">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={searchParams.get('category') === category.value}
                  onCheckedChange={(checked) => 
                    updateFilter('category', checked ? category.value : '')
                  }
                />
                <Label htmlFor={category.value} className="text-sm">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[0, 5000]}
              max={5000}
              step={100}
              className="w-full"
              onValueChange={(value) => {
                updateFilter('minPrice', value[0]);
                updateFilter('maxPrice', value[1]);
              }}
            />
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>$0</span>
              <span>$5,000</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Other Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="inStock"
              checked={searchParams.get('inStock') === 'true'}
              onCheckedChange={(checked) => 
                updateFilter('inStock', checked ? 'true' : '')
              }
            />
            <Label htmlFor="inStock" className="text-sm">
              In Stock Only
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={searchParams.get('featured') === 'true'}
              onCheckedChange={(checked) => 
                updateFilter('featured', checked ? 'true' : '')
              }
            />
            <Label htmlFor="featured" className="text-sm">
              Featured Products
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


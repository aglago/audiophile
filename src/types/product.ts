export interface ProductImage {
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
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
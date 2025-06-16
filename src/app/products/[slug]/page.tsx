import ProductDetailPage from '@/components/product/ProductDetailPage';
import productsData from '@/data/data.json';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);
  
  if (!product) {
    notFound();
  }
  
  return <ProductDetailPage product={product} allProducts={productsData} />;
}

export async function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

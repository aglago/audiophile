import ProductCategoryPage from "@/components/product/ProductCategoryPage";
import productsData from "@/data/data.json"

export default function ProductsPage() {
  return <ProductCategoryPage products={productsData} />;
}
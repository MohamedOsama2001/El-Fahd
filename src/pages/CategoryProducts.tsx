import { useParams } from "react-router-dom";
import { useMemo } from "react";
import adsQueries from "@/lib/queries/ads";
import ProductCard from "@/components/Home/ads/products/ProductCard";
import { useGetCategory } from "@/lib/queries/category";
import { Loader2 } from "lucide-react";

function CategoryProducts() {
  const { id } = useParams<{ id: string }>();
  const { data: productsData, isLoading: productsLoading, isError: productsError } = adsQueries.useGetProducts();
  const { data: categoriesData } = useGetCategory();

  //*  Filter products by category ID
  const filteredProducts = useMemo(() => {
    if (!productsData?.data || !id) return [];
    return productsData.data.filter((product) => product.category._id === id);
  }, [productsData, id]);

  //* Get category name
  const categoryName = useMemo(() => {
    if (!categoriesData?.data || !id) return "";
    const category = categoriesData.data.find((cat) => cat._id === id);
    return category?.name || "";
  }, [categoriesData, id]);

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-red" />
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">Failed to load products. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 capitalize">
          {categoryName || "Category"} Products
        </h1>
        <p className="text-gray-600 mt-2">
          {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Found</h2>
            <p className="text-gray-600">
              There are no products available in this category at the moment.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;

import ads from "@/lib/queries/ads";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "./ProductCard";
function ProductsSecion() {
  const { data: products, isLoading } = ads.useGetProducts();

  return (
    <>
      <section className="mb-10">
        <SectionTitle title="latest products"/>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="w-3/4 mx-auto">
            {(products?.data.length ?? 0) > 0 ? (
              <div className="grid grid-col-1 md:grid-cols-2  gap-8 my-10">
                {products?.data.map((pro, idx) => (
                  <ProductCard key={idx} product={pro} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg capitalize mt-10">
                No products placed yet
              </p>
            )}
          </div>
        )}
      </section>
    </>
  );
}

export default ProductsSecion;

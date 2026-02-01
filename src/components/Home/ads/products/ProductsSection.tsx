import ads from "@/lib/queries/ads";
import SectionTitle from "@/components/common/SectionTitle";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "@/components/common/ProductCardSkeleton";

function ProductsSecion() {
  const { data: products, isLoading } = ads.useGetProducts();

  return (
    <>
      <section className="mb-10">
        <SectionTitle title="latest products" />
        {isLoading ? (
          <div className="w-3/4 mx-auto">
            <div className="grid grid-col-1 md:grid-cols-2 gap-8 my-10">
              {/* Show 4 skeleton cards during loading */}
              {Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-3/4 mx-auto">
            {(products?.data.length ?? 0) > 0 ? (
              <div className="grid grid-col-1 md:grid-cols-2 gap-8 my-10">
                {products?.data.map((pro) => (
                  <ProductCard key={pro._id} product={pro} />
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

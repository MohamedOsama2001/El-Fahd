import { useGetCategory } from "@/lib/queries/category";
import CategoryCard from "./CategoryCard";
import SectionTitle from "@/components/common/SectionTitle";

function Categories() {
  const { data: categories, isLoading } = useGetCategory();
  
  return (
    <>
      <section className="mb-10">
        <SectionTitle title="our categories" />
        <div className="w-3/4 mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {/* Show 6 skeleton cards during loading */}
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="w-full h-52 bg-gray-200 rounded-md animate-pulse" />
              ))}
            </div>
          ) : (categories?.data.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {categories?.data.map((category) => (
                <CategoryCard key={category._id} category={category} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg capitalize mt-10">
              No categories placed yet
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default Categories;

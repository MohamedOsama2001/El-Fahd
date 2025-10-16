import { useGetCategory } from "@/lib/queries/category";
import CategoryCard from "./CategoryCard";
import SectionTitle from "@/components/common/SectionTitle";
function Categories() {
  const { data: categories, isLoading } = useGetCategory();
  return (
    <>
      <section className="mb-10">
        <SectionTitle title="our categories"/>
        <div className="w-3/4 mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (categories?.data.length ?? 0) > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {categories?.data.map((cartegory,idx) => (
                <CategoryCard key={idx} category={cartegory} />
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

import PageHeadr from "@/components/common/PageHeader";
import ProductCard from "@/components/Home/ads/products/ProductCard";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Favourites() {
  const { favourites } = useSelector((state: RootState) => state.favourites);
  return (
    <>
      <PageHeadr
        title="favourites"
        subtitle={`favourites(${favourites.length})`}
      />
      {favourites.length > 0 ? (
        <div className="w-3/4 m-auto">
          <div className="grid grid-col-1 md:grid-cols-2  gap-8 my-10">
            {favourites.map((fav, idx) => (
              <ProductCard key={idx} product={fav} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-3/4 mx-auto py-20 flex flex-col justify-center items-center">
          <h3 className=" capitalize font-bold text-xl">no favourites yet</h3>
          <p className="text-gray-900 text-center my-5 ">
            You haven't added any items to your favorites yet. <br /> Browse our
            products and click the heart icon to add items you like.
          </p>
          <Link
            to="/"
            className="bg-red-500 text-white py-2 px-3 rounded-md border border-transparent hover:bg-white  hover:border-red-500 hover:text-red-500 transition-all duration-500 ease-in-out"
          >
            Browse Products
          </Link>
        </div>
      )}
    </>
  );
}

export default Favourites;

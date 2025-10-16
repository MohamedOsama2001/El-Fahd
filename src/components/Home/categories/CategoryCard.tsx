import type { ICategory } from "@/interface";
import { Link } from "react-router-dom";

interface Props {
  category: ICategory;
}

function CategoryCard(props: Props) {
  const { category } = props;

  return (
    <Link  to={`category/${category._id}`}>
      <div className="w-full h-52 cursor-pointer relative overflow-hidden group rounded-md">
        <img
          className="w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
          src={category.image}
          alt={category.name}
        />
        <div className="absolute w-full h-full bg-dark/50 top-0 flex justify-center items-end pb-5">
          <h3 className="z-10 text-white capitalize font-bold text-lg tracking-widest">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;

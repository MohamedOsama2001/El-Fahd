import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IProductData } from "@/interface/ads";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import favHandler from "@/utils/favHandler";

interface IProps {
  product: IProductData;
}

const ProductCard: React.FC<IProps> = ({ product }) => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state: RootState) => state.favourites);
  const isInFavourites = favourites.some((item) => item._id === product._id);
  const { isAuthanticated } = useSelector((state: RootState) => state.auth);
  const onFavClick = (e: React.MouseEvent) => {
    favHandler({ e, isAuthanticated, isInFavourites, dispatch, product });
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full cursor-pointer ${
              isInFavourites ? "bg-red text-white" : "bg-white text-gray"
            } shadow-md hover:scale-110 transition-all`}
            onClick={onFavClick}
          >
            <Heart
              className={`h-5 w-5  ${isInFavourites ? "fill-current" : ""}`}
            />
          </Button>
          <Badge className="absolute top-2 left-2 bg-red capitalize text-sm">
            {product.category.name}
          </Badge>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg mb-1 line-clamp-1">
              {product.title}
            </h3>
            <span className="font-bold text-red">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="text-gray text-sm mb-3 line-clamp-2">
            {truncateText(product.description, 100)}
          </p>
          <div className="flex justify-between items-center text-sm text-gray">
            <span>{product.location}</span>
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="px-4 pb-4">
          <span className="text-red text-sm font-medium hover:underline">
            Read more &rarr;
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

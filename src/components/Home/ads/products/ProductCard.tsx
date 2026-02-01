import React, { useCallback, useMemo, memo } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IProductData } from "@/interface/ads";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { selectIsAuthenticated } from "@/store/selectors";
import favHandler from "@/utils/favHandler";
import LazyImage from "@/components/common/LazyImage";

interface IProps {
  product: IProductData;
}

// Move pure functions outside component to prevent recreation on every render
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

const ProductCard: React.FC<IProps> = memo(({ product }) => {
  const dispatch = useDispatch();
  
  // Use memoized selector for better performance
  const isInFavourites = useSelector((state: RootState) => 
    state.favourites.favourites.some((item) => item._id === product._id)
  );
  const isAuthanticated = useSelector(selectIsAuthenticated);
  
  // Memoize the click handler to prevent recreation on every render
  const onFavClick = useCallback((e: React.MouseEvent) => {
    favHandler({ e, isAuthanticated, isInFavourites, dispatch, product });
  }, [isAuthanticated, isInFavourites, dispatch, product]);

  // Memoize formatted price
  const formattedPrice = useMemo(
    () => formatPrice(parseFloat(product.price)),
    [product.price]
  );

  // Memoize truncated description
  const truncatedDescription = useMemo(
    () => truncateText(product.description, 100),
    [product.description]
  );

  // Memoize formatted date
  const formattedDate = useMemo(
    () => new Date(product.createdAt).toLocaleDateString(),
    [product.createdAt]
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <LazyImage
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
              {formattedPrice}
            </span>
          </div>
          <p className="text-gray text-sm mb-3 line-clamp-2">
            {truncatedDescription}
          </p>
          <div className="flex justify-between items-center text-sm text-gray">
            <span>{product.location}</span>
            <span>{formattedDate}</span>
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
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;

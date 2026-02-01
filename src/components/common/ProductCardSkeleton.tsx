import { memo } from 'react';

const ProductCardSkeleton = memo(() => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title and price */}
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />
          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
        </div>
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-4/5 animate-pulse" />
        </div>
        
        {/* Location and date */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
        </div>
      </div>
      
      {/* Read more skeleton */}
      <div className="px-4 pb-4">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
      </div>
    </div>
  );
});

ProductCardSkeleton.displayName = 'ProductCardSkeleton';

export default ProductCardSkeleton;

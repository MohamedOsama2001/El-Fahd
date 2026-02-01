import { memo } from 'react';

const RouteLoader = memo(() => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    </div>
  );
});

RouteLoader.displayName = 'RouteLoader';

export default RouteLoader;

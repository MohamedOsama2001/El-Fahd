import { memo } from 'react';

const ReelSkeleton = memo(() => {
  return (
    <div className="flex-shrink-0 w-32 h-32 rounded-full bg-gray-200 border-4 border-gray-300 animate-pulse" />
  );
});

ReelSkeleton.displayName = 'ReelSkeleton';

export default ReelSkeleton;

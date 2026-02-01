import QueryKeys from "@/enums";
import { getCategory } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = () => {
  return useQuery({
    queryKey: [QueryKeys.CATEGORY],
    queryFn: () => getCategory(),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories rarely change
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
  });
};
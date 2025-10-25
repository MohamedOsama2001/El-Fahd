import QueryKeys from "@/enums";
import adsService from "@/services/adsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

class AdsQueries {
  //* products query
  useGetProducts() {
    return useQuery({
      queryKey: [QueryKeys.PRODUCTS],
      queryFn: () => adsService.getProducts(),
    });
  }
  useGetProductById(id: string) {
    return useQuery({
      queryKey: [QueryKeys.PRODUCTS, id],
      queryFn: () => adsService.getProductById(id),
      enabled: !!id,
    });
  }
  useAddProduct(){
    const queryClient=useQueryClient()
    return useMutation({
      mutationFn:({productData,token,categoryId}:{productData:FormData,token:string,categoryId:string})=>adsService.addProduct(productData,token,categoryId),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[QueryKeys.PRODUCTS]})
      }
    })
  }
  //* reels query
  useGetReels(token: string) {
    return useQuery({
      queryKey: [QueryKeys.REELS],
      queryFn: () => adsService.getReels(token),
      enabled: !!token,
    });
  }
}
export default new AdsQueries();

import QueryKeys from "@/enums";
import adsService from "@/services/adsService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { id } from "zod/v4/locales";

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
  useDeleteProduct(){
    const queryClient=useQueryClient();
    return useMutation({
      mutationFn:({id,token}:{id:string,token:string})=>adsService.deleteProduct(id,token),
      onSuccess:()=>{
        queryClient.cancelQueries({queryKey:[QueryKeys.PRODUCTS]})
        queryClient.invalidateQueries({queryKey:[QueryKeys.PRODUCTS,id]})
        queryClient.invalidateQueries({queryKey:[QueryKeys.USER_PRODUCTS]})
      }
    })
  }
  useGetUserProducts(token:string){
    return useQuery({
      queryKey:[QueryKeys.USER_PRODUCTS],
      queryFn:()=>adsService.getUserProducts(token),
      enabled:!!token
    })
  }
  useUpdateProduct(){
    const queryClient=useQueryClient();
    return useMutation({
      mutationFn:({id,productData,token}:{id:string,productData:FormData,token:string})=>adsService.updateProduct(id,productData,token),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[QueryKeys.PRODUCTS]});
        queryClient.invalidateQueries({queryKey:[QueryKeys.USER_PRODUCTS]});
      }
    })
  }
  //* reels query
  useGetReels(token: string) {
    return useQuery({
      queryKey: [QueryKeys.REELS],
      queryFn: () => adsService.getReel(token),
      enabled: !!token,
    });
  }
  useGetReelById(id: string,token:string) {
    return useQuery({
      queryKey: [QueryKeys.REELS, id],
      queryFn: () => adsService.getReelById(id,token),
      enabled: !!token && !!id,
    });
  }
  useAddReel(){
    const queryClient=useQueryClient()
    return useMutation({
      mutationFn:({reelData,token}:{reelData:any,token:string})=>adsService.addReels(reelData,token),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[QueryKeys.REELS]})
      }
    })  
  }
  useDeleteReel(){
    const queryClient=useQueryClient();
    return useMutation({
      mutationFn:({id,token}:{id:string,token:string})=>adsService.deleteReel(id,token),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[QueryKeys.REELS]})
        queryClient.invalidateQueries({queryKey:[QueryKeys.REELS,id]})
        queryClient.invalidateQueries({queryKey:[QueryKeys.USER_REELS]})
      }
    })
  }
  useGetUserReels(token:string){
    return useQuery({
      queryKey:[QueryKeys.USER_REELS],
      queryFn:()=>adsService.getUserReels(token),
      enabled:!!token
    })
  }
  useUpdateReel(){
    const queryClient=useQueryClient();
    return useMutation({
      mutationFn:({id,reelData,token}:{id:string,reelData:FormData,token:string})=>adsService.updateReel(id,reelData,token),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:[QueryKeys.REELS,id]})
      }
    })
  }
}
export default new AdsQueries();

import axiosApi from "@/config/axios.config";
import type { IAddProductRes, IAddReelsRes, IDeleteProductRes, IDeleteReelRes, IProductRes, IProductsRes, IReelsRes } from "@/interface/ads";

class AdsService {
  //* products service
  async getProducts(): Promise<IProductsRes> {
    return (await axiosApi.get<IProductsRes>("/products")).data;
  }
  async getProductById(id: string) {
    return (await axiosApi.get<IProductRes>(`/products/${id}`)).data;
  }
  async addProduct(productData: FormData, token: string,categoryId:string) {
    return (await axiosApi.post<IAddProductRes>(`/products/${categoryId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : undefined,

      }
    })).data
  }
  async deleteProduct(id:string,token:string){
    return (await axiosApi.delete<IDeleteProductRes>(`/products/${id}`,{
      headers:{
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    })).data
  }
  async getUserProducts(token:string){
    return (await axiosApi.get<IProductsRes>("/products/user",{
      headers:{
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    })).data
  }


  //* reels service
  async getReel(token: string): Promise<IReelsRes> {
    return (
      await axiosApi.get<IReelsRes>("/ads", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
    ).data;
  }
  async addReels(reelData:any,token:string){
    return (await axiosApi.post<IAddReelsRes>("/ads",reelData,{
      headers:{
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    }))
  }
  async deleteReel(id:string,token:string){
    return (await axiosApi.delete<IDeleteReelRes>(`/ads/${id}`,{
      headers:{
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    })).data
  }
  async getUserReels(token:string){
    return (await axiosApi.get<IReelsRes>("/ads/user",{
      headers:{
        Authorization: token ? `Bearer ${token}` : undefined,
      }
    })).data
  }
}
export default new AdsService();

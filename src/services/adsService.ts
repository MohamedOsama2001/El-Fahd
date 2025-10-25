import axiosApi from "@/config/axios.config";
import type { IProductRes, IProductsRes, IReelsRes } from "@/interface/ads";

class AdsService {
  //* products service
  async getProducts(): Promise<IProductsRes> {
    return (await axiosApi.get<IProductsRes>("/products")).data;
  }
  async getProductById(id: string) {
    return (await axiosApi.get<IProductRes>(`/products/${id}`)).data;
  }
  async addProduct(productData: FormData, token: string,categoryId:string) {
    return (await axiosApi.post<IProductRes>(`/products/${categoryId}`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : undefined,

      }
    })).data
  }


  //* reels service
  async getReels(token: string): Promise<IReelsRes> {
    return (
      await axiosApi.get<IReelsRes>("/ads", {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      })
    ).data;
  }
}
export default new AdsService();

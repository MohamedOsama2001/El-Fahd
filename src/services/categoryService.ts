import axiosApi from "@/config/axios.config"
import type { ICategoryRes } from "@/interface"

export  const getCategory=async ():Promise<ICategoryRes> =>{
    return (await axiosApi.get<ICategoryRes>("/categories")).data
}
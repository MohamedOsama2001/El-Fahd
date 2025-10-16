import QueryKeys from "@/enums"
import { getCategory } from "@/services/categoryService"
import { useQuery } from "@tanstack/react-query"

export const useGetCategory=()=>{
    return useQuery({
        queryKey:[QueryKeys.CATEGORY],
        queryFn:()=>getCategory()
    })
}
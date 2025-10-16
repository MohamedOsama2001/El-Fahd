import { store } from "@/store";
import { logout } from "@/store/slices/authSlice";
import axios from "axios"
import { toast } from "react-toastify";
const axiosApi=axios.create({
    baseURL:`${import.meta.env.VITE_URL}`,
    headers:{
        Accept:"application/json"
    }
});
axiosApi.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error?.response?.status===401){
            store.dispatch(logout())
            toast.warn("Please login to continue")
        }
        else if(error?.status===500) toast.error('Try again later')
        return Promise.reject(error)    
    }
)
export default axiosApi;
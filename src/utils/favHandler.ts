import type { IProductData } from "@/interface/ads";
import type { AppDispatch } from "@/store";
import { addToFav, removeFromFav } from "@/store/slices/favSlice";
import type React from "react";
import { toast } from "react-toastify";
interface IFavParams{
    e:React.MouseEvent;
    isAuthanticated:boolean;
    isInFavourites:boolean;
    product:IProductData;
    dispatch:AppDispatch
}
const favHandler = ({e,isAuthanticated,isInFavourites,dispatch,product}:IFavParams) => {
    e.preventDefault()
    e.stopPropagation()
    if(!isAuthanticated){
      toast.warn("Plz login to continue.");
      return;
    }
    if(isInFavourites){
      dispatch(removeFromFav(product._id))
      toast.success("Removed from favourites.")
    }
    else{
      dispatch(addToFav(product))
      toast.success("Added to favourites.")
    }
    
}
export default favHandler
import type { IProductData } from "@/interface/ads";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface IFavState{
    favourites:IProductData[]
}
const initialState:IFavState={
    favourites: JSON.parse(localStorage.getItem("favourites") || "[]")
}
const favSlice=createSlice({
    name:"favourites",
    initialState,
    reducers:{
        addToFav(state,action:PayloadAction<IProductData>){
            const product=action.payload;
            const existingProduct=state.favourites.find((item:IProductData)=>item._id===product._id)
            if(!existingProduct){
                state.favourites.push(product);
                localStorage.setItem("favourites",JSON.stringify(state.favourites));
            }
        },
        removeFromFav(state,action:PayloadAction<string>){
            const productId=action.payload;
            state.favourites=state.favourites.filter((item:IProductData)=>item._id!==productId);
            localStorage.setItem("favourites",JSON.stringify(state.favourites))
        }
    }
})
export const {addToFav,removeFromFav}=favSlice.actions;
export default favSlice.reducer;


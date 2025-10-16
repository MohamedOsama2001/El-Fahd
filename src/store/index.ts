import {configureStore} from "@reduxjs/toolkit"
import {useDispatch} from "react-redux"
import authReducer from "./slices/authSlice"
import favReducer from "./slices/favSlice"
export const store=configureStore({
    reducer:{
        auth:authReducer,
        favourites:favReducer
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch
export const useAppDispatch=()=>useDispatch<AppDispatch>()

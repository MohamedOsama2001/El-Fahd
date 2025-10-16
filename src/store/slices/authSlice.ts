import type { TRole } from "@/types";
import cookieService from "@/utils/cookieService";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthanticated: boolean;
}
const initialState: IAuthState = {
  isAuthanticated: !!cookieService.getToken(),
};
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action:PayloadAction<{token:string,role:TRole}>)=>{
            cookieService.setToken(action.payload.token,1)
            cookieService.setRole(action.payload.role,1)
            state.isAuthanticated=true;
        },
        logout:(state)=>{
            cookieService.removeAllCookies()
            state.isAuthanticated=false
        }
    }
})
export const {login,logout}=authSlice.actions
export default authSlice.reducer;

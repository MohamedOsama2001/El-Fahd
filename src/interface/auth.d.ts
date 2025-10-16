import type { TRole } from "@/types";

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  phone: string;
  role?: TRole;
}
export interface ILoginData{
  token:string;
  role:TRole;
}
export interface ILoginRes {
  status: string;
  data: ILoginData;
}
export interface IUserData {
  name: string;
  email: string;
  password: string;
  role: TRole;
  phone: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IRegisterRes {
  status: string;
  data: IUserData;
}
//* profile
interface IProfileData{
  id:string;
  name:string;
  role:TRole;
  email:string
}
export interface IProfileRes{
  status:string;
  data:IProfileData;
}

import type { ICategory } from ".";
import type { IUserData } from "./auth";
export interface IApiMessageRes {
  status: string;
  message: string;
}
//* products
export interface IProductData {
  _id: string;
  category: ICategory;
  subCategory: string;
  user: IUserData;
  images: string[];
  title: string;
  description: string;
  location: string;
  paymentMethod: string;
  price: string;
  name: string;
  phone: string;
  contactMethod: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IProductsRes {
  status: string;
  data: IProductData[];
}
export interface IProductRes {
  status: string;
  data: IProductData;
}
export type IAddProductRes=IApiMessageRes
export type IDeleteProductRes=IApiMessageRes
//* reels
export interface IReelData {
  _id: string;
  user: IUserData;
  mediaType: string;
  mediaUrl: string;
  title: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IReelsRes{
    status:string;
    data:IReelData[];
}
export interface IAddReelsRes{
  status:string;
  message:string
}
export type IDeleteReelRes = IApiMessageRes;
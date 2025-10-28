import type { productSchema } from "@/validations/adsValidation";
import {z} from "zod";

export  type TRole="user" | "admin"
export type AdType = "products" | "reels";
export type MediaType = "image" | "video";
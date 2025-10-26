import type { ProductFormValues } from "@/components/froms/adsForms/AddProduct";

export interface IFormInput{
    name: string ;
    label:string;
    type:string;
    placeholder?:string;
}
export interface IAddProductInputs{
    name: keyof ProductFormValues;
    label:string;
    type?:string;
    placeholder?:string;
    component: 'input' | 'textarea';
}
//* categories interface
export interface ICategory{
    _id:string;
    name:string;
    subCategories:string[];
    image:string;
    updatedAt:string;
    __v:number;
}
export interface ICategoryRes{
    status:string;
    data:ICategory[]
}
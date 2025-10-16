export interface IFormInput{
    name:string;
    label:string;
    type:string;
    placeholder?:string;
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
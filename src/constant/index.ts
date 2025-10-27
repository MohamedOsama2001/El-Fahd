import type { IAddProductInputs, IFormInput } from "@/interface";
export const LOGIN_FORM_INPUTS:IFormInput[]=[
    {
        name:"email",
        label:"Email:",
        type:"email",
        placeholder:"john@example.com"
    },
    {
        name:"password",
        label:"Password:",
        type:"password",
    },
]
export const REGISTER_FORM_INPUT:IFormInput[]=[
    {
        name:"name",
        label:"Name:",
        type:"text",
        placeholder:"John Doe"
    },
    ...LOGIN_FORM_INPUTS,
    {
        name:"phone",
        label:"Phone:",
        type:"text",
    }
]

export const ADD_PRODUCT_FORM_INPUTS: IAddProductInputs[] = [
    {
        name: "title",
        label: "Ad Title",
        placeholder: "e.g., Brand new sofa",
        component: "input",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Describe your item in detail",
        component: "textarea",
    },
    {
        name: "price",
        label: "Price",
        placeholder: "0.00",
        component: "input",
        type: "text",
    },
    {
        name: "location",
        label: "Location",
        placeholder: "e.g., Cairo, Egypt",
        component: "input",
        type: "text",
    },
    {
        name: "name",
        label: "Your Name",
        placeholder: "John Doe",
        component: "input",
        type: "text",
    },
    {
        name: "phone",
        label: "Phone Number",
        placeholder: "+201234567890",
        component: "input",
        type: "text",
    },
];

import type { IFormInput } from "@/interface";
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
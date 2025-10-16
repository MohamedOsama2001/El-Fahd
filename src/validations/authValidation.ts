import {z} from "zod";
export const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required." }).email({
    message: "Plz enter a valid email.",
  }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 char long." }),
});

export const registerSchema=loginSchema.extend({
  name:z.string().nonempty({message:"Name is required."}).regex(/^[A-Za-z\s]+$/, { message: "Name must contain only letters." }).min(3,{message:"Name must be at least 3 char."}),
  phone:z.string().nonempty({message:"Phone is required."}).regex(/^\d+$/, { message: "Phone must contain only numbers." }).length(11,{message:"Phone must be 11 number."})
})

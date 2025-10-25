import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  price:z.string(),
  category: z.string().min(1, "Category is required."),
  subCategory: z.string().min(1, "Sub-category is required."),
  location: z.string().min(2, "Location is required."),
  name: z.string().min(2, "Your name is required."),
  phone: z.string().regex(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number."),
  paymentMethod: z.string().min(1, "Payment method is required."),
  contactMethod: z.string().min(1, "Contact method is required."),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required.")
    .max(3, "You can upload a maximum of 3 images."),
});
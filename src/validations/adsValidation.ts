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

export const updateProductSchema = productSchema.extend({
  images: z.array(z.instanceof(File)).max(3, "You can upload a maximum of 3 images.").optional(),
});

//* reel schema
const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ACCEPTED_VIDEO_TYPES = ["video/mp4", "video/webm"];
const ALL_ACCEPTED_TYPES = [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_VIDEO_TYPES];
export const reelSchema=z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100, { message: "Title must be 100 characters or less." }),
  
  phone: z
    .string()
    .regex(/^\+?[0-9\s-]{10,15}$/, { message: "Please enter a valid phone number." }),
    
  media: z
    .instanceof(FileList).refine((files) => files?.length === 1, "Media file is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 20MB.`
    )
    .refine(
      (files) => ALL_ACCEPTED_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .png, .webp, .gif, .mp4, and .webm files are accepted."
    ),
});

//* update reel schema
export const updateReelSchema = reelSchema.extend({
  media: z.instanceof(FileList).optional().refine(
    (files) => !files || files.length === 0 || (files.length === 1 && files[0].size <= MAX_FILE_SIZE && ALL_ACCEPTED_TYPES.includes(files[0].type)),
    {
      message: "Invalid file. Max size is 20MB and allowed types are .jpg, .png, .webp, .gif, .mp4, .webm.",
    }
  ),
});
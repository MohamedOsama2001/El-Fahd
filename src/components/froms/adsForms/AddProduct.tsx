import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGetCategory } from "@/lib/queries/category";
import { useState } from "react";
import { productSchema } from "@/validations/adsValidation";
import FormButton from "@/components/ui/FormButton";
import cookieService from "@/utils/cookieService";
import ads from "@/lib/queries/ads";
import { toast } from "react-toastify";
import { ADD_PRODUCT_FORM_INPUTS } from "@/constant";

export type ProductFormValues = z.infer<typeof productSchema>;

export function AddProductForm() {
    const token = cookieService.getToken()!
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory();
    const { mutateAsync: addProduct, isPending } = ads.useAddProduct();

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            category: "",
            subCategory: "",
            location: "",
            name: "",
            phone: "",
            paymentMethod: "",
            contactMethod: "",
            images: [],
        },
    });

    const onSubmit = (values: ProductFormValues) => {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            if (key === "images" && Array.isArray(value)) {
                value.forEach((file) => formData.append("images", file));
            } else {
                formData.append(key, String(value));
            }
        });

        addProduct({productData:formData,token,categoryId:selectedCategoryId}, {
            onSuccess: () => {
                form.reset();
                setImagePreviews([]);
                toast.success("Product added successfully!")
            },
            onError: (error) => {
                console.error("Error adding product:", error);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length) {
            form.setValue("images", files);
            const previews = files.map((file) => URL.createObjectURL(file));
            setImagePreviews(previews);
        }
    };

    const selectedCategoryId = form.watch("category");
    const selectedCategory = categoryData?.data.find(
        (cat) => cat._id === selectedCategoryId
    );

    return (
        <section className="bg-gray-50 py-10 ">
            <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-base">Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {isLoadingCategory ? (
                                                <SelectItem className="text-base" value="loading" disabled>Loading...</SelectItem>
                                            ) : (
                                                categoryData?.data.map((category) => (
                                                    <SelectItem className="text-base" key={category._id} value={category._id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Sub-category */}
                        {selectedCategory && (
                            <FormField
                                control={form.control}
                                name="subCategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">Sub-category</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a sub-category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {selectedCategory.subCategories.map((sub) => (
                                                    <SelectItem className="text-base" key={sub} value={sub}>
                                                        {sub}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        </div>
                        {ADD_PRODUCT_FORM_INPUTS.map((input) => (
                            <FormField
                                key={input.name}
                                control={form.control}
                                name={input.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold text-base">{input.label}</FormLabel>
                                        <FormControl>
                                            {input.component === 'textarea' ? (
                                                <Textarea
                                                    placeholder={input.placeholder}
                                                    className="h-20 focus:ring-1 focus:ring-red resize-none"
                                                    {...field}
                                                    value={field.value as string}
                                                />
                                            ) : (
                                                <Input
                                                    placeholder={input.placeholder}
                                                    type={input.type}
                                                    {...field}
                                                    value={field.value as string}
                                                    className="h-10 focus:ring-1 focus:ring-red" />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}

                        {/* Images */}
                        <FormField
                            control={form.control}
                            name="images"
                            render={() => (
                                <FormItem>
                                    <FormLabel className="font-bold text-base">Images</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageChange}
                                            className="h-10 focus:ring-1 focus:ring-red"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can upload up to 3 images.
                                    </FormDescription>
                                    <div className="flex gap-2 mt-2">
                                        {imagePreviews.map((src, i) => (
                                            <img
                                                key={i}
                                                src={src}
                                                alt={`Preview ${i + 1}`}
                                                className="w-24 h-24 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between ">
                            {/* Payment Method */}
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-base">Payment Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a payment method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem className="text-base" value="cash">Cash</SelectItem>
                                            <SelectItem className="text-base" value="online">Online</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contact Method */}
                        <FormField
                            control={form.control}
                            name="contactMethod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold text-base">Preferred Contact Method</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a contact method" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent >
                                            <SelectItem className="text-base" value="Phone Number">Phone Call</SelectItem>
                                            <SelectItem className="text-base" value="WhatsApp">WhatsApp</SelectItem>
                                            <SelectItem className="text-base" value="Both">Both</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        </div>

                        <FormButton isPending={isPending} title="Add Product" />
                    </form>
                </Form>
            </div>
        </section>
    );
}

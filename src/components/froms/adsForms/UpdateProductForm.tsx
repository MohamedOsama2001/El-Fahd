import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useEffect, useState } from "react";
import { updateProductSchema } from "@/validations/adsValidation";
import FormButton from "@/components/ui/FormButton";
import cookieService from "@/utils/cookieService";
import ads from "@/lib/queries/ads";
import { toast } from "react-toastify";
import { ADD_PRODUCT_FORM_INPUTS } from "@/constant";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export type UpdateProductFormValues = z.infer<typeof updateProductSchema>;

export function UpdateProductForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = cookieService.getToken()!;

  const { data: productData, isLoading: isLoadingProduct } = ads.useGetProductById(id!);
  const { data: categoryData, isLoading: isLoadingCategory } = useGetCategory();
  const { mutateAsync: updateProduct, isPending } = ads.useUpdateProduct();

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<UpdateProductFormValues>({
    resolver: zodResolver(updateProductSchema),
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

  useEffect(() => {
    if (productData?.data) {
      const { images, category, ...rest } = productData.data;
      form.reset({
        ...rest,
        category: category._id,
        subCategory: productData.data.subCategory,
        paymentMethod: productData.data.paymentMethod,
        contactMethod: productData.data.contactMethod,
      });
      setImagePreviews(images);
    }
  }, [productData, form]);

  const onSubmit = (values: UpdateProductFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "images" && Array.isArray(value) && value.length > 0) {
        value.forEach((file) => formData.append("images", file));
      } else if (key !== "images") {
        formData.append(key, String(value));
      }
    });

    updateProduct(
      { id: id!, productData: formData, token },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Product updated successfully!");
          navigate("/my-ads");
        },
        onError: (error) => {
          let errorMessage = "Failed to update product.";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage = error.response.data?.message || errorMessage;
          }
          toast.error(errorMessage);
          console.error("Error updating product:", error);
        },
      }
    );
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

  if (isLoadingProduct) {
    return <div className="text-center py-10">Loading product data...</div>;
  }

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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCategory ? (
                          <SelectItem className="text-base" value="loading" disabled>
                            Loading...
                          </SelectItem>
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

              {selectedCategory && (
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-base">Sub-category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
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
                name={input.name as keyof UpdateProductFormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">{input.label}</FormLabel>
                    <FormControl>
                      {input.component === "textarea" ? (
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
                          className="h-10 focus:ring-1 focus:ring-red"
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Images (optional)</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" multiple onChange={handleImageChange} className="h-10 focus:ring-1 focus:ring-red" />
                  </FormControl>
                  <FormDescription>You can upload up to 3 new images. This will replace the old ones.</FormDescription>
                  <div className="flex gap-2 mt-2">
                    {imagePreviews.map((src, i) => (
                      <img key={i} src={src} alt={`Preview ${i + 1}`} className="w-24 h-24 object-cover rounded-md" />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between ">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <FormField
                control={form.control}
                name="contactMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-base">Preferred Contact Method</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a contact method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

            <FormButton isPending={isPending} title="Update Product" />
          </form>
        </Form>
      </div>
    </section>
  );
}

export default UpdateProductForm;
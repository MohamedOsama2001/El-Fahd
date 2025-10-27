"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ads from "@/lib/queries/ads";
import cookieService from "@/utils/cookieService";
import { reelSchema } from "@/validations/adsValidation";
import { toast } from "react-toastify";
import FormButton from "@/components/ui/FormButton";

type MediaType = "image" | "video";
type ReelFormValues = z.infer<typeof reelSchema>;

export function AddReelForm() {
  const { mutateAsync: addReel, isPending } = ads.useAddReel();
  const token = cookieService.getToken()!;
  const [selectedType, setSelectedType] = useState<MediaType>("image");

  const form = useForm<ReelFormValues>({
    resolver: zodResolver(reelSchema),
    defaultValues: {
      title: "",
      phone: "",
    },
  });

  const fileRef = form.register("media");

  async function onSubmit(values: ReelFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("phone", values.phone);
    formData.append("file", values.media[0]);
    addReel(
      { reelData: formData, token },
      {
        onSuccess: (res) => {
          toast.success(res.data.message || "Reel added successfully."),
            form.reset();
          setSelectedType("image");
        },
        onError: (error) => {
          let errorMessage = "Failed to add reel.";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage =
              error.response.data?.message || "Failed to add reel.";
          }
          toast.error(errorMessage);
        },
      }
    );
  }

  return (
    <section className="bg-gray-50 py-10 ">
      <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Media Type Select Field */}
            <FormItem>
              <FormLabel className="font-bold text-base">Media Type</FormLabel>
              <Select
                value={selectedType}
                onValueChange={(value: MediaType) => {
                  setSelectedType(value);
                  form.resetField("media");
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a media type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>

            {/* Media File --- */}
            <FormField
              control={form.control}
              name="media"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold text-base">
                    Upload {selectedType === "image" ? "Image" : "Video"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept={selectedType === "image" ? "image/*" : "video/*"}
                      {...fileRef}
                      key={selectedType}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Title</FormLabel>
                  <FormControl>
                    <Input className="focus:ring-1 focus:ring-red" placeholder="My Awesome Reel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Contact Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" className="focus:ring-1 focus:ring-red" placeholder="+1 234 567 890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            

            {/* Submit Button */}
            <FormButton title="Add Reel" isPending={isPending} />
          </form>
        </Form>
      </div>
    </section>
  );
}

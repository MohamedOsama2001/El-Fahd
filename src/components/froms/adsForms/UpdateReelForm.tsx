import * as z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
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
import {  updateReelSchema } from "@/validations/adsValidation";
import { toast } from "react-toastify";
import FormButton from "@/components/ui/FormButton";
import type { MediaType } from "@/types";

type ReelFormValues = z.infer<typeof updateReelSchema>;

function UpdateReelForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = cookieService.getToken()!;

  const { data: reelData, isLoading: isLoadingReel } = ads.useGetReelById(id!,token);
  const { mutateAsync: updateReel, isPending } = ads.useUpdateReel();

  const [selectedType, setSelectedType] = useState<MediaType>("image");

  const form = useForm<ReelFormValues>({
    resolver: zodResolver(updateReelSchema),
    defaultValues: {
      title: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (reelData?.data) {
      const { title, phone, mediaType } = reelData.data;
      form.reset({ title, phone });
      setSelectedType(mediaType as MediaType);
    }
  }, [reelData, form]);

  const fileRef = form.register("media");

  async function onSubmit(values: ReelFormValues) {
    const formData = new FormData();
    formData.append("mediaType", selectedType);
    formData.append("title", values.title);
    formData.append("phone", values.phone);
    if (values.media && values.media.length > 0) {
      formData.append("media", values.media[0]);
    }

    updateReel(
      { id: id!, reelData: formData, token },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Reel updated successfully.");
          navigate("/my-ads");
        },
        onError: (error) => {
          let errorMessage = "Failed to update reel.";
          if (axios.isAxiosError(error) && error.response) {
            errorMessage =
              error.response.data?.message || "Failed to update reel.";
          }
          toast.error(errorMessage);
        },
      }
    );
  }

  if (isLoadingReel) {
    return <div className="text-center py-10">Loading reel data...</div>;
  }

  return (
    <section className="bg-gray-50 py-10 ">
      <div className="bg-white rounded-md shadow-md w-[90%] md:w-[70%] lg:w-[50%] m-auto text-center p-10 space-y-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

            <FormField
              control={form.control}
              name="media"
              render={() => (
                <FormItem>
                  <FormLabel className="font-bold text-base">
                    Upload {selectedType === "image" ? "Image" : "Video"} (optional)
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

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Title</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-1 focus:ring-red"
                      placeholder="My Awesome Reel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">
                    Contact Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      className="focus:ring-1 focus:ring-red"
                      placeholder="+1 234 567 890"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormButton title="Update Reel" isPending={isPending} />
          </form>
        </Form>
      </div>
    </section>
  );
}

export default UpdateReelForm;
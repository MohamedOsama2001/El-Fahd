import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeadr from "@/components/common/PageHeader";
import ads from "@/lib/queries/ads";
import cookieService from "@/utils/cookieService";

import type { AdType } from "@/types";
import TabButton from "@/components/MyAds/TabButton";
import { toast } from "react-toastify";
import AdsTable from "@/components/MyAds/AdsTable";
import { getProductColumns, getReelColumns } from "@/constant/myAds";

export function MyAds() {
  const [activeTab, setActiveTab] = useState<AdType>("products");
  const token = cookieService.getToken()!;
  const navigate = useNavigate();

  const { data: productsData, isLoading: isLoadingProducts } =
    ads.useGetUserProducts(token);
  const { data: reelsData, isLoading: isLoadingReels } =
    ads.useGetUserReels(token);

  const { mutate: deleteProduct } = ads.useDeleteProduct();
  const { mutate: deleteReel } = ads.useDeleteReel();

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(
        { id, token },
        {
          onSuccess: (data) =>
            toast.success(data.message || "Product deleted successfully!"),
          onError: (error) =>
            toast.error(error.message || "Failed to delete product."),
        }
      );
    }
  };

  const handleDeleteReel = (id: string) => {
    if (window.confirm("Are you sure you want to delete this reel?")) {
      deleteReel(
        { id, token },
        {
          onSuccess: (data) =>
            toast.success(data.message || "Reel deleted successfully!"),
          onError: (error) =>
            toast.error(error.message || "Failed to delete reel."),
        }
      );
    }
  };

  const isLoading =
    activeTab === "products" ? isLoadingProducts : isLoadingReels;

  return (
    <>
      <PageHeadr title="My Ads" subtitle="Manage your products and reels" />
      <div className="container mx-auto py-10">
        <div className="flex gap-2 mb-6 bg-gray-50 py-2 px-2">
          <div className="flex-1">
            <TabButton
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            >
              Products
            </TabButton>
          </div>
          <div className="flex-1">
            <TabButton
              isActive={activeTab === "reels"}
              onClick={() => setActiveTab("reels")}
            >
              Reels
            </TabButton>
          </div>
        </div>

        {isLoading && <div className="text-center">Loading...</div>}

        {!isLoading && activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Products</h2>
            <div className="rounded-md border">
              <AdsTable
                columns={getProductColumns(navigate, handleDeleteProduct)}
                data={productsData?.data || []}
                emptyMessage="No products found."
              />
            </div>
          </div>
        )}

        {!isLoading && activeTab === "reels" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Reels</h2>
            <div className="rounded-md border">
              <AdsTable
                columns={getReelColumns(navigate, handleDeleteReel)}
                data={reelsData?.data || []}
                emptyMessage="No reels found."
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import PageHeadr from "@/components/common/PageHeader";
import ads from "@/lib/queries/ads";
import cookieService from "@/utils/cookieService";
import type { IProductData, IReelData } from "@/interface/ads";
import type { AdType } from "@/types";

export function MyAds() {
  const [activeTab, setActiveTab] = useState<AdType>("products");
  const token = cookieService.getToken()!;
  const navigate = useNavigate();

  const { data: productsData, isLoading: isLoadingProducts } = ads.useGetUserProducts(token);
  const { data: reelsData, isLoading: isLoadingReels } = ads.useGetUserReels(token);

  const { mutate: deleteProduct } = ads.useDeleteProduct();
  const { mutate: deleteReel } = ads.useDeleteReel();

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct({ id, token }, {
        onSuccess: (data) => toast.success(data.message || "Product deleted successfully!"),
        onError: (error) => toast.error(error.message || "Failed to delete product."),
      });
    }
  };

  const handleDeleteReel = (id: string) => {
    if (window.confirm("Are you sure you want to delete this reel?")) {
      deleteReel({ id, token }, {
        onSuccess: (data) => toast.success(data.message || "Reel deleted successfully!"),
        onError: (error) => toast.error(error.message || "Failed to delete reel."),
      });
    }
  };

  const isLoading = activeTab === "products" ? isLoadingProducts : isLoadingReels;

  const renderActions = (item: IProductData | IReelData, type: AdType) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => navigate(`/ads/${type}/${item._id}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => type === 'products' ? handleDeleteProduct(item._id) : handleDeleteReel(item._id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
      <PageHeadr title="My Ads" subtitle="Manage your products and reels" />
      <div className="container mx-auto py-10">
        <div className="flex space-x-4 mb-6 border-b">
          <Button
            variant={activeTab === "products" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("products")}
          >
            Products
          </Button>
          <Button
            variant={activeTab === "reels" ? "secondary" : "ghost"}
            onClick={() => setActiveTab("reels")}
          >
            Reels
          </Button>
        </div>

        {isLoading && <div className="text-center">Loading...</div>}

        {!isLoading && activeTab === "products" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Products</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productsData?.data && productsData.data.length > 0 ? (
                    productsData.data.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          {renderActions(product, "products")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No products found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {!isLoading && activeTab === "reels" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Reels</h2>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Media Type</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reelsData?.data && reelsData.data.length > 0 ? (
                    reelsData.data.map((reel) => (
                      <TableRow key={reel._id}>
                        <TableCell className="font-medium">{reel.title}</TableCell>
                        <TableCell>{reel.mediaType}</TableCell>
                        <TableCell>{new Date(reel.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          {renderActions(reel, "reels")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center">
                        No reels found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}



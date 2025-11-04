import type { NavigateFunction } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { AdActions } from "@/components/MyAds/AdActions";
import type { IProductData, IReelData } from "@/interface/ads";

const getStatusConfig = (status: string) => {
  const statusConfig = {
    active: { text: "active", className: "bg-green-100 text-green-800" },
    sold: { text: "sold", className: "bg-gray-100 text-gray-800" },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  return <Badge className={config.className}>{config.text}</Badge>;
};

export const getProductColumns = (
  navigate: NavigateFunction,
  handleDeleteProduct: (id: string) => void
) => [
  { title: "Title", render: (product: IProductData) => product.title },
  {
    title: "Category",
    render: (product: IProductData) => product.category.name,
  },
  { title: "Price", render: (product: IProductData) => `${product.price} $` },
  { title: "Location", render: (product: IProductData) => product.location },
  { title: "Status", render: () => getStatusConfig("active") },
  {
    title: "Created At",
    render: (product: IProductData) =>
      new Date(product.createdAt).toLocaleDateString(),
  },
  {
    title: "Actions",
    render: (product: IProductData) => (
      <AdActions
        onEdit={() => navigate(`/ads/products/${product._id}/edit`)}
        onDelete={() => handleDeleteProduct(product._id)}
      />
    ),
  },
];

export const getReelColumns = (
  navigate: NavigateFunction,
  handleDeleteReel: (id: string) => void
) => [
  { title: "Title", render: (reel: IReelData) => reel.title },
  { title: "Media Type", render: (reel: IReelData) => reel.mediaType },
  { title: "Status", render: () => getStatusConfig("active") },
  {
    title: "Created At",
    render: (reel: IReelData) => new Date(reel.createdAt).toLocaleDateString(),
  },
  {
    title: "Actions",
    render: (reel: IReelData) => (
      <AdActions
        onEdit={() => navigate(`/ads/reels/${reel._id}/edit`)}
        onDelete={() => handleDeleteReel(reel._id)}
      />
    ),
  },
];


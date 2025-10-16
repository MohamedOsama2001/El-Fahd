import React, { useState } from "react";
import {FaWhatsapp} from "react-icons/fa"
import { useParams, useNavigate } from "react-router-dom";
import { Heart, MapPin, Calendar, User, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ads from "@/lib/queries/ads";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeadr from "@/components/common/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import favHandler from "@/utils/favHandler";
import { toast } from "react-toastify";


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {data:productData,isLoading}=ads.useGetProductById(id!)
  const product=productData?.data
  const dispatch=useDispatch()
  const { favourites } = useSelector((state: RootState) => state.favourites);
  const isInFavourites = favourites.some((item) => item._id === id);
  const { isAuthanticated } = useSelector((state: RootState) => state.auth);
  const [showPhone,setShowPhone]=useState(false);
  const onFavClick = (e:React.MouseEvent) => {
    if(!product) return; 
    favHandler({e,isAuthanticated,isInFavourites,dispatch,product})
    
  };
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  const handlePhone=()=>{
    if(!isAuthanticated){
      toast.warn("Plz login to continue.")
      return;
    }
    showPhone?window.open(`tel:${product?.phone}`,"_blank"):setShowPhone(true)
  }
  const handleWhatsApp=()=>{
    if(!isAuthanticated){
      toast.warn("Plz login to continue.")
      return;
    }
    window.open(`https://wa.me/${product?.phone}`, "_blank")
  }

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red"></div>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate(-1)} className="bg-red">Go Back</Button>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <main className="min-h-screen bg-background">
        <PageHeadr title="product details" subtitle={product.category.name}/>
        <div className="container mx-auto px-4 py-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg shadow-md border border-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red capitalize text-base">
                  {product.category.name}
                </Badge>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold text-foreground capitalize">{product.title}</h1>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={onFavClick}
                    className={`cursor-pointer ${isInFavourites ? 'bg-red text-white' : ''}`}
                  >
                    <Heart className={`h-5 w-5 ${isInFavourites ? 'fill-current' : ''}`} />
                  </Button>
                  
                </div>
              </div>

              <div className="text-3xl font-bold text-red">
                {formatPrice(product.price)}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{product.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground capitalize">
                      by: {product.name}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1 bg-red hover:bg-red/90 cursor-pointer" size="lg"
                onClick={handlePhone}
                >
                  <Phone/>{showPhone?product.phone:"Show Phone"}
                </Button>
                <Button variant="outline" className="flex-1 cursor-pointer" size="lg" onClick={handleWhatsApp}>
                    
                    <FaWhatsapp/>WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;
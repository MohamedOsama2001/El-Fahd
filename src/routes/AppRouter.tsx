import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RouteLoader from "@/components/common/RouteLoader";
import ProtectedRoutes from "./ProtectedRoutes";

// Lazy load all route components for code splitting
const LoginForm = lazy(() => import("@/components/froms/LoginForm"));
const RegisterForm = lazy(() => import("@/components/froms/RegisterForm"));
const Home = lazy(() => import("@/pages/Home"));
const CategoryProducts = lazy(() => import("@/pages/CategoryProducts"));
const ProductDetails = lazy(() => import("@/components/Home/ads/products/ProductDetails"));
const Favourites = lazy(() => import("@/pages/Favourites"));
const AddProduct = lazy(() => import("@/pages/ads/AddProduct"));
const AddReel = lazy(() => import("@/pages/ads/AddReel"));
const MyAds = lazy(() => import("@/pages/ads/MyAds").then(module => ({ default: module.MyAds })));
const UpdateProduct = lazy(() => import("@/pages/ads/UpdateProduct"));
const UpdateReel = lazy(() => import("@/pages/ads/UpdateReel"));
const Settings = lazy(() => import("@/pages/settings"));

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/category/:id" element={<CategoryProducts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            {/* Protected routes */}
            <Route
              path="/favourites"
              element={
                <ProtectedRoutes>
                  <Favourites />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/post-ad"
              element={
                <ProtectedRoutes>
                  <AddProduct />
                </ProtectedRoutes>
              }
            />
            <Route 
              path="/add-reel" 
              element={
                <ProtectedRoutes>
                  <AddReel />
                </ProtectedRoutes>
              }
            />
            <Route 
              path="/my-ads" 
              element={
                <ProtectedRoutes>
                  <MyAds />
                </ProtectedRoutes>
              }
            />
            <Route 
              path="/ads/products/:id/edit" 
              element={
                <ProtectedRoutes>
                  <UpdateProduct />
                </ProtectedRoutes>
              }
            />
            <Route 
              path="/ads/reels/:id/edit" 
              element={
                <ProtectedRoutes>
                  <UpdateReel />
                </ProtectedRoutes>
              }
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoutes>
                  <Settings />
                </ProtectedRoutes>
              } 
            />
          </Route>
          {/* Not found routes */}
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;

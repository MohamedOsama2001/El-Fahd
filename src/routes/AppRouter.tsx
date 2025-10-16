import LoginForm from "@/components/froms/LoginForm";
import RegisterForm from "@/components/froms/RegisterForm";
import ProductDetails from "@/components/Home/ads/products/ProductDetails";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Favourites from "@/pages/Favourites";
import AddProduct from "@/pages/ads/AddProduct";
function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            //* protected routes
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
          </Route>
          //* not found routes
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRouter;

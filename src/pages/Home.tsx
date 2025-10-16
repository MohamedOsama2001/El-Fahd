
import ProductsSecion from "@/components/Home/ads/products/ProductsSection";
import ReelsSection from "@/components/Home/ads/reels/ReelsSection";
import Categories from "@/components/Home/categories/CategoriesSection";
import HeroSection from "@/components/Home/HeroSection";

function Home() {
  return (
    <main className="bg-gray-50">
      <HeroSection />
      <ReelsSection/>
      <Categories />
      <ProductsSecion />
    </main>
  );
}

export default Home;

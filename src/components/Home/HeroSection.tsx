import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="bg-red-500 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
          el fahd
        </h1>
        <p
          className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          Buy, sell, and discover amazing deals near you
        </p>
        <button
          className="bg-white text-red-500 capitalize text-lg hover:bg-gray-100 py-2 px-4 rounded-md"
          style={{ animationDelay: "0.4s" }}
        >
          <Link to="/post-ad">post ad</Link>
        </button>
      </div>
    </section>
  );
}

export default HeroSection;

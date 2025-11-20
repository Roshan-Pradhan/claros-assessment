import TextCard from "@/components/text-card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 md:text-4xl lg:text-6xl">
        Discover Premium Products
      </h1>

      <p className="mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
        Explore a curated collection of high-quality products crafted to bring
        value, comfort, and style into your daily life. Shop smarter, live
        better.
      </p>

      <Link to="/products">
        <button
          data-testid="browse-products"
          className="flex cursor-pointer items-center gap-2 rounded bg-primary-500 px-6 py-3 text-lg font-medium text-white shadow-md transition hover:shadow-lg"
        >
          Browse Products <ArrowRight size={20} />
        </button>
      </Link>

      <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <TextCard
          title="Quality Assured"
          description="Every product goes through strict quality checks to ensure only the best
        reaches you."
        />
        <TextCard
          title="Fast Delivery"
          description="Get your products delivered quickly and safely with our reliable
            logistics network."
        />
        <TextCard
          title="Customer Support"
          description="We are here to assist you anytime with dedicated and friendly
            support."
        />
      </div>
    </div>
  );
};

export default Home;

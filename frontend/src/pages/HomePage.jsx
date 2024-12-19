import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import FeaturedProducts from "../components/FeaturedProducts";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  { href: "/noodles", name: "Noodles", imageUrl: "./Noodles.jpg" },
  { href: "/curry", name: "Curry", imageUrl: "/EggCurry.jpg" },
  { href: "/salads", name: "Salads", imageUrl: "/TeaLeafSalad.jpg" },
  { href: "/sides", name: "Sides", imageUrl: "/BurmeseTofu.jpg" },
  { href: "/snacks", name: "Snacks", imageUrl: "/HtatNyat.jpg" },
  { href: "/drinks", name: "Drinks", imageUrl: "/Tea.jpg" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  console.log(products);
  
  return (
    <div className="relative min-h-screen text-black overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-600 mb-4">
          Welcome to Burmese Food
        </h1>
        <p className="text-center text-xl text-gray-600 mb-12">
          Discover the authentic flavors of Burma with our curated collection of
          authentic Burmese food. From classic dishes to innovative creations,
          we bring you the best of Burma's culinary heritage.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
        {!isLoading && products?.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;

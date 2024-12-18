import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./LoadingSpinner";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const PeopleAlsoBought = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.get("/products/recommendation");
        setRecommendations(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };
    fetchRecommendations();
  },[]);

  if  (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-emerald-500">
        People also bought
      </h3>
      <div className="mt-6 grid grid:cols-2 gap-4 sm:grid-cols-2 lg:cols-4">
        {recommendations.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default PeopleAlsoBought;

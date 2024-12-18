import { CheckCircle, ArrowRight, HandHeart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import Confetti from "react-confetti";
import axios from "../lib/axios";
const PurchaseSuccess = () => {
  const [processing, setProcessing] = useState(true);
  const [error, setError] = useState(null);
  const { clearCart } = useCartStore();
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        console.log("sessionId", sessionId);
        await axios.post("/payments/checkout-success", { sessionId });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setProcessing(false);
      }
    };

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setProcessing(false);
      setError("Session ID not found in URL");
    }
  }, [clearCart]);

  if (processing) return "Processing...";
  if (error) return `Error: ${error}`;
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 99 }}
        numberOfPieces={700}
        recycle={false}
      ></Confetti>
      <div className="max-w-md w-full bg-yellow-300 rounded-lg shadow-xl overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <CheckCircle className="text-emerald-500 w-16 h-16 mb-4" />
          </div>
          <h1 className="text-center text-2xl sm:text-3x; font-bold text-emerald-600 mb-2">
            Purchase Successful
          </h1>
          <p className="text-center text-gray-600 mb-2">
            Thank you for your purchase! We're processing your order now.
          </p>
          <p className="text-center text-emerald-600 text-sm mb-6">
            You will receive an email confirmation shortly.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-black">Order number</span>
              <span className="text-sm font-semibold text-emerald-500">
                #12345
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-black">Estimated delivery</span>
              <span className="text-sm font-semibold text-emerald-500">
                3-5 business days
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center"
            >
              <HandHeart className="mr-2" size={18} />
              Thanks for trusting us!
            </button>
            <Link
              to={"/"}
              className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseSuccess;

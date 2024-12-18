import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
  "pk_test_51QUH2aH8gpUdbpL2Wmx6EnD3r2pnfzxr94ji2m5UZ2vGN3iAbi7qQ8GleGgiLEQGbcXk9GjgPk1Wdeen7OrAm4MK00g7CPPVXP"
);

const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    const res = await axios.post("/payments/create-checkout-session", {
      products: cart,
      coupon: coupon ? coupon.code : null,
    });

    const session = res.data;
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error.message);
    }
    
  };

  return (
    <motion.div className="space-y-4 rounded-lg bg-yellow-400 p-4 shadow-sm sm:p-6">
      <p className="text-xl font-semibold text-emerald-500 ">Order Summary</p>
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-black">Original Price</dt>
            <dd className="text-base font-medium text-black">
              {formattedSubtotal}
            </dd>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">Savings</dt>
              <dd className="text-base font-medium text-emerald-700">
                -{formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-black">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-700">
                -{coupon.discountPercentage}
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
            <dt className="text-base font-medium text-black">Total</dt>
            <dd className="text-base font-medium text-black">
              {formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 
          px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          Proceed to Checkout
        </motion.button>
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-700">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium
             text-emerald-500 underline hover:text-emerald-400 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
export default OrderSummary;

import { motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
  const [userInputCode, setUserInputCode] = useState("");
  const { coupon, isCouponApplied } = useCartStore();

  const handleApplyCoupon = () => {};
  const handleRemoveCoupon = () => {};

  return (
    <motion.div
      className="space-y-4 rounded-lg bg-yellow-400 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="space-y-4">
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Do you have a voucher or gift code?
          </label>
          <input
            type="text"
            id="voucher"
            className="block w-full rounded-lg bg-white p-2.5 placeholder:text-gray-400
            text-sm text-black focus:ring-emerald-500 focus:border-emerald-500 border border-gray-300"
            placeholder="Enter voucher or gift code"
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
          />
        </div>
        <motion.button
          type="button"
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 
          px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleApplyCoupon}
        >
          Apply Code
        </motion.button>
      </div>
      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-emerald-700">
            Applied Coupon
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
          <motion.button
            type="button"
            className="mt- 2 flex w-full items-center justify-center rounded-lg
           bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </motion.button>
        </div>
      )}
      {coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-emerald-700">
            Your Available Coupon:{" "}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {coupon.code} - {coupon.discountPercentage}% off
          </p>
        </div>
      )}
    </motion.div>
  );
};
export default GiftCouponCard;

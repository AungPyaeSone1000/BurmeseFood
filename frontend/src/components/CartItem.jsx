import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  return (
    <div className="rounded-lg p-4 shadow-sm  bg-yellow-300 md:p-6 ">
      <div className="space-y-6 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <div className="shrink-0 md:order-1">
          <img
            src={item.image}
            alt={item.name}
            className="h-20 md:h-32 rounded object-cover"
          />
        </div>
        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center gap-2">
            <motion.button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md 
							  bg-emerald-400 hover:bg-emerald-500"
              whileTap={{ scale: 0.95 }}
              onClick={() => updateQuantity(item._id, item.quantity - 1)}
            >
              <Minus className="text-black" />
            </motion.button>
            <p>{item.quantity}</p>
            <motion.button
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md 
							  bg-emerald-400 hover:bg-emerald-500"
              whileTap={{ scale: 0.95 }}
              onClick={() => updateQuantity(item._id, item.quantity + 1)}
            >
              <Plus className="text-black" />
            </motion.button>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-base font-bold text-black">
              ${item.price * item.quantity}
            </p>
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <p className="text-base font-medium text-black hover:text-emerald-400 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-gray-700">{item.description}</p>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              <Trash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartItem;

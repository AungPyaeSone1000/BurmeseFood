import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupons");
      set({ coupon: res.data });
    } catch (error) {
      console.log(error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupons/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotal();
      toast.success("Coupon applied successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotal();
    toast.success("Coupon removed successfully");
  },
  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotal();
    } catch (error) {
      set({ cart: [] });
      toast.error(error.response.data.message);
    }
  },

clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added to cart");

      set((previousState) => {
        const exitstingItem = previousState.cart.find(
          (item) => item._id === product._id
        );
        const newCart = exitstingItem
          ? previousState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...previousState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotal();
    } catch (error) {
      console.log("Error adding to cart", error);
      toast.error(error.response.data.message);
    }
  },

  removeFromCart: async (productId) => {
    await axios.delete(`/cart`, { data: { productId } });
    set((previousState) => ({
      cart: previousState.cart.filter((item) => item._id !== productId),
    }));
    get().calculateTotal();
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity === 0) {
      get().removeFromCart(productId);
      return;
    }
    await axios.put(`/cart/${productId}`, { quantity });
    set((previousState) => ({
      cart: previousState.cart.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      ),
    }));
    get().calculateTotal();
  },
  calculateTotal: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    let total = subtotal;
    if (coupon) {
      const discount = subtotal * (coupon.discountPercentage / 100);
      total = subtotal - discount;
    }
    set({ subtotal, total });
  },
}));

import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ loading: true });
    try {
      const res = await axios.post("/products", productData);
      set((previousState) => ({
        products: [...previousState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      set({ loading: false });
    }
  },
  fetchAllProduct: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products");
      set({ products: res.data.products, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.message);
    }
  },

  fetchProductByCategory: async (category) => {
      set({ loading: true });
      try {
        const res = await axios.get(`/products/category/${category}`);
        set({ products: res.data.products, loading: false });
      } catch (error) {
        set({ error: "Failed to fetch products", loading: false });
        toast.error(error.response.data.message);
      }
  },
  deleteProduct: async (productId) => {
    set({ loading: true });
    try {
      await axios.delete(`/products/${productId}`);
      set((previousState) => ({
        products: previousState.products.filter(
          (product) => product._id !== productId
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },
  toggleFeaturedProduct: async (productId) => {
    set({ loading: true });
    try {
      console.log(productId);

      const res = await axios.patch(`/products/${productId}`);
      set((previousState) => ({
        products: previousState.products.map((product) =>
          product._id === productId
            ? { ...product, isFeatured: res.data.isFeatured }
            : product
        ),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      toast.error(error.response.data.message);
    }
  },

  fetchFeaturedProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("/products/featured");
      set({ products: res.data, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      toast.error(error.response.data.message);
    }
  },
}));

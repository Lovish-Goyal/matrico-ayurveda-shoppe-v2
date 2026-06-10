import { create } from "zustand";

export const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
    set({ user });
  },

  cart: JSON.parse(localStorage.getItem("cart")) || [],
  addToCart: (product) =>
    set((state) => {
      if (state.cart.some((item) => item.name === product.name)) return {};
      const updated = [...state.cart, product];
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),
  removeFromCart: (productName) =>
    set((state) => {
      const updated = state.cart.filter((item) => item.name !== productName);
      localStorage.setItem("cart", JSON.stringify(updated));
      return { cart: updated };
    }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  doshaProfile: localStorage.getItem("doshaProfile") || "Unknown",
  setDoshaProfile: (dosha) => {
    localStorage.setItem("doshaProfile", dosha);
    set({ doshaProfile: dosha });
  },

  recentlyViewed: JSON.parse(localStorage.getItem("recentlyViewed")) || [],
  addRecentlyViewed: (product) =>
    set((state) => {
      const filtered = state.recentlyViewed.filter(
        (p) => p.name !== product.name
      );
      const updated = [product, ...filtered].slice(0, 5); // Keep last 5 items
      localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      return { recentlyViewed: updated };
    }),

  selectedSymptom: null,
  setSelectedSymptom: (symptom) => set({ selectedSymptom: symptom }),
}));
export default useStore;

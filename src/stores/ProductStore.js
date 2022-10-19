import { defineStore } from 'pinia';
export const useProductStore = defineStore("ProductStore", {
  state: () => {
    return {
      products: [],
    };
  },
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default;
      // this.products = (await import("@/data/products.json")).data
    },
  },
})

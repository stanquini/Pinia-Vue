import { useAuthUserStore } from "@/stores/AuthUserStore";
import { groupBy } from 'lodash';
import { acceptHMRUpdate, defineStore } from 'pinia';
export const useCartStore = defineStore("CartStore", {
  state: () => {
    return {
      items: [],
    };
  },
  getters: {
    count: state => state.items.length,
    isEmpty: state => !state.count,
    grouped: state => {
      const grouped = groupBy(state.items, item => item.name)
      const sorted = Object.keys(grouped).sort()
      let inOrder ={}
      sorted.forEach(key => inOrder[key] = grouped[key])
      return inOrder
    },
    groupCount: state => (name) => state.grouped[name].length,
    total: state => state.items.reduce((acc, current) => acc + current.price, 0)
  },
  actions: {
    checkout() {
      const authUserStore = useAuthUserStore();
      alert(
        `${authUserStore.username} just bought ${this.count} items at a total of $${this.total}`
      );
    },
    addItems(count, item) {
      count = parseInt(count);
      for(let index = 0; index < count; index++) {
        this.items.push({ ...item });
      };
    },
    removeItem(itemName) {
      this.items = this.items.filter(item => item.name !== itemName);
    },
    setItemCount(item, count) {
      this.removeItem(item.name)
      this.addItems(count, item)
    },
  },
});

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}

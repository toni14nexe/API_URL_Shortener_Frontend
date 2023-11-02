import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => {
    return {
      state: 0,
    };
  },

  // For persistant values
  persist: true,
  actions: {
    stateIncrement() {
      this.state++;
    },

    stateDecrement() {
      this.state--;
    },
  },
});

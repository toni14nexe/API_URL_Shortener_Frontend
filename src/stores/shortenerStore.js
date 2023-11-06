import { defineStore } from 'pinia';
import { showErrorToast } from '../modules/toastMessage';
import { $axios } from '../modules/axios';

export const useShortenerStore = defineStore('shortenerStore', {
  state: () => {
    return {
      shorteners: [],
    };
  },

  actions: {
    async getLoggedUserShorteners(data) {
      try {
        const response = await $axios.get('/shorteners');
        this.shorteners = response.data.Shortener;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },
  },
});

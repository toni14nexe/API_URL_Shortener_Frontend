import { defineStore } from 'pinia';
import { showErrorToast, showSuccessToast } from '../modules/toastMessage';
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

    async createNewShortener(shortener) {
      try {
        await $axios.post('/shorteners', shortener);
        showSuccessToast('Shortener created successfully.');
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async editShortener(shortener) {
      try {
        await $axios.put(`/shorteners/${shortener._id}`, {
          url: shortener.url,
          shortValue: shortener.shortValue,
        });
        showSuccessToast('Shortener edited successfully.');
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async deleteShortener(shortenerId) {
      try {
        await $axios.delete(`/shorteners/${shortenerId}`);
        showSuccessToast('Shortener deleted successfully.');
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },
  },
});

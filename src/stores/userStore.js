import { defineStore } from 'pinia';
import { showErrorToast, showSuccessToast } from '../modules/toastMessage';
import { $axios } from '../modules/axios';
import cookies from 'vue-cookies';
import { router } from '../main.js';

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      email: '',
      username: '',
    };
  },
  persist: true,

  actions: {
    async signin(data) {
      try {
        const response = await $axios.post('/users/login', data);
        cookies.set(
          'authorization',
          `token ${response.data.user.token}`,
          '48h'
        );
        this.username = await response.data.user.username;
        this.email = await response.data.user.email;
        if (cookies.get('authorization') && this.username && this.email)
          return true;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async signup(data) {
      try {
        const response = await $axios.post('/users/signup', data);
        showSuccessToast(
          'Account created succesfully. Check your email for validation.'
        );
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async accountValidation() {
      const userIdIndex = router.currentRoute.value.fullPath.indexOf('userId=');
      const userId = router.currentRoute.value.fullPath.slice(
        userIdIndex + 7,
        userIdIndex + 31
      );
      const hash = router.currentRoute.value.query?.hash;
      try {
        const response = await $axios.patch(`/users/${userId}/${hash}`);
        showSuccessToast('Account is verificated successfully.');
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async resetPasswordRequest(email) {
      try {
        const response = await $axios.patch(`/users/${email}`);
        showSuccessToast('Reset password link was successfully sent to email.');
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async resetPassword(password) {
      const sendingData = {
        password: password,
        hash: router.currentRoute.value.query?.hash,
      };
      const userId = router.currentRoute.value.query?.userId;
      try {
        const response = await $axios.put(
          `/users/${userId}/reset-password`,
          sendingData
        );
        showSuccessToast('Reset password link was successfully sent to email.');
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async getAllUsers() {
      try {
        const response = await $axios.get('/users');
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    async getUser(userId) {
      try {
        const response = await $axios.get(`/users/${userId}`);
        return response;
      } catch (error) {
        console.error(error);
        showErrorToast(error);
      }
    },

    logout() {
      this.username = '';
      this.email = '';
      localStorage.clear();
      cookies.remove('authorization');
      router.push('/');
    },
  },
});

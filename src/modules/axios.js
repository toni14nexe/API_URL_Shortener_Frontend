import axios from 'axios';
import cookies from 'vue-cookies';

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
  timeout: 100_000,
  headers: {
    common: {
      'Content-Type': 'application/json',
      Authorization: cookies.get('authorization') || null,
    },
  },
});

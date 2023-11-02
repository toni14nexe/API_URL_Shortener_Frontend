import axios from 'axios';
import Cookies from 'universal-cookie';
// import { router } from '@/main';

const cookies = new Cookies();

const API_CONFIG = {
  baseURL: import.meta.env.API_URL,
  withCredentials: true,
  timeout: 100_000,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
};

// Axios REQUEST interceptors - used for tokens

$axios.interceptors.request.use(
  (config) => {
    const X_CSRF_TOKEN = cookies.get('X-CSRF-TOKEN');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios RESPONSE interceptors EXAMPLE

/* $axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const route = router.currentRoute.value;
    if (error?.response?.status >= 500 && error?.response?.status < 600) {
      if (error?.response?.data?.code === 'db')
        $toast({
          title: 'Error occurred',
          message: 'Something went wrong',
          type: 'error',
          duration: 'long',
        });
      else {
        router.push('/500');
        return;
      }
    }
    switch (error?.response?.status) {
      case 400:
        $toast({
          title: 'Bad request',
          message: 'Incomplete, badly constructed or invalid data',
          type: 'error',
          duration: 'long',
        });
        break;
      case 401:
        if (error?.response?.data?.cause === 'password_expired')
          $toast({
            title: 'Unauthorized',
            message: 'Password expired! Create new Bipa password.',
            type: 'error',
            duration: 'long',
            customClass: 'hover-pointer',
            group: 'Bipa',
          });
        else
          $toast({
            title: 'Unauthorized',
            message: 'Please check your credentials and try again',
            type: 'error',
            duration: 'long',
          });
        clearData();
        if (route.fullPath !== '/login') {
          router.replace('/login');
        }
        break;
      case 403:
        console.log(error?.response?.data?.cause);
        if (error?.response?.data?.cause === 'expertises_assigned') {
          $toast({
            title: 'Expertises Assigned',
            message:
              'You do not have permission to archive category with assigned expertises',
            type: 'error',
            duration: 'long',
          });
        } else {
          $toast({
            title: 'Access Denied',
            message:
              'You do not have permission to view this page or perform this action',
            type: 'error',
            duration: 'long',
          });

          if (route.fullPath !== '/login') {
            router.replace('/dashboard');
          }
        }
        break;
      case 404:
        router.push('/404');
        break;
      default:
        if (error?.response?.data?.code !== 'db')
          $toast({
            title: error?.name || 'Error occurred',
            message: error?.response?.data?.cause || 'Something went wrong',
            type: 'error',
            duration: 'long',
          });
    }
    return Promise.resolve();
  }
);
 */

export const $axios = axios.create(API_CONFIG);

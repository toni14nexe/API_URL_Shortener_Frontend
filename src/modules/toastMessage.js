import { ElNotification } from 'element-plus';

export function showErrorToast(error) {
  ElNotification({
    title: error?.response?.data?.cause || error?.response?.statusText || null,
    message:
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong',
    duration: 5000,
    type: 'error',
  });
}

export function showSuccessToast(data) {
  ElNotification({
    title: data?.title || null,
    message: data?.message || data,
    duration: 5000,
    type: 'success',
  });
}

import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: 'https://api.plantpulselb.com/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.set('App-Type', 'admin');
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        toast.error('Unauthorized! Please login again.'); // Toast for 401 error
      } else if (error.response.status >= 500) {
        toast.error('Server error! Please try again later.'); // Toast for server errors (500+)
      } else {
        toast.error(`Error: ${error.response.statusText}`); // Generic error toast
      }
    } else {
      toast.error('Network error! Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;

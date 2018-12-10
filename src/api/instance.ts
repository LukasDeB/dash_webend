import axios, { AxiosInstance } from 'axios';

const headers: any = {
  'Content-Type': 'application/json',
};
let axiosInstance: AxiosInstance | null = null;

// export const BASEURL = 'http://104.248.6.125:3001/';
export const BASEURL = 'http://localhost:3001/';

export const getApiInstance = async () => {
  if (!axiosInstance) {
    try {
      const jwt = localStorage.getItem('accessToken');
      if (jwt) {
        headers.Authorization = `Bearer ${jwt}`;
      }
    } catch (error) {
      // Error retrieving data, keep default settings
    }
    axiosInstance = axios.create({
      baseURL: BASEURL,
      timeout: 30000,
      headers,
    });
  }
  return axiosInstance;
};

export const resetApiInstance = () => {
  axiosInstance = null;
};